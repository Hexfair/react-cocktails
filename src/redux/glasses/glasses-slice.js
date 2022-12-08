import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//=========================================================================================================================

export const loadGlasses = createAsyncThunk(
	'@@glasses/load-glasses',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getGlasses);
		const drinksWithFilter = res.data.drinks.filter(obj => !obj.strGlass.includes('/'));
		return drinksWithFilter;
	}
)

export const loadGlassesItems = createAsyncThunk(
	'@@glasses/load-glassesItems',
	async (name, { extra: { client, api } }) => {
		const res = await client.get(api.getGlassesItem(name));
		return res.data.drinks
	}
)

const initialState = {
	glassesList: [],
	glassesItems: [],
	status: 'loading'
}

export const glassesSlice = createSlice({
	name: '@@glasses',
	initialState,
	reducers: {
		// setPopularDrinks: (state, action) => {
		// 	state.popularDrinks = action.payload;
		// },
	},
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
			.addCase(loadGlasses.pending, (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(loadGlasses.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload || action.meta.error;
			})
	}
})

//export const { setPopularDrinks } = popularSlice.actions;

export const glassesReducer = glassesSlice.reducer;