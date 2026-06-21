import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { RecipeListScreen } from '@/screens/RecipeListScreen';
import { RecipeDetailScreen } from '@/screens/RecipeDetailScreen';
import { TabletHomeScreen } from '@/screens/TabletHomeScreen';
import { colors } from '@/theme/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.background,
    text: colors.text,
    border: colors.border,
  },
};

/**
 * Sceglie il layout in base alla larghezza:
 *  - schermi larghi (iPad)  -> master-detail a due colonne, senza stack.
 *  - schermi stretti (iPhone) -> stack elenco -> dettaglio.
 */
export function RootNavigator() {
  const { isWide } = useResponsiveLayout();

  if (isWide) {
    return <TabletHomeScreen />;
  }

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.primaryDark,
          headerTitleStyle: { color: colors.text, fontWeight: '700' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen
          name="RecipeList"
          component={RecipeListScreen}
          options={{ title: 'Bimby Ricette' }}
        />
        <Stack.Screen
          name="RecipeDetail"
          component={RecipeDetailScreen}
          options={({ route }) => ({ title: route.params.title, headerBackTitle: 'Ricette' })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
