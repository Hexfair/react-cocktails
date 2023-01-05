Второй проект by HexFair: === React-Cocktails ===

Применяемый стек: React, Redux-Toolkit, TypeScript, Axios, classnames, react-responsive, CSS-module.

Использовано API: https://www.thecocktaildb.com/api.php.

В проекте реализовано:
- адаптивная кроссбраузерная верстка. Реализовано выпадающее меню на экранах планшетов и мобильных телефонов;
- возможность переключения цветовой темы (коричневая и синяя);
- загрузка и вывод на главной странице алкогольных напитков по разным типам (алкогольные, безалкогольные, опционально-алкогольные, а также имитация загрузка популярных напитков);
- загрузка и вывод на отдельной странице перечня всех доступных ингредиентов;
- выпадающее меню из списка досутупных типов бокалов и категорий напитков;
- загрузка и вывод на отдельной странице напитков, в зависимости от выбранного типа бокала и категории напитка;
- реализована отдельная страница добавления кастомного (пользовательского) напитка. Форма содержит название напитка, ссылка на картинку и описание. Также реализовано динамическое добавление ингредиентов с подгрузкой картинки ингредиента  (либо картинки-заглушки - когда картинки не в базе);
- кастомный (пользовательский) напиток сохраняется на сервере (используется бесплатный https://mockapi.io/);
- реализовано добавление напитка в перечень "избранных". Эти напитки также сохраняются в LocalStorage и подгружаются из него в дальнейшем;
- реализована отдельная страница с детальной информацией о выбранном коктейле, в том числе подгрузка ингредиентов, описание напитка на разных языках (с переключением), вывод различных характеристик;
- реализовано отдельное окно (попап) с детальной информацией о выбранном ингредиенте. Имеется возможность открытия списка напитков, содержащих данный ингредиент;
- реализован Прелоадер на базе анимации SVG;
- реализована страница поиска коктейлей: по имени или по ингредиенту. Поиск осуществляется по файлу "api/AllCocktails.ts", так как https://www.thecocktaildb.com не предоставляет возможности осуществления удобного поиска по всей базе данных;
- реализована страница с любимыми напитками, содержащая два блока: избранные напитки и напитки пользователя. Напитки пользователя можно удалить с сервера https://mockapi.io/, нажав соответствующую кнопку;
- реализована кнопка "Показать еще", когда коктейлей на странице очень много;
- реализована кнопка плавной прокрутки наверх сайта, которая отображается после прокручивания страницы вниз на определенное количество пикселей;
- реализован ряд других мелких фич.
