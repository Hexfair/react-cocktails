import { createSlice } from "@reduxjs/toolkit";
//=========================================================================================================================

// Слайс открытия/закрытия меню на мобильном устройстве ===================================================================
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