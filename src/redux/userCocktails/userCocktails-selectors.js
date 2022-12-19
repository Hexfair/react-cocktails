export const selectUserIngredients = (index) => (state) => {
	console.log(index);
	const item = state.userCocktails.userCocktailsList[index];
	console.log('item', item);
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
