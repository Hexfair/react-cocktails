import { createSlice } from "@reduxjs/toolkit";
import { getFavoritesFromLC } from "./favorites-localStorage";
//=========================================================================================================================

const favoritesList = getFavoritesFromLC();

const initialState = {
	favoritesList,
}

export const favoritesSlice = createSlice({
	name: '@@favorites',
	initialState,
	reducers: {
		setFavoritesList: (state, action) => {
			const findItem = state.favoritesList.find(obj => obj.idDrink === action.payload.idDrink);
			if (!findItem) {
				state.favoritesList.push(action.payload);
			} else {
				state.favoritesList = state.favoritesList.filter(obj => obj.idDrink !== action.payload.idDrink);
			}
		}
	}
})

export const { setFavoritesList } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;