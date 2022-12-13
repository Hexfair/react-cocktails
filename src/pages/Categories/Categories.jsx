import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadCategoriesItems } from "../../redux/categories/categories-slice";
import { setBurgerStatus } from "../../redux/burgerMenu/burgerMenu";
import { burgerOpenOrClose } from "../../utils/burgerMenuOpen";
import { Preloader } from "../../components/Preloader/Preloader";
import { DrinksBlock } from "../../components/DrinksBlock/DrinksBlock";
import { useVisibleButton } from "../../utils/use-visibleButton";
import { ButtonScrollTop } from "../../components/ButtonScrollTop/ButtonScrollTop";
//=========================================================================================================================

export const Categories = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const { categoriesItems, status } = useSelector(state => state.categories)

	React.useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(loadCategoriesItems(params.category));
		dispatch(setBurgerStatus(false));
		burgerOpenOrClose(false);
	}, [dispatch, params.category]);

	const visibleBackButton = useVisibleButton();


	if (status === 'pending') {
		return <Preloader />
	}

	return (
		<>
			<DrinksBlock drinksList={categoriesItems} name={params.category} label='Categories' />
			{visibleBackButton && <ButtonScrollTop />}
		</>
	)


}
