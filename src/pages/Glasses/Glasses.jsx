import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadGlassesItems } from "../../redux/glasses/glasses-slice";
import { DrinksBlock } from "../../components/DrinksBlock/DrinksBlock";
import { setBurgerStatus } from "../../redux/burgerMenu/burgerMenu-slice";
import { burgerOpenOrClose } from "../../utils/burgerMenuOpen";
import { Preloader } from "../../components/Preloader/Preloader";
import { NotFound } from "../NotFound/NotFound";
//=========================================================================================================================

// Страница с коктейлями по типу бокала ===================================================================================
export const Glasses = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const { glassesItems, status } = useSelector(state => state.glasses);

	/* Данные подгружаются с сервера. При открытии страницы закрывается бургер-меню  */
	React.useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(loadGlassesItems(params.glass));
		dispatch(setBurgerStatus(false));
		burgerOpenOrClose(false);
	}, [dispatch, params.glass])

	if (status === 'pending') {
		return <Preloader />
	}

	if (status === 'rejected') {
		return <NotFound />
	}

	return <DrinksBlock drinksList={glassesItems} name={params.glass} label='Glasses' />
}
