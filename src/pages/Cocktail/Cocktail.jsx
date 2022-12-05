import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadCocktailById } from "../../redux/cocktail/cocktail-slice";
import { getImageOfIngredient } from "../../api/api";
//=========================================================================================================================

export const Cocktail = () => {
	const dispatch = useDispatch();
	const params = useParams();

	const item = useSelector(state => state.cocktail.cocktail);

	const entries = item ? Object.entries(item) : [];
	const ingredientsArray = [];
	const measuresArray = [];
	for (const [key, value] of entries) {
		if (key.includes('strIngredient') && value) {
			ingredientsArray.push([value])
		}
		if (key.includes('strMeasure') && value) {
			measuresArray.push([value])
		}
	}


	React.useEffect(() => {
		dispatch(loadCocktailById(params.id));
	}, [dispatch])


	return (
		<div>
			{ingredientsArray && ingredientsArray.map((obj, index) => <span key={index}>{obj} --- {measuresArray[index] || 'taste'}<br />
				<img src={getImageOfIngredient(obj)} alt='' />
			</span>)}


		</div>
	)
}