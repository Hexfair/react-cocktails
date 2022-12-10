import React from 'react';
import styles from './SearchIcon.module.scss';
import { Link } from 'react-router-dom';

export const SearchIcon = () => {
	return (
		<Link to="/search" className={styles.search}  >
			<button className={styles.button} >
				<svg className={styles.icon} viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
					<path d="m28.102 23.421 -4.751 -4.751 -3.654 -1.51A10.255 10.255 0 0 0 21.563 11.25c0 -5.686 -4.626 -10.313 -10.313 -10.313S0.938 5.564 0.938 11.25s4.626 10.313 10.313 10.313a10.256 10.256 0 0 0 5.954 -1.897l1.506 3.645 4.751 4.751a3.281 3.281 0 1 0 4.641 -4.64ZM2.813 11.25c0 -4.652 3.785 -8.438 8.438 -8.438s8.438 3.785 8.438 8.438 -3.785 8.438 -8.438 8.438S2.813 15.902 2.813 11.25Zm23.963 15.485a1.408 1.408 0 0 1 -1.989 0l-4.487 -4.487 -1.4 -3.389 3.389 1.4 4.487 4.487a1.408 1.408 0 0 1 0 1.989Z" />
				</svg>
			</button>
		</Link >
	)
}
