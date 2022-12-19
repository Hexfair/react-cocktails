import React from "react";
import styles from './UserCocktail.module.scss';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { loadIngredients } from "../../redux/ingredients/ingredients-slice";
import cn from 'classnames';
import { Preloader } from "../../components/Preloader/Preloader";
import { getSmallImageOfIngredient } from "../../api/api";
import noImage from '../../assets/no-image.svg'
//=========================================================================================================================

export const UserCocktail = () => {
	const dispatch = useDispatch();
	const ingredientsList = useSelector(state => state.ingredients.ingredientsList);

	React.useEffect(() => {
		if (ingredientsList.length === 0) {
			dispatch(loadIngredients())
		}
	}, [dispatch, ingredientsList]);

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

	const [open, isOpen] = React.useState(false);
	const [numInput, setNumInput] = React.useState(0);
	const onChangeInput = (event) => setCocktail((prev) => ({ ...prev, [event.target.name]: event.target.value }));

	const onFocusInput = (index) => {
		isOpen(true);
		setNumInput(index);
	}

	const onClickLi = (str) => {
		setCocktail((prev) => ({ ...prev, ['customIngredient' + (numInput + 1)]: str }));
		isOpen(false);
	}

	const [isValidName, setIsValidName] = React.useState(true);

	const validateName = () => {
		if (cocktail.customNameDrink.length < 4) {
			setIsValidName(false);
			return false;
		} else {
			setIsValidName(true);
			return true;
		}
	}

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
		const valid = validateName();
		if (valid) {
			setIsPreloader(true);
			axios.post('https://633b5933c1910b5de0c41000.mockapi.io/cocktails-favorites', cocktail)
				.then(() => {
					resetState();
					setIsPreloader(false);
					alert('Cocktail added successfully!');
				})
				.catch((err) => {
					setIsPreloader(false);
					console.log(err)
				});
		}
	};

	React.useEffect(() => {
		const handleClickOutside = (event) => {
			if (open && event.target.dataset.type !== 'ingr') {
				isOpen(false);
			}
		}
		document.body.addEventListener('click', handleClickOutside);
		return () => document.body.removeEventListener('click', handleClickOutside);
	}, [open])

	if (isPreloader === true) {
		return <Preloader />
	}

	return (
		<div className={styles.body}>
			<h2 className={styles.title}>Add Your Cocktail</h2>
			<form className={styles.form}>
				<div className={styles.item}>
					<span className={styles.label}>Name:</span>
					<input
						className={cn(`${styles.names}`, `${isValidName === false ? styles.error : ''}`)}
						name='customNameDrink'
						placeholder={`Name...`}
						value={cocktail['customNameDrink']}
						onChange={onChangeInput}
						onBlur={validateName}
					/>
					{!isValidName && <div className={styles.tooltip}>
						<span className={styles.rect}>Length cannot be less than 4</span>
						<span className={styles.triangle}></span>
					</div>}
				</div>
				<div className={styles.item}>
					<span className={styles.label}>Image URL:</span>
					<input
						className={styles.names}
						name='customImageDrink'
						placeholder={`URL...`}
						value={cocktail['customImageDrink']}
						onChange={onChangeInput}
					/>
				</div>
				<div className={styles.item}>
					<span className={styles.label}>Description:</span>
					<textarea
						className={styles.descript}
						name='customDescription'
						placeholder={`Description...`}
						value={cocktail['customDescription']}
						onChange={onChangeInput}
					/>
				</div>
				<div className={styles.block}>
					<span className={styles.label}>Ingredients:</span>
					<div className={styles.ingredients}>
						{qnt.map((obj, index) =>
							<div className={styles.ingredient} key={obj}  >
								<div className={styles.box}>
									<textarea
										className={styles.ingr}
										name={'customIngredient' + (index + 1)}
										placeholder={`Ingredient...`}
										value={cocktail['customIngredient' + (index + 1)]}
										onChange={onChangeInput}
										onFocus={() => onFocusInput(index)}
										data-type="ingr"
									/>
									<ul className={cn(`${styles.list}`, `${(open === true && numInput === index) ? styles.active : ''}`)}>
										{ingredientsList && ingredientsList.map((obj) =>
											<li className={styles.link} key={obj.strIngredient1} onClick={() => onClickLi(obj.strIngredient1)}>{obj.strIngredient1}</li>
										)}
									</ul>
								</div>
								<textarea
									className={styles.meas}
									name={'customMeasure' + (index + 1)}
									placeholder={`Measure...`}
									value={cocktail['customMeasure' + (index + 1)]}
									onChange={onChangeInput}
								/>
								<span className={styles.image}>
									{!(cocktail['customIngredient' + obj] === '')
										&& <img src={getSmallImageOfIngredient(cocktail['customIngredient' + obj])} alt='' onError={(e) => { e.target.src = noImage }} />}
								</span>
							</div>)}

					</div>
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