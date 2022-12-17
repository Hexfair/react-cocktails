export const getFavoritesFromLC = () => {
	const data = localStorage.getItem('favorites');
	const favoritesList = JSON.parse(data) || [];
	return favoritesList;
}