import { UserCocktailType, Extra, Status } from './../../@types';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
//=========================================================================================================================

// Слайс загрузки кастомных коктейлей, добавленных пользователем ==========================================================
export const loadUserCocktails = createAsyncThunk
	<UserCocktailType[], undefined, { extra: Extra }>
	('@@userCocktails/load-cocktails',
		async (_, { extra: { client, api } }) => {
			const res = await client.get(api.getUserCocktails);
			return res.data as UserCocktailType[]
		}
	)

type UserCocktailsSlice = {
	userCocktailsList: UserCocktailType[] | [],
	status: Status,
}

const initialState: UserCocktailsSlice = {
	userCocktailsList: [],
	status: 'pending',
}

export const userCocktailsSlice = createSlice({
	name: '@@userCocktails',
	initialState,
	reducers: {
		deleteUserCocktail: (state, action: PayloadAction<string>) => {
			state.userCocktailsList = state.userCocktailsList.filter((obj) => obj.idDrink !== action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadUserCocktails.fulfilled, (state, action) => {
				state.status = 'success';
				state.userCocktailsList = action.payload;
			})
			.addCase(loadUserCocktails.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(loadUserCocktails.rejected, (state) => {
				state.status = 'rejected';
			})
	}
})

export const { deleteUserCocktail } = userCocktailsSlice.actions;

export const userCocktailsReducer = userCocktailsSlice.reducer;