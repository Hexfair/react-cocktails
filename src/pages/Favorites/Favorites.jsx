import React from "react";
import { useSelector } from "react-redux";
import { DrinksBlock } from "../../components/DrinksBlock/DrinksBlock";
//=========================================================================================================================

export const Favorites = () => {
	const favoritesList = useSelector(state => state.favorites.favoritesList)

	return (
		<>
			<DrinksBlock drinksList={favoritesList} name='Favorites' label='' />
		</>
	)


}
