import React from "react";
import { useSelector } from "react-redux";
import { DrinksList } from '../../../components/DrinksList/DrinksList'
import { FavoritesEmpty } from "../FavoritesEmpty/FavoritesEmpty";
//=========================================================================================================================

export const FavoritesLikeBlock = () => {
	const favoritesList = useSelector(state => state.favorites.favoritesList);

	return (
		<>
			{favoritesList.length > 0
				? <DrinksList drinks={favoritesList} />
				: <FavoritesEmpty />}
		</>
	)
}