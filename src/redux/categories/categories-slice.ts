import { CocktailShortType, Status, StrCategoryType } from './../../@types';
import { createSlice } from "@reduxjs/toolkit";
import { loadCategories, loadCategoriesItems } from './categories-asyncActions';
//=========================================================================================================================

// Слайс загрузки перечня доступных категорий =============================================================================
type CategoriesSlice = {
	categoriesList: StrCategoryType[],
	categoriesItems: CocktailShortType[],
	status: Status,
}

const initialState: CategoriesSlice = {
	categoriesList: [],
	categoriesItems: [],
	status: 'pending'
}

export const categoriesSlice = createSlice({
	name: '@@options',
	initialState,
	reducers: {},
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
			})
			.addMatcher((action) => action.type.endsWith('/rejected'), (state) => {
				state.status = 'rejected';
			})
	}
})

export const categoriesReducer = categoriesSlice.reducer;