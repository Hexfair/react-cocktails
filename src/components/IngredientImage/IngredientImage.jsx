import React from "react"
import { getSmallImageOfIngredient } from "../../api/api"
import noImage from '../../assets/no-image.png'

export const IngredientImage = ({ obj }) => {

	const [visibleImage, setVisibleImage] = React.useState(true)

	const changeImage = (e) => {
		if (e.type === 'error') {
			setVisibleImage(false)
		}
	}
	return (
		<>
			{visibleImage
				? <img src={getSmallImageOfIngredient(obj)} alt='' onError={changeImage} />
				: <img src={noImage} alt='' />}
		</>
	)
}