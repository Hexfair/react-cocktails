import { RadioInputType } from "./Search";
import { CocktailDetailsType } from '../../@types';
//=========================================================================================================================

/* Хук поиска коктейлся в соответствии с выборанным параметром (радиокнопки) */
/* Используется значение из инпута после работы функции debounce */
export const useSearch = (valueRadioInput: RadioInputType, searchDebounceValue: string, allCocktails: CocktailDetailsType[]) => {
	const drinks = valueRadioInput === 'names'
		? allCocktails.filter(obj => obj.strDrink.toLowerCase().includes(searchDebounceValue.toLowerCase()))
		: allCocktails.filter((obj) => {
			let arr = [];
			for (const [key, val] of Object.entries(obj)) {
				if (key.includes('strIngredient') && val?.toLowerCase().includes(searchDebounceValue.toLowerCase())) {
					arr.push(key)
				}
			}
			if (arr.length > 0) {
				return true
			} else {
				return false
			}
		})
	return drinks;
}

