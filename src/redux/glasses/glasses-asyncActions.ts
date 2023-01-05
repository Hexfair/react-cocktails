import { Extra, CocktailShortType, StrGlassType } from './../../@types';
import { createAsyncThunk } from "@reduxjs/toolkit";
//=========================================================================================================================

/* Загрузка типов бокалов */
export const loadGlasses = createAsyncThunk
	<StrGlassType[], undefined, { extra: Extra }>
	('@@glasses/load-glasses',
		async (_, { extra: { client, api } }) => {
			const res = await client.get(api.getGlasses);
			return res.data.drinks as StrGlassType[];
		}
	)

/* Загрузка коктейлей по выбранному типу бокалов */
export const loadGlassesItems = createAsyncThunk
	<CocktailShortType[], string, { extra: Extra }>
	('@@glasses/load-glassesItems',
		async (name, { extra: { client, api } }) => {
			const res = await client.get(api.getGlassesItem(name));
			return res.data.drinks as CocktailShortType[]
		}
	)

