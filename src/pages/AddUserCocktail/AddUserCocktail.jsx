import React from "react";
import styles from './AddUserCocktail.module.scss';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { Preloader } from "../../components/Preloader/Preloader";
import { loadUserCocktails } from "../../redux/userCocktails/userCocktails-slice";
import { setBurgerStatus } from "../../redux/burgerMenu/burgerMenu-slice";
import { burgerOpenOrClose } from "../../utils/burgerMenuOpen";
import { NameEl } from "./NameEl/NameEl";
import { ImageUrlEl } from "./ImageUrlEl/ImageUrlEl";
import { DescriptionEl } from "./DescriptionEl/DescriptionEl";
import { IngredientsEl } from "./IngredientsEl/IngredientsEl";
//=========================================================================================================================

export const AddUserCocktail = () => {
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(setBurgerStatus(false));
		burgerOpenOrClose(false);
	}, [dispatch]);

	const [cocktail, setCocktail] = React.useState({
		customNameDrink: '',
		customImageDrink: '',
		customIngredient1: '',
		customMeasure1: '',
		customDescription: ''
	});

	const [qnt, setQnt] = React.useState([1])
	const addIngr = (event) => {
		event.preventDefault();
		setCocktail((prev) => (
			{ ...prev, ['customIngredient' + (qnt[qnt.length - 1] + 1)]: '', ['customMeasure' + (qnt[qnt.length - 1] + 1)]: '' }));
		setQnt((prev) => [...prev, prev[prev.length - 1] + 1]);
	}

	const onChangeInput = (event) => setCocktail((prev) => ({ ...prev, [event.target.name]: event.target.value }));
	const updateCocktail = (str, numInput) => setCocktail((prev) => ({ ...prev, ['customIngredient' + (numInput + 1)]: str }));

	const resetState = () => {
		setCocktail({
			customNameDrink: '',
			customImageDrink: '',
			customIngredient1: '',
			customMeasure1: '',
			customDescription: ''
		});
		setQnt([1]);
	}

	const [isPreloader, setIsPreloader] = React.useState(false);

	const submit = (event) => {
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