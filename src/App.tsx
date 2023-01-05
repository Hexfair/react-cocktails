import { Header } from "./layout/Header/Header";
import { Footer } from "./layout/Footer/Footer";
import { Main } from "./layout/Main/Main";
import styles from './App.module.scss';
//=========================================================================================================================

function App() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<Header />
				<Main />
				<Footer />
			</div>
		</div>
	);
}

export default App;
