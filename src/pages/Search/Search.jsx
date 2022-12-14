import React from 'react';
import styles from './Search.module.scss';
import allCocktails from '../../api/AllCocktails.json';
import { DrinksList } from '../../components/DrinksList/DrinksList';
import { useSearch } from './use-search';
import { useVisibleButton } from '../../utils/use-visibleButton';
import { ButtonScrollTop } from '../../components/ButtonScrollTop/ButtonScrollTop';
import { useDispatch } from 'react-redux';
import { setBurgerStatus } from '../../redux/burgerMenu/burgerMenu';
import { burgerOpenOrClose } from '../../utils/burgerMenuOpen';
//=========================================================================================================================

export const Search = () => {
	const dispatch = useDispatch();
	const [value, setValue] = React.useState('');
	const inputRef = React.useRef();
	const visibleBackButton = useVisibleButton();

	React.useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(setBurgerStatus(false));
		burgerOpenOrClose(false);
	}, [dispatch]);

	const onChangeInput = (event) => {
		setValue(event.target.value)
	}

	const onClickCloseIcon = () => {
		setValue('');
		inputRef.current?.focus();
	}

	const [valueRadioInput, setValueRadioInput] = React.useState('names');
	const radioInputChange = (event) => {
		setValueRadioInput(event.target.value)
	}

	const drinks = useSearch(valueRadioInput, value, allCocktails);

	return (
		<div className={styles.body}>
			<h2 className={styles.title}>Search by: <span>{value}</span></h2>
			<div className={styles.search}>
				<div className={styles.input}>
					<input
						ref={inputRef}
						onChange={onChangeInput}
						value={value}
						placeholder={`Search by ${valueRadioInput}...`} />
					{!value &&
						<svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" >
							<path d="M51.6,96.7c11,0,21-3.9,28.8-10.5l35,35c0.8,0.8,1.8,1.2,2.9,1.2s2.1-0.4,2.9-1.2c1.6-1.6,1.6-4.2,0-5.8l-35-35   c6.5-7.8,10.5-17.9,10.5-28.8c0-24.9-20.2-45.1-45.1-45.1C26.8,6.5,6.5,26.8,6.5,51.6C6.5,76.5,26.8,96.7,51.6,96.7z M51.6,14.7   c20.4,0,36.9,16.6,36.9,36.9C88.5,72,72,88.5,51.6,88.5c-20.4,0-36.9-16.6-36.9-36.9C14.7,31.3,31.3,14.7,51.6,14.7z" />
						</svg>}
					{value &&
						<svg onClick={onClickCloseIcon} className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" >
							<path d="M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z" />
						</svg>}
				</div>
				<div className={styles.radio}>
					<label>
						<input
							className={styles.real}
							type="radio"
							name="options"
							value="names"
							onChange={radioInputChange}
							checked={valueRadioInput === 'names'}
						/>
						<span className={styles.custom}></span>Names
					</label>
					<label>
						<input
							className={styles.real}
							type="radio"
							name="options"
							value="ingredients"
							onChange={radioInputChange}
							checked={valueRadioInput === 'ingredients'}
						/>
						<span className={styles.custom}></span>Ingredients
					</label>
				</div>
			</div>
			<div className={styles.content}>
				{value
					? <DrinksList drinks={drinks} />
					: <div className={styles.text}>On this page you can try to find your favorite cocktail!</div>}
			</div>
			{visibleBackButton && <ButtonScrollTop />}

		</div >
	)
}
