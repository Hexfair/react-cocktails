import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//=========================================================================================================================

export const loadCategories = createAsyncThunk(
	'@@categories/load-categories',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getCategories);
		return res.data.drinks;
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
			.addMatcher((action) => action.type.endsWith('/rejected'), (state) => {
				state.status = 'rejected';
				state.error = null;
			})
	}
})

export const categoriesReducer = categoriesSlice.reducer;