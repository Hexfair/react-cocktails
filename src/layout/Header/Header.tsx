import React from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/header-logo.png';
import { FavoritesIcon } from '../../UI/FavoritesIcon/FavoritesIcon';
import { SearchIcon } from '../../UI/SearchIcon/SearchIcon'
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { loadCategories } from '../../redux/categories/categories-slice';
import { loadGlasses } from '../../redux/glasses/glasses-slice';
import { Link } from 'react-router-dom';
import { setBurgerStatus } from '../../redux/burgerMenu/burgerMenu-slice';
import { useMedia } from '../../utils/use-media';
import { BurgerMenu } from '../../UI/BurgerMenu/BurgerMenu';
import { loadUserCocktails } from '../../redux/userCocktails/userCocktails-slice';
import { ButtonHeader } from '../../UI/ButtonHeader/ButtonHeader';
import { selectorGlassesList } from '../../redux/glasses/glasses-selectors';
import { useAppDispatch } from '../../redux/store';
import { selectorCategoriesList } from '../../redux/categories/categories-selectors';
import { selectStatusBurgerMenu } from '../../redux/burgerMenu/burgerMenu-selectors';
import { selectorFavoritesList } from '../../redux/favorites/favorites-selectors';
//=========================================================================================================================

// Компонент хедер с логикой работы бургер-меню ===========================================================================
export const Header = () => {
	const dispatch = useAppDispatch();

	const glasses = useSelector(selectorGlassesList);
	const categories = useSelector(selectorCategoriesList);

	/* Хук меняет расположение иконок поиска и "избранное" при переходе на мобилку */
	const { isTablet } = useMedia();

	/* Состояние открыто/закрыто бургер-меню находится в редаксе */
	const [isOpen, setIsOpen] = React.useState(false);
	const isBurgerMenuOpen = useSelector(selectStatusBurgerMenu);

	/* Открытие окна с категориями и бокалами при работе на мобилках, в бургер-меню */
	const onClickBut = () => {
		isTablet && setIsOpen(!isOpen)
	}

	/* Сохранение коктелей в localStorage. При первом рендере ничего не происходит.
	В дальнейшем при добавлении коктейля в "избранное" меняется favoritesList в редаксе.
	При этом изменении срабатывает useEffect (зависимость Item) и весь список 
	избранных коктейлей сохраняется в ЛокалСтор */
	const isMounted = React.useRef(false);
	const items = useSelector(selectorFavoritesList)
	React.useEffect(() => {
		if (isMounted.current) {
			const json = JSON.stringify(items);
			localStorage.setItem('favorites', json)
		};
		isMounted.current = true;
	}, [items]);

	/* Загрузка списка категорий, видов бокалов и коктейлей пользователя, закрытие бургер-меню */
	React.useEffect(() => {
		dispatch(loadGlasses());
		dispatch(loadCategories());
		dispatch(setBurgerStatus(false));
		dispatch(loadUserCocktails())
	}, [dispatch]);

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<img src={logo} alt='Logo' />
				<span className={styles.title}>React {!isTablet && <br />}Cocktails</span>
			</div>

			<div className={cn(`${styles.navigation}`, `${isBurgerMenuOpen ? styles.active : ''}`)}>
				<ul className={styles.list}>
					<Link to="/" className={styles.link}>
						<ButtonHeader text='HOME' icon='' />
					</Link>
					<Link to="/ingredients" className={styles.link}>
						<ButtonHeader icon='ingredients' text='Ingredients' />
					</Link>
					<li onClick={onClickBut} className={cn(`${styles.link}`, `${styles.categories}`, `${isOpen ? styles.mobile : ''}`)}>
						<ButtonHeader icon='categories' text='Categories...' />
						<div className={styles.options}>
							{categories && categories.map((obj, index) =>
								<Link to={`/categories/${obj.strCategory.replace(/\//g, "%2f")}`} key={obj.strCategory}>
									<span>{obj.strCategory}</span>
								</Link>)}
						</div>
					</li>
					<li onClick={onClickBut} className={cn(`${styles.link}`, `${styles.categories}`, `${isOpen ? styles.mobile : ''}`)}>
						<ButtonHeader icon='glasses' text='Glasses...' />
						<div className={styles.options}>
							{glasses && glasses.map((obj, index) =>
								<Link to={`/glasses/${obj.strGlass.replace(/\//g, "%2f")}`} key={obj.strGlass}>
									<span>{obj.strGlass}</span>
								</Link>)}
						</div>
					</li>
					<Link to="/addCocktail" className={styles.link}>
						<ButtonHeader icon='cocktail' text='Add My Cocktail' />
					</Link>

					{isTablet &&
						<Link to="/search" className={styles.link}>
							<ButtonHeader icon='search' text='Search' />
						</Link>}
				</ul>
			</div>

			{!isTablet && <SearchIcon />}
			<FavoritesIcon />
			{isTablet && <BurgerMenu />}
		</header >
	)
}
