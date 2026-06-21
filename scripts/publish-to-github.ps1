<#
  Pubblica/aggiorna il progetto su GitHub usando solo le API web (niente git installato).

  Perché così: questa rete blocca il canale tecnico "git data" (blob/tree) usato dai
  push classici, ma consente l'API "Contents" (un file alla volta). Quindi carichiamo
  i file uno per uno con quell'API. Per ultimo carichiamo il workflow di build, così
  la costruzione del sito parte una sola volta, a tutti i file già presenti.

  - Usa la connessione di Windows (schannel): niente problema di certificati.
  - Carica solo i file di testo; le icone PNG le rigenera GitHub in fase di build.
  - È idempotente: la prima volta crea, le successive aggiorna (per le "modifiche").

  Il token NON è nel file: arriva dalla variabile d'ambiente GH_TOKEN.

  Uso:
    $env:GH_TOKEN = "<token>"
    .\scripts\publish-to-github.ps1 -Repo "bimby-ricette" -Message "Aggiornamento"
#>
param(
  [string]$Repo = "bimby-ricette",
  [string]$Message = "Aggiornamento Bimby Ricette",
  [string]$ProjectDir = (Split-Path $PSScriptRoot -Parent)
)

$ErrorActionPreference = "Stop"
$token = $env:GH_TOKEN
if (-not $token) { throw "Manca la variabile GH_TOKEN (il token GitHub)." }

$apiBase = "https://api.github.com"
$headers = @{
  Authorization = "Bearer $token"
  Accept        = "application/vnd.github+json"
  "User-Agent"  = "bimby-ricette-publisher"
}

[System.Net.ServicePointManager]::Expect100Continue = $false
[System.Net.ServicePointManager]::DefaultConnectionLimit = 50

function Invoke-GH($Method, $Url, $Body) {
  $params = @{ Method = $Method; Uri = $Url; Headers = $headers; TimeoutSec = 60 }
  if ($Body) { $params.Body = ($Body | ConvertTo-Json -Depth 30); $params.ContentType = "application/json" }
  return Invoke-RestMethod @params
}

# --- 1. Chi sono io (proprietario del token) ---
$me = Invoke-GH GET "$apiBase/user"
$owner = $me.login
Write-Host "Account GitHub: $owner"

# --- 2. Crea il repository (se non esiste già) ---
try {
  Invoke-GH POST "$apiBase/user/repos" @{ name = $Repo; private = $false; description = "Ricette per Bimby (app personale)"; auto_init = $false } | Out-Null
  Write-Host "Repository creato: $owner/$Repo"
} catch {
  if ($_.Exception.Response.StatusCode.value__ -eq 422) { Write-Host "Repository gia esistente: aggiorno." }
  else { throw }
}

# --- 3. Raccogli i file di testo da caricare ---
$excludeDirs = @('node_modules', 'dist', '.expo', '.git', '.claude')
$excludeNames = @('package-lock.json')   # grande e non necessario (la build fa npm install)
$files = Get-ChildItem -LiteralPath $ProjectDir -Recurse -File | Where-Object {
  $rel = $_.FullName.Substring($ProjectDir.Length + 1)
  $parts = $rel -split '[\\/]'
  ($excludeDirs -notcontains $parts[0]) -and
  ($excludeNames -notcontains $_.Name) -and
  ($_.Extension -notin @('.png', '.log', '.ico', '.tsbuildinfo'))
}

function RelPath($f) { return ($f.FullName.Substring($ProjectDir.Length + 1) -replace '\\', '/') }

# Carico per ultimo il workflow di build: così la costruzione del sito si avvia
# una sola volta, quando tutti gli altri file sono già online.
$workflowRel = ".github/workflows/deploy.yml"
$ordered = @($files | Where-Object { (RelPath $_) -ne $workflowRel })
$ordered += @($files | Where-Object { (RelPath $_) -eq $workflowRel })
Write-Host "File da caricare: $($ordered.Count)"

function Get-RemoteFile($pathRel) {
  try {
    $r = Invoke-GH GET "$apiBase/repos/$owner/$Repo/contents/$pathRel`?ref=main"
    return @{ sha = $r.sha; content = ($r.content -replace '\s', '') }  # tolgo gli a-capo che GitHub aggiunge al base64
  } catch { return $null }
}

# --- 3b. Rimuovi un eventuale file di prova creato durante i test ---
$prova = Get-RemoteFile "PROVA.md"
if ($prova) {
  Invoke-GH DELETE "$apiBase/repos/$owner/$Repo/contents/PROVA.md" @{ message = "Rimuovo file di prova"; sha = $prova.sha; branch = "main" } | Out-Null
  Write-Host "File di prova rimosso."
}

# --- 4. Carica solo i file cambiati (un file = un piccolo invio) ---
$i = 0; $uploaded = 0; $skipped = 0
foreach ($f in $ordered) {
  $i++
  $rel = RelPath $f
  $b64 = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes($f.FullName))
  $remote = Get-RemoteFile $rel
  if ($remote -and $remote.content -eq $b64) {
    $skipped++; Write-Host "  [$i/$($ordered.Count)] = $rel (invariato)"; continue
  }
  $body = @{ message = "$Message ($rel)"; content = $b64; branch = "main" }
  if ($remote) { $body.sha = $remote.sha }
  Invoke-GH PUT "$apiBase/repos/$owner/$Repo/contents/$rel" $body | Out-Null
  $uploaded++; Write-Host "  [$i/$($ordered.Count)] + $rel"
}
Write-Host "Caricati: $uploaded  -  invariati: $skipped."

# --- 5. Accendi GitHub Pages in modalità "GitHub Actions" ---
try {
  Invoke-GH POST "$apiBase/repos/$owner/$Repo/pages" @{ build_type = "workflow" } | Out-Null
  Write-Host "GitHub Pages attivato (modalita Actions)."
} catch {
  $code = $_.Exception.Response.StatusCode.value__
  if ($code -eq 409 -or $code -eq 422) { Write-Host "GitHub Pages gia attivo." }
  else { Write-Host "Nota: Pages non attivato via API ($code). Si attiva a mano in Settings > Pages > Source: GitHub Actions." }
}

# --- 6. Riepilogo ---
Write-Host ""
Write-Host "=== FATTO ==="
Write-Host "Repository:  https://github.com/$owner/$Repo"
Write-Host "Build:       https://github.com/$owner/$Repo/actions"
Write-Host "Sito (1-2m): https://$owner.github.io/$Repo/"
