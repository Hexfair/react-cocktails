import { IngredientType, Extra, Status } from './../../@types';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//=========================================================================================================================

// Слайс загрузки перечня ингредиентов ====================================================================================
export const loadIngredients = createAsyncThunk
	<IngredientType[], undefined, { extra: Extra }>
	('@@ingredients/load-ingredients',
		async (_, { extra: { client, api } }) => {
			const res = await client.get(api.getIngredients);
			return res.data.drinks as IngredientType[];
		}
	)

type IngredientsSlice = {
	ingredientsList: IngredientType[] | [],
	status: Status,
}

const initialState: IngredientsSlice = {
	ingredientsList: [],
	status: 'pending'
}

export const ingredientsSlice = createSlice({
	name: '@@ingredients',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadIngredients.fulfilled, (state, action) => {
				state.status = 'success';
				state.ingredientsList = action.payload;
			})
			.addCase(loadIngredients.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(loadIngredients.rejected, (state, action) => {
				state.status = 'rejected';
			})
	}
})

export const ingredientsReducer = ingredientsSlice.reducer;