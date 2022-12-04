import React from 'react';
import styles from './BurgerMenu.module.scss';
import cn from 'classnames';
//=========================================================================================================================

export const BurgerMenu = ({ isBurgerMenuOpen, setIsBurgerMenuOpen }) => {

	return (
		<div
			className={cn(`${styles.burger}`, `${isBurgerMenuOpen ? styles.active : ''}`)}
			onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
		>
			<span></span>
		</div >
	)
}

