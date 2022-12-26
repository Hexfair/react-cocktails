import React from "react";
import styles from './NameEl.module.scss';
import cn from 'classnames';
//=========================================================================================================================

// Компонент кастомного коктейля пользователя - поле название =============================================================
export const NameEl = ({ cocktail, onChangeInput }) => {

	/* Валидация названия коктейля. Валидация происходит по событию onBlur. */
	const [isValidName, setIsValidName] = React.useState(true);
	const validateName = () => {
		cocktail.customNameDrink.length < 4 ? setIsValidName(false) : setIsValidName(true);
	}

	return (
		<>
			<span className={styles.label}>Name:</span>
			<input
				className={cn(`${styles.names}`, `${isValidName === false ? styles.error : ''}`)}
				name='customNameDrink'
				placeholder={`Name...`}
				value={cocktail['customNameDrink']}
				onChange={onChangeInput}
				onBlur={validateName}
			/>
			{!isValidName && <div className={styles.tooltip}>
				<span className={styles.rect}>Length cannot be less than 4</span>
				<span className={styles.triangle}></span>
			</div>}
		</>
	)
}