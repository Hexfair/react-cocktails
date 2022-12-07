import React from "react";
import { getImageOfIngredient } from '../../api/api';
import styles from './IngredientItem.module.scss';
//=========================================================================================================================

export const IngredientItem = ({ name }) => {
	return (
		<div className={styles.item}>
			<img src={getImageOfIngredient(name)} alt='' />
			<div className={styles.label}> {name}</div>
		</div>
	)
}