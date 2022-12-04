import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import * as api from '../api/api';
import { mainReducer } from './main/main-slice';
import { optionsReducer } from './options/options-slice';
//=========================================================================================================================

const store = configureStore({
	reducer: {
		main: mainReducer,
		options: optionsReducer,
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