import { Extra, CocktailShortType } from './../../@types';
import { createAsyncThunk } from '@reduxjs/toolkit';
//=========================================================================================================================

/* Загрузка коктейлей на главной странице */
export const loadPopDrinks = createAsyncThunk
	<CocktailShortType[], undefined, { extra: Extra }>
	('@@drinks/load-popularDrinks',
		async (_, { extra: { client, api } }) => {
			const res = await client.get(api.getPopularDrinks);
			return res.data.drinks as CocktailShortType[];
		}
	)

export const loadAlcDrinks = createAsyncThunk
	<CocktailShortType[], undefined, { extra: Extra }>
	('@@drinks/load-alcoholicDrinks',
		async (_, { extra: { client, api } }) => {
			const res = await client.get(api.getAlcoholicDrinks);
			return res.data.drinks;
		}
	)

export const loadNonAlcDrinks = createAsyncThunk
	<CocktailShortType[], undefined, { extra: Extra }>
	('@@drinks/load-nonAlcoholicDrinks',
		async (_, { extra: { client, api } }) => {
			const res = await client.get(api.getNonAlcoholicDrinks);
			return res.data.drinks;
		}
	)

export const loadOptAlcDrinks = createAsyncThunk
	<CocktailShortType[], undefined, { extra: Extra }>
	('@@drinks/load-optionalAlcoholicDrinks',
		async (_, { extra: { client, api } }) => {
			const res = await client.get(api.getOptionalAlcoholicDrinks);
			return res.data.drinks;
		}
	)
