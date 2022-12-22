import React from "react";
import styles from './UserIngredients.module.scss';
import { useSelector } from "react-redux";
import { selectUserIngredients } from "../../redux/userCocktails/userCocktails-selectors";
import { ImageItem } from "../../UI/ImageItem/ImageItem";
import { getSmallImageOfIngredient } from "../../api/api";
//=========================================================================================================================

export const UserIngredients = ({ idx }) => {
	const { ingredientsArray, measuresArray } = useSelector(selectUserIngredients(idx));

	return (
		<div className={styles.ingredients}>
			{ingredientsArray && ingredientsArray.map((obj, index) =>
				<div className={styles.ingredient} key={index} >
					<ImageItem srcData={getSmallImageOfIngredient(obj)} />
					<span className={styles.caption} >{obj}:</span>
					<span className={styles.dose}>{measuresArray[index] || 'taste'}</span>
				</div>
			)}
		</div>
	)
}

