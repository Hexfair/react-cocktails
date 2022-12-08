import React from "react";
import styles from './Glasses.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadGlassesItems } from "../../redux/glasses/glasses-slice";
import { CocktailItem } from "../../components/CocktailItem/CocktailItem";
import { Button } from "../../components/Button/Button";
//=========================================================================================================================

export const Glasses = () => {
	const dispatch = useDispatch();
	const params = useParams();

	React.useEffect(() => {
		dispatch(loadGlassesItems(params.glass));
	}, [dispatch, params.glass])

	const glassesItems = useSelector(state => state.glasses.glassesItems);

	const [value, setValue] = React.useState(25);
	const onClickButton = () => {
		setValue(value + 25)
	}

	let glasses = glassesItems.slice(0, value);

	if (!glassesItems) {
		return (
			<div>Ошибка</div>
		)
	}

	return (
		<div className={styles.content}>
			<h2 className={styles.title}>Cocktail Categories: <span>{params.category}</span></h2>

			<div className={styles.items}>
				{glasses && glasses.map((obj, index) => <CocktailItem key={obj.idDrink} name={obj.strGlasses} id={obj.idDrink} {...obj} />)}
			</div>

			{value <= glasses.length ? <Button label='Show more' onClickButton={onClickButton} /> : ''}

		</div>
	)
}
