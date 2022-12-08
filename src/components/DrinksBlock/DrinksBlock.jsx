import React from 'react';
import styles from './DrinksBlock.module.scss';
import { Button } from '../Button/Button';
import { CocktailItem } from '../CocktailItem/CocktailItem';

export const DrinksBlock = ({ drinks, onClickButton, visibleDrinks }) => {
	return (
		<>
			<div className={styles.items}>
				{drinks && drinks.map((obj, index) =>
					<CocktailItem
						key={obj.idDrink}
						name={obj.strCategory || obj.strGlasses}
						id={obj.idDrink}
						{...obj}
					/>)}
			</div>
			{visibleDrinks <= drinks.length ? <Button label='Show more' onClickButton={onClickButton} /> : ''}
		</>
	)
}
