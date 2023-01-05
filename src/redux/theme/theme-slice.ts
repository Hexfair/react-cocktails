import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "../../@types";
//=========================================================================================================================

// Слайс изменения цветовой палитры проекта ===============================================================================

type ThemeSlice = { theme: Theme };

const initialState: ThemeSlice = {
	theme: 'brown',
};

export const themeSlice = createSlice({
	name: '@@ingredients',
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<Theme>) => {
			state.theme = action.payload;
		}
	},
})

export const { setTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;