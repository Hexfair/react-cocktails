import { Extra, Status, CocktailShortType, StrGlassType } from './../../@types';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//=========================================================================================================================

// Слайс загрузки любимых коктейлей =======================================================================================
/* Загрузка типов бокалов */
export const loadGlasses = createAsyncThunk
	<StrGlassType[], undefined, { extra: Extra }>
	('@@glasses/load-glasses',
		async (_, { extra: { client, api } }) => {
			const res = await client.get(api.getGlasses);
			return res.data.drinks as StrGlassType[];
		}
	)

/* Загрузка коктейлей по выбранному типу бокалов */
export const loadGlassesItems = createAsyncThunk
	<CocktailShortType[], string, { extra: Extra }>
	('@@glasses/load-glassesItems',
		async (name, { extra: { client, api } }) => {
			const res = await client.get(api.getGlassesItem(name));
			return res.data.drinks as CocktailShortType[]
		}
	)

type GlassesSlice = {
	glassesList: StrGlassType[],
	glassesItems: CocktailShortType[],
	status: Status,
}

const initialState: GlassesSlice = {
	glassesList: [],
	glassesItems: [],
	status: 'pending'
}

export const glassesSlice = createSlice({
	name: '@@glasses',
	initialState,
	reducers: {},
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
			})
			.addMatcher((action) => action.type.endsWith('/rejected'), (state) => {
				state.status = 'rejected';
			})
	}
})

export const glassesReducer = glassesSlice.reducer;