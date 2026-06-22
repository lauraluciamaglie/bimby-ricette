import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ManualShoppingItem } from '@/types/planner';
import { useRecipes } from '@/hooks/useRecipes';
import { usePlanner, IngredientStatus } from '@/hooks/usePlanner';
import { nextDays, dateKey } from '@/utils/dates';
import { buildShoppingList, AggregatedIngredient } from '@/utils/shoppingList';
import { SHOPPING_CATEGORIES, ShoppingCategory } from '@/utils/ingredientCategories';
import { colors, radius, spacing, typography } from '@/theme/theme';

type Tab = 'settimana' | 'mia';

/** Sezione Spesa: lista della settimana (col calendario) + lista manuale. */
export function ShoppingScreen() {
  const { recipes } = useRecipes();
  const {
    mealPlan, statusOf, setStatus,
    manualItems, addManualItem, toggleManualItem, removeManualItem,
  } = usePlanner();

  const [tab, setTab] = useState<Tab>('settimana');

  const weekKeys = useMemo(() => nextDays(7).map(dateKey), []);
  const groups = useMemo(
    () => buildShoppingList(recipes, mealPlan, weekKeys),
    [recipes, mealPlan, weekKeys]
  );

  // Tutti gli ingredienti della settimana segnati come "da comprare".
  const needItems = useMemo(
    () => groups.flatMap((g) => g.items).filter((i) => statusOf(i.name) === 'need'),
    [groups, statusOf]
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.brand}>🛒 Spesa</Text>
        <View style={styles.tabs}>
          <TabBtn label="Dalla settimana" active={tab === 'settimana'} onPress={() => setTab('settimana')} />
          <TabBtn label={`La mia lista${needItems.length ? ` (${needItems.length})` : ''}`} active={tab === 'mia'} onPress={() => setTab('mia')} />
        </View>
      </View>

      {tab === 'settimana' ? (
        <WeekList groups={groups} statusOf={statusOf} setStatus={setStatus} />
      ) : (
        <ManualList
          items={manualItems}
          fromCalendar={needItems}
          onBought={(name) => setStatus(name, 'have')}
          onAdd={addManualItem}
          onToggle={toggleManualItem}
          onRemove={removeManualItem}
        />
      )}
    </SafeAreaView>
  );
}

function TabBtn({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.tab, active && styles.tabActive]}>
      <Text style={[styles.tabText, active && styles.tabTextActive]} numberOfLines={1}>{label}</Text>
    </Pressable>
  );
}

