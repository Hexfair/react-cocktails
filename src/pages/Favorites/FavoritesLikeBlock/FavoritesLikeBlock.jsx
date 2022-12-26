import React from "react";
import { useSelector } from "react-redux";
import { DrinksList } from '../../../components/DrinksList/DrinksList'
import { FavoritesEmpty } from "../FavoritesEmpty/FavoritesEmpty";
//=========================================================================================================================

// Страница с любимыми коктейлями (любимыми) ==============================================================================
export const FavoritesLikeBlock = () => {
	/* Любимые коктейли хранятся в редаксе */
	const favoritesList = useSelector(state => state.favorites.favoritesList);

	return (
		<>
			{favoritesList.length > 0
				? <DrinksList drinks={favoritesList} />
				: <FavoritesEmpty />}
		</>
	)
}