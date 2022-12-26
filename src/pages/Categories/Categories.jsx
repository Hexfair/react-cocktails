import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadCategoriesItems } from "../../redux/categories/categories-slice";
import { setBurgerStatus } from "../../redux/burgerMenu/burgerMenu-slice";
import { burgerOpenOrClose } from "../../utils/burgerMenuOpen";
import { Preloader } from "../../components/Preloader/Preloader";
import { DrinksBlock } from "../../components/DrinksBlock/DrinksBlock";
import { NotFound } from "../NotFound/NotFound";
//=========================================================================================================================

// Страница с коктейлями по типу категории ================================================================================
export const Categories = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const { categoriesItems, status } = useSelector(state => state.categories)

	/* Данные подгружаются с сервера. При открытии страницы закрывается бургер-меню  */
	React.useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(loadCategoriesItems(params.category));
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
			<DrinksBlock drinksList={categoriesItems} name={params.category} label='Categories' />
			{/* {visibleTopButton && <ButtonScrollTop />} */}
		</>
	)
}
