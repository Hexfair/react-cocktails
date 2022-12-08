import React from "react";
import styles from './Glasses.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadGlassesItems } from "../../redux/glasses/glasses-slice";
import { DrinksBlock } from "../../components/DrinksBlock/DrinksBlock";
import { setBurgerStatus } from "../../redux/burgerMenu/burgerMenu";
import { burgerOpenOrClose } from "../../utils/burgerMenuOpen";
import { Preloader } from "../../components/Preloader/Preloader";
//=========================================================================================================================

export const Glasses = () => {
	const dispatch = useDispatch();
	const params = useParams();


	React.useEffect(() => {
		dispatch(loadGlassesItems(params.glass));
		dispatch(setBurgerStatus(false));
		burgerOpenOrClose(false);
	}, [dispatch, params.glass])


	const glassesItems = useSelector(state => state.glasses.glassesItems);
	const status = useSelector(state => state.glasses.status)
	const [visibleDrinks, setVisibleDrinks] = React.useState(20);
	const onClickButton = () => {
		setVisibleDrinks(visibleDrinks + 20)
	}

	let glasses = glassesItems.slice(0, visibleDrinks);


	if (status === 'pending') {
		return <Preloader />
	}

	return (
		<div className={styles.content}>
			<h2 className={styles.title}>Cocktail Glasses: <span>{params.glass}</span></h2>
			<DrinksBlock drinks={glasses} onClickButton={onClickButton} visibleDrinks={visibleDrinks} />
		</div>
	)
}
