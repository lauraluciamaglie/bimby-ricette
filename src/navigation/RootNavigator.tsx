import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RecipesStack } from './RecipesStack';
import { CalendarScreen } from '@/screens/CalendarScreen';
import { ShoppingScreen } from '@/screens/ShoppingScreen';
import { colors } from '@/theme/theme';

const Tab = createBottomTabNavigator();

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

/** Icona della scheda: una semplice emoji colorata in base allo stato. */
function tabIcon(emoji: string) {
  return ({ focused }: { focused: boolean }) => (
    <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>
  );
}

/**
 * Navigazione principale: tre schede in basso — Ricette, Calendario, Spesa.
 * Funziona sia su iPhone sia su iPad (la scheda Ricette si adatta da sola).
 */
export function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primaryDark,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.border },
        }}
      >
        <Tab.Screen name="Ricette" component={RecipesStack} options={{ tabBarIcon: tabIcon('📖') }} />
        <Tab.Screen name="Calendario" component={CalendarScreen} options={{ tabBarIcon: tabIcon('📅') }} />
        <Tab.Screen name="Spesa" component={ShoppingScreen} options={{ tabBarIcon: tabIcon('🛒') }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
