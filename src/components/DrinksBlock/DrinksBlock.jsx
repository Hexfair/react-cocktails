import React from 'react';
import styles from './DrinksBlock.module.scss';
import { DrinksList } from '../DrinksList/DrinksList';
//=========================================================================================================================

export const DrinksBlock = ({ drinksList, name, label }) => {
	const [visibleDrinks, setVisibleDrinks] = React.useState(20);
	const onClickButton = () => {
		setVisibleDrinks(visibleDrinks + 20)
	}

	let drinks = drinksList.slice(0, visibleDrinks);

	return (
		<div className={styles.content}>
			<h2 className={styles.title}>Cocktails {label}: <span>{name}</span></h2>
			<DrinksList drinks={drinks} onClickButton={onClickButton} visibleDrinks={visibleDrinks} />
		</div>
	)
}