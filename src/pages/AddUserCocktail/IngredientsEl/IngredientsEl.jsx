import React from "react";
import styles from './IngredientsEl.module.scss';
import cn from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { loadIngredients } from "../../../redux/ingredients/ingredients-slice";
import { getSmallImageOfIngredient } from "../../../api/api";
import { ImageItem } from "../../../UI/ImageItem/ImageItem";
//=========================================================================================================================
export const IngredientsEl = ({ cocktail, onChangeInput, updateCocktail, qnt }) => {
	const dispatch = useDispatch();
	const ingredientsList = useSelector(state => state.ingredients.ingredientsList);

	const [open, isOpen] = React.useState(false);
	const [numInput, setNumInput] = React.useState(0);

	const onFocusInput = (index) => {
		isOpen(true);
		setNumInput(index);
	}

	const onClickLi = (str) => {
		updateCocktail(str, numInput);
		isOpen(false);
	}

	React.useEffect(() => {
		if (ingredientsList.length === 0) {
			dispatch(loadIngredients())
		}
	}, [dispatch, ingredientsList]);

	React.useEffect(() => {
		const handleClickOutside = (event) => {
			if (open && event.target.dataset.type !== 'ingr') {
				isOpen(false);
			}
		}
		document.body.addEventListener('click', handleClickOutside);
		return () => document.body.removeEventListener('click', handleClickOutside);
	}, [open])

	return (
		<>
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
								{ingredientsList && ingredientsList
									.filter((obj) => obj.strIngredient1.toLowerCase().includes(cocktail['customIngredient' + (index + 1)].toLowerCase()))
									.map((obj) =>
										<li
											className={styles.link}
											key={obj.strIngredient1}
											onClick={() => onClickLi(obj.strIngredient1)}>
											{obj.strIngredient1}
										</li>)}
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
							{cocktail['customIngredient' + obj] === ''
								? null
								: <ImageItem srcData={getSmallImageOfIngredient(cocktail['customIngredient' + obj])} />}
						</span>
					</div>)}

			</div>
		</>
	)
}

