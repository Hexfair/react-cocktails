const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const getPopularDrinks = BASE_URL + 'filter.php?g=Champagne_flute';
export const getAlcoholicDrinks = BASE_URL + 'filter.php?a=Alcoholic';
export const getNonAlcoholicDrinks = BASE_URL + 'filter.php?a=Non_Alcoholic';
export const getOptionalAlcoholicDrinks = BASE_URL + 'filter.php?a=Optional_alcohol';

export const getIngredients = BASE_URL + 'list.php?i=list';
export const getCategories = BASE_URL + 'list.php?c=list';
export const getGlasses = BASE_URL + 'list.php?g=list';

export const getCocktailById = (id: string) => BASE_URL + 'lookup.php?i=' + id;
export const getIngredientItem = (name: string) => BASE_URL + 'search.php?i=' + name;
export const getCategoriesItem = (name: string) => BASE_URL + 'filter.php?c=' + name;
export const getGlassesItem = (name: string) => BASE_URL + 'filter.php?g=' + name;
export const getCocktailsByIngredient = (name: string) => BASE_URL + 'filter.php?i=' + name;

export const getSmallImageOfIngredient = (name: string) => `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`;
export const getMediumImageOfIngredient = (name: string) => `https://www.thecocktaildb.com/images/ingredients/${name}-Medium.png`;

export const getUserCocktails = 'https://633b5933c1910b5de0c41000.mockapi.io/cocktails-favorites';

