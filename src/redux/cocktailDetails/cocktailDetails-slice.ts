import { createSlice } from '@reduxjs/toolkit';
import { CocktailDetailsType, Status } from '../../@types/';
import { loadCocktailById } from './cocktailDetails-asyncActions';
//=========================================================================================================================

// Слайс загрузки детальной информации о коктейле =========================================================================
type CocktailDetailsSlice = {
	item: CocktailDetailsType | null,
	status: Status
}

const initialState: CocktailDetailsSlice = {
	item: null,
	status: 'pending'
}

export const cocktailDetailsSlice = createSlice({
	name: '@@cocktailDetails',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadCocktailById.fulfilled, (state, action) => {
				state.status = 'success';
				state.item = action.payload;
			})
			.addCase(loadCocktailById.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(loadCocktailById.rejected, (state) => {
				state.status = 'rejected';
			})
	}
})

export const cocktailDetailsReducer = cocktailDetailsSlice.reducer;