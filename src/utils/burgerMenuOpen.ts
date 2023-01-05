/* Блокировка body (в частности, запрет скролла) 
при открытом меню на мобильном устройстве */
export const burgerOpenOrClose = (value: boolean) => {
	if (value) {
		document.body.classList.add('lock');
	} else {
		document.body.classList.remove('lock');
	}
}