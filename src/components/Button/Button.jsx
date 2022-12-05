import React from "react";
import styles from './Button.module.scss'
//=========================================================================================================================

export const Button = ({ label, onClickButton }) => {
	return (
		<button className={styles.btn} onClick={() => onClickButton()}>{label}</button>
	)
}