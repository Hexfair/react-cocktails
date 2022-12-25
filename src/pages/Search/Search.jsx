import React from 'react';
import styles from './Search.module.scss';
import allCocktails from '../../api/AllCocktails.json';
import { DrinksList } from '../../components/DrinksList/DrinksList';
import { useSearch } from './use-search';
import { useVisibleButton } from '../../utils/use-visibleButton';
import { ButtonScrollTop } from '../../UI/ButtonScrollTop/ButtonScrollTop';
import { useDispatch } from 'react-redux';
import { setBurgerStatus } from '../../redux/burgerMenu/burgerMenu-slice';
import { burgerOpenOrClose } from '../../utils/burgerMenuOpen';
import { SearchOrCloseIcon } from './SearchOrCloseIcon/SearchOrCloseIcon';
//=========================================================================================================================

const radioInputType = ['names', 'ingredients'];

//=========================================================================================================================
export const Search = () => {
	const dispatch = useDispatch();
	const [value, setValue] = React.useState('');
	const [valueRadioInput, setValueRadioInput] = React.useState('names');

	const inputRef = React.useRef();

	const visibleBackButton = useVisibleButton();

	const onChangeInput = (event) => setValue(event.target.value);

	const onClickCloseIcon = () => {
		setValue('');
		inputRef.current?.focus();
	}

	const radioInputChange = (event) => setValueRadioInput(event.target.value)

	const drinks = useSearch(valueRadioInput, value, allCocktails);

	React.useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(setBurgerStatus(false));
		burgerOpenOrClose(false);
	}, [dispatch]);

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
					<SearchOrCloseIcon value={value} onClickCloseIcon={onClickCloseIcon} />
				</div>
				<div className={styles.radio}>
					{radioInputType.map(obj =>
						<label>
							<input
								className={styles.real}
								type="radio"
								name="options"
								value={obj}
								onChange={radioInputChange}
								checked={valueRadioInput === obj} />
							<span className={styles.custom}></span>{obj}
						</label>)}
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
