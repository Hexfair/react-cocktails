import { Extra, StrIngredientType } from './../../@types';
import { createAsyncThunk } from "@reduxjs/toolkit";
//=========================================================================================================================

/* Загрузка перечня ингредиентов */
export const loadIngredients = createAsyncThunk
	<StrIngredientType[], undefined, { extra: Extra }>
	('@@ingredients/load-ingredients',
		async (_, { extra: { client, api } }) => {
			const res = await client.get(api.getIngredients);
			return res.data.drinks as StrIngredientType[];
		}
	)
