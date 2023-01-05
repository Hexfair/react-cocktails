import { createAsyncThunk } from '@reduxjs/toolkit';
import { Extra, CocktailDetailsType } from '../../@types/';
//=========================================================================================================================

/* Загрузка детальной информации о коктейле */
export const loadCocktailById = createAsyncThunk
	<CocktailDetailsType, string, { extra: Extra }>
	('@@cocktailDetails/load-cocktail',
		async (id, { extra: { client, api } }) => {
			const res = await client.get(api.getCocktailById(id));
			return res.data.drinks[0] as CocktailDetailsType;
		}
	)