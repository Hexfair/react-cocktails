import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//=========================================================================================================================

export const loadPopularDrinks = createAsyncThunk(
	'@@drinks/load-popularDrinks',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getPopularDrinks);
		return res.data.drinks;
	}
)

export const loadAlcoholicDrinks = createAsyncThunk(
	'@@drinks/load-alcoholicDrinks',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getAlcoholicDrinks);
		return res.data.drinks;
	}
)

export const loadNonAlcoholicDrinks = createAsyncThunk(
	'@@drinks/load-nonAlcoholicDrinks',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getNonAlcoholicDrinks);
		return res.data.drinks;
	}
)

export const loadOptionalAlcoholicDrinks = createAsyncThunk(
	'@@drinks/load-optionalAlcoholicDrinks',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getOptionalAlcoholicDrinks);
		return res.data.drinks;
	}
)


const initialState = {
	popularDrinks: [],
	alcoholicDrinks: [],
	nonAlcoholicDrinks: [],
	optionalAlcoholicDrinks: [],
	status: 'pending',
	activeSort: 0,
}

export const drinksSlice = createSlice({
	name: '@@drinks',
	initialState,
	reducers: {
		setActiveType: (state, action) => {
			state.activeSort = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadPopularDrinks.fulfilled, (state, action) => {
				state.status = 'success';
				state.popularDrinks = action.payload;
			})
			.addCase(loadAlcoholicDrinks.fulfilled, (state, action) => {
				state.status = 'success';
				state.alcoholicDrinks = action.payload;
			})
			.addCase(loadNonAlcoholicDrinks.fulfilled, (state, action) => {
				state.status = 'success';
				state.nonAlcoholicDrinks = action.payload;
			})
			.addCase(loadOptionalAlcoholicDrinks.fulfilled, (state, action) => {
				state.status = 'success';
				state.optionalAlcoholicDrinks = action.payload;
			})
			.addMatcher((action) => action.type.endsWith('/pending'), (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addMatcher((action) => action.type.endsWith('/rejected'), (state) => {
				state.status = 'rejected';
				state.error = null;
			})
	}
})

export const { setActiveType } = drinksSlice.actions;

export const drinksReducer = drinksSlice.reducer;