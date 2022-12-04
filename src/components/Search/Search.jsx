import React from "react";
import { useDispatch, useSelector } from "react-redux";

//=========================================================================================================================

export const Search = () => {
	const dispatch = useDispatch();
	const ingredients = useSelector(state => state.options.ingredientsList);
	const categories = useSelector(state => state.options.categoriesList);
	const glasses = useSelector(state => state.options.glassesList);

	return (
		<>
			<input
				className='search-filter__input'
				placeholder='Поиск...' />
		</>

	)
}