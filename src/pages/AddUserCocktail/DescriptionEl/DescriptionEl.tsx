import { UserCocktailProps } from '../../../@types';
import styles from './DescriptionEl.module.scss';
//=========================================================================================================================

// Компонент кастомного коктейля пользователя - поле описание =============================================================
export const DescriptionEl = ({ cocktail, onChangeInput }: UserCocktailProps) => {
	return (
		<>
			<span className={styles.label}>Description:</span>
			<textarea
				className={styles.descript}
				name='customDescription'
				placeholder={`Description...`}
				value={cocktail['customDescription']}
				onChange={onChangeInput}
			/>
		</>
	)
}