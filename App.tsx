import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecipesProvider, useRecipes } from '@/hooks/useRecipes';
import { PlannerProvider } from '@/hooks/usePlanner';
import { RecipeEditorProvider } from '@/hooks/useRecipeEditor';
import { RootNavigator } from '@/navigation/RootNavigator';
import { ApronLogo } from '@/components/ApronLogo';
import { colors } from '@/theme/theme';

/** Mostra il marchio mentre vengono caricati i dati iniziali (cache/seed). */
function Gate() {
  const { loading } = useRecipes();
  if (loading) {
    return (
      <View style={styles.splash}>
        <ApronLogo size={120} />
        <ActivityIndicator color={colors.primary} style={styles.spinner} />
      </View>
    );
  }
  return <RootNavigator />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <RecipesProvider>
        <PlannerProvider>
          <RecipeEditorProvider>
            <Gate />
          </RecipeEditorProvider>
        </PlannerProvider>
      </RecipesProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  spinner: {
    marginTop: 24,
  },
});
