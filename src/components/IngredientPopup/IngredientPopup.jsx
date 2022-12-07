import React from 'react';
import styles from './IngredientPopup.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { loadIngredientItem } from "../../redux/ingredients/ingredients-slice";
import { getMediumImageOfIngredient } from '../../api/api';
import { Button } from '../Button/Button';


export const IngredientPopup = ({ name, onClickClosePopup }) => {
	const dispatch = useDispatch();
	const ingredientItem = useSelector(state => state.ingredients.ingredient)

	React.useEffect(() => {
		dispatch(loadIngredientItem(name));
	}, [dispatch, name])

	if (!ingredientItem) {
		return <div>Loading</div>
	}

	return (
		<div className={styles.popup}>
			<div className={styles.content} >
				<div className={styles.ent}>
					<p className={styles.title}>{ingredientItem.strIngredient}</p>
					<div className={styles.image}>
						<img src={getMediumImageOfIngredient(name)} alt='Ingredient' />
						<div className={styles.options}>
							{ingredientItem.strType && <span>{ingredientItem.strType}</span>}
							{ingredientItem.strAlcohol ? <span>Alcoholic</span> : <span>Non Alcoholic</span>}
							{ingredientItem.strAlcoholic && <span>{ingredientItem.strAlcoholic}</span>}
						</div>
					</div>
					<div className={styles.description}>

						{ingredientItem.strDescription
							? <p className={styles.text}>{ingredientItem.strDescription}</p>
							: <p className={styles.text}>Ingredient description missing from database...:(</p>}

					</div>
				</div>
				<div onClick={onClickClosePopup}><Button label='Close' /></div>

			</div>

		</div>
	)
}

