import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { DrinksBlock } from "../../components/DrinksBlock/DrinksBlock";
import { Preloader } from "../../components/Preloader/Preloader";
import { loadCocktailsByIngredient } from "../../redux/cocktailsByIngredient/cocktailsByIngredient-slice";
import { NotFound } from "../NotFound/NotFound";
//=========================================================================================================================

// Страница с коктейлями по типу ингредиента ==============================================================================
export const CocktailsByIngredient = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const { cocktailsList, status } = useSelector(state => state.cocktailsByIngredient);

	React.useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(loadCocktailsByIngredient(params.cocktails));
	}, [dispatch, params.cocktails])

	if (status === 'pending') {
		return <Preloader />
	}

	if (status === 'rejected') {
		return <NotFound />
	}

	return <DrinksBlock drinksList={cocktailsList} name={params.cocktails} label='with' />
}
