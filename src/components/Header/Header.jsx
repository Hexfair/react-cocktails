import React from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/header-logo.png';
import { useMediaQuery } from 'react-responsive';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { FavoritesIcon } from '../FavoritesIcon/FavoritesIcon';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories } from '../../redux/categories/categories-slice';
import { loadGlasses } from '../../redux/glasses/glasses-slice';
import { Link, NavLink } from 'react-router-dom';
import { setBurgerStatus } from '../../redux/burgerMenu/burgerMenu';
//=========================================================================================================================

export const Header = () => {
	const dispatch = useDispatch();
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 880px)' });
	// const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);
	const isBurgerMenuOpen = useSelector(state => state.burger.isBurgerMenuOpen);

	React.useEffect(() => {
		dispatch(loadGlasses());
		dispatch(loadCategories());
		dispatch(setBurgerStatus(false))
	}, [dispatch]);

	const glasses = useSelector(state => state.glasses.glassesList);
	const categories = useSelector(state => state.categories.categoriesList);


	const [isOpen, setIsOpen] = React.useState(false);

	const onClickBut = () => {
		if (isTabletOrMobile) {
			setIsOpen(!isOpen)
		}
	}

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<img src={logo} alt='Logo' />
				<span className={styles.title}>React {!isTabletOrMobile && <br />}Cocktails</span>
			</div>

			<div className={cn(`${styles.navigation}`, `${isBurgerMenuOpen ? styles.active : ''}`)}>
				<ul className={styles.list}>

					<NavLink to="/" className={styles.link}>
						<button className={styles.button}>
							<span className={styles.text}>HOME</span>
						</button>
					</NavLink>

					<NavLink to="/ingredients" className={styles.link}>
						<button className={styles.button}>
							<svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.984 40.984">
								<path d="M26.894 40.946c.6 0 1.083-.487 1.083-1.083v-2.148c-2.373.85-4.901 1.299-7.485 1.299s-5.117-.444-7.485-1.299v2.148c0 .6.488 1.083 1.083 1.083h12.804zM38.063 4.974a3.959 3.959 0 0 0-5.535.811l-7.791 10.471h9.862l4.275-5.746a3.958 3.958 0 0 0-.811-5.535z" />
								<path d="M13.387 36.649c2.213.798 4.608 1.23 7.105 1.23s4.892-.431 7.105-1.23c7.287-2.619 12.636-9.176 13.378-17.196a1.896 1.896 0 0 0-1.89-2.066H1.897a1.897 1.897 0 0 0-1.89 2.066c.742 8.02 6.092 14.578 13.378 17.196zM6.717 10.35 8.21 6.717l3.831-1.678L8.18 3.568 6.717.039 5.25 3.568 1.389 5.039 5.22 6.717z" />
							</svg>
							<span className={styles.text}>Ingredients</span>
						</button>
					</NavLink>

					<li onClick={onClickBut} className={cn(`${styles.link}`, `${styles.categories}`, `${isOpen ? styles.mobile : ''}`)}>
						<button className={styles.button}>
							<svg className={styles.icon} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
								<path d="M19.695 1.519c-1.413-.005-2.777.767-3.369 2.222v.757l-.889-.195c-1.118-.248-2.015-.09-2.607.3-.593.39-.951 1.008-.964 1.987-.01.745.151 1.236.376 1.563.225.327.521.521.93.63.818.217 2.084-.028 3.21-.684l.466-.271.396.364c.657.605 1.134.865 1.606.957.473.092 1.019.025 1.831-.225l.769-.237.161.789c.211 1.028 1.165 1.829 2.275 1.829 1.034 0 1.849-.705 2.134-1.677l.173-.588.608.066c.692.077 1.516-.316 1.953-.808l.469-.527.544.452c1.454 1.21 2.77 1.325 3.694.896.923-.429 1.577-1.453 1.504-3.03-.069-1.471-.857-2.379-1.992-2.798-1.135-.419-2.637-.282-4.006.642l-.581.393-.418-.566c-.55-.749-1.335-1.21-2.087-1.328-.752-.118-1.444.073-1.982.657l-.579.627-.53-.669a3.952 3.952 0 0 0-3.096-1.526zm-14.6 7.854A57.383 57.383 0 0 0 2.251 29.39c3.09 1.346 6.361 1.414 9.644 1.406.184-.865.356-1.761.515-2.673-2.508.131-5.007.197-7.368-.713-.182-5.225.54-9.502 2.188-14.612 2.134.508 4.298.673 6.504.583a42.586 42.586 0 0 0-.08-2.524c-2.904-.135-5.749-.675-8.557-1.484zm11.563.232a7.183 7.183 0 0 1-1.577.579c.242 2.614.152 6.124-.171 9.929-.373 4.397-1.083 9.102-2.065 13.025h21.081c-.776-4.107-1.47-8.72-1.843-13.025-.302-3.486-.409-6.728-.159-9.353-.842-.1-1.722-.441-2.573-1.033a3.79 3.79 0 0 1-2.129.84c-.583 1.269-1.83 2.197-3.335 2.197a3.793 3.793 0 0 1-3.464-2.261c-.645.147-1.249.196-1.853.078-.67-.13-1.287-.47-1.911-.977zm-6.123 24.993L9.08 38.379h28.022l-1.697-3.782h-24.87z" />
							</svg>
							<span className={styles.text}>Categories...</span>
						</button>
						<div className={styles.options}>
							{categories && categories.map((obj, index) =>
								<Link to={`/categories/${obj.strCategory}`} key={obj.strCategory}>
									<span>{obj.strCategory}</span>
								</Link>)}
						</div>
					</li>

					<li onClick={onClickBut} className={cn(`${styles.link}`, `${styles.categories}`, `${isOpen ? styles.mobile : ''}`)}>
						<button className={styles.button}>
							<svg className={styles.icon} viewBox="-8.75 0 40 40" xmlns="http://www.w3.org/2000/svg">
								<path d="M16.875 36.25H13.75v-9.155c5.349-1.241 9.223-6.243 8.703-12.044L21.207 1.137A1.24 1.24 0 0 0 19.98 0H2.52c-.637 0-1.17.493-1.227 1.137L.047 15.052c-.52 5.8 3.354 10.802 8.703 12.043v9.155H5.625A3.125 3.125 0 0 0 2.5 39.375c0 .345.28.625.625.625h16.25c.345 0 .625-.28.625-.625a3.125 3.125 0 0 0-3.125-3.125zM4.824 3.75h12.852l.56 6.25H4.264l.56-6.25z" />
							</svg>
							<span className={styles.text}>Glasses...</span>
						</button>
						<div className={styles.options}>
							{glasses && glasses.map((obj, index) =>
								<Link to={`/glasses/${obj.strGlass}`} key={obj.strGlass}>
									<span>{obj.strGlass}</span>
								</Link>)}
						</div>
					</li>

					<li className={styles.link}>
						<button className={styles.button}>
							<svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.023 40.023">
								<path d="m37.84 8.8-5.216-4.98a2.339 2.339 0 0 0-1.973-.672A2.336 2.336 0 0 0 28.92 4.28l-2.868 4.726-1.259-.315-.1-.022a26.876 26.876 0 0 0-4.911-.445c-2.82 0-5.391.402-7.561 1.097l-.873-1.648a1.649 1.649 0 0 0 1.481-.078 1.662 1.662 0 0 0 .834-1.446v-.063c.135.086.285.146.438.19.025.008.05.006.077.014a1.64 1.64 0 0 0 .638.02c.195-.032.389-.085.569-.19a1.667 1.667 0 0 0 .61-2.278A7.628 7.628 0 0 0 11.334.264a7.644 7.644 0 0 0-5.826.767 7.633 7.633 0 0 0-3.577 4.661 7.631 7.631 0 0 0 .767 5.825 1.67 1.67 0 0 0 2.279.612c.182-.106.329-.246.454-.402.04-.048.066-.103.1-.157a1.578 1.578 0 0 0 .258-.962c-.003-.062.002-.12-.008-.182-.003-.023.002-.048-.003-.074a1.667 1.667 0 0 0 1.938.194c.43-.249.7-.662.792-1.114l.65 1.229c-1.887 1.106-3.145 2.527-3.544 4.137l-.034.085a19.845 19.845 0 0 0-1.383 7.342c0 9.814 6.992 17.798 15.583 17.798 8.593 0 15.583-7.984 15.583-17.798 0-2.551-.463-5.014-1.374-7.322-.418-1.909-2.059-3.576-4.702-4.799l1.866-3.075 4.382 4.184a1.668 1.668 0 0 0 2.303-2.414zM19.782 33.352c-2.743 0-5.391-1.659-7.086-4.436a1.668 1.668 0 1 1 2.848-1.736c1.083 1.776 2.667 2.836 4.237 2.836.923 0 1.667.746 1.667 1.667a1.667 1.667 0 0 1-1.667 1.668zM30.71 15.591c-.394 2.239-4.836 4.649-10.928 4.649-6.118 0-10.577-2.431-10.932-4.681.177-.622.83-1.309 1.873-1.938l1.146 2.166a1.668 1.668 0 0 0 1.476.889c.263 0 .53-.062.777-.195a1.666 1.666 0 0 0 .695-2.253l-1.001-1.893c1.656-.47 3.664-.777 5.966-.777 1.452 0 2.884.126 4.252.378l.206.052-2.319 3.822a1.668 1.668 0 1 0 2.852 1.731l2.78-4.579c1.755.749 2.932 1.723 3.157 2.628z" />
							</svg>
							<span className={styles.text}>Add My Cocktail</span>
						</button>
					</li>


				</ul>
			</div>

			<FavoritesIcon />
			{isTabletOrMobile && <BurgerMenu />}
		</header >
	)
}
