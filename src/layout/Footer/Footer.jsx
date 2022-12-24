import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Footer.module.scss';
import cn from 'classnames';
import { setTheme } from '../../redux/theme/theme-slice';
//=========================================================================================================================

export const Footer = () => {
	const dispatch = useDispatch();
	const theme = useSelector(state => state.theme.theme)

	const changeTheme = () => {
		dispatch(setTheme(theme === 'brown' ? 'yellow' : 'brown'))
	}


	React.useEffect(() => {
		document.body.setAttribute('data-theme', theme)
	})

	return (
		<footer className={styles.footer}>
			<div className={styles.create}>Created by <span>Hexfair</span></div>
			<div className={styles.colors} >
				<span className={styles.label}>Theme:</span>
				<div className={styles.item}>brown</div>
				<div
					className={cn(`${styles.circle}`, `${theme === 'yellow' ? styles.active : ''}`)}
					onClick={changeTheme}>
				</div>
				<div className={styles.item}>blue</div>
			</div>
		</footer>
	)
}
