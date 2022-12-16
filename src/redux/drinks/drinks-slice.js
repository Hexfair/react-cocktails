import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//=========================================================================================================================

export const loadPopDrinks = createAsyncThunk(
	'@@drinks/load-popularDrinks',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getPopularDrinks);
		return res.data.drinks;
	}
)

export const loadAlcDrinks = createAsyncThunk(
	'@@drinks/load-alcoholicDrinks',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getAlcoholicDrinks);
		return res.data.drinks;
	}
)

export const loadNonAlcDrinks = createAsyncThunk(
	'@@drinks/load-nonAlcoholicDrinks',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getNonAlcoholicDrinks);
		return res.data.drinks;
	}
)

export const loadOptAlcDrinks = createAsyncThunk(
	'@@drinks/load-optionalAlcoholicDrinks',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getOptionalAlcoholicDrinks);
		return res.data.drinks;
	}
)

const initialState = {
	popDrinks: [],
	alcDrinks: [],
	nonAlcDrinks: [],
	optAlcDrinks: [],
	status: '',
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
			.addCase(loadPopDrinks.fulfilled, (state, action) => {
				state.status = 'success';
				state.popDrinks = action.payload;
			})
			.addCase(loadPopDrinks.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload || action.meta.error;
			})
			.addCase(loadPopDrinks.pending, (state) => {
				state.status = 'pending';
				state.error = null;
			})

			.addCase(loadAlcDrinks.fulfilled, (state, action) => {
				state.status = 'success';
				state.alcDrinks = action.payload;
			})
			.addCase(loadAlcDrinks.pending, (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(loadAlcDrinks.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload || action.meta.error;
			})

			.addCase(loadNonAlcDrinks.fulfilled, (state, action) => {
				state.status = 'success';
				state.nonAlcDrinks = action.payload;
			})
			.addCase(loadNonAlcDrinks.pending, (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(loadNonAlcDrinks.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload || action.meta.error;
			})

			.addCase(loadOptAlcDrinks.fulfilled, (state, action) => {
				state.status = 'success';
				state.optAlcDrinks = action.payload;
			})
			.addCase(loadOptAlcDrinks.pending, (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(loadOptAlcDrinks.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload || action.meta.error;
			})
	}
})

export const { setActiveType } = drinksSlice.actions;

export const drinksReducer = drinksSlice.reducer;