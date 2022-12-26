import React from "react";
//=========================================================================================================================

/* Хук отображает кнопку скролла вверх при скроле страницы более 600px */
export const useVisibleButton = () => {
	const [visibleTopButton, setVisibleTopButton] = React.useState(false);

	React.useEffect(() => {
		const handleScroll = () => {
			window.scrollY > 600 ? setVisibleTopButton(true) : setVisibleTopButton(false);
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return visibleTopButton;
}
