import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//=========================================================================================================================

export const loadCategories = createAsyncThunk(
	'@@categories/load-categories',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getCategories);
		const drinksWithFilter = res.data.drinks.filter(obj => !obj.strCategory.includes('/'));
		return drinksWithFilter;
	}
)

export const loadCategoriesItems = createAsyncThunk(
	'@@categories/load-categoriesItems',
	async (name, { extra: { client, api } }) => {
		const res = await client.get(api.getCategoriesItem(name));
		return res.data.drinks
	}
)

const initialState = {
	categoriesList: [],
	categoriesItems: [],
	status: 'loading'
}

export const categoriesSlice = createSlice({
	name: '@@options',
	initialState,
	reducers: {
		// setPopularDrinks: (state, action) => {
		// 	state.popularDrinks = action.payload;
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadCategories.fulfilled, (state, action) => {
				state.status = 'success';
				state.categoriesList = action.payload;
			})
			.addCase(loadCategoriesItems.fulfilled, (state, action) => {
				state.status = 'success';
				state.categoriesItems = action.payload;
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

export const categoriesReducer = categoriesSlice.reducer;