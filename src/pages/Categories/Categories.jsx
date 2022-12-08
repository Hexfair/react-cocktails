import React from "react";
import styles from './Categories.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadCategoriesItems } from "../../redux/categories/categories-slice";
import { CocktailItem } from "../../components/CocktailItem/CocktailItem";
import { Button } from "../../components/Button/Button";
//=========================================================================================================================

export const Categories = () => {
	const dispatch = useDispatch();
	const params = useParams();

	React.useEffect(() => {
		dispatch(loadCategoriesItems(params.category));
	}, [dispatch, params.category])

	const categoriesItems = useSelector(state => state.categories.categoriesItems);

	const [value, setValue] = React.useState(25);
	const onClickButton = () => {
		setValue(value + 25)
	}

	let categories = categoriesItems.slice(0, value);

	if (!categoriesItems) {
		return (
			<div>Ошибка</div>
		)
	}

	return (
		<div className={styles.content}>
			<h2 className={styles.title}>Cocktail Categories: <span>{params.category}</span></h2>

			<div className={styles.items}>
				{categories && categories.map((obj, index) => <CocktailItem key={obj.strCategory} name={obj.strCategory} id={obj.idDrink} {...obj} />)}
			</div>

			{value <= categories.length ? <Button label='Show more' onClickButton={onClickButton} /> : ''}

		</div>
	)
}
