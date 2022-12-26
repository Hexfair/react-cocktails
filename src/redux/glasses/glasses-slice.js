import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//=========================================================================================================================

// Слайс загрузки любимых коктейлей =======================================================================================
/* Загрузка типов бокалов */
export const loadGlasses = createAsyncThunk(
	'@@glasses/load-glasses',
	async (_, { extra: { client, api } }) => {
		const res = await client.get(api.getGlasses);
		return res.data.drinks;
	}
)

/* Загрузка коктейлей по выбранному типу бокалов */
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
	status: 'pending'
}

export const glassesSlice = createSlice({
	name: '@@glasses',
	initialState,
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
				state.error = null;
			})
			.addMatcher((action) => action.type.endsWith('/rejected'), (state) => {
				state.status = 'rejected';
				state.error = null;
			})
	}
})

export const glassesReducer = glassesSlice.reducer;