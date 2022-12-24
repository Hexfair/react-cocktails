import React from 'react';
import './Preloader.scss';
//=========================================================================================================================

export const Preloader = () => {
	return (
		<div className='preloader'>
			<svg className="svg-preloader" viewBox="0 0 120 120">
				<symbol id="s-circle">
					<circle cx="10" cy="10" r="10"></circle>
				</symbol>
				<g className="g-circles">
					<g className="g-circle"><use className="u-circle" href="#s-circle"></use></g>
					<g className="g-circle"><use className="u-circle" href="#s-circle"></use></g>
					<g className="g-circle"><use className="u-circle" href="#s-circle"></use></g>
					<g className="g-circle"><use className="u-circle" href="#s-circle"></use></g>
					<g className="g-circle"><use className="u-circle" href="#s-circle"></use></g>
					<g className="g-circle"><use className="u-circle" href="#s-circle"></use></g>
					<g className="g-circle"><use className="u-circle" href="#s-circle"></use></g>
					<g className="g-circle"><use className="u-circle" href="#s-circle"></use></g>
					<g className="g-circle"><use className="u-circle" href="#s-circle"></use></g>
					<g className="g-circle"><use className="u-circle" href="#s-circle"></use></g>
					<g className="g-circle"><use className="u-circle" href="#s-circle"></use></g>
					<g className="g-circle"><use className="u-circle" href="#s-circle"></use></g>
				</g>
			</svg>
		</div>
	);
}
