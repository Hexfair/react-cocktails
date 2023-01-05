import React from "react";
import { useMedia } from "../../utils/use-media";
import styles from './Favorites.module.scss';
import cn from 'classnames';
import { FavoritesLikeBlock } from "./FavoritesLikeBlock/FavoritesLikeBlock";
import { FavoritesUserBLock } from "./FavoritesUserBLock/FavoritesUserBLock";
//=========================================================================================================================

type TypeOfDrinks = 'Favorites' | 'User Cocktails';
const typeOfDrinks: TypeOfDrinks[] = ['Favorites', 'User Cocktails'];

// Страница с любимыми коктейлями (избранными и кастомными) ===============================================================
export const Favorites = () => {
	const [visibleBlock, setVisibleBlock] = React.useState<TypeOfDrinks>('Favorites');
	const { isMobile } = useMedia();

	/* Переключение между избранными и кастомными */
	const onClickCategory = (value: TypeOfDrinks) => setVisibleBlock(value);

	return (
		<div className={styles.body}>
			<div className={styles.types} >
				{typeOfDrinks.map(type => (
					<React.Fragment key={type}>
						<button
							className={cn(`${styles.sort}`, `${visibleBlock === type ? styles.active : ''}`)}
							onClick={() => onClickCategory(type)}>
							<span className={styles.title}>{type}</span>
						</button>
						{!isMobile && <span className={styles.septum}></span>}
					</React.Fragment>
				))}
			</div >
			{visibleBlock === 'Favorites' ? <FavoritesLikeBlock /> : <FavoritesUserBLock />}
		</div>
	)
}
