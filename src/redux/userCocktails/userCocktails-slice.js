import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//=========================================================================================================================

export const loadUserCocktails = createAsyncThunk(
	'@@userCocktails/load-cocktails',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getUserCocktails);
		return res.data
	}
)

const initialState = {
	userCocktailsList: [],
	status: ''
}

export const userCocktailsSlice = createSlice({
	name: '@@userCocktails',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadUserCocktails.fulfilled, (state, action) => {
				state.status = 'success';
				state.userCocktailsList = action.payload;
			})
			.addCase(loadUserCocktails.pending, (state, action) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(loadUserCocktails.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = null;
			})
	}
})

export const { setActiveType } = userCocktailsSlice.actions;

export const userCocktailsReducer = userCocktailsSlice.reducer;