/* Получение списка избранных напитков из ЛокалСтор - 
либо список напитков, либо пустой массив */
export const getFavoritesFromLC = () => {
	const data = localStorage.getItem('favorites');
	const favoritesList = JSON.parse(data) || [];
	return favoritesList;
}