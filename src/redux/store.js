import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import * as api from '../api/api';
import { drinksReducer } from './drinks/drinks-slice';
import { cocktailDetailsReducer } from './cocktailDetails/cocktailDetails-slice';
import { ingredientsReducer } from './ingredients/ingredients-slice';
import { categoriesReducer } from './categories/categories-slice';
import { glassesReducer } from './glasses/glasses-slice';
import { burgerReducer } from './burgerMenu/burgerMenu';
import { ingredientDetailsReducer } from './ingredientDetails/ingredientDetails-slice';
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

export default store