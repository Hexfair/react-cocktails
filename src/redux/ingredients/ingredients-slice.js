import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//=========================================================================================================================

export const loadIngredients = createAsyncThunk(
	'@@ingredients/load-ingredients',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getIngredients);
		return res.data.drinks;
	}
)

export const loadIngredientItem = createAsyncThunk(
	'@@ingredients/load-ingredientItem',
	async (name, { extra: { client, api } }) => {
		const res = await client.get(api.getIngredientItem(name));
		return res.data.ingredients[0];
	}
)

const initialState = {
	ingredientsList: [],
	ingredient: null,
	status: 'loading'
}

export const ingredientsSlice = createSlice({
	name: '@@ingredients',
	initialState,
	reducers: {
		clearIngredient: (state) => {
			state.ingredient = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadIngredients.fulfilled, (state, action) => {
				state.status = 'success';
				state.ingredientsList = action.payload;
			})
			.addCase(loadIngredientItem.fulfilled, (state, action) => {
				state.status = 'success';
				state.ingredient = action.payload;
			})
			.addMatcher((action) => action.type.endsWith('/pending'), (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
				state.status = 'rejected';
				state.error = action.payload || action.meta.error;
			})
	}
})

export const { clearIngredient } = ingredientsSlice.actions;

export const ingredientsReducer = ingredientsSlice.reducer;