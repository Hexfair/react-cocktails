import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Home } from "./pages/Home/Home";

import styles from './App.module.scss';
import { Footer } from "./components/Footer/Footer";

function App() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<Header />
				<div className='content'>
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</div>
				<Footer />
			</div>
		</div>
	);
}

export default App;
