import { RootState } from "../store";
//=========================================================================================================================

export const selectorCategoriesList = (state: RootState) => state.categories.categoriesList;
export const selectorCategories = (state: RootState) => state.categories;