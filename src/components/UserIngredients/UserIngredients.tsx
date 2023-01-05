import styles from './UserIngredients.module.scss';
import { ImageItem } from "../../UI/ImageItem/ImageItem";
import { getSmallImageOfIngredient } from "../../api/api";
import { UserCocktailType } from '../../@types'
//=========================================================================================================================

// Компонент с ингредиентами коктейля, который добавил пользователь =======================================================
type UserIngredientsProps = {
	userCocktail: UserCocktailType
}

export const UserIngredients = ({ userCocktail }: UserIngredientsProps) => {

	/* Функция внутри компонента:
	1 - получает все ключи объекта (коктейля)
	2 - проходит по всем этим ключам (map)
	3 - отрисовывает разметку (ингредиент), только когда находит поле с "customIngredient"
	4 - получает картинку, название игредиента и его дозу (customMeasure)
	*/
	console.log(userCocktail);
	return (
		<div className={styles.ingredients}>
			{Object.keys(userCocktail).map((key) => {
				if (key.includes('customIngredient') && userCocktail[key]) {
					return (
						<div className={styles.ingredient} key={key}>
							<span className={styles.image}>
								<ImageItem srcData={getSmallImageOfIngredient(userCocktail[key])} />
							</span>
							<span className={styles.caption} >{userCocktail[key]}:</span>
							<span className={styles.dose}>{userCocktail[`customMeasure${key.slice(16)}`] || 'taste'}</span>
						</div>
					)
				}
				return null;
			})}
		</div>
	)
}

