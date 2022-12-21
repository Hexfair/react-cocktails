export const selectUserIngredients = (index) => (state) => {
	const item = state.userCocktails.userCocktailsList[index];
	const entries = item ? Object.entries(item) : [];
	const ingredientsArray = [];
	const measuresArray = [];
	for (const [key, value] of entries) {
		if (key.includes('customIngredient') && value) {
			ingredientsArray.push([value])
		}
		if (key.includes('customMeasure') && value) {
			measuresArray.push([value])
		}
	}
	return { ingredientsArray, measuresArray };
}
