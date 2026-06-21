import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { ConnectedRecipeList } from '@/components/ConnectedRecipeList';
import { colors } from '@/theme/theme';

/** Schermata elenco (iPhone): naviga al dettaglio al tocco di una ricetta. */
export function RecipeListScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'RecipeList'>) {
  return (
    <View style={styles.container}>
      <ConnectedRecipeList
        onSelect={(recipe) =>
          navigation.navigate('RecipeDetail', { recipeId: recipe.id, title: recipe.title })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
