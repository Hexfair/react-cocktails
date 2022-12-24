import React from "react";
import styles from './DescriptionEl.module.scss';
//=========================================================================================================================
export const DescriptionEl = ({ cocktail, onChangeInput }) => {
	return (
		<>
			<span className={styles.label}>Description:</span>
			<textarea
				className={styles.descript}
				name='customDescription'
				placeholder={`Description...`}
				value={cocktail['customDescription']}
				onChange={onChangeInput}
			/>
		</>
	)
}