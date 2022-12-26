import React from "react";
import styles from './UserIngredients.module.scss';
import { ImageItem } from "../../UI/ImageItem/ImageItem";
import { getSmallImageOfIngredient } from "../../api/api";
//=========================================================================================================================

export const UserIngredients = ({ idx, userCocktail }) => {
	return (
		<div className={styles.ingredients}>
			{Object.keys(userCocktail).map((key) => {
				if (key.includes('customIngredient') && userCocktail[key]) {
					return (
						<div className={styles.ingredient} key={key}>
							<ImageItem srcData={getSmallImageOfIngredient(userCocktail[key])} />
							<span className={styles.caption} >{userCocktail[key]}:</span>
							<span className={styles.dose}>{userCocktail[`customMeasure${key.slice(16)}`] || 'taste'}</span>
						</div>
					)
				}
				return null;
			})}
		</div>
	)
}

