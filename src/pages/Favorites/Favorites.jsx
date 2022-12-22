import React from "react";
import { useMedia } from "../../utils/use-media";
import styles from './Favorites.module.scss';
import cn from 'classnames';
import { FavoritesLikeBlock } from "./FavoritesLikeBlock/FavoritesLikeBlock";
import { FavoritesUserBLock } from "./FavoritesUserBLock/FavoritesUserBLock";
//=========================================================================================================================

const typeOfDrinks = ['Favorites', 'User Cocktails'];

//=========================================================================================================================

export const Favorites = () => {
	const [visibleBlock, setVisibleBlock] = React.useState('Favorites');
	const { isMobile } = useMedia();

	const onClickCategory = (value) => setVisibleBlock(value);

	return (
		<div className={styles.body}>
			<div className={styles.types} >
				{typeOfDrinks.map((type) => (
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
