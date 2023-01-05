import { UserCocktailType, Status } from './../../@types';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadUserCocktails } from './userCocktails-asyncActions';
//=========================================================================================================================

// Слайс загрузки кастомных коктейлей, добавленных пользователем ==========================================================
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