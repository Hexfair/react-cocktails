import { useMediaQuery } from 'react-responsive';
//=========================================================================================================================

export const useMedia = () => {
	const isMobile = useMediaQuery({ query: '(max-width: 450px)' });
	const isTablet = useMediaQuery({ query: '(max-width: 880px)' });
	return { isMobile, isTablet }
}

