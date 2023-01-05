type Numbers = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15';

type Languagies = {
	[Key in 'strInstructions' | 'strInstructionsES' | 'strInstructionsDE' | 'strInstructionsFR' | 'strInstructionsIT']?: string | null
}

type Ingredients = {
	[Key in `strIngredient${Numbers}`]?: string | null
}

type Measures = {
	[Key in `strMeasure${Numbers}`]?: string | null
}

type CustomIngredients = {
	[Key in `customIngredient${Numbers}`]?: string | null
}

type CustomMeasures = {
	[Key in `customMeasure${Numbers}`]?: string | null
}

export type CocktailDetailsType = {
	idDrink: string,
	strDrink: string,
	strCategory: string,
	strAlcoholic: string,
	strGlass: string,
	strDrinkThumb: string,
	[key: string]: string,
} & Languagies & Ingredients & Measures;

export type CocktailShortType = {
	strDrink: string,
	strDrinkThumb: string,
	idDrink: string,
};

export type UserCocktailType = {
	//idDrink: string,
	customNameDrink: string,
	customImageDrink: string,
	customDescription: string,
	[key: string]: string,
} & CustomIngredients & CustomMeasures

export type UserCocktailProps = {
	cocktail: UserCocktailType,
	onChangeInput: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}

