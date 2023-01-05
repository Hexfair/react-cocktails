import React from "react";
import styles from './AddUserCocktail.module.scss';
import axios from 'axios';
import { Preloader } from "../../components/Preloader/Preloader";
import { loadUserCocktails } from "../../redux/userCocktails/userCocktails-slice";
import { setBurgerStatus } from "../../redux/burgerMenu/burgerMenu-slice";
import { burgerOpenOrClose } from "../../utils/burgerMenuOpen";
import { NameEl } from "./NameEl/NameEl";
import { ImageUrlEl } from "./ImageUrlEl/ImageUrlEl";
import { DescriptionEl } from "./DescriptionEl/DescriptionEl";
import { IngredientsEl } from "./IngredientsEl/IngredientsEl";
import { useAppDispatch } from "../../redux/store";
//=========================================================================================================================

// Страница с добавлением пользовательского коктейля ======================================================================
export const AddUserCocktail = () => {
	const dispatch = useAppDispatch();

	/* Закрываем меню при переходе на страницу на мобильном устройстве */
	React.useEffect(() => {
		dispatch(setBurgerStatus(false));
		burgerOpenOrClose(false);
	}, [dispatch]);

	/* Хук хранит состояние (поля) добавляемого коктейля */
	const [cocktail, setCocktail] = React.useState({
		customNameDrink: '',
		customImageDrink: '',
		customIngredient1: '',
		customMeasure1: '',
		customDescription: ''
	});

	/* Массив, необходимый для добавления ингредиентов. qnt равно количеству ингредиентов */
	const [qnt, setQnt] = React.useState([1])

	/* Добавление полей ингредиента. В cocktail передается предыдущее состояние, плюс
	добавляются поля customIngredient2 и customMeasure2...и так далее. 
	В массив qnt также добавляется один элемент	*/
	const addIngr = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const qntNumb = qnt[qnt.length - 1] + 1;
		setCocktail(prev => (
			{ ...prev, ['customIngredient' + qntNumb]: '', ['customMeasure' + qntNumb]: '' }));
		setQnt(prev => [...prev, qntNumb]);
	}

	/* Функция изменения стейта cocktail. Работает для всех полей. Уникальность конкретных полей
	задает event.target.name в соответствии с атрибутом name */
	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCocktail((prev) => ({ ...prev, [event.target.name]: event.target.value }));

	/* numInput помогает определить, какой конкретно ингредиент редактируется */
	const updateCocktail = (str: string, numInput: number) => setCocktail((prev) => ({ ...prev, ['customIngredient' + (numInput + 1)]: str }));

	/* Сброс полей */
	const resetState = () => {
		setCocktail({
			customNameDrink: '',
			customImageDrink: '',
			customIngredient1: '',
			customMeasure1: '',
			customDescription: '',
		});
		setQnt([1]);
	}

	const [isPreloader, setIsPreloader] = React.useState(false);

	/* Отправка формы на сервер - добавление коктейля*/
	const submit = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (cocktail.customNameDrink.length > 4) {
			setIsPreloader(true);
			axios.post('https://633b5933c1910b5de0c41000.mockapi.io/cocktails-favorites', cocktail)
				.then(() => {
					resetState();
					setIsPreloader(false);
					dispatch(loadUserCocktails());
					alert('Cocktail added successfully!');
				})
				.catch((err) => {
					setIsPreloader(false);
					console.log(err)
				});
		}
	};

	if (isPreloader === true) {
		return <Preloader />
	}

	return (
		<div className={styles.body}>
			<h2 className={styles.title}>Add Your Cocktail</h2>
			<form className={styles.form}>
				<div className={styles.item}>
					<NameEl cocktail={cocktail} onChangeInput={onChangeInput} />
				</div>
				<div className={styles.item}>
					<ImageUrlEl cocktail={cocktail} onChangeInput={onChangeInput} />
				</div>
				<div className={styles.item}>
					<DescriptionEl cocktail={cocktail} onChangeInput={onChangeInput} />
				</div>
				<div className={styles.block}>
					<IngredientsEl cocktail={cocktail} onChangeInput={onChangeInput} updateCocktail={updateCocktail} qnt={qnt} />
				</div>
				<button onClick={addIngr} className={styles.add}>
					<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path d="M16 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4H9v-4H5V9h4V5h2v4h4v2z" />
					</svg>
				</button>
				<div className={styles.buttons}>
					<button className={styles.btn} onClick={submit}>Add Cocktail</button>
					<button className={styles.btn} onClick={resetState}>Reset</button>
				</div>

			</form>
		</div>
	)
}