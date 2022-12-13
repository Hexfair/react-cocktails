import React from 'react';
import styles from './Home.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
	loadAlcoholicDrinks,
	loadPopularDrinks,
	setActiveType,
	loadNonAlcoholicDrinks,
	loadOptionalAlcoholicDrinks
} from '../../redux/drinks/drinks-slice';
import cn from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { DrinksList } from '../../components/DrinksList/DrinksList';
import { setBurgerStatus } from '../../redux/burgerMenu/burgerMenu';
import { burgerOpenOrClose } from '../../utils/burgerMenuOpen';
import { Preloader } from '../../components/Preloader/Preloader';
import { ButtonScrollTop } from '../../components/ButtonScrollTop/ButtonScrollTop';
import { useVisibleButton } from '../../utils/use-visibleButton';
//=========================================================================================================================

export const Home = () => {
	const dispatch = useDispatch();
	const drinksList = useSelector(state => state.drinks);
	const activeTypeSort = useSelector(state => state.drinks.activeSort);
	const [visibleDrinks, setVisibleDrinks] = React.useState(25);
	const popularDrinksItems = useSelector(state => state.drinks.popularDrinks);
	const status = useSelector(state => state.drinks.status);

	const isMobile = useMediaQuery({ query: '(max-width: 450px)' });

	React.useEffect(() => {
		window.scrollTo(0, 0);
		if (popularDrinksItems.length === 0) {
			dispatch(loadPopularDrinks())
		}
		dispatch(setBurgerStatus(false));
		burgerOpenOrClose(false);
	}, [dispatch, popularDrinksItems])

	const visibleBackButton = useVisibleButton();


	const onClickButton = () => {
		setVisibleDrinks(visibleDrinks + 20)
	}

	const changeCategory = (value) => {
		dispatch(setActiveType(value));
		setVisibleDrinks(20);
	}

	const onChangeCategory = (value) => {
		switch (value) {
			case 1:
				changeCategory(value);
				!drinksList.alcoholicDrinks.length && dispatch(loadAlcoholicDrinks());
				break;
			case 2:
				changeCategory(value);
				!drinksList.nonAlcoholicDrinks.length && dispatch(loadNonAlcoholicDrinks());
				break;
			case 3:
				changeCategory(value);
				!drinksList.optionalAlcoholicDrinks.length && dispatch(loadOptionalAlcoholicDrinks());
				break;
			default:
				dispatch(setActiveType(0));
				setVisibleDrinks(20);
				!drinksList.popularDrinks.length && dispatch(loadPopularDrinks());
		}
	}

	let drinks;
	switch (activeTypeSort) {
		case 1:
			drinks = drinksList.alcoholicDrinks.slice(0, visibleDrinks);
			break;
		case 2:
			drinks = drinksList.nonAlcoholicDrinks.slice(0, visibleDrinks);
			break;
		case 3:
			drinks = drinksList.optionalAlcoholicDrinks.slice(0, visibleDrinks);
			break;
		default:
			drinks = drinksList.popularDrinks;
	}

	if (status === 'loading') {
		return <Preloader />
	}

	return (
		<div className={styles.home}>

			<div className={styles.drinks} >

				<button
					className={cn(`${styles.sort}`, `${activeTypeSort === 0 ? styles.active : ''}`)}
					onClick={() => onChangeCategory(0)}>
					<span className={styles.text}>Poppular Drinks</span>
				</button>

				{!isMobile && <span className={styles.septum}></span>}

				<button
					className={cn(`${styles.sort}`, `${activeTypeSort === 1 ? styles.active : ''}`)}
					onClick={() => onChangeCategory(1)}>
					<span className={styles.text}>Alcoholic</span>
				</button>

				{!isMobile && <span className={styles.septum}></span>}

				<button
					className={cn(`${styles.sort}`, `${activeTypeSort === 2 ? styles.active : ''}`)}
					onClick={() => onChangeCategory(2)}>
					<span className={styles.text}>Non Alcoholic</span>
				</button>

				{!isMobile && <span className={styles.septum}></span>}

				<button
					className={cn(`${styles.sort}`, `${activeTypeSort === 3 ? styles.active : ''}`)}
					onClick={() => onChangeCategory(3)}>
					<span className={styles.text}>Optional Alcoholic</span>
				</button>
			</div>

			<DrinksList drinks={drinks} onClickButton={onClickButton} visibleDrinks={visibleDrinks} />

			{visibleBackButton && <ButtonScrollTop />}
		</div >

	)
}

