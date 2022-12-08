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
					<svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path d="M395.637,0.001c-56.196,0-103.21,40.041-114.021,93.091H23.274c-9.413,0-17.901,5.671-21.502,14.37 c-3.603,8.698-1.609,18.71,5.05,25.364l179.361,179.254v153.375H116.31c-12.853,0-23.273,10.418-23.273,23.273
					c0,12.851,10.42,23.273,23.273,23.273h93.145H302.6c12.853,0,23.273-10.422,23.273-23.273c0-12.854-10.42-23.273-23.273-23.273 h-69.872V312.079l98.696-98.639c18.882,12.546,41.027,19.288,64.212,19.288c64.163,0,116.363-52.202,116.363-116.363
					C512,52.201,459.799,0.001,395.637,0.001z M395.637,186.182c-10.603,0-20.843-2.355-30.129-6.803l46.581-46.555 c6.659-6.654,8.653-16.666,5.052-25.364c-3.603-8.696-12.091-14.369-21.504-14.369h-65.815
					c9.607-27.088,35.475-46.545,65.815-46.545c38.499,0,69.818,31.32,69.818,69.818S434.134,186.182,395.637,186.182z"/>
					</svg>
					<span className={styles.text}>Poppular Drinks</span>
				</button>

				{!isMobile && <span className={styles.septum}></span>}

				<button
					className={cn(`${styles.sort}`, `${activeTypeSort === 1 ? styles.active : ''}`)}
					onClick={() => onChangeCategory(1)}>
					<svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
						<path d="M167.9,126.9c12-8.5,32.1-23.4,32.1-62.6c0-31.7-18.5-60-18.5-60H74.6c0,0-18.5,28.5-18.5,60.3c0,39.2,20.1,54.1,32,62.6	c13.8,9.8,34.8,28.5,34.8,31.4v78.6H75.9v13.4h102.9v-13.4h-45.7v-78.6C133.1,155.4,154.1,136.8,167.9,126.9z M81.8,14.6h92.5	c4.8,0,15.4,28.6,15.4,49.7c0,0.6,0,1.2,0,1.7H66.3c0-0.5,0-1,0-1.4C66.3,43.5,77,23,81.8,14.6z" />
					</svg>
					<span className={styles.text}>Alcoholic</span>
				</button>

				{!isMobile && <span className={styles.septum}></span>}

				<button
					className={cn(`${styles.sort}`, `${activeTypeSort === 2 ? styles.active : ''}`)}
					onClick={() => onChangeCategory(2)}>
					<svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 28">
						<path d="m2.43673,0.43751l-1.49922,2.01988l2.49871,3.32159l0,0.04489c-0.01523,0.36466 -0.03332,0.69804 -0.03332,1.07727c0,6.75761 3.27404,12.40497 7.46281,13.24146l0,4.44375l-4.26446,0l0,2.87272l10.66115,0l0,-2.87272l-4.26446,0l0,-4.39886c0.29845,-0.06234 0.60849,-0.15757 0.89953,-0.26932l5.69705,7.67556l1.49922,-2.01988l-17.1578,-23.11645l-1.49922,-2.01988zm3.83135,1.16704l2.13223,2.87272l9.7283,0c0.10661,0.86182 0.1999,1.56204 0.1999,2.42386l0,0.44886l-7.79597,0l7.06302,9.47101c1.8124,-2.44182 2.86519,-6.0417 2.86519,-9.91988c0,-1.86727 -0.1999,-3.71659 -0.73295,-5.29659l-13.45971,0z" />
					</svg>
					<span className={styles.text}>Non Alcoholic</span>
				</button>

				{!isMobile && <span className={styles.septum}></span>}

				<button
					className={cn(`${styles.sort}`, `${activeTypeSort === 3 ? styles.active : ''}`)}
					onClick={() => onChangeCategory(3)}>
					<svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
						<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
							<path d="M3821.3,5001.9c-997.9-34.5-1978.6-134.1-2446-249c-201.1-47.9-417.6-145.6-488.4-216.4c-101.5-105.3-103.4-74.7,13.4-1471c57.5-708.7,107.3-1298.6,111.1-1312.1c5.8-34.5,492.3-373.5,591.9-409.9c432.9-166.6,1861.8-285.4,3447.7-285.4h743.2l113,84.3c147.5,107.3,316,155.2,492.3,139.8c124.5-11.5,308.4-80.4,375.4-141.7c28.7-24.9,63.2-26.8,210.7-17.2c490.3,36.4,1110.9,124.5,1317.8,187.7c97.7,30.6,178.1,78.5,383.1,231.8c141.8,107.3,262.4,199.2,270.1,205c7.7,5.7,63.2,597.6,122.6,1317.8l109.2,1306.3l-40.2,84.3c-103.4,212.6-501.8,333.3-1457.6,440.5C6740.4,5003.8,5129.6,5047.9,3821.3,5001.9z M5890,4544.1c664.6-21.1,1296.7-59.4,1733.4-107.3c266.2-28.7,739.3-97.7,750.8-111.1c32.6-30.6-827.5-136-1517-183.9c-147.5-9.6-632.1-28.7-1078.4-42.1c-1199-34.5-2568.6,13.4-3509,118.8c-321.8,36.4-649.3,86.2-664.6,101.5c-9.6,11.5,180.1,46,434.8,80.4C3032.2,4530.7,4505.1,4586.3,5890,4544.1z" />
							<path d="M1063.2,1111.7c0-3.8,99.6-1193.3,220.3-2645.2C1526.7-4464,1498-4245.7,1658.9-4354.8c325.6-218.4,1538.1-388.8,3014.8-421.4c1402.1-32.6,3122.1,149.4,3578,377.3c84.3,42.1,178.1,120.7,206.9,174.3c19.1,34.5,463.5,5321,448.2,5336.3c-3.8,5.8-46-21.1-90-57.5c-220.3-180-589.9-277.7-1369.5-362l-216.4-23l178.1-187.7c235.6-252.8,331.4-390.7,358.2-528.6c47.9-227.9-17.2-471.2-168.6-634c-65.1-68.9-505.7-482.7-802.6-752.7c-262.4-241.4-540.1-283.5-838.9-132.2l-114.9,59.4l88.1-92c760.4-791.1,831.3-890.7,831.3-1174.1c0-143.7-7.7-178.1-61.3-291.2c-32.5-70.9-97.7-164.7-143.7-210.7c-243.2-239.4-852.4-798.7-921.3-842.8c-264.3-172.4-637.8-122.6-871.5,113c-172.4,174.3-773.8,827.5-821.7,890.7c-76.6,105.4-128.3,304.5-113,454c21.1,245.2,70.9,312.2,584.2,794.9c249,235.6,488.4,450.1,530.6,476.9c195.4,128.3,463.5,139.8,693.4,32.6l128.3-59.4L5648.6-1294c-724,750.8-802.5,861.9-800.6,1135.8c1.9,239.4,51.7,342.9,264.3,559.3l174.3,174.3l-680,13.4c-373.5,5.7-699.1,15.3-722.1,21.1c-24.9,3.8-44.1,1.9-44.1-5.8c0-9.6,178.1-204.9,392.7-436.7c440.5-471.2,499.9-561.2,519.1-777.6c15.3-157.1-38.3-350.5-130.3-473.1c-34.5-46-260.5-268.2-503.8-494.2c-534.4-498-591.9-534.4-861.9-534.4c-157.1,0-185.8,5.7-300.7,63.2c-116.8,57.5-172.4,109.2-565,530.6c-473.1,507.6-547.8,612.9-572.7,808.3c-17.2,137.9,15.3,308.4,84.3,434.8c36.4,65.1,183.9,216.4,505.7,517.2l453.9,423.3l-147.5,13.4c-806.4,78.5-1279.5,183.9-1497.9,337.1C1097.6,1098.3,1063.2,1121.3,1063.2,1111.7z" />
						</g>
					</svg>
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

