import { CocktailShortType } from './../../@types';
//=========================================================================================================================

/* Получение списка избранных напитков из ЛокалСтор - 
либо список напитков, либо пустой массив */
export function getFavoritesFromLC(): CocktailShortType[] {
	const data = localStorage.getItem('favorites');
	if (data) {
		return JSON.parse(data)
	} else {
		return []
	}
}