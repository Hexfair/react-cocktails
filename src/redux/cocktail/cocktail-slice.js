import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//=========================================================================================================================

export const loadCocktailById = createAsyncThunk(
	'@@cocktail/load-cocktail',
	async (id, { extra: { client, api } }) => {

		const res = await client.get(api.getCocktailById(id));
		return res.data.drinks[0];
	}
)


const initialState = {
	cocktail: null,
}

export const cocktailSlice = createSlice({
	name: '@@cocktail',
	initialState,
	reducers: {
		// setActiveType: (state, action) => {
		// 	state.activeSort = action.payload;
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadCocktailById.fulfilled, (state, action) => {
				state.status = 'success';
				state.cocktail = action.payload;
			})
			.addCase(loadCocktailById.pending, (state, action) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(loadCocktailById.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload || action.meta.error;
			})

	}
})

//export const { setActiveType } = mainSlice.actions;

export const cocktailReducer = cocktailSlice.reducer;