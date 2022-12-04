import React from "react";
import { getImageOfIngredient } from '../../api/api';
import styles from './IngregientItem.module.scss';
//=========================================================================================================================

export const IngregientItem = ({ name }) => {
	return (
		<div className={styles.item}>
			<img src={getImageOfIngredient(name)} alt='' />
			<div className={styles.label}> {name}</div>
		</div>
	)
}