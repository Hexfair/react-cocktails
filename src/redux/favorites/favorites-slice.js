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
			const findItem = state.favoritesList.find(obj => obj.id === action.payload.id);
			if (!findItem) {
				state.favoritesList.push(action.payload);
			} else {
				state.favoritesList = state.favoritesList.filter(obj => obj.id !== action.payload.id);
			}
		}
	}
})

export const { setFavoritesList } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;