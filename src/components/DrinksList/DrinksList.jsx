import React from 'react';
import styles from './DrinksList.module.scss';
import { DrinksItem } from '../DrinksItem/DrinksItem';
//=========================================================================================================================

// Компонент блока с карточками напитков и кнопкой "Показать еще" =========================================================
export const DrinksList = ({ drinks, onClickShowMore, visibleDrinks }) => {
	return (
		<>
			<div className={styles.items}>
				{drinks && drinks.map(obj =>
					<DrinksItem
						key={obj.idDrink}
						name={obj.strDrink || obj.strCategory || obj.strGlasses}
						id={obj.idDrink}
						image={obj.strDrinkThumb}
					/>)}
			</div>
			{visibleDrinks <= drinks.length
				? <button className={styles.btn} onClick={onClickShowMore}>Show more</button>
				: ''
			}
		</>
	)
}
