import { createSlice } from "@reduxjs/toolkit";
//=========================================================================================================================

const initialState = {
	isBurgerMenuOpen: false,
}

export const burgerSlice = createSlice({
	name: '@@burger',
	initialState,
	reducers: {
		setBurgerStatus: (state, action) => {
			state.isBurgerMenuOpen = action.payload;
		},
	}
});

export const { setBurgerStatus } = burgerSlice.actions;

export const burgerReducer = burgerSlice.reducer;