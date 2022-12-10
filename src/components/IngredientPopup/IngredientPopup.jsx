import React from 'react';
import styles from './IngredientPopup.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { loadIngredientDetails } from "../../redux/ingredientDetails/ingredientDetails-slice";
import { getMediumImageOfIngredient } from '../../api/api';
import { Button } from '../Button/Button';
import { Preloader } from '../Preloader/Preloader';
import { clearIngredient } from '../../redux/ingredientDetails/ingredientDetails-slice';


export const IngredientPopup = ({ name, onClickClosePopup }) => {
	const dispatch = useDispatch();
	const { ingredient, status } = useSelector(state => state.ingredientDetails)

	React.useEffect(() => {
		dispatch(loadIngredientDetails(name));
		return () => dispatch(clearIngredient());
	}, [dispatch, name])

	if (!ingredient || status === 'pending') {
		return (
			<div className={styles.preload}><Preloader /></div>

		)
	}

	return (
		<div className={styles.popup}>
			<div className={styles.content} >
				<div className={styles.ent}>
					<p className={styles.title}>{ingredient.strIngredient}</p>
					<div className={styles.image}>
						<img src={getMediumImageOfIngredient(name)} alt='Ingredient' />
						<div className={styles.options}>
							{ingredient.strType && <span>{ingredient.strType}</span>}
							{ingredient.strAlcohol ? <span>Alcoholic</span> : <span>Non Alcoholic</span>}
							{ingredient.strAlcoholic && <span>{ingredient.strAlcoholic}</span>}
						</div>
					</div>
					<div className={styles.description}>

						{ingredient.strDescription
							? <p className={styles.text}>{ingredient.strDescription}</p>
							: <p className={styles.text}>Ingredient description missing from database...:(</p>}

					</div>
				</div>
				<div onClick={onClickClosePopup}><Button label='Close' /></div>

			</div>

		</div>
	)
}

