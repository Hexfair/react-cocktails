import React from "react";
import { getSmallImageOfIngredient } from '../../api/api';
import styles from './IngredientItem.module.scss';
import { IngredientPopup } from "../IngredientPopup/IngredientPopup";
//=========================================================================================================================

// Карточка ингредиента (на стр. Ingredients) - картинка и название с открытием попапа ====================================
export const IngredientItem = ({ name }) => {

	/* Работа попапа - открыть и закрытить */
	const [openPopup, setOpenPopup] = React.useState(false);

	const onClickOpenPopup = () => {
		setOpenPopup(true);
		document.body.classList.add('active');
	}

	/* Закрывается попап по нажатию кнопки внутри него */
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
			{openPopup && <IngredientPopup name={name} onClickClosePopup={onClickClosePopup} />}
		</>
	)
}