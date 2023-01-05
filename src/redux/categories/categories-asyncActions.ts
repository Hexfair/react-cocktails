import { Extra, CocktailShortType, StrCategoryType } from './../../@types';
import { createAsyncThunk } from "@reduxjs/toolkit";
//=========================================================================================================================

/* Загрузка категорий */
export const loadCategories = createAsyncThunk
	<StrCategoryType[], undefined, { extra: Extra, }>
	('@@categories/load-categories',
		async (_, { extra: { client, api } }) => {
			const { data } = await client.get(api.getCategories);
			return data.drinks as StrCategoryType[]
		}
	)

/* Загрузка коктейлей по выбранной категории */
export const loadCategoriesItems = createAsyncThunk
	<CocktailShortType[], string, { extra: Extra, }>
	('@@categories/load-categoriesItems',
		async (name, { extra: { client, api } }) => {
			const res = await client.get(api.getCategoriesItem(name));
			return res.data.drinks as CocktailShortType[]
		}
	)