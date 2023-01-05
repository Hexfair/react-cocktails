import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { DrinksBlock } from "../../components/DrinksBlock/DrinksBlock";
import { setBurgerStatus } from "../../redux/burgerMenu/burgerMenu-slice";
import { burgerOpenOrClose } from "../../utils/burgerMenuOpen";
import { Preloader } from "../../components/Preloader/Preloader";
import { NotFound } from "../NotFound/NotFound";
import { selectorGlasses } from "../../redux/glasses/glasses-selectors";
import { useAppDispatch } from "../../redux/store";
import { loadGlassesItems } from "../../redux/glasses/glasses-asyncActions";
//=========================================================================================================================

// Страница с коктейлями по типу бокала ===================================================================================
export const Glasses = () => {
	const dispatch = useAppDispatch();
	const params = useParams();
	const { glassesItems, status } = useSelector(selectorGlasses);

	/* Данные подгружаются с сервера. При открытии страницы закрывается бургер-меню  */
	React.useEffect(() => {
		window.scrollTo(0, 0);
		params.glass && dispatch(loadGlassesItems(params.glass));
		dispatch(setBurgerStatus(false));
		burgerOpenOrClose(false);
	}, [dispatch, params.glass])

	if (status === 'pending') {
		return <Preloader />
	}

	if (status === 'rejected') {
		return <NotFound />
	}

	return (
		<>
			{params.glass && <DrinksBlock drinksList={glassesItems} name={params.glass} label='Glasses' />}
		</>
	)
}
