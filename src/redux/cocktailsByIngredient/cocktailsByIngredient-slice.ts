import { Status, CocktailShortType } from './../../@types';
import { createSlice } from "@reduxjs/toolkit";
import { loadCocktailsByIngredient } from './cocktailsByIngredient-asyncActions';
//=========================================================================================================================

// Слайс загрузки коктейлей по указанному ингредиенту =====================================================================
type CocktailsByIngredientSlice = {
	cocktailsList: CocktailShortType[] | [],
	status: Status
}
const initialState: CocktailsByIngredientSlice = {
	cocktailsList: [],
	status: 'pending'
}

export const cocktailsByIngredientSlice = createSlice({
	name: '@@cocktailsByIngredient',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadCocktailsByIngredient.fulfilled, (state, action) => {
				state.status = 'success';
				state.cocktailsList = action.payload;
			})
			.addCase(loadCocktailsByIngredient.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(loadCocktailsByIngredient.rejected, (state, action) => {
				state.status = 'rejected';
			})
	}
})

export const cocktailsByIngredientReducer = cocktailsByIngredientSlice.reducer;