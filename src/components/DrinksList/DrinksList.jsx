import React from 'react';
import styles from './DrinksList.module.scss';
import { DrinksItem } from '../DrinksItem/DrinksItem';
//=========================================================================================================================

export const DrinksList = ({ drinks, onClickButton, visibleDrinks }) => {
	console.log('drinks', drinks);

	return (
		<>
			<div className={styles.items}>
				{drinks && drinks.map((obj, index) =>
					<DrinksItem
						key={obj.idDrink}
						name={obj.strDrink || obj.strCategory || obj.strGlasses}
						id={obj.idDrink}
						image={obj.strDrinkThumb}
					/>)}
			</div>
			{visibleDrinks <= drinks.length
				? <button className={styles.btn} onClick={onClickButton}>Show more</button>
				: ''
			}
		</>
	)
}
