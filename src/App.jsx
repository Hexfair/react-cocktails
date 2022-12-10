import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Home } from "./pages/Home/Home";

import styles from './App.module.scss';
import { Footer } from "./components/Footer/Footer";
import { Cocktail } from "./pages/CocktailDetails/CocktailDetails";
import { Ingredients } from "./pages/Ingredients/Ingredients";
import { Categories } from "./pages/Categories/Categories";
import { Glasses } from "./pages/Glasses/Glasses";
import { Search } from "./pages/Search/Search";
//=========================================================================================================================

function App() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<Header />
				<main className={styles.main}>
					<Routes>
						<Route path="" element={<Home />} />
						<Route path="cocktail/:id" element={<Cocktail />} />
						<Route path="ingredients" element={<Ingredients />} />
						<Route path="categories/:category" element={<Categories />} />
						<Route path="glasses/:glass" element={<Glasses />} />
						<Route path="search" element={<Search />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</div>
	);
}

export default App;
