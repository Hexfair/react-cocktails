import React from "react";
import styles from './FavoritesUserBLock.module.scss';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { UserIngredients } from "../../../components/UserIngredients/UserIngredients";
import { Preloader } from '../../../components/Preloader/Preloader';
import { ImageItem } from '../../../UI/ImageItem/ImageItem';
import { deleteUserCocktail, loadUserCocktails } from '../../../redux/userCocktails/userCocktails-slice'
import { FavoritesEmpty } from "../FavoritesEmpty/FavoritesEmpty";
//=========================================================================================================================

// Страница с любимыми коктейлями (кастомными) ==============================================================================
export const FavoritesUserBLock = () => {
	const dispatch = useDispatch();

	/* Кастомные коктейли хранятся на сервере и подгружаются в редакс */
	const userCocktailsList = useSelector(state => state.userCocktails.userCocktailsList)
	const [isPreloader, setIsPreloader] = React.useState(false);

	React.useEffect(() => {
		dispatch(loadUserCocktails())
	}, [dispatch])

	/* Удаление кастомного коктейля с сервера */
	const deleteItem = (id) => {
		setIsPreloader(true);
		axios.delete('https://633b5933c1910b5de0c41000.mockapi.io/cocktails-favorites/' + id)
			.then(() => {
				setIsPreloader(false);
				alert('Cocktail deleted!');
				dispatch(deleteUserCocktail(id))
			})
			.catch((err) => {
				setIsPreloader(false);
				console.log(err)
			});
	}

	if (isPreloader === true) {
		return <Preloader />
	}

	if (userCocktailsList.length === 0) {
		return <FavoritesEmpty />
	}

	return (
		<div className={styles.body}>
			{userCocktailsList.map((obj, index) =>
				<div className={styles.row} key={obj.customNameDrink}>
					<div className={styles.image}>
						<ImageItem srcData={obj.customImageDrink} />
					</div>
					<div className={styles.description}>
						<div className={styles.top}>
							<h3 className={styles.names}>{obj.customNameDrink}</h3>
							<svg
								className={styles.delete}
								onClick={() => deleteItem(obj.idDrink)}
								viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" >
								<path d="M28.889 40H11.111a4.444 4.444 0 0 1-4.444-4.444v-20a2.222 2.222 0 0 1 2.222-2.222h22.222a2.222 2.222 0 0 1 2.222 2.222v20A4.444 4.444 0 0 1 28.889 40zm6.667-33.333a2.222 2.222 0 0 1-2.222 2.222H6.667a2.222 2.222 0 0 1 0-4.444h6.667V2.222A2.222 2.222 0 0 1 15.556 0h8.889a2.222 2.222 0 0 1 2.222 2.222v2.222h6.667a2.222 2.222 0 0 1 2.222 2.222z" />
							</svg>
						</div>
						<p className={styles.text}>{obj.customDescription}</p>
						<h3 className={styles.label}>Ingredients</h3>
						<UserIngredients idx={index} userCocktail={obj} />
					</div>
				</div>
			)}
		</div>
	)
}