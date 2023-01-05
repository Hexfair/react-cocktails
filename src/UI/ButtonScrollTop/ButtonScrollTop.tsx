import styles from './ButtonScrollTop.module.scss'
//=========================================================================================================================

// Компонент кнопки (стрелка) скрола наверх ===============================================================================
export const ButtonScrollTop = () => {
	return (
		<button className={styles.buttonBack} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" >
				<path d="M894.9,96.3l665,749.7h-374.6v850.3L894.9,1406l-290.3,290.3V846H232.1L894.9,96.3z" />
			</svg>
		</button>
	)
}
