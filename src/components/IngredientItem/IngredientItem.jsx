import React from "react";
import { getSmallImageOfIngredient } from '../../api/api';
import styles from './IngredientItem.module.scss';
import { IngredientPopup } from "../IngredientPopup/IngredientPopup";
//=========================================================================================================================

export const IngredientItem = ({ name }) => {

	const [openPopup, setOpenPopup] = React.useState(false);

	const onClickOpenPopup = () => {
		setOpenPopup(true);
		document.body.classList.add('active');
	}

	const onClickClosePopup = () => {
		setOpenPopup(false);
		document.body.classList.remove('active');
	}

	return (
		<>
			<div className={styles.item} onClick={onClickOpenPopup}>
				<img src={getSmallImageOfIngredient(name)} alt='' />
				<div className={styles.label}> {name}</div>
			</div>
			{
				openPopup && <IngredientPopup name={name} onClickClosePopup={onClickClosePopup} />
			}
		</>
	)
}