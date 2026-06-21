/** Rotte dello stack di navigazione (usato su iPhone). */
export type RootStackParamList = {
  RecipeList: undefined;
  RecipeDetail: { recipeId: string; title: string };
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
