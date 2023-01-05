import { UserCocktailType, Extra } from './../../@types';
import { createAsyncThunk } from "@reduxjs/toolkit";
//=========================================================================================================================

/* Загрузка кастомных коктейлей, добавленных пользователем */
export const loadUserCocktails = createAsyncThunk
	<UserCocktailType[], undefined, { extra: Extra }>
	('@@userCocktails/load-cocktails',
		async (_, { extra: { client, api } }) => {
			const res = await client.get(api.getUserCocktails);
			return res.data as UserCocktailType[]
		}
	)
