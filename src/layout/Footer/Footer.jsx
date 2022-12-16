import React from 'react';
import styles from './Footer.module.scss';
//=========================================================================================================================

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.create}>Created by <span>Hexfair</span></div>
			<div className={styles.back}>Home</div>
		</footer>
	)
}
