import React from 'react';
import styles from './Home.module.scss';
import { useSelector } from 'react-redux';
import { setActiveSort, } from '../../redux/drinks/drinks-slice';
import cn from 'classnames';
import { DrinksList } from '../../components/DrinksList/DrinksList';
import { setBurgerStatus } from '../../redux/burgerMenu/burgerMenu-slice';
import { burgerOpenOrClose } from '../../utils/burgerMenuOpen';
import { Preloader } from '../../components/Preloader/Preloader';
import { NotFound } from '../NotFound/NotFound';
import { useMedia } from '../../utils/use-media';
import { selectorDrinks } from '../../redux/drinks/drinks-selectors';
import { useAppDispatch } from '../../redux/store';
import { loadAlcDrinks, loadNonAlcDrinks, loadOptAlcDrinks, loadPopDrinks } from '../../redux/drinks/drinks-asyncActions';
//=========================================================================================================================

const typeOfDrinks = ['Poppular Drinks', 'Alcoholic', 'Non Alcoholic', 'Optional Alcoholic'];

// Главная страница с коктейлями ==========================================================================================
export const Home = () => {
	const dispatch = useAppDispatch();
	const { activeSort, popDrinks, alcDrinks, nonAlcDrinks, optAlcDrinks, status } = useSelector(selectorDrinks);
	const [visibleDrinks, setVisibleDrinks] = React.useState(20);

	/* На мобильных устройствах скрывается разделяющая полоска в заголовке */
	const { isMobile } = useMedia();

	const onClickShowMore = () => setVisibleDrinks(visibleDrinks + 20)

	/* Изменение категории при соответствующем нажатии */
	const changeCategory = (value: number) => {
		dispatch(setActiveSort(value));
		setVisibleDrinks(20);
	}

	/* При изменении категории осуществляется проверка, есть ли она уже в редаксе.
	Если категория уже ранее была загружена, то данные будут браться из редакса,
	иначе - с сервера */
	const onClickCategory = (value: number) => {
		switch (value) {
			case 1:
				changeCategory(value);
				!alcDrinks.length && dispatch(loadAlcDrinks());
				break;
			case 2:
				changeCategory(value);
				!nonAlcDrinks.length && dispatch(loadNonAlcDrinks());
				break;
			case 3:
				changeCategory(value);
				!optAlcDrinks.length && dispatch(loadOptAlcDrinks());
				break;
			default:
				dispatch(setActiveSort(0));
				setVisibleDrinks(20);
				!popDrinks.length && dispatch(loadPopDrinks());
		}
	}

	/* Работа кнопки Show More для каждой категории */
	let drinks;
	switch (activeSort) {
		case 1:
			drinks = alcDrinks.slice(0, visibleDrinks);
			break;
		case 2:
			drinks = nonAlcDrinks.slice(0, visibleDrinks);
			break;
		case 3:
			drinks = optAlcDrinks.slice(0, visibleDrinks);
			break;
		default:
			drinks = popDrinks;
	}

	React.useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(loadPopDrinks())
		dispatch(setBurgerStatus(false));
		burgerOpenOrClose(false);
	}, [dispatch])


	if (status === 'pending') {
		return <Preloader />
	}

	if (status === 'rejected') {
		return <NotFound />
	}

	return (
		<div className={styles.home}>
			<div className={styles.types} >
				{typeOfDrinks.map((type, index) => (
					<React.Fragment key={type}>
						<button
							className={cn(`${styles.sort}`, `${activeSort === index ? styles.active : ''}`)}
							onClick={() => onClickCategory(index)}>
							<span className={styles.text}>{type}</span>
						</button>
						{!isMobile && <span className={styles.septum}></span>}
					</React.Fragment>
				))}
			</div >
			<DrinksList drinks={drinks} onClickShowMore={onClickShowMore} visibleDrinks={visibleDrinks} />
		</div >
	)
}

