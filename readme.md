Обязательно добавьте поддержку [editorconfig](https://editorconfig.org/#download) в ваш редактор кода.

```bash
npm i             # установить зависимости
npm start         # запустить сервер разработки (остановить: Ctrl+C)
npm run bemlint   # проверить html-файлы папки build на соответствие BEM
npm run puglint   # проверить pug-файлы
npm run stylelint # проверить scss-файлы
```

Перед коммитом происходит автопроверка файлов. Если проверка выявила ошибки, они будут показаны в терминале.
