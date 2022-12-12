import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//=========================================================================================================================

export const loadCocktailsByIngredient = createAsyncThunk(
	'@@cocktailsByIngredient',
	async (name, { extra: { client, api } }) => {
		const res = await client.get(api.getCocktailsByIngredient(name));
		return res.data.drinks
	}
)

const initialState = {
	cocktailsList: [],
	status: 'pending'
}

export const cocktailsByIngredientSlice = createSlice({
	name: '@@cocktailsByIngredient',
	initialState,
	reducers: {
		// setPopularDrinks: (state, action) => {
		// 	state.popularDrinks = action.payload;
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadCocktailsByIngredient.fulfilled, (state, action) => {
				state.status = 'success';
				state.cocktailsList = action.payload;
			})
			.addCase(loadCocktailsByIngredient.pending, (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(loadCocktailsByIngredient.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload || action.meta.error;
			})

	}
})

//export const { setPopularDrinks } = popularSlice.actions;

export const cocktailsByIngredientReducer = cocktailsByIngredientSlice.reducer;