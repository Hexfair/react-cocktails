import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import * as api from '../api/api';
import { drinksReducer } from './drinks/drinks-slice';
import { cocktailDetailsReducer } from './cocktailDetails/cocktailDetails-slice';
import { ingredientsReducer } from './ingredients/ingredients-slice';
import { categoriesReducer } from './categories/categories-slice';
import { glassesReducer } from './glasses/glasses-slice';
import { burgerReducer } from './burgerMenu/burgerMenu';
//=========================================================================================================================

const store = configureStore({
	reducer: {
		drinks: drinksReducer,
		cocktailDetails: cocktailDetailsReducer,
		ingredients: ingredientsReducer,
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