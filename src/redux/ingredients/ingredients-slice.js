import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//=========================================================================================================================

export const loadIngredients = createAsyncThunk(
	'@@ingredients/load-ingredients',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getIngredients);
		return res.data.drinks
	}
)

const initialState = {
	ingredientsList: [],
	status: 'loading'
}

export const ingredientsSlice = createSlice({
	name: '@@ingredients',
	initialState,
	reducers: {
		// setPopularDrinks: (state, action) => {
		// 	state.popularDrinks = action.payload;
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadIngredients.fulfilled, (state, action) => {
				state.status = 'success';
				state.ingredientsList = action.payload;
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

//export const { setPopularDrinks } = popularSlice.actions;

export const ingredientsReducer = ingredientsSlice.reducer;