import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//=========================================================================================================================


// Слайс открытия/закрытия меню на мобильном устройстве ===================================================================
type BurgerSlice = { isBurgerMenuOpen: Boolean };

const initialState: BurgerSlice = {
	isBurgerMenuOpen: false,
}

export const burgerSlice = createSlice({
	name: '@@burger',
	initialState,
	reducers: {
		setBurgerStatus: (state, action: PayloadAction<boolean>) => {
			state.isBurgerMenuOpen = action.payload;
		},
	}
});

export const { setBurgerStatus } = burgerSlice.actions;

export const burgerReducer = burgerSlice.reducer;