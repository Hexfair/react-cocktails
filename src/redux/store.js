import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import * as api from '../api/api';
import { drinksReducer } from './drinks/drinks-slice';
import { optionsReducer } from './options/options-slice';
import { cocktailDetailsReducer } from './cocktailDetails/cocktailDetails-slice';
import { ingredientsReducer } from './ingredients/ingredients-slice';
//=========================================================================================================================

const store = configureStore({
	reducer: {
		drinks: drinksReducer,
		options: optionsReducer,
		cocktailDetails: cocktailDetailsReducer,
		ingredients: ingredientsReducer,
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