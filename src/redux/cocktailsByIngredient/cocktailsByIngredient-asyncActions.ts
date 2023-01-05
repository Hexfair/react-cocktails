import { Extra, CocktailShortType } from './../../@types';
import { createAsyncThunk } from "@reduxjs/toolkit";
//=========================================================================================================================

/* Загрузка коктейлей по указанному ингредиенту */
export const loadCocktailsByIngredient = createAsyncThunk
	<CocktailShortType[], string, { extra: Extra }>
	('@@cocktailsByIngredient',
		async (name, { extra: { client, api } }) => {
			const res = await client.get(api.getCocktailsByIngredient(name));
			return res.data.drinks as CocktailShortType[]
		}
	)
