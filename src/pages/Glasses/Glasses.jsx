import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadGlassesItems } from "../../redux/glasses/glasses-slice";
import { DrinksBlock } from "../../components/DrinksBlock/DrinksBlock";
import { setBurgerStatus } from "../../redux/burgerMenu/burgerMenu";
import { burgerOpenOrClose } from "../../utils/burgerMenuOpen";
import { Preloader } from "../../components/Preloader/Preloader";
import { useVisibleButton } from "../../utils/use-visibleButton";
import { ButtonScrollTop } from "../../components/ButtonScrollTop/ButtonScrollTop";
import { NotFound } from "../NotFound/NotFound";
//=========================================================================================================================

export const Glasses = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const { glassesItems, status } = useSelector(state => state.glasses);

	React.useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(loadGlassesItems(params.glass));
		dispatch(setBurgerStatus(false));
		burgerOpenOrClose(false);
	}, [dispatch, params.glass])

	const visibleBackButton = useVisibleButton();

	if (status === 'pending') {
		return <Preloader />
	}

	if (status === 'rejected') {
		return <NotFound />
	}

	return (
		<>
			<DrinksBlock drinksList={glassesItems} name={params.glass} label='Glasses' />
			{visibleBackButton && <ButtonScrollTop />}
		</>
	)

}
