import React from "react";
import noImage from '../../assets/no-image.png';
import styles from './ImageItem.module.scss';
//=========================================================================================================================

export const ImageItem = ({ srcData }) => {

	const [visibleImage, setVisibleImage] = React.useState(true)

	const changeImage = (e) => {
		if (e.type === 'error') {
			setVisibleImage(false)
		}
	}

	return (
		<>
			{visibleImage
				? <span className={styles.image}><img src={srcData} alt='' onError={changeImage} /></span>
				: <span className={styles.image}><img src={noImage} alt='' /></span>}
		</>
	)
}