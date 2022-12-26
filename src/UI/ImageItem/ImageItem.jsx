import React from "react";
import noImage from '../../assets/no-image.png';
//=========================================================================================================================

// Компонент подгрузки изображения в ингредиенте ==========================================================================
export const ImageItem = ({ srcData }) => {

	/* Если картинка не подгрузилась (URL-адрес не действителен), то
	срабатывает событие onError, по которому картинка подменется 
	пользовательской картинкой noImage */
	const [visibleImage, setVisibleImage] = React.useState(true);
	React.useEffect(() => {
		setVisibleImage(true)
	}, [srcData])

	const changeImage = () => setVisibleImage(false);

	return (
		<>
			{visibleImage ? <img src={srcData} alt='' onError={changeImage} /> : <img src={noImage} alt='' />}
		</>
	)
}