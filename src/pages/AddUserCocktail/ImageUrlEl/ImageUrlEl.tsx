import { UserCocktailProps } from "../../../@types";
import styles from './ImageUrlEl.module.scss';
//=========================================================================================================================

// Компонент кастомного коктейля пользователя - поле URL картинки =========================================================
export const ImageUrlEl = ({ cocktail, onChangeInput }: UserCocktailProps) => {
	return (
		<>
			<span className={styles.label}>Image URL:</span>
			<input
				className={styles.names}
				name='customImageDrink'
				placeholder={`URL...`}
				value={cocktail['customImageDrink']}
				onChange={onChangeInput}
			/>
		</>
	)
}