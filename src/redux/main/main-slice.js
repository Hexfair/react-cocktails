import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//=========================================================================================================================

export const loadPopularDrinks = createAsyncThunk(
	'@@main/load-popularDrinks',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getPopularDrinks);
		return res.data.drinks;
	}
)

export const loadAlcoholicDrinks = createAsyncThunk(
	'@@main/load-alcoholicDrinks',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getAlcoholicDrinks);
		return res.data.drinks;
	}
)

export const loadNonAlcoholicDrinks = createAsyncThunk(
	'@@main/load-nonAlcoholicDrinks',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getNonAlcoholicDrinks);
		return res.data.drinks;
	}
)

export const loadOptionalAlcoholicDrinks = createAsyncThunk(
	'@@main/load-optionalAlcoholicDrinks',
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
	status: 'loading',
	activeSort: 0,
}

export const mainSlice = createSlice({
	name: '@@main',
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
			.addCase(loadPopularDrinks.pending, (state, action) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(loadPopularDrinks.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload || action.meta.error;
			})

	}
})

export const { setActiveType } = mainSlice.actions;

export const mainReducer = mainSlice.reducer;