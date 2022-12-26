import React from "react";
import { useSelector } from "react-redux";
//=========================================================================================================================

/* Хук возвращает состояние true или false в зависимости от того,
добавлен коктейль (по ID) в "избранное" или нет */
export const useFavorites = (id) => {
	const [isFavorite, setIsFavorite] = React.useState(false);
	const favoritesList = useSelector(state => state.favorites.favoritesList)

	React.useEffect(() => {
		const item = favoritesList.find(obj => obj.idDrink === id);
		setIsFavorite(item);
	}, [favoritesList, id]);

	return isFavorite;
}

