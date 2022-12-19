import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserCocktails } from "../../redux/userCocktails/userCocktails-slice";
import { useMedia } from "../../utils/use-media";
import styles from './Favorites.module.scss';
import cn from 'classnames';
import { DrinksList } from "../../components/DrinksList/DrinksList";
import { UserIngredients } from "../../components/UserIngredients/UserIngredients";
//=========================================================================================================================

const typeOfDrinks = ['Favorites', 'User Cocktails'];

//=========================================================================================================================

export const Favorites = () => {
	const dispatch = useDispatch();
	const favoritesList = useSelector(state => state.favorites.favoritesList);
	const userCocktailsList = useSelector(state => state.userCocktails.userCocktailsList)
	const [visibleDrinks, setVisibleDrinks] = React.useState('Favorites');
	const { isMobile } = useMedia();

	const onClickCategory = (value) => setVisibleDrinks(value);

	React.useEffect(() => {
		dispatch(loadUserCocktails())
	}, [dispatch])

	return (
		<div className={styles.body}>
			<div className={styles.types} >
				{typeOfDrinks.map((type) => (
					<React.Fragment key={type}>
						<button
							className={cn(`${styles.sort}`, `${visibleDrinks === type ? styles.active : ''}`)}
							onClick={() => onClickCategory(type)}>
							<span className={styles.title}>{type}</span>
						</button>
						{!isMobile && <span className={styles.septum}></span>}
					</React.Fragment>
				))}
			</div >

			{visibleDrinks === 'Favorites'
				? <DrinksList drinks={favoritesList} />
				: <div className={styles.custom}>
					{userCocktailsList.map((obj, index) =>
						<div className={styles.row} key={obj.customNameDrink}>
							<div className={styles.image}>
								<img src={obj.customImageDrink} alt='Cocktail' />
							</div>
							<div className={styles.description}>
								<h3 className={styles.names}>{obj.customNameDrink}</h3>
								<p className={styles.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis delectus facere quidem obcaecati suscipit eius voluptates quasi nemo similique, adipisci eveniet consectetur earum accusamus cupiditate? Asperiores numquam laborum architecto. Deserunt!</p>
								<h3 className={styles.label}>Ingredients</h3>
								<UserIngredients idx={index} />
							</div>
						</div>
					)}
				</div>
			}
		</div>

	)
}
