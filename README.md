# СК МК — Сайт частного агентства занятости

Аутстаффинг, аутсорсинг и подбор в штат. Строительство, логистика, производство.

## Структура проекта

```
skmk-site/
├── index.html                  # Главная страница
├── privacy.html                # Политика конфиденциальности
├── css/
│   └── main.css                # Все стили (дизайн-гайд v1.0)
├── js/
│   └── main.js                 # Интерактивность, маска телефона, форма
└── specialties/                # Страницы специальностей (14 шт.)
    ├── prorab.html
    ├── kamenshchik.html
    ├── plitochnik.html
    ├── shtukatur.html
    ├── krovelshchik.html
    ├── fasadchik.html
    ├── elektrik.html
    ├── santehnik.html
    ├── ventilyaciya.html
    ├── raznorabochiy.html
    ├── stroitel.html
    ├── voditel.html
    ├── sklad.html
    └── logistika.html
```

## Настройка перед деплоем

### 1. Google Sheets (отправка заявок)
В файле `js/main.js` замените URL на актуальный:
```js
var CLIENT_SHEET_URL = 'ВСТАВЬТЕ_СВОЙ_URL_GOOGLE_APPS_SCRIPT';
```

### 2. Ссылки на мессенджеры
В `index.html` и всех страницах специальностей замените:
```html
href="https://t.me/skmkagency"   →  ваш Telegram
href="https://vk.com/skmkagency"  →  ваша группа ВКонтакте
```

### 3. Политика конфиденциальности
Файл `privacy.html` уже есть в проекте. Проверьте актуальность данных.

## Дизайн

- Фон: `#FFFFFF`, карточки: `#F5F5F5`
- Акцентный: `#1E7A3A` (тёмно-зелёный)
- Шрифты: Unbounded (заголовки) + Raleway (текст) — Google Fonts
- Адаптивный: mobile-first, breakpoints 480 / 768 / 900 / 1100px

## Деплой на GitHub Pages

1. Создать репозиторий на GitHub
2. Загрузить все файлы в корень репозитория
3. Settings → Pages → Source: `main` branch, `/ (root)`
4. Сайт будет доступен по адресу `https://username.github.io/repo-name`

## Добавление новой специальности

1. Скопировать любой файл из `specialties/`
2. Обновить: `slug`, `name`, `title`, `desc`, `what`, `for`
3. Добавить ссылку в `index.html` в навигацию и в табы специальностей
4. Готово

## Контакты

- Телефон: +7 (931) 274-03-17
- Email: n9920044@gmail.com
