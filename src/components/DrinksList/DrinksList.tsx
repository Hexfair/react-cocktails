import React from 'react';
import styles from './DrinksList.module.scss';
import { DrinksItem } from '../DrinksItem/DrinksItem';
import { CocktailShortType } from '../../@types';
//=========================================================================================================================

// Компонент блока с карточками напитков и кнопкой "Показать еще" =========================================================
type DrinksListProps = {
	drinks: CocktailShortType[],
	onClickShowMore?: () => void,
	visibleDrinks?: number,
}

export const DrinksList = ({ drinks, onClickShowMore, visibleDrinks }: DrinksListProps) => {
	return (
		<>
			<div className={styles.items}>
				{drinks && drinks.map(obj =>
					<DrinksItem
						key={obj.idDrink}
						name={obj.strDrink}
						id={obj.idDrink}
						image={obj.strDrinkThumb}
					/>)}
			</div>
			{visibleDrinks && visibleDrinks <= drinks.length
				? <button className={styles.btn} onClick={onClickShowMore}>Show more</button>
				: ''
			}
		</>
	)
}
