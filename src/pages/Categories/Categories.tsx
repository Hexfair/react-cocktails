import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { setBurgerStatus } from "../../redux/burgerMenu/burgerMenu-slice";
import { burgerOpenOrClose } from "../../utils/burgerMenuOpen";
import { Preloader } from "../../components/Preloader/Preloader";
import { DrinksBlock } from "../../components/DrinksBlock/DrinksBlock";
import { NotFound } from "../NotFound/NotFound";
import { useAppDispatch } from "../../redux/store";
import { selectorCategories } from "../../redux/categories/categories-selectors";
import { loadCategoriesItems } from "../../redux/categories/categories-asyncActions";
//=========================================================================================================================

// Страница с коктейлями по типу категории ================================================================================
export const Categories = () => {
	const dispatch = useAppDispatch();
	const params = useParams();
	const { categoriesItems, status } = useSelector(selectorCategories)

	/* Данные подгружаются с сервера. При открытии страницы закрывается бургер-меню  */
	React.useEffect(() => {
		window.scrollTo(0, 0);
		params.category && dispatch(loadCategoriesItems(params.category));
		dispatch(setBurgerStatus(false));
		burgerOpenOrClose(false);
	}, [dispatch, params.category]);


	if (status === 'pending') {
		return <Preloader />
	}

	if (status === 'rejected') {
		return <NotFound />
	}

	return (
		<>
			<DrinksBlock drinksList={categoriesItems} name={params.category ? params.category : ''} label='Categories' />
		</>
	)
}
