import React from "react";
import styles from './UserCocktail.module.scss';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { loadIngredients } from "../../redux/ingredients/ingredients-slice";
//=========================================================================================================================

export const UserCocktail = () => {
	const dispatch = useDispatch();
	const ingredientsList = useSelector(state => state.ingredients.ingredientsList);

	React.useEffect(() => {
		if (ingredientsList.length === 0) {
			dispatch(loadIngredients())
		}
	}, [dispatch, ingredientsList]);

	console.log('ingredientsList', ingredientsList);
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
			{
				...prev, ['customIngredient' + (qnt[qnt.length - 1] + 1)]: '', ['customMeasure' + (qnt[qnt.length - 1] + 1)]: ''
			}));
		setQnt((prev) => [...prev, prev[prev.length - 1] + 1]);
	}

	const onChangeInput = (event) => {
		setCocktail((prev) => ({ ...prev, [event.target.name]: event.target.value }));
	}

	const submit = (event) => {
		event.preventDefault();
		axios.post('https://633b5933c1910b5de0c41000.mockapi.io/cocktails-favorites', cocktail)
			.then(() => {
				alert(`Success`);
				setCocktail({
					customNameDrink: '',
					customImageDrink: '',
					customIngredient1: '',
					customMeasure1: '',
					customDescription: ''
				});
				setQnt([1]);
			})
			.catch((err) => console.log(err));
	};


	return (
		<div className={styles.content}>
			<h2 className={styles.title}>Add Your Cocktail</h2>
			<form className={styles.form}>
				<div className={styles.item}>
					<span className={styles.label}>Name:</span>
					<input
						className={styles.names}
						name='customNameDrink'
						placeholder={`Name...`}
						value={cocktail['customNameDrink']}
						onChange={onChangeInput}
					/>
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
						className={styles.names}
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
							<div className={styles.ingredient} key={obj}>
								<input
									className={styles.ingr}
									name={'customIngredient' + (index + 1)}
									placeholder={`Ingredient...`}
									value={cocktail['customIngredient' + (index + 1)]}
									onChange={onChangeInput}
								/>
								<input
									className={styles.meas}
									name={'customMeasure' + (index + 1)}
									placeholder={`Measure...`}
									value={cocktail['customMeasure' + (index + 1)]}
									onChange={onChangeInput}
								/>
								<span className={styles.image}><img src='' alt='' /></span>
							</div>)}
						<div className={styles.list}>
							{ingredientsList && ingredientsList.map((obj) =>
								<span className={styles.link} key={obj.strIngredient1}>{obj.strIngredient1}</span>
							)}

						</div>
					</div>
				</div>
				<button onClick={addIngr}>+++</button>
				<button className={styles.btn} onClick={submit}>Add Cocktail</button>
			</form>
		</div>
	)
}