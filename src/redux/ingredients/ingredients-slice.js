import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//=========================================================================================================================

// Слайс загрузки перечня ингредиентов ====================================================================================
export const loadIngredients = createAsyncThunk(
	'@@ingredients/load-ingredients',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getIngredients);
		return res.data.drinks;
	}
)

const initialState = {
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
				state.error = null;
			})
			.addCase(loadIngredients.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload || action.meta.error;
			})
	}
})

export const ingredientsReducer = ingredientsSlice.reducer;