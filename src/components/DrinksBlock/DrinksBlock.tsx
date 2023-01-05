import React from 'react';
import styles from './DrinksBlock.module.scss';
import { DrinksList } from '../DrinksList/DrinksList';
import { NotFound } from '../../pages/NotFound/NotFound';
import { CocktailShortType } from '../../@types';
//=========================================================================================================================

// Компонент отображает блок напитков - заголовок и блок карточек напитков ================================================
type DrinksBlockProps = {
	drinksList: CocktailShortType[],
	name: string,
	label: string,
}

export const DrinksBlock = ({ drinksList, name, label }: DrinksBlockProps) => {

	/* Отображение карточек напитков + работа кнопки Show More */
	const [visibleDrinks, setVisibleDrinks] = React.useState(20);
	const onClickShowMore = () => setVisibleDrinks(visibleDrinks + 20)
	let drinks = drinksList.slice(0, visibleDrinks);

	if (!drinksList) {
		return <NotFound />
	}

	return (
		<div className={styles.content}>
			<h2 className={styles.title}>Cocktails {label}: <span>{name}</span></h2>
			<DrinksList drinks={drinks} onClickShowMore={onClickShowMore} visibleDrinks={visibleDrinks} />
		</div>
	)
}