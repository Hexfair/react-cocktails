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
			.addCase(loadPopDrinks.rejected, (state) => {
				state.status = 'rejected';
			})
			.addCase(loadPopDrinks.pending, (state) => {
				state.status = 'pending';
			})

			.addCase(loadAlcDrinks.fulfilled, (state, action) => {
				state.status = 'success';
				state.alcDrinks = action.payload;
			})
			.addCase(loadAlcDrinks.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(loadAlcDrinks.rejected, (state) => {
				state.status = 'rejected';
			})

			.addCase(loadNonAlcDrinks.fulfilled, (state, action) => {
				state.status = 'success';
				state.nonAlcDrinks = action.payload;
			})
			.addCase(loadNonAlcDrinks.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(loadNonAlcDrinks.rejected, (state) => {
				state.status = 'rejected';
			})

			.addCase(loadOptAlcDrinks.fulfilled, (state, action) => {
				state.status = 'success';
				state.optAlcDrinks = action.payload;
			})
			.addCase(loadOptAlcDrinks.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(loadOptAlcDrinks.rejected, (state) => {
				state.status = 'rejected';
			})
	}
})

export const { setActiveSort } = drinksSlice.actions;

export const drinksReducer = drinksSlice.reducer;