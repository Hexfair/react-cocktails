import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//=========================================================================================================================

// Слайс загрузки детальной информации о коктейле =========================================================================
export const loadCocktailById = createAsyncThunk(
	'@@cocktailDetails/load-cocktail',
	async (id, { extra: { client, api } }) => {
		const res = await client.get(api.getCocktailById(id));
		return res.data.drinks[0];
	}
)

const initialState = {
	item: null,
	status: 'pending'
}

export const cocktailDetailsSlice = createSlice({
	name: '@@cocktailDetails',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(loadCocktailById.fulfilled, (state, action) => {
				state.status = 'success';
				state.item = action.payload;
			})
			.addCase(loadCocktailById.pending, (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(loadCocktailById.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload || action.meta.error;
			})
	}
})

export const cocktailDetailsReducer = cocktailDetailsSlice.reducer;