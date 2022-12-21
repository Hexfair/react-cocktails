import React from "react";
import styles from './UserIngredients.module.scss';
import { useSelector } from "react-redux";
import { selectUserIngredients } from "../../redux/userCocktails/userCocktails-selectors";
import { IngredientImage } from "../IngredientImage/IngredientImage";
// import { getSmallImageOfIngredient } from '../../api/api';
// import noImage from '../../assets/no-image.png'
//=========================================================================================================================

export const UserIngredients = ({ idx }) => {
	const { ingredientsArray, measuresArray } = useSelector(selectUserIngredients(idx));

	return (
		<div className={styles.ingredients}>
			{ingredientsArray && ingredientsArray.map((obj, index) =>
				<div className={styles.ingredient} key={index} >
					<IngredientImage index={index} obj={obj} />
					{/* <img src={vis ? getSmallImageOfIngredient(obj) : noImage} alt='' onLoad={() => lll(index)} onError={() => eee(index)} /> */}
					<span className={styles.caption} >{obj}:</span>
					<span className={styles.dose}>{measuresArray[index] || 'taste'}</span>
				</div>
			)}
		</div>
	)
}

