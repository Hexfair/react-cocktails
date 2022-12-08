import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IngredientItem } from "../../components/IngredientItem/IngredientItem";
import { loadIngredients } from "../../redux/ingredients/ingredients-slice";
import styles from './Ingredients.module.scss';
import { Button } from "../../components/Button/Button";
import { setBurgerStatus } from "../../redux/burgerMenu/burgerMenu";
import { burgerOpenOrClose } from "../../utils/burgerMenuOpen";
//=========================================================================================================================

export const Ingredients = () => {
	const dispatch = useDispatch();
	const ingredientsItems = useSelector(state => state.ingredients.ingredientsList)
	const [value, setValue] = React.useState(25);

	React.useEffect(() => {
		if (ingredientsItems.length === 0) {
			dispatch(loadIngredients())
		}
		dispatch(setBurgerStatus(false));
		burgerOpenOrClose(false);
	}, [dispatch, ingredientsItems])

	const onClickButton = () => {
		setValue(value + 25)
	}

	let ingredients = ingredientsItems.slice(0, value);


	return (
		<div className={styles.content}>
			<h2 className={styles.title}>Cocktail Ingredients</h2>

			<div className={styles.items}>
				{ingredients && ingredients.map((obj, index) => <IngredientItem key={obj.strIngredient1} name={obj.strIngredient1} {...obj} />)}
			</div>

			{value <= ingredients.length ? <Button label='Show more' onClickButton={onClickButton} /> : ''}

		</div>
	)
}