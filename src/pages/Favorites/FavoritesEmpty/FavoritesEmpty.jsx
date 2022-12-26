import React from "react";
import styles from './FavoritesEmpty.module.scss';
import emptyImage from '../../../assets/empty.png'
//=========================================================================================================================

// Страница с любимыми коктейлями (пустая) ================================================================================
export const FavoritesEmpty = () => {
	return (
		<div className={styles.empty}>
			<p className={styles.text}>You haven't added any cocktails to your favorites yet... <br />Try going to the main page!</p>
			<img className={styles.image} src={emptyImage} alt='Empty page' />
		</div>
	)
}