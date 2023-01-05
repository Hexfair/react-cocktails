import { RootState } from "../store";
//=========================================================================================================================

export const selectorIngredientsList = (state: RootState) => state.ingredients.ingredientsList;
export const selectorIngredients = (state: RootState) => state.ingredients;