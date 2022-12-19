import React from 'react';
import styles from './FavoritesIcon.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
//=========================================================================================================================

export const FavoritesIcon = () => {

	const quantityFavorites = useSelector(state => state.favorites.favoritesList);
	const quantityUserCocktails = useSelector(state => state.userCocktails.userCocktailsList);

	return (
		<div className={styles.favorites}  >
			<Link to={`/favorites`}>
				<button className={styles.button} >
					<svg className={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M12.6719 2.75961L14.5163 6.504L13.75 6.50495L13.6493 6.50834L13.5475 6.51518L13.4466 6.52542L13.2898 6.55231C12.2582 6.76694 11.5 7.67945 11.5 8.75495C11.5 9.92024 12.3858 10.8786 13.5209 10.9934L13.6771 11.0038L13.6493 11.0034L13.5475 11.0102L13.4466 11.0205L13.2898 11.0474C12.3125 11.2507 11.5806 12.0804 11.5062 13.0816L11.5 13.25L11.5052 13.404C11.5808 14.5216 12.4724 15.4154 13.589 15.4943L13.75 15.5L14 15.501L13.75 15.5015L13.6493 15.5049L13.5475 15.5117L13.4466 15.5219L13.2898 15.5488C12.3125 15.7522 11.5806 16.5818 11.5062 17.5831L11.5 17.7515L11.5052 17.9055C11.5241 18.1848 11.5939 18.4501 11.7055 18.6923L6.62564 21.3682C6.07517 21.6581 5.43135 21.1904 5.53701 20.5772L6.5684 14.5921L2.21602 10.3563C1.77015 9.92234 2.01606 9.16549 2.63184 9.07651L8.64275 8.20791L11.3263 2.75961C11.6012 2.20147 12.397 2.20147 12.6719 2.75961ZM21.25 17.0015C21.6642 17.0015 22 17.3373 22 17.7515C22 18.1312 21.7178 18.445 21.3518 18.4946L21.25 18.5015H13.75C13.3358 18.5015 13 18.1657 13 17.7515C13 17.3718 13.2822 17.058 13.6482 17.0083L13.75 17.0015H21.25ZM21.25 12.5C21.6642 12.5 22 12.8358 22 13.25C22 13.6297 21.7178 13.9435 21.3518 13.9932L21.25 14H13.75C13.3358 14 13 13.6642 13 13.25C13 12.8703 13.2822 12.5565 13.6482 12.5068L13.75 12.5H21.25ZM21.25 8.00495C21.6642 8.00495 22 8.34074 22 8.75495C22 9.13465 21.7178 9.44845 21.3518 9.49811L21.25 9.50495H13.75C13.3358 9.50495 13 9.16917 13 8.75495C13 8.37526 13.2822 8.06146 13.6482 8.0118L13.75 8.00495H21.25Z" />
					</svg>
					<span className={styles.quantity}>{quantityFavorites.length + quantityUserCocktails.length}</span>
				</button>
			</Link>
		</div >
	)
}
