import React from "react";
import styles from './DrinksItem.module.scss';
import { Link } from "react-router-dom";
import { setFavoritesList } from "../../redux/favorites/favorites-slice";
import { useDispatch } from "react-redux";
import cn from 'classnames';
import { useFavorites } from "../../utils/use-favorites";
//import axios from 'axios';
//=========================================================================================================================

export const DrinksItem = ({ id, name, image }) => {
	const dispatch = useDispatch();
	console.log('name', name);
	const addFavoritesCocktail = (id, name, image) => {
		dispatch(setFavoritesList({ idDrink: id, strDrink: name, strDrinkThumb: image }))
		//axios.post('https://633b5933c1910b5de0c41000.mockapi.io/cocktails-favorites', { id, name, image })
	};

	const isFavorite = useFavorites(id);

	return (

		<div className={styles.item}>
			<img className={styles.image} src={image} alt='cocktail' />
			<Link to={`/cocktail/${id}`}>
				<p className={styles.label}>{name}</p>
			</Link>
			<div
				className={cn(`${styles.like}`, `${isFavorite ? styles.active : ''}`)}
				onClick={() => addFavoritesCocktail(id, name, image)}>
				<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<path d="M10 1.3l2.388 6.722H18.8l-5.232 3.948 1.871 6.928L10 14.744l-5.438 4.154 1.87-6.928-5.233-3.948h6.412L10 1.3z" />
				</svg>
			</div>
		</div >

	)
}