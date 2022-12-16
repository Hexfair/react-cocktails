import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadCocktailById } from "../../redux/cocktailDetails/cocktailDetails-slice";
import { getSmallImageOfIngredient } from "../../api/api";
import styles from './CocktailDetails.module.scss';
import cn from 'classnames';
import { selectIngredients } from "../../redux/cocktailDetails/cocktailDetails-selectors";
import { Preloader } from "../../components/Preloader/Preloader";
import { IngredientPopup } from "../../components/IngredientPopup/IngredientPopup";
import { NotFound } from "../NotFound/NotFound";
//=========================================================================================================================

const languageDescription = ['GBR', 'ESP', 'DEU', 'FRA', 'ITA']

//=========================================================================================================================

export const Cocktail = () => {
	const dispatch = useDispatch();
	const params = useParams();

	const [currentLang, setCurrentLang] = React.useState('GBR');

	const { item, status } = useSelector(state => state.cocktailDetails);
	const { ingredientsArray, measuresArray } = useSelector(selectIngredients());

	React.useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(loadCocktailById(params.id));
	}, [dispatch, params.id])

	const onChangeText = (lang) => {
		setCurrentLang(lang);
	}

	const [openPopup, setOpenPopup] = React.useState(false);
	const [name, setName] = React.useState('');


	const onClickOpenPopup = (obj) => {
		setOpenPopup(true);
		document.body.classList.add('active');
		setName(obj);
	}

	const onClickClosePopup = () => {
		setOpenPopup(false);
		document.body.classList.remove('active');
	}

	if (status === 'pending') {
		return <Preloader />
	}

	if (status === 'rejected') {
		return <NotFound />
	}

	const instructions = {
		'GBR': item.strInstructions,
		'ESP': item.strInstructionsES,
		'DEU': item.strInstructionsDE,
		'FRA': item.strInstructionsFR,
		'ITA': item.strInstructionsIT
	}

	return (
		<div className={styles.cocktail}>
			<h2 className={styles.title}>Cocktail: <span>{`${item.strDrink ? item.strDrink : ""}`}</span></h2>
			<div className={styles.row}>
				<div className={styles.image}>
					<img src={item.strDrinkThumb} alt='Cocktail' />
					<div className={styles.like}>
						<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
							<path d="m16 2.125-.906 2.063-3.25 7.28-7.938.845-2.25.25 1.688 1.5 5.906 5.343-1.656 7.813-.469 2.187 1.969-1.125 6.906-4 6.906 4 1.969 1.125-.469-2.187-1.656-7.813 5.906-5.343 1.688-1.5-2.25-.25-7.938-.844-3.25-7.281Zm0 4.906 2.563 5.782.25.53.562.063 6.281.656-4.687 4.22-.438.405.125.563 1.313 6.156-5.469-3.125-.5-.312-.5.312-5.469 3.125 1.313-6.156.125-.563-.438-.406-4.687-4.218 6.281-.657.563-.062.25-.531Z" />
						</svg>
					</div>
				</div>
				<div className={styles.content}>
					<div className={styles.description}>
						<h3 className={styles.label}>Description</h3>
						<div className={styles.flags}>
							{languageDescription.map((obj, index) => instructions[obj] &&
								<span
									className={cn(`${styles.flag}`, `${obj === currentLang ? styles.active : ''}`)}
									onClick={() => onChangeText(obj)}
									key={index}>
									{obj}
								</span>)}
						</div>
					</div>
					<p className={styles.text}>{instructions[currentLang]}</p>
					<div className={styles.options}>
						{item.strCategory && <span>{item.strCategory}</span>}
						{item.strIBA && <span>{item.strIBA}</span>}
						{item.strAlcoholic && <span>{item.strAlcoholic}</span>}
						{item.strGlass && <span>{item.strGlass}</span>}
					</div>
				</div>
			</div>
			<h3 className={styles.label}>Ingredients</h3>
			<div className={styles.ingredients}>
				{ingredientsArray && ingredientsArray.map((obj, index) =>
					<div className={styles.ingredient} key={index} onClick={() => onClickOpenPopup(obj)}>
						<img src={getSmallImageOfIngredient(obj)} alt='' />
						<span className={styles.caption} >{obj}:</span>
						<span className={styles.dose}>{measuresArray[index] || 'taste'}</span>
					</div>
				)}
				{openPopup && <IngredientPopup name={name} onClickClosePopup={onClickClosePopup} />}
			</div>
		</div>
	)
}