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
import { DrinksBlock } from '../../components/DrinksBlock/DrinksBlock';
import { setBurgerStatus } from '../../redux/burgerMenu/burgerMenu';
import { burgerOpenOrClose } from '../../utils/burgerMenuOpen';
import { Preloader } from '../../components/Preloader/Preloader';
//=========================================================================================================================

export const Home = () => {
	const dispatch = useDispatch();
	const drinksList = useSelector(state => state.drinks);
	const activeTypeSort = useSelector(state => state.drinks.activeSort);
	const [visibleDrinks, setVisibleDrinks] = React.useState(25);
	const popularDrinksItems = useSelector(state => state.drinks.popularDrinks);
	const status = useSelector(state => state.drinks.status);

	const isMobile = useMediaQuery({ query: '(max-width: 450px)' });

	let [visibleBackButton, setVisibleBackButton] = React.useState(false);

	React.useEffect(() => {
		if (popularDrinksItems.length === 0) {
			dispatch(loadPopularDrinks())
		}
		dispatch(setBurgerStatus(false));
		burgerOpenOrClose(false);
	}, [dispatch, popularDrinksItems])


	React.useEffect(() => {
		const handleScroll = () => {
			window.scrollY > 600 ? setVisibleBackButton(true) : setVisibleBackButton(false);
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

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

			<DrinksBlock drinks={drinks} onClickButton={onClickButton} visibleDrinks={visibleDrinks} />

			{visibleBackButton && <button className={styles.buttonBack} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" >
					<path d="M894.9,96.3l665,749.7h-374.6v850.3L894.9,1406l-290.3,290.3V846H232.1L894.9,96.3z" />
				</svg>
			</button>}
		</div >

	)
}