/** Lista della settimana: per ogni ingrediente scegli "Ce l'ho" o "Da comprare". */
function WeekList({
  groups,
  statusOf,
  setStatus,
}: {
  groups: ReturnType<typeof buildShoppingList>;
  statusOf: (name: string) => IngredientStatus | undefined;
  setStatus: (name: string, status: IngredientStatus | null) => void;
}) {
  if (groups.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>🗓️</Text>
        <Text style={styles.emptyTitle}>Nessun ingrediente</Text>
        <Text style={styles.emptyText}>
          Aggiungi delle ricette nel Calendario: qui comparirà l'elenco degli ingredienti dei prossimi 7 giorni.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.hint}>
        Per ogni ingrediente segna se <Text style={styles.bold}>ce l'hai</Text> o se è{' '}
        <Text style={styles.bold}>da comprare</Text>. Quelli "da comprare" finiscono nella tua lista
        (scheda "La mia lista").
      </Text>
      {groups.map((group) => (
        <View key={group.category} style={styles.group}>
          <Text style={styles.groupTitle}>{group.category}</Text>
          {group.items.map((item) => {
            const status = statusOf(item.name);
            return (
              <View key={item.key} style={styles.row}>
                <View style={styles.rowBody}>
                  <Text style={styles.itemName}>
                    {item.name}
                    {item.amount ? <Text style={styles.itemAmount}>  {item.amount}</Text> : null}
                  </Text>
                  <Text style={styles.usedIn} numberOfLines={1}>per: {item.usedIn.join(', ')}</Text>
                </View>
                <View style={styles.flagCol}>
                  <Pressable
                    onPress={() => setStatus(item.name, status === 'have' ? null : 'have')}
                    style={[styles.flag, status === 'have' && styles.flagHave]}
                  >
                    <Text style={[styles.flagText, status === 'have' && styles.flagTextOn]}>ce l'ho</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setStatus(item.name, status === 'need' ? null : 'need')}
                    style={[styles.flag, status === 'need' && styles.flagNeed]}
                  >
                    <Text style={[styles.flagText, status === 'need' && styles.flagTextOn]}>da comprare</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}

/** Lista personale: sottosezione "Dal calendario" + articoli aggiunti a mano. */
function ManualList({
  items,
  fromCalendar,
  onBought,
  onAdd,
  onToggle,
  onRemove,
}: {
  items: ManualShoppingItem[];
  fromCalendar: AggregatedIngredient[];
  onBought: (name: string) => void;
  onAdd: (name: string, category: ShoppingCategory) => void;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ShoppingCategory>('Frutta e Verdura');

  function submit() {
    if (name.trim()) {
      onAdd(name, category);
      setName('');
    }
  }

  const isEmpty = items.length === 0 && fromCalendar.length === 0;

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      {/* Sottosezione: arriva dal calendario */}
      {fromCalendar.length > 0 && (
        <View style={styles.group}>
          <Text style={styles.groupTitle}>📅 Dal calendario</Text>
          <Text style={styles.hint}>Ingredienti delle ricette della settimana che hai segnato "da comprare".</Text>
          {fromCalendar.map((item) => (
            <Pressable key={item.key} style={[styles.row, styles.fromCal]} onPress={() => onBought(item.name)}>
              <View style={styles.check} />
              <Text style={[styles.itemName, styles.flex1]}>
                {item.name}
                {item.amount ? <Text style={styles.itemAmount}>  {item.amount}</Text> : null}
              </Text>
              <Text style={styles.tapHint}>preso ✓</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* Aggiunta a mano */}
      <View style={styles.addBox}>
        <TextInput
          style={styles.addInput}
          value={name}
          onChangeText={setName}
          placeholder="Aggiungi un articolo…"
          placeholderTextColor={colors.textMuted}
          onSubmitEditing={submit}
          returnKeyType="done"
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catRow}>
          {SHOPPING_CATEGORIES.map((c) => (
            <Pressable key={c} onPress={() => setCategory(c)} style={[styles.catChip, category === c && styles.catChipOn]}>
              <Text style={[styles.catChipText, category === c && styles.catChipTextOn]}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <Pressable style={styles.addBtn} onPress={submit}>
          <Text style={styles.addBtnText}>Aggiungi al carrello</Text>
        </Pressable>
      </View>

      {isEmpty ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🧺</Text>
          <Text style={styles.emptyTitle}>Lista vuota</Text>
          <Text style={styles.emptyText}>Aggiungi gli ingredienti che ti mancano, o segnali nella scheda "Dalla settimana".</Text>
        </View>
      ) : (
        SHOPPING_CATEGORIES.map((cat) => {
          const catItems = items.filter((i) => i.category === cat);
          if (catItems.length === 0) return null;
          return (
            <View key={cat} style={styles.group}>
              <Text style={styles.groupTitle}>{cat}</Text>
              {catItems.map((item) => (
                <Pressable key={item.id} style={styles.row} onPress={() => onToggle(item.id)}>
                  <View style={[styles.check, item.checked && styles.checkOn]}>
                    {item.checked && <Text style={styles.checkTick}>✓</Text>}
                  </View>
                  <Text style={[styles.itemName, styles.flex1, item.checked && styles.itemHave]}>{item.name}</Text>
                  <Pressable onPress={() => onRemove(item.id)} hitSlop={6}>
                    <Text style={styles.remove}>✕</Text>
                  </Pressable>
                </Pressable>
              ))}
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  brand: { ...typography.title, fontSize: 24 },
  tabs: { flexDirection: 'row', gap: spacing.sm },
  tab: { flex: 1, paddingVertical: spacing.sm, borderRadius: radius.pill, backgroundColor: colors.surfaceAlt, alignItems: 'center' },
  tabActive: { backgroundColor: colors.primary },
  tabText: { fontWeight: '700', color: colors.textMuted, fontSize: 13 },
  tabTextActive: { color: colors.textOnPrimary },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  hint: { ...typography.caption },
  bold: { fontWeight: '700', color: colors.text },
  group: { gap: spacing.xs },
  groupTitle: { ...typography.sectionTitle, color: colors.primaryDark, marginTop: spacing.sm },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  fromCal: { backgroundColor: '#FFF8EE', borderColor: '#FFE0B2' },
  rowBody: { flex: 1 },
  flex1: { flex: 1 },
  itemName: { ...typography.body, fontWeight: '600' },
  itemAmount: { fontWeight: '400', color: colors.textMuted },
  itemHave: { textDecorationLine: 'line-through', color: colors.textMuted },
  usedIn: { ...typography.caption, fontSize: 12 },
  flagCol: { gap: 4, alignItems: 'flex-end' },
  flag: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    minWidth: 92,
    alignItems: 'center',
  },
  flagHave: { backgroundColor: colors.primary, borderColor: colors.primary },
  flagNeed: { backgroundColor: '#F2A100', borderColor: '#F2A100' },
  flagText: { fontSize: 12, fontWeight: '700', color: colors.textMuted },
  flagTextOn: { color: colors.textOnPrimary },
  tapHint: { fontSize: 12, color: '#B26B00', fontWeight: '700' },
  check: {
    width: 24, height: 24, borderRadius: 6, borderWidth: 1.5, borderColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  checkOn: { backgroundColor: colors.primary },
  checkTick: { color: colors.textOnPrimary, fontWeight: '700', fontSize: 14 },
  remove: { color: colors.textMuted, fontSize: 16 },
  addBox: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.md, gap: spacing.sm },
  addInput: {
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm, fontSize: 16, color: colors.text, backgroundColor: colors.background,
  },
  catRow: { gap: spacing.sm, paddingVertical: 2 },
  catChip: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs + 2, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.background },
  catChipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  catChipText: { fontSize: 13, color: colors.textMuted },
  catChipTextOn: { color: colors.textOnPrimary, fontWeight: '600' },
  addBtn: { backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: spacing.sm, alignItems: 'center' },
  addBtnText: { color: colors.textOnPrimary, fontWeight: '700' },
  empty: { alignItems: 'center', paddingTop: spacing.xxl, gap: spacing.sm },
  emptyEmoji: { fontSize: 44 },
  emptyTitle: { ...typography.sectionTitle },
  emptyText: { ...typography.caption, textAlign: 'center', maxWidth: 300 },
});
