export const useSearch = (valueRadioInput, value, allCocktails) => {
	const drinks = valueRadioInput === 'names'
		? allCocktails.filter(obj => obj.strDrink.toLowerCase().includes(value.toLowerCase()))
		: allCocktails.filter((obj) => {
			let arr = [];
			for (const [key, val] of Object.entries(obj)) {
				if (key.includes('strIngredient') && val.toLowerCase().includes(value.toLowerCase())) {
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

