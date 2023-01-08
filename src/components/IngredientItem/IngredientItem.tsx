import React from "react";
import { getSmallImageOfIngredient } from '../../api/api';
import styles from './IngredientItem.module.scss';
import { IngredientPopup } from "../IngredientPopup/IngredientPopup";
//=========================================================================================================================

// Карточка ингредиента (на стр. Ingredients) - картинка и название с открытием попапа ====================================
type IngredientItemProps = {
	name: string
}

export const IngredientItem = ({ name }: IngredientItemProps) => {

	/* Работа попапа - открыть и закрытить */
	const [openPopup, setOpenPopup] = React.useState(false);

	const onClickOpenPopup = () => {
		setOpenPopup(true);
		document.body.classList.add('lock');
	}

	/* Закрывается попап по нажатию кнопки внутри него */
	const onClickClosePopup = () => {
		setOpenPopup(false);
		document.body.classList.remove('lock');
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