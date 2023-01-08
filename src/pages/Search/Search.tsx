import React from 'react';
import styles from './Search.module.scss';
import { allCocktails } from '../../api/AllCocktails';
import { DrinksList } from '../../components/DrinksList/DrinksList';
import { useSearch } from './use-search';
import { setBurgerStatus } from '../../redux/burgerMenu/burgerMenu-slice';
import { burgerOpenOrClose } from '../../utils/burgerMenuOpen';
import { SearchOrCloseIcon } from './SearchOrCloseIcon/SearchOrCloseIcon';
import { useAppDispatch } from '../../redux/store';
import debounce from "lodash.debounce";
//=========================================================================================================================

export type RadioInputType = 'names' | 'ingredients';
const radioInputType: RadioInputType[] = ['names', 'ingredients'];

// Страница поиска коктейля ===============================================================================================
export const Search = () => {
	const dispatch = useAppDispatch();
	const [value, setValue] = React.useState('');
	const [searchDebounceValue, setSearchDebounceValue] = React.useState('');
	const [valueRadioInput, setValueRadioInput] = React.useState<RadioInputType>('names');

	/* Использование debounce для оптимизации получения коктелей */
	const updateSearchValue = React.useCallback(
		debounce((str: string) => {
			setSearchDebounceValue(str)
		}, 1000),
		[],
	);

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateSearchValue(event.target.value);		// Для фильтрации коктелей
		setValue(event.target.value);					// Для работы инпута
	}

	/* Нажатие крестика - очистка поля Input + автофокус*/
	const inputRef = React.useRef<HTMLInputElement | null>(null);
	const onClickCloseIcon = () => {
		setValue('');
		setSearchDebounceValue('');
		inputRef.current?.focus();
	}

	/* Выбор параметра поиска - радиокнопки */
	const radioInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setValueRadioInput(event.target.value as RadioInputType)

	/* Поиск коктейля производится из локального файла AllCocktails.ts */
	const drinks = useSearch(valueRadioInput, searchDebounceValue, allCocktails);

	React.useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(setBurgerStatus(false));
		burgerOpenOrClose(false);
	}, [dispatch]);

	return (
		<div className={styles.body}>
			<h2 className={styles.title}>Search: <span>{value}</span></h2>
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
						<label key={obj}>
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
				{searchDebounceValue
					? <DrinksList drinks={drinks} />
					: <div className={styles.text}>On this page you can try to find your favorite cocktail!</div>}
			</div>
		</div >
	)
}
