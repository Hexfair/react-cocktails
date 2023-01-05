import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { DrinksBlock } from "../../components/DrinksBlock/DrinksBlock";
import { Preloader } from "../../components/Preloader/Preloader";
import { selectorCocktailsByIngredient } from "../../redux/cocktailsByIngredient/cocktailsByIngredient-selectors";
import { loadCocktailsByIngredient } from "../../redux/cocktailsByIngredient/cocktailsByIngredient-slice";
import { useAppDispatch } from "../../redux/store";
import { NotFound } from "../NotFound/NotFound";
//=========================================================================================================================

// Страница с коктейлями по типу ингредиента ==============================================================================
export const CocktailsByIngredient = () => {
	const dispatch = useAppDispatch();
	const params = useParams();
	const { cocktailsList, status } = useSelector(selectorCocktailsByIngredient);

	React.useEffect(() => {
		window.scrollTo(0, 0);
		params.cocktails && dispatch(loadCocktailsByIngredient(params.cocktails));
	}, [dispatch, params.cocktails])

	if (status === 'pending') {
		return <Preloader />
	}

	if (status === 'rejected') {
		return <NotFound />
	}

	return (
		<>
			{params.cocktails && <DrinksBlock drinksList={cocktailsList} name={params.cocktails} label='with' />}
		</>
	)
}
