import { createSlice } from "@reduxjs/toolkit";
//=========================================================================================================================

const initialState = {
	theme: 'brown',
}

export const themeSlice = createSlice({
	name: '@@ingredients',
	initialState,
	reducers: {
		setTheme: (state, action) => {
			state.theme = action.payload;
		}
	},
})

export const { setTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;