import { useSelector } from "react-redux";
import { DrinksList } from '../../../components/DrinksList/DrinksList'
import { selectorFavoritesList } from "../../../redux/favorites/favorites-selectors";
import { FavoritesEmpty } from "../FavoritesEmpty/FavoritesEmpty";
//=========================================================================================================================

// Страница с любимыми коктейлями (любимыми) ==============================================================================
export const FavoritesLikeBlock = () => {
	/* Любимые коктейли хранятся в редаксе */
	const favoritesList = useSelector(selectorFavoritesList);

	return (
		<>
			{favoritesList.length > 0
				? <DrinksList drinks={favoritesList} />
				: <FavoritesEmpty />}
		</>
	)
}