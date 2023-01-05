import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Footer.module.scss';
import cn from 'classnames';
import { setTheme } from '../../redux/theme/theme-slice';
import { selectorTheme } from '../../redux/theme/theme-selectors';
//=========================================================================================================================

// Компонент футер, который также отвечает за цветовую тему проекта =======================================================
export const Footer = () => {
	const dispatch = useDispatch();

	/* Получение темы из редакса, изменение темы по клику */
	const theme = useSelector(selectorTheme)
	const changeTheme = () => {
		dispatch(setTheme(theme === 'brown' ? 'blue' : 'brown'))
	}

	React.useEffect(() => {
		document.body.setAttribute('data-theme', theme)
	}, [theme])

	return (
		<footer className={styles.footer}>
			<div className={styles.create}>Created by <span>Hexfair</span></div>
			<div className={styles.colors} >
				<span className={styles.label}>Theme:</span>
				<div className={styles.item}>brown</div>
				<div
					className={cn(`${styles.circle}`, `${theme === 'blue' ? styles.active : ''}`)}
					onClick={changeTheme}>
				</div>
				<div className={styles.item}>blue</div>
			</div>
		</footer>
	)
}
