import { PayloadAction } from '@reduxjs/toolkit';
import { Status, CocktailShortType } from './../../@types';
import { createSlice } from '@reduxjs/toolkit';
import { loadAlcDrinks, loadNonAlcDrinks, loadOptAlcDrinks, loadPopDrinks } from './drinks-asyncActions';
//=========================================================================================================================

// Слайс загрузки коктейлей на главной странице ===========================================================================
type DrinksSlice = {
	popDrinks: CocktailShortType[] | [],
	alcDrinks: CocktailShortType[] | [],
	nonAlcDrinks: CocktailShortType[] | [],
	optAlcDrinks: CocktailShortType[] | [],
	status: Status,
	activeSort: number,
}

const initialState: DrinksSlice = {
	popDrinks: [],
	alcDrinks: [],
	nonAlcDrinks: [],
	optAlcDrinks: [],
	status: 'pending',
	activeSort: 0,
}

export const drinksSlice = createSlice({
	name: '@@drinks',
	initialState,
	reducers: {
		setActiveSort: (state, action: PayloadAction<number>) => {
			state.activeSort = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadPopDrinks.fulfilled, (state, action) => {
				state.status = 'success';
				state.popDrinks = action.payload;
			})
			.addCase(loadAlcDrinks.fulfilled, (state, action) => {
				state.status = 'success';
				state.alcDrinks = action.payload;
			})
			.addCase(loadNonAlcDrinks.fulfilled, (state, action) => {
				state.status = 'success';
				state.nonAlcDrinks = action.payload;
			})
			.addCase(loadOptAlcDrinks.fulfilled, (state, action) => {
				state.status = 'success';
				state.optAlcDrinks = action.payload;
			})
			.addMatcher((action) => action.type.endsWith('Drinks/pending'), (state) => {
				state.status = 'pending';
			})
			.addMatcher((action) => action.type.endsWith('Drinks/rejected'), (state) => {
				state.status = 'rejected';
			})
	}
})

export const { setActiveSort } = drinksSlice.actions;

export const drinksReducer = drinksSlice.reducer;