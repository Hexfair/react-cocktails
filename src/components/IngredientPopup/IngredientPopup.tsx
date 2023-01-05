import React from 'react';
import styles from './IngredientPopup.module.scss';
import { useSelector } from "react-redux";
import { loadIngredientDetails } from "../../redux/ingredientDetails/ingredientDetails-slice";
import { getMediumImageOfIngredient } from '../../api/api';
import { Preloader } from '../Preloader/Preloader';
import { Link } from 'react-router-dom';
import { NotFound } from '../../pages/NotFound/NotFound';
import { useAppDispatch } from '../../redux/store';
import { selectorIngredientDetails } from '../../redux/ingredientDetails/ingredientDetails-selectors';
//=========================================================================================================================

// Компонент с детальной инф-цией об ингредиенете - в отдельном попапе ====================================================
type IngredientPopupProps = {
	name: string,
	onClickClosePopup: () => void,
}

export const IngredientPopup = ({ name, onClickClosePopup }: IngredientPopupProps) => {
	const dispatch = useAppDispatch();

	/* Инф-ция об ингредиенте берется с сервера */
	const { ingredient, status } = useSelector(selectorIngredientDetails)
	React.useEffect(() => {
		dispatch(loadIngredientDetails(name));
	}, [dispatch, name])

	if (status === 'pending') {
		return <div className={styles.preload}><Preloader /></div>
	}

	if (status === 'rejected') {
		return <NotFound />
	}

	return (
		<div className={styles.popup}>
			<div className={styles.content} >
				<div className={styles.ent}>
					<p className={styles.title}>{ingredient?.strIngredient}</p>
					<div className={styles.image}>
						<img src={getMediumImageOfIngredient(name)} alt='Ingredient' />
						<div className={styles.options}>
							{ingredient?.strType && <span>{ingredient.strType}</span>}
							{ingredient?.strAlcohol ? <span>Alcoholic</span> : <span>Non Alcoholic</span>}
						</div>
						{/* Переход на страницу с коктейлями, в которых есть данный ингредиент */}
						<Link to={`/ingredients/${name}`}>
							<button className={styles.button}>{`Search cocktails with ${name}`}</button>
						</Link>
					</div>
					<div className={styles.description}>
						{ingredient?.strDescription
							? <p className={styles.text}>{ingredient.strDescription}</p>
							: <p className={styles.text}>Ingredient description missing from database...:(</p>}
					</div>
				</div>
				<div onClick={onClickClosePopup}><button className={styles.btn}>Close</button></div>
			</div>
		</div>
	)
}

