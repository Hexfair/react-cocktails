import React from 'react';
import styles from './BurgerMenu.module.scss';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setBurgerStatus } from '../../redux/burgerMenu/burgerMenu';
import { burgerOpenOrClose } from '../../utils/burgerMenuOpen';
//=========================================================================================================================

export const BurgerMenu = () => {
	const dispatch = useDispatch();
	const isBurgerMenuOpen = useSelector(state => state.burger.isBurgerMenuOpen);

	const burgerMenuOpen = (value) => {
		dispatch(setBurgerStatus(value));
		burgerOpenOrClose(value);

		//document.body.classList.toggle('active');
	}
	return (
		<div
			className={cn(`${styles.burger}`, `${isBurgerMenuOpen ? styles.active : ''}`)}
			onClick={() => burgerMenuOpen(!isBurgerMenuOpen)}
		>
			<span></span>
		</div >
	)
}

