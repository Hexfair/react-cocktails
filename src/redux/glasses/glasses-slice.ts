import { Status, CocktailShortType, StrGlassType } from './../../@types';
import { createSlice } from "@reduxjs/toolkit";
import { loadGlasses, loadGlassesItems } from './glasses-asyncActions';
//=========================================================================================================================

// Слайс загрузки любимых коктейлей =======================================================================================
type GlassesSlice = {
	glassesList: StrGlassType[],
	glassesItems: CocktailShortType[],
	status: Status,
}

const initialState: GlassesSlice = {
	glassesList: [],
	glassesItems: [],
	status: 'pending'
}

export const glassesSlice = createSlice({
	name: '@@glasses',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadGlasses.fulfilled, (state, action) => {
				state.status = 'success';
				state.glassesList = action.payload;
			})
			.addCase(loadGlassesItems.fulfilled, (state, action) => {
				state.status = 'success';
				state.glassesItems = action.payload;
			})
			.addMatcher((action) => action.type.endsWith('/pending'), (state) => {
				state.status = 'pending';
			})
			.addMatcher((action) => action.type.endsWith('/rejected'), (state) => {
				state.status = 'rejected';
			})
	}
})

export const glassesReducer = glassesSlice.reducer;