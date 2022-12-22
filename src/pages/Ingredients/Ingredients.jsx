import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IngredientItem } from "../../components/IngredientItem/IngredientItem";
import { loadIngredients } from "../../redux/ingredients/ingredients-slice";
import styles from './Ingredients.module.scss';
import { setBurgerStatus } from "../../redux/burgerMenu/burgerMenu-slice";
import { burgerOpenOrClose } from "../../utils/burgerMenuOpen";
import { Preloader } from "../../components/Preloader/Preloader";
import { useVisibleButton } from "../../utils/use-visibleButton";
import { ButtonScrollTop } from "../../UI/ButtonScrollTop/ButtonScrollTop";
import { NotFound } from "../NotFound/NotFound";
//=========================================================================================================================

export const Ingredients = () => {
	const dispatch = useDispatch();
	const { ingredientsList, status } = useSelector(state => state.ingredients);
	const [value, setValue] = React.useState(25);

	React.useEffect(() => {
		window.scrollTo(0, 0);
		if (ingredientsList.length === 0) {
			dispatch(loadIngredients())
		}
		dispatch(setBurgerStatus(false));
		burgerOpenOrClose(false);
	}, [dispatch, ingredientsList])

	const onClickButton = () => setValue(value + 25)

	const visibleBackButton = useVisibleButton();

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
				? <button className={styles.btn} onClick={onClickButton}>Show more</button>
				: null}
			{visibleBackButton && <ButtonScrollTop />}
		</div>
	)
}