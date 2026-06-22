import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { RecipeListScreen } from '@/screens/RecipeListScreen';
import { RecipeDetailScreen } from '@/screens/RecipeDetailScreen';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { TabletHomeScreen } from '@/screens/TabletHomeScreen';
import { colors } from '@/theme/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Contenuto della scheda "Ricette":
 *  - iPad (schermo largo): master-detail a due colonne.
 *  - iPhone: stack elenco -> dettaglio.
 */
export function RecipesStack() {
  const { isWide } = useResponsiveLayout();

  if (isWide) return <TabletHomeScreen />;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.primaryDark,
        headerTitleStyle: { color: colors.text, fontWeight: '700' },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="RecipeList" component={RecipeListScreen} options={{ title: 'Cooking Lalla' }} />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={({ route }) => ({ title: route.params.title, headerBackTitle: 'Ricette' })}
      />
    </Stack.Navigator>
  );
}
