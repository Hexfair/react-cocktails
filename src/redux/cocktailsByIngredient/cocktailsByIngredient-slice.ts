import { Extra, Status, CocktailShortType } from './../../@types';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//=========================================================================================================================

// Слайс загрузки коктейлей по указанному ингредиенту =====================================================================
export const loadCocktailsByIngredient = createAsyncThunk
	<CocktailShortType[], string, { extra: Extra }>
	('@@cocktailsByIngredient',
		async (name, { extra: { client, api } }) => {
			const res = await client.get(api.getCocktailsByIngredient(name));
			return res.data.drinks as CocktailShortType[]
		}
	)

type CocktailsByIngredientSlice = {
	cocktailsList: CocktailShortType[] | [],
	status: Status
}
const initialState: CocktailsByIngredientSlice = {
	cocktailsList: [],
	status: 'pending'
}

export const cocktailsByIngredientSlice = createSlice({
	name: '@@cocktailsByIngredient',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadCocktailsByIngredient.fulfilled, (state, action) => {
				state.status = 'success';
				state.cocktailsList = action.payload;
			})
			.addCase(loadCocktailsByIngredient.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(loadCocktailsByIngredient.rejected, (state, action) => {
				state.status = 'rejected';
			})
	}
})

export const cocktailsByIngredientReducer = cocktailsByIngredientSlice.reducer;