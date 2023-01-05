import { Extra, CocktailShortType, Status, StrCategoryType } from './../../@types';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//=========================================================================================================================

// Слайс загрузки перечня доступных категорий =============================================================================
/* Загрузка категорий */
export const loadCategories = createAsyncThunk
	<StrCategoryType[], undefined, { extra: Extra, }>
	('@@categories/load-categories',
		async (_, { extra: { client, api } }) => {
			const { data } = await client.get(api.getCategories);
			return data.drinks as StrCategoryType[]
		}
	)

/* Загрузка коктейлей по выбранной категории */
export const loadCategoriesItems = createAsyncThunk
	<CocktailShortType[], string, { extra: Extra, }>
	('@@categories/load-categoriesItems',
		async (name, { extra: { client, api } }) => {
			const res = await client.get(api.getCategoriesItem(name));
			return res.data.drinks as CocktailShortType[]
		}
	)

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