import React from "react";
import { useSelector } from "react-redux";
import { selectorFavoritesList } from "../redux/favorites/favorites-selectors";
//=========================================================================================================================

/* Хук возвращает состояние true или false в зависимости от того,
добавлен коктейль (по ID) в "избранное" или нет */
export const useFavorites = (id: string): boolean => {
	const [isFavorite, setIsFavorite] = React.useState(false);
	const favoritesList = useSelector(selectorFavoritesList)

	React.useEffect(() => {
		const item = favoritesList.find(obj => obj.idDrink === id);
		item ? setIsFavorite(true) : setIsFavorite(false);
	}, [favoritesList, id]);

	return isFavorite;
}

