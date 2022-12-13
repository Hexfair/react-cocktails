import React from "react";

export const useVisibleButton = () => {

	const [visibleBackButton, setVisibleBackButton] = React.useState(false);

	React.useEffect(() => {
		const handleScroll = () => {
			window.scrollY > 600 ? setVisibleBackButton(true) : setVisibleBackButton(false);
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return visibleBackButton;
}

