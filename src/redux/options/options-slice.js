import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//=========================================================================================================================

export const loadIngredients = createAsyncThunk(
	'@@options/load-ingredients',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getIngredients);
		return res.data.drinks
	}
)

export const loadCategories = createAsyncThunk(
	'@@options/load-categories',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getCategories);
		return res.data.drinks
	}
)

export const loadGlasses = createAsyncThunk(
	'@@options/load-glasses',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getGlasses);
		return res.data.drinks
	}
)

const initialState = {
	ingredientsList: [],
	categoriesList: [],
	glassesList: [],
	status: 'loading'
}

export const optionsSlice = createSlice({
	name: '@@options',
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
			.addCase(loadCategories.fulfilled, (state, action) => {
				state.status = 'success';
				state.categoriesList = action.payload;
			})
			.addCase(loadGlasses.fulfilled, (state, action) => {
				state.status = 'success';
				state.glassesList = action.payload;
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

export const optionsReducer = optionsSlice.reducer;