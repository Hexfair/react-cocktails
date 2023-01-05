import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadCocktailById } from "../../redux/cocktailDetails/cocktailDetails-slice";
import { getSmallImageOfIngredient } from "../../api/api";
import styles from './CocktailDetails.module.scss';
import cn from 'classnames';
import { Preloader } from "../../components/Preloader/Preloader";
import { IngredientPopup } from "../../components/IngredientPopup/IngredientPopup";
import { NotFound } from "../NotFound/NotFound";
import { useFavorites } from "../../utils/use-favorites";
import { setFavoritesList } from "../../redux/favorites/favorites-slice";
import { selectorCocktailDetails } from "../../redux/cocktailDetails/cocktailDetails-selectors";
import { useAppDispatch } from "../../redux/store";
import { CocktailDetailsType } from "../../@types";
//=========================================================================================================================

type Language = 'GBR' | 'ESP' | 'DEU' | 'FRA' | 'ITA';
const languageDescription = ['GBR', 'ESP', 'DEU', 'FRA', 'ITA']

// Страница с детальной инф-цией о коктейле ===============================================================================
export const CocktailDetails = () => {
	const dispatch = useAppDispatch();
	const params = useParams();
	const { item, status } = useSelector(selectorCocktailDetails);

	/* Смена отображаемого описания */
	const [currentLang, setCurrentLang] = React.useState('GBR');
	const onChangeText = (lang: string) => setCurrentLang(lang)

	const [openPopup, setOpenPopup] = React.useState(false);
	const [name, setName] = React.useState('');

	/* Открытие и закрытие попапа с детальным описанием ингредиента */
	const onClickOpenPopup = (obj: CocktailDetailsType['strDrink']) => {
		setOpenPopup(true);
		document.body.classList.add('active');
		setName(obj);
	}

	const onClickClosePopup = () => {
		setOpenPopup(false);
		document.body.classList.remove('active');
	}

	/* Добавление коктейля в "избранное" */
	const isFavorite = useFavorites(params.id);
	const addFavoritesCocktail = (id: string, name: string, image: string) => {
		dispatch(setFavoritesList({ idDrink: id, strDrink: name, strDrinkThumb: image }));
	};

	React.useEffect(() => {
		window.scrollTo(0, 0);
		params.id && dispatch(loadCocktailById(params.id));
	}, [dispatch, params.id])

	if (status === 'pending') {
		return <Preloader />
	}

	if (status === 'rejected') {
		return <NotFound />
	}

	/* Объект заполняется описанием коктейля на разных языках */
	const instructions = {
		'GBR': item?.strInstructions,
		'ESP': item?.strInstructionsES,
		'DEU': item?.strInstructionsDE,
		'FRA': item?.strInstructionsFR,
		'ITA': item?.strInstructionsIT
	}

	return (
		<div className={styles.cocktail}>
			<h2 className={styles.title}>Cocktail: <span>{`${item?.strDrink ? item.strDrink : ""}`}</span></h2>
			<div className={styles.row}>
				<div className={styles.image}>
					<img src={item?.strDrinkThumb} alt='Cocktail' />
					<div
						className={cn(`${styles.like}`, `${isFavorite ? styles.active : ''}`)}
						onClick={() => { params.id && item && addFavoritesCocktail(params.id, item?.strDrink, item?.strDrinkThumb) }}>
						<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path d="M10 1.3l2.388 6.722H18.8l-5.232 3.948 1.871 6.928L10 14.744l-5.438 4.154 1.87-6.928-5.233-3.948h6.412L10 1.3z" />
						</svg>
					</div>
				</div>
				<div className={styles.content}>
					<div className={styles.description}>
						<h3 className={styles.label}>Description</h3>
						<div className={styles.flags}>
							{/* Отображаются только те языки, которые пришли с сервера */}
							{languageDescription.map((obj, index) => instructions[obj as Language] &&
								<span
									className={cn(`${styles.flag}`, `${obj === currentLang ? styles.active : ''}`)}
									onClick={() => onChangeText(obj)}
									key={index}>
									{obj}
								</span>)}
						</div>
					</div>
					<p className={styles.text}>{instructions[currentLang as Language]}</p>
					<div className={styles.options}>
						{item?.strCategory && <span>{item.strCategory}</span>}
						{item?.strIBA && <span>{item.strIBA}</span>}
						{item?.strAlcoholic && <span>{item.strAlcoholic}</span>}
						{item?.strGlass && <span>{item.strGlass}</span>}
					</div>
				</div>
			</div>
			<h3 className={styles.label}>Ingredients</h3>
			<div className={styles.ingredients}>
				{item && Object.keys(item).map((key) => {
					if (key.includes('strIngredient') && item[key]) {
						return (
							<div className={styles.ingredient} key={key} onClick={() => onClickOpenPopup(item[key])}>
								<img src={getSmallImageOfIngredient(item[key])} alt='' />
								<span className={styles.caption} >{item[key]}:</span>
								<span className={styles.dose}>{item[`strMeasure${key.slice(13)}`] || 'taste'}</span>
							</div>
						)
					}
					return null;
				})}
				{openPopup && <IngredientPopup name={name} onClickClosePopup={onClickClosePopup} />}
			</div>
		</div>
	)
}