import { IngredientType, Extra, Status } from './../../@types';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//=========================================================================================================================

// Слайс загрузки детальной информации об ингредиенте =====================================================================
export const loadIngredientDetails = createAsyncThunk
	<IngredientType, string, { extra: Extra }>
	('@@ingredientDetails/load-ingredientItem',
		async (name, { extra: { client, api } }) => {
			const res = await client.get(api.getIngredientItem(name));
			return res.data.ingredients[0] as IngredientType;
		}
	)

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