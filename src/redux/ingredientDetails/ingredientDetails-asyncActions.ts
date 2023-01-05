import { IngredientType, Extra } from './../../@types';
import { createAsyncThunk } from "@reduxjs/toolkit";
//=========================================================================================================================

/* Загрузка детальной информации об ингредиенте */
export const loadIngredientDetails = createAsyncThunk
	<IngredientType, string, { extra: Extra }>
	('@@ingredientDetails/load-ingredientItem',
		async (name, { extra: { client, api } }) => {
			const res = await client.get(api.getIngredientItem(name));
			return res.data.ingredients[0] as IngredientType;
		}
	)