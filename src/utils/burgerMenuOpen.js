export const burgerOpenOrClose = (value) => {
	if (value) {
		document.body.classList.add('lock');
	} else {
		document.body.classList.remove('lock');
	}
}