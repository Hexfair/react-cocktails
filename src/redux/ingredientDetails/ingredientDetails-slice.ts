import { IngredientType, Status } from './../../@types';
import { createSlice } from "@reduxjs/toolkit";
import { loadIngredientDetails } from './ingredientDetails-asyncActions';
//=========================================================================================================================

// Слайс загрузки детальной информации об ингредиенте =====================================================================
type IngredientDetailsSlice = {
	ingredient: IngredientType | null,
	status: Status,
}

const initialState: IngredientDetailsSlice = {
	ingredient: null,
	status: 'pending'
}

export const ingredientDetailsSlice = createSlice({
	name: '@@ingredientDetails',
	initialState,
	reducers: {
		clearIngredient: (state) => {
			state.ingredient = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadIngredientDetails.fulfilled, (state, action) => {
				state.status = 'success';
				state.ingredient = action.payload;
			})
			.addCase(loadIngredientDetails.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(loadIngredientDetails.rejected, (state, action) => {
				state.status = 'rejected';
			})
	}
})

export const { clearIngredient } = ingredientDetailsSlice.actions;

export const ingredientDetailsReducer = ingredientDetailsSlice.reducer;