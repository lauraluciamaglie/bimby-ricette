import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Course, COURSES, Recipe, BimbySettings } from '@/types/recipe';
import { colors, radius, spacing, typography } from '@/theme/theme';
import { CourseFilterChip } from './CourseChip';
import { PortionSelector } from './PortionSelector';

/** Righe del modulo (tutto testo, convertito in numeri al salvataggio). */
type IngredientRow = { name: string; quantity: string; unit: string };
type StepRow = { text: string; time: string; speed: string; temp: string; antiorario: boolean };

const emptyIngredient = (): IngredientRow => ({ name: '', quantity: '', unit: '' });
const emptyStep = (): StepRow => ({ text: '', time: '', speed: '', temp: '', antiorario: false });

/** Converte "100" o "varoma" nel valore corretto per la temperatura del Bimby. */
function parseTemperature(text: string): number | 'Varoma' | undefined {
  const t = text.trim().toLowerCase();
  if (!t) return undefined;
  if (t === 'varoma') return 'Varoma';
  const n = parseInt(t, 10);
  return isNaN(n) ? undefined : n;
}

function buildBimby(step: StepRow): BimbySettings | undefined {
  const bimby: BimbySettings = {};
  const time = parseInt(step.time, 10);
  if (!isNaN(time)) bimby.timeSeconds = time;
  if (step.speed.trim()) bimby.speed = step.speed.trim();
  const temp = parseTemperature(step.temp);
  if (temp !== undefined) bimby.temperature = temp;
  if (step.antiorario) bimby.direction = 'Antiorario';
  return Object.keys(bimby).length > 0 ? bimby : undefined;
}

/**
 * Maschera "+ Aggiungi ricetta".
 * Raccoglie tipo di piatto, porzioni, ingredienti, passaggi e info, e costruisce
 * una ricetta nello stesso formato delle altre (così funziona con porzioni, filtri
 * e dosi nei passaggi).
 */
