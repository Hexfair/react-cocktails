import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//=========================================================================================================================

export const loadIngredientDetails = createAsyncThunk(
	'@@ingredientDetails/load-ingredientItem',
	async (name, { extra: { client, api } }) => {
		const res = await client.get(api.getIngredientItem(name));
		return res.data.ingredients[0];
	}
)

const initialState = {
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
				state.error = null;
			})
			.addCase(loadIngredientDetails.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload || action.meta.error;
			})
	}
})

export const { clearIngredient } = ingredientDetailsSlice.actions;

export const ingredientDetailsReducer = ingredientDetailsSlice.reducer;