import React from 'react';
import { Search } from '../Search/Search';
import styles from './Options.module.scss';
//=========================================================================================================================

export const Options = () => {
	return (
		<div className={styles.options}>
			<div className={styles.search}>
				<Search />
			</div>

			<div className={styles.favorite}>

			</div>
		</div>
	)
}

