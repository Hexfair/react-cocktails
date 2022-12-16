import React from 'react';
import styles from './Home.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { loadAlcDrinks, loadPopDrinks, loadNonAlcDrinks, loadOptAlcDrinks, setActiveType, } from '../../redux/drinks/drinks-slice';
import cn from 'classnames';
import { DrinksList } from '../../components/DrinksList/DrinksList';
import { setBurgerStatus } from '../../redux/burgerMenu/burgerMenu';
import { burgerOpenOrClose } from '../../utils/burgerMenuOpen';
import { Preloader } from '../../components/Preloader/Preloader';
import { ButtonScrollTop } from '../../components/ButtonScrollTop/ButtonScrollTop';
import { useVisibleButton } from '../../utils/use-visibleButton';
import { NotFound } from '../NotFound/NotFound';
import { useMedia } from '../../utils/use-media';
//=========================================================================================================================

const typeOfDrinks = ['Poppular Drinks', 'Alcoholic', 'Non Alcoholic', 'Optional Alcoholic'];

//=========================================================================================================================

export const Home = () => {
	const dispatch = useDispatch();
	const { activeSort, popDrinks, alcDrinks, nonAlcDrinks, optAlcDrinks, status } = useSelector(state => state.drinks);
	const [visibleDrinks, setVisibleDrinks] = React.useState(20);
	const { isMobile } = useMedia();

	const visibleBackButton = useVisibleButton();

	const onClickButton = () => setVisibleDrinks(visibleDrinks + 20)

	const changeCategory = (value) => {
		dispatch(setActiveType(value));
		setVisibleDrinks(20);
	}

	const onChangeCategory = (value) => {
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
				dispatch(setActiveType(0));
				setVisibleDrinks(20);
				!popDrinks.length && dispatch(loadPopDrinks());
		}
	}

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
							onClick={() => onChangeCategory(index)}>
							<span className={styles.text}>{type}</span>
						</button>
						{!isMobile && <span className={styles.septum}></span>}
					</React.Fragment>
				))}
			</div >
			<DrinksList drinks={drinks} onClickButton={onClickButton} visibleDrinks={visibleDrinks} />
			{visibleBackButton && <ButtonScrollTop />}
		</div >
	)
}

