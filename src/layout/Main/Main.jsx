import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../../pages/Home/Home";
import { CocktailDetails } from "../../pages/CocktailDetails/CocktailDetails";
import { Ingredients } from "../../pages/Ingredients/Ingredients";
import { CocktailsByIngredient } from "../../pages/CocktailsByIngredient/CocktailsByIngredient";
import { Categories } from "../../pages/Categories/Categories";
import { Glasses } from "../../pages/Glasses/Glasses";
import { Search } from "../../pages/Search/Search";
import { NotFound } from "../../pages/NotFound/NotFound";
import { Favorites } from "../../pages/Favorites/Favorites";
import { AddUserCocktail } from "../../pages/AddUserCocktail/AddUserCocktail";
//=========================================================================================================================

export const Main = () => {
	return (
		<main >
			<Routes>
				<Route path="" element={<Home />} />
				<Route path="cocktail/:id" element={<CocktailDetails />} />
				<Route path="ingredients" element={<Ingredients />} />
				<Route path="ingredients/:cocktails" element={<CocktailsByIngredient />} />
				<Route path="categories/:category" element={<Categories />} />
				<Route path="glasses/:glass" element={<Glasses />} />
				<Route path="search" element={<Search />} />
				<Route path="favorites" element={<Favorites />} />
				<Route path="addCocktail" element={<AddUserCocktail />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</main>
	)
}
