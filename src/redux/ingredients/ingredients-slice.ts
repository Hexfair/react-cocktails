import { Status, StrIngredientType } from './../../@types';
import { createSlice } from "@reduxjs/toolkit";
import { loadIngredients } from './ingredients-asyncActions';
//=========================================================================================================================

// Слайс загрузки перечня ингредиентов ====================================================================================
type IngredientsSlice = {
	ingredientsList: StrIngredientType[],
	status: Status,
}

const initialState: IngredientsSlice = {
	ingredientsList: [],
	status: 'pending'
}

export const ingredientsSlice = createSlice({
	name: '@@ingredients',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadIngredients.fulfilled, (state, action) => {
				state.status = 'success';
				state.ingredientsList = action.payload;
			})
			.addCase(loadIngredients.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(loadIngredients.rejected, (state, action) => {
				state.status = 'rejected';
			})
	}
})

export const ingredientsReducer = ingredientsSlice.reducer;