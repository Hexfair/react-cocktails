import styles from "./NotFound.module.scss";
import notFoundImage from "../../assets/404.png";
//=========================================================================================================================

// Страница не найдена ====================================================================================================
export const NotFound = () => {
	return (
		<div className={styles.body}>
			<h2 className={styles.title}>Page not found</h2>
			<p className={styles.text}>This page doesn't exist... Try going to the main page!</p>
			<img className={styles.image} src={notFoundImage} alt='Not Found' />
		</div>
	)
}