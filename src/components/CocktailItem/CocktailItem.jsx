import React from "react";
import styles from './CocktailItem.module.scss';
import cn from 'classnames';
//=========================================================================================================================

export const CocktailItem = ({ isBackSide, ...props }) => {
	return (
		<div className={cn(`${styles.item}`, `${isBackSide ? styles.hover : ''}`)}>
			<div className={styles.front}>
				<img className={styles.image} src={props.strDrinkThumb} alt='cocktail' />
				<p className={styles.label}>{props.strDrink}</p>
			</div>
			{isBackSide && <div className={styles.back}>
				<p className={styles.category}>Optional alcohol</p>
				<p className={styles.ingredient}>Dark rum</p>
				<p className={styles.ingredient}>Lemon juice</p>
				<p className={styles.ingredient}>Grenadine</p>
			</div>}
			<div className={styles.like}>
				<svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
					<path d="M26.859 3.768C23.473.92 18.24 1.348 15 4.646 11.76 1.348 6.527.914 3.141 3.768c-4.407 3.709-3.762 9.755-.621 12.961L12.797 27.2a3.071 3.071 0 0 0 2.203.932c.838 0 1.617-.328 2.203-.926L27.48 16.734c3.135-3.205 3.791-9.252-.621-12.967zm-1.383 10.986L15.199 25.225c-.141.141-.258.141-.398 0L4.523 14.754c-2.139-2.18-2.572-6.305.428-8.83 2.279-1.916 5.795-1.629 7.998.615L15 8.631l2.051-2.092c2.215-2.256 5.73-2.531 7.998-.621 2.994 2.525 2.549 6.674.428 8.836z" />
				</svg>
			</div>
		</div>
	)
}