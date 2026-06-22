import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ManualShoppingItem } from '@/types/planner';
import { useRecipes } from '@/hooks/useRecipes';
import { usePlanner } from '@/hooks/usePlanner';
import { nextDays, dateKey } from '@/utils/dates';
import { buildShoppingList } from '@/utils/shoppingList';
import { SHOPPING_CATEGORIES, ShoppingCategory } from '@/utils/ingredientCategories';
import { colors, radius, spacing, typography } from '@/theme/theme';

type Tab = 'settimana' | 'mia';

/** Sezione Spesa: lista automatica dal calendario + lista manuale col carrello. */
export function ShoppingScreen() {
  const { recipes } = useRecipes();
  const {
    mealPlan, hasInPantry, togglePantry,
    manualItems, addManualItem, toggleManualItem, removeManualItem,
  } = usePlanner();

  const [tab, setTab] = useState<Tab>('settimana');

  const weekKeys = useMemo(() => nextDays(7).map(dateKey), []);
  const groups = useMemo(
    () => buildShoppingList(recipes, mealPlan, weekKeys),
    [recipes, mealPlan, weekKeys]
  );

  const toBuyCount = useMemo(
    () => groups.reduce((sum, g) => sum + g.items.filter((i) => !hasInPantry(i.name)).length, 0),
    [groups, hasInPantry]
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.brand}>🛒 Spesa</Text>
        <View style={styles.tabs}>
          <Tab label="Dalla settimana" active={tab === 'settimana'} onPress={() => setTab('settimana')} />
          <Tab label="La mia lista" active={tab === 'mia'} onPress={() => setTab('mia')} />
        </View>
      </View>

      {tab === 'settimana' ? (
        <WeekList groups={groups} toBuyCount={toBuyCount} hasInPantry={hasInPantry} togglePantry={togglePantry} />
      ) : (
        <ManualList
          items={manualItems}
          onAdd={addManualItem}
          onToggle={toggleManualItem}
          onRemove={removeManualItem}
        />
      )}
    </SafeAreaView>
  );
}

function Tab({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.tab, active && styles.tabActive]}>
      <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
    </Pressable>
  );
}

/** Lista automatica generata dalle ricette del calendario (prossimi 7 giorni). */
function WeekList({
  groups,
  toBuyCount,
  hasInPantry,
  togglePantry,
}: {
  groups: ReturnType<typeof buildShoppingList>;
  toBuyCount: number;
  hasInPantry: (name: string) => boolean;
  togglePantry: (name: string) => void;
}) {
  if (groups.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>🗓️</Text>
        <Text style={styles.emptyTitle}>Nessun ingrediente</Text>
        <Text style={styles.emptyText}>
          Aggiungi delle ricette nel Calendario: qui comparirà la lista della spesa dei prossimi 7 giorni.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.hint}>
        Spunta ciò che hai già in frigo o dispensa. Restano da comprare: <Text style={styles.bold}>{toBuyCount}</Text>.
      </Text>
      {groups.map((group) => (
        <View key={group.category} style={styles.group}>
          <Text style={styles.groupTitle}>{group.category}</Text>
          {group.items.map((item) => {
            const have = hasInPantry(item.name);
            return (
              <Pressable key={item.key} style={styles.row} onPress={() => togglePantry(item.name)}>
                <View style={[styles.check, have && styles.checkOn]}>
                  {have && <Text style={styles.checkTick}>✓</Text>}
                </View>
                <View style={styles.rowBody}>
                  <Text style={[styles.itemName, have && styles.itemHave]}>
                    {item.name}
                    {item.amount ? <Text style={styles.itemAmount}>  {item.amount}</Text> : null}
                  </Text>
                  <Text style={styles.usedIn} numberOfLines={1}>per: {item.usedIn.join(', ')}</Text>
                </View>
                <Text style={[styles.tag, have ? styles.tagHave : styles.tagBuy]}>
                  {have ? 'ce l’ho' : 'da comprare'}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}

/** Lista della spesa aggiunta a mano, divisa per categorie. */
function ManualList({
  items,
  onAdd,
  onToggle,
  onRemove,
}: {
  items: ManualShoppingItem[];
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

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      {/* Aggiunta */}
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
            <Pressable
              key={c}
              onPress={() => setCategory(c)}
              style={[styles.catChip, category === c && styles.catChipOn]}
            >
              <Text style={[styles.catChipText, category === c && styles.catChipTextOn]}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <Pressable style={styles.addBtn} onPress={submit}>
          <Text style={styles.addBtnText}>Aggiungi al carrello</Text>
        </Pressable>
      </View>

      {items.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🧺</Text>
          <Text style={styles.emptyTitle}>Carrello vuoto</Text>
          <Text style={styles.emptyText}>Aggiungi qui gli ingredienti che ti mancano.</Text>
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
                  <Text style={[styles.itemName, styles.flex1, item.checked && styles.itemHave]}>
                    {item.name}
                  </Text>
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
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
  },
  tabActive: { backgroundColor: colors.primary },
  tabText: { fontWeight: '700', color: colors.textMuted },
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
  rowBody: { flex: 1 },
  flex1: { flex: 1 },
  check: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOn: { backgroundColor: colors.primary },
  checkTick: { color: colors.textOnPrimary, fontWeight: '700', fontSize: 14 },
  itemName: { ...typography.body, fontWeight: '600' },
  itemAmount: { fontWeight: '400', color: colors.textMuted },
  itemHave: { textDecorationLine: 'line-through', color: colors.textMuted },
  usedIn: { ...typography.caption, fontSize: 12 },
  tag: { fontSize: 11, fontWeight: '700', overflow: 'hidden', borderRadius: radius.sm, paddingHorizontal: 6, paddingVertical: 2 },
  tagHave: { color: colors.primaryDark, backgroundColor: colors.surfaceAlt },
  tagBuy: { color: '#B26B00', backgroundColor: '#FFF3E0' },
  remove: { color: colors.textMuted, fontSize: 16 },
  addBox: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  addInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
  },
  catRow: { gap: spacing.sm, paddingVertical: 2 },
  catChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
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