export function AddRecipeModal({
  visible,
  onClose,
  onSave,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (recipe: Recipe) => void;
}) {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState<Course>('Primo');
  const [servings, setServings] = useState(4);
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [ingredients, setIngredients] = useState<IngredientRow[]>([emptyIngredient()]);
  const [steps, setSteps] = useState<StepRow[]>([emptyStep()]);
  const [error, setError] = useState('');

  function reset() {
    setTitle('');
    setCourse('Primo');
    setServings(4);
    setDescription('');
    setTime('');
    setIngredients([emptyIngredient()]);
    setSteps([emptyStep()]);
    setError('');
  }

  function updateIngredient(index: number, patch: Partial<IngredientRow>) {
    setIngredients((rows) => rows.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  }
  function updateStep(index: number, patch: Partial<StepRow>) {
    setSteps((rows) => rows.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  }

  function handleSave() {
    const cleanTitle = title.trim();
    const filledIngredients = ingredients.filter((i) => i.name.trim());
    const filledSteps = steps.filter((s) => s.text.trim());

    if (!cleanTitle) return setError('Dai un nome alla ricetta.');
    if (filledIngredients.length === 0) return setError('Aggiungi almeno un ingrediente.');
    if (filledSteps.length === 0) return setError('Aggiungi almeno un passaggio.');

    const recipe: Recipe = {
      id: `user-${Date.now()}`,
      title: cleanTitle,
      course,
      baseServings: servings,
      description: description.trim() || undefined,
      totalTimeMinutes: time.trim() ? parseInt(time, 10) || undefined : undefined,
      tags: ['mia ricetta'],
      ingredients: filledIngredients.map((row, i) => {
        const qty = row.quantity.trim().replace(',', '.');
        const n = parseFloat(qty);
        return {
          id: `ui-${i}`,
          name: row.name.trim(),
          quantity: qty === '' || isNaN(n) ? null : n,
          unit: row.unit.trim() || undefined,
        };
      }),
      steps: filledSteps.map((row, i) => ({
        id: `us-${i}`,
        order: i + 1,
        text: row.text.trim(),
        bimby: buildBimby(row),
      })),
    };

    onSave(recipe);
    reset();
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent={false}>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        {/* Barra in alto */}
        <View style={styles.header}>
          <Pressable onPress={onClose} hitSlop={8}>
            <Text style={styles.headerAction}>Annulla</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Nuova ricetta</Text>
          <Pressable onPress={handleSave} hitSlop={8}>
            <Text style={[styles.headerAction, styles.headerSave]}>Salva</Text>
          </Pressable>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            {error ? <Text style={styles.error}>{error}</Text> : null}

            {/* Nome */}
            <Text style={styles.label}>Nome del piatto</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Es. Risotto ai funghi"
              placeholderTextColor={colors.textMuted}
            />

            {/* Tipo di piatto */}
            <Text style={styles.label}>Tipo di piatto</Text>
            <View style={styles.courseRow}>
              {COURSES.map((c) => (
                <CourseFilterChip key={c} course={c} selected={course === c} onPress={() => setCourse(c)} />
              ))}
            </View>

            {/* Porzioni di base */}
            <Text style={styles.label}>Per quante persone sono queste dosi?</Text>
            <PortionSelector value={servings} onChange={setServings} />
            <Text style={styles.hint}>
              Inserisci le dosi per {servings} {servings === 1 ? 'persona' : 'persone'}; l'app le
              ricalcolerà da sola per le altre porzioni.
            </Text>

            {/* Info opzionali */}
            <Text style={styles.label}>Descrizione (facoltativa)</Text>
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              value={description}
              onChangeText={setDescription}
              placeholder="Una breve descrizione…"
              placeholderTextColor={colors.textMuted}
              multiline
            />

            <Text style={styles.label}>Tempo totale in minuti (facoltativo)</Text>
            <TextInput
              style={styles.input}
              value={time}
              onChangeText={setTime}
              placeholder="Es. 30"
              placeholderTextColor={colors.textMuted}
              keyboardType="number-pad"
            />

            {/* Ingredienti */}
            <Text style={styles.sectionTitle}>Ingredienti</Text>
            <Text style={styles.hint}>Lascia la quantità vuota per "q.b." (sale, pepe…).</Text>
            {ingredients.map((row, i) => (
              <View key={i} style={styles.ingredientRow}>
                <TextInput
                  style={[styles.input, styles.flex2]}
                  value={row.name}
                  onChangeText={(t) => updateIngredient(i, { name: t })}
                  placeholder="Ingrediente"
                  placeholderTextColor={colors.textMuted}
                />
                <TextInput
                  style={[styles.input, styles.flex1]}
                  value={row.quantity}
                  onChangeText={(t) => updateIngredient(i, { quantity: t })}
                  placeholder="Q.tà"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="decimal-pad"
                />
                <TextInput
                  style={[styles.input, styles.flex1]}
                  value={row.unit}
                  onChangeText={(t) => updateIngredient(i, { unit: t })}
                  placeholder="g, ml, pz"
                  placeholderTextColor={colors.textMuted}
                />
                {ingredients.length > 1 && (
                  <Pressable onPress={() => setIngredients((r) => r.filter((_, x) => x !== i))} hitSlop={8}>
                    <Text style={styles.remove}>✕</Text>
                  </Pressable>
                )}
              </View>
            ))}
            <Pressable onPress={() => setIngredients((r) => [...r, emptyIngredient()])} style={styles.addRow}>
              <Text style={styles.addRowText}>+ Aggiungi ingrediente</Text>
            </Pressable>

            {/* Passaggi */}
            <Text style={styles.sectionTitle}>Preparazione</Text>
            <Text style={styles.hint}>
              I campi Bimby sono facoltativi: compilali se quel passaggio li prevede.
            </Text>
            {steps.map((row, i) => (
              <View key={i} style={styles.stepCard}>
                <View style={styles.stepHead}>
                  <Text style={styles.stepNum}>Passaggio {i + 1}</Text>
                  {steps.length > 1 && (
                    <Pressable onPress={() => setSteps((r) => r.filter((_, x) => x !== i))} hitSlop={8}>
                      <Text style={styles.remove}>✕</Text>
                    </Pressable>
                  )}
                </View>
                <TextInput
                  style={[styles.input, styles.inputMultiline]}
                  value={row.text}
                  onChangeText={(t) => updateStep(i, { text: t })}
                  placeholder="Cosa fare in questo passaggio…"
                  placeholderTextColor={colors.textMuted}
                  multiline
                />
                <View style={styles.bimbyRow}>
                  <TextInput
                    style={[styles.input, styles.flex1]}
                    value={row.time}
                    onChangeText={(t) => updateStep(i, { time: t })}
                    placeholder="Tempo (sec)"
                    placeholderTextColor={colors.textMuted}
                    keyboardType="number-pad"
                  />
                  <TextInput
                    style={[styles.input, styles.flex1]}
                    value={row.speed}
                    onChangeText={(t) => updateStep(i, { speed: t })}
                    placeholder="Velocità"
                    placeholderTextColor={colors.textMuted}
                  />
                  <TextInput
                    style={[styles.input, styles.flex1]}
                    value={row.temp}
                    onChangeText={(t) => updateStep(i, { temp: t })}
                    placeholder="Temp / Varoma"
                    placeholderTextColor={colors.textMuted}
                  />
                </View>
                <Pressable
                  onPress={() => updateStep(i, { antiorario: !row.antiorario })}
                  style={styles.checkRow}
                >
                  <View style={[styles.checkbox, row.antiorario && styles.checkboxOn]}>
                    {row.antiorario && <Text style={styles.checkboxTick}>✓</Text>}
                  </View>
                  <Text style={styles.checkLabel}>Antiorario (senso inverso delle lame)</Text>
                </Pressable>
              </View>
            ))}
            <Pressable onPress={() => setSteps((r) => [...r, emptyStep()])} style={styles.addRow}>
              <Text style={styles.addRowText}>+ Aggiungi passaggio</Text>
            </Pressable>

            <Pressable onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Salva ricetta</Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  headerTitle: { ...typography.cardTitle },
  headerAction: { fontSize: 16, color: colors.textMuted },
  headerSave: { color: colors.primaryDark, fontWeight: '700' },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.sm },
  error: {
    backgroundColor: '#FDECEA',
    color: '#B3261E',
    padding: spacing.md,
    borderRadius: radius.sm,
    fontWeight: '600',
  },
  label: { ...typography.body, fontWeight: '700', marginTop: spacing.md },
  sectionTitle: { ...typography.sectionTitle, marginTop: spacing.xl },
  hint: { ...typography.caption },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
  },
  inputMultiline: { minHeight: 64, textAlignVertical: 'top' },
  courseRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  ingredientRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  remove: { fontSize: 16, color: colors.textMuted, paddingHorizontal: 4 },
  addRow: {
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primaryLight,
    borderRadius: radius.md,
    borderStyle: 'dashed',
  },
  addRowText: { color: colors.primaryDark, fontWeight: '700' },
  stepCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.surface,
  },
  stepHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stepNum: { fontWeight: '700', color: colors.text },
  bimbyRow: { flexDirection: 'row', gap: spacing.sm },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: { backgroundColor: colors.primary },
  checkboxTick: { color: colors.textOnPrimary, fontSize: 14, fontWeight: '700' },
  checkLabel: { ...typography.caption, flex: 1 },
  saveButton: {
    marginTop: spacing.xl,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  saveButtonText: { color: colors.textOnPrimary, fontWeight: '700', fontSize: 16 },
});
