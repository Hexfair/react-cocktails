import React from "react";
import { useSelector } from "react-redux";
import { IngredientItem } from "../../components/IngredientItem/IngredientItem";
import { loadIngredients } from "../../redux/ingredients/ingredients-slice";
import styles from './Ingredients.module.scss';
import { setBurgerStatus } from "../../redux/burgerMenu/burgerMenu-slice";
import { burgerOpenOrClose } from "../../utils/burgerMenuOpen";
import { Preloader } from "../../components/Preloader/Preloader";
import { NotFound } from "../NotFound/NotFound";
import { selectorIngredients } from "../../redux/ingredients/ingredients-selectors";
import { useAppDispatch } from "../../redux/store";
//=========================================================================================================================

// Страница с перечнем всех ингредиентов ==================================================================================
export const Ingredients = () => {
	const dispatch = useAppDispatch();
	const { ingredientsList, status } = useSelector(selectorIngredients);
	const [value, setValue] = React.useState(25);

	React.useEffect(() => {
		window.scrollTo(0, 0);
		if (ingredientsList.length === 0) {
			dispatch(loadIngredients())
		}
		dispatch(setBurgerStatus(false));
		burgerOpenOrClose(false);
	}, [dispatch, ingredientsList])

	const onClickShowMore = () => setValue(value + 25)

	if (status === 'pending') {
		return <Preloader />
	}

	if (status === 'rejected') {
		return <NotFound />
	}

	let ingredients = ingredientsList.slice(0, value);

	return (
		<div className={styles.content}>
			<h2 className={styles.title}>Cocktail Ingredients</h2>
			<div className={styles.items}>
				{ingredients && ingredients.map((obj) =>
					<IngredientItem key={obj.strIngredient1} name={obj.strIngredient1} {...obj} />
				)}
			</div>
			{value <= ingredients.length
				? <button className={styles.btn} onClick={onClickShowMore}>Show more</button>
				: null}
		</div>
	)
}