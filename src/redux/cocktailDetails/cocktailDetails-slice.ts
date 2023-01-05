import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Extra, CocktailDetailsType, Status } from '../../@types/';
//=========================================================================================================================

// Слайс загрузки детальной информации о коктейле =========================================================================
export const loadCocktailById = createAsyncThunk
	<CocktailDetailsType, string, { extra: Extra }>
	('@@cocktailDetails/load-cocktail',
		async (id, { extra: { client, api } }) => {
			const res = await client.get(api.getCocktailById(id));
			return res.data.drinks[0] as CocktailDetailsType;
		}
	)

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