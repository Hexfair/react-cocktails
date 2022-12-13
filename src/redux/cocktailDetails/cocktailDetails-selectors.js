export const selectIngredients = () => (state) => {
	const item = state.cocktailDetails.item;
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
	return { ingredientsArray, measuresArray };
}
