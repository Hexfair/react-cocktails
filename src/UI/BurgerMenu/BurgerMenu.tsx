import styles from './BurgerMenu.module.scss';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setBurgerStatus } from '../../redux/burgerMenu/burgerMenu-slice';
import { burgerOpenOrClose } from '../../utils/burgerMenuOpen';
import { selectStatusBurgerMenu } from '../../redux/burgerMenu/burgerMenu-selectors';
//=========================================================================================================================

// Компонент бургер-меню ==================================================================================================
export const BurgerMenu = () => {
	const dispatch = useDispatch();
	const isBurgerMenuOpen = useSelector(selectStatusBurgerMenu);

	const burgerMenuOpen = (value: boolean) => {
		dispatch(setBurgerStatus(value));
		burgerOpenOrClose(value);
	}

	return (
		<div
			className={cn(`${styles.burger}`, `${isBurgerMenuOpen ? styles.active : ''}`)}
			onClick={() => burgerMenuOpen(!isBurgerMenuOpen)}	>
			<span></span>
		</div >
	)
}

