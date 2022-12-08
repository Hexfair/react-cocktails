import React from "react";
import styles from './Categories.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadCategoriesItems } from "../../redux/categories/categories-slice";
import { DrinksBlock } from "../../components/DrinksBlock/DrinksBlock";
import { setBurgerStatus } from "../../redux/burgerMenu/burgerMenu";
import { burgerOpenOrClose } from "../../utils/burgerMenuOpen";
import { Preloader } from "../../components/Preloader/Preloader";
//=========================================================================================================================

export const Categories = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const status = useSelector(state => state.categories.status)


	React.useEffect(() => {
		dispatch(loadCategoriesItems(params.category));
		dispatch(setBurgerStatus(false));
		burgerOpenOrClose(false);
	}, [dispatch, params.category])

	const categoriesItems = useSelector(state => state.categories.categoriesItems);

	const [visibleDrinks, setVisibleDrinks] = React.useState(20);
	const onClickButton = () => {
		setVisibleDrinks(visibleDrinks + 20)
	}

	let categories = categoriesItems.slice(0, visibleDrinks);

	if (status === 'pending') {
		return <Preloader />
	}


	return (
		<div className={styles.content}>
			<h2 className={styles.title}>Cocktail Categories: <span>{params.category}</span></h2>
			<DrinksBlock drinks={categories} onClickButton={onClickButton} visibleDrinks={visibleDrinks} />
		</div>
	)
}
