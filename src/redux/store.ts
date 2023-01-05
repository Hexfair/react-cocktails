import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import * as api from '../api/api';
import { drinksReducer } from './drinks/drinks-slice';
import { cocktailDetailsReducer } from './cocktailDetails/cocktailDetails-slice';
import { ingredientsReducer } from './ingredients/ingredients-slice';
import { categoriesReducer } from './categories/categories-slice';
import { glassesReducer } from './glasses/glasses-slice';
import { burgerReducer } from './burgerMenu/burgerMenu-slice';
import { ingredientDetailsReducer } from './ingredientDetails/ingredientDetails-slice';
import { cocktailsByIngredientReducer } from './cocktailsByIngredient/cocktailsByIngredient-slice';
import { favoritesReducer } from './favorites/favorites-slice';
import { userCocktailsReducer } from './userCocktails/userCocktails-slice';
import { themeReducer } from './theme/theme-slice';
import { useDispatch } from 'react-redux';
//=========================================================================================================================

const store = configureStore({
	reducer: {
		drinks: drinksReducer,
		cocktailDetails: cocktailDetailsReducer,
		ingredients: ingredientsReducer,
		ingredientDetails: ingredientDetailsReducer,
		categories: categoriesReducer,
		glasses: glassesReducer,
		burger: burgerReducer,
		cocktailsByIngredient: cocktailsByIngredientReducer,
		favorites: favoritesReducer,
		userCocktails: userCocktailsReducer,
		theme: themeReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		thunk: {
			extraArgument: {
				client: axios,
				api
			}
		},
		serializableCheck: false,
	})
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;