# PRD: Telegram-бот (Node.js + Telegraf)

## 🎯 Цель

Создать минималистичного Telegram-бота, работающего локально, без базы данных и без внешних зависимостей. Бот отвечает на команду `/start` и повторяет любые текстовые сообщения (эхо).

## 🧩 Функциональные требования

* `/start` — приветственное сообщение.
* `/help` — краткая справка.
* Любое текстовое сообщение возвращается как `Эхо: <текст>`.
* Не ломается при получении стикеров, фото и других типов сообщений.

## ⚙️ Технические детали

* Язык: **Node.js (CommonJS)**
* Фреймворк: **Telegraf**
* Конфигурация: `.env` с переменной `BOT_TOKEN`
* Локальный запуск через **long polling** (`bot.launch()`)
* Скрипты в `package.json`:

  * `start` — `node src/index.js`
  * `dev` — `nodemon src/index.js`

## 📁 Структура проекта

```
telegram-echo-bot/
├─ src/
│  ├─ index.js
│  └─ handlers/
│     ├─ start.js
│     ├─ help.js
│     └─ echo.js
├─ .env.example
├─ .gitignore
├─ package.json
└─ README.md
```

## 🚀 Логика запуска

1. Загрузить `BOT_TOKEN` из `.env`.
2. Проверить наличие токена, иначе завершить с ошибкой.
3. Удалить возможный старый webhook (`bot.telegram.deleteWebhook()`).
4. Запустить polling (`bot.launch()`).
5. Обрабатывать SIGINT и SIGTERM — аккуратно останавливать `bot.stop()`.

## 🧠 Обработка команд

* `start.js`: отправляет приветствие.
* `help.js`: показывает список команд.
* `echo.js`: отвечает эхо.

## 📜 Acceptance Criteria

* Бот успешно запускается локально (`npm start`).
* `/start` и `/help` отвечают корректно.
* Текстовые сообщения повторяются.
* Не падает на медиа/стикерах.
* Graceful shutdown по Ctrl+C.

## 🪄 Следующие шаги

* Добавить кнопки (`ReplyKeyboardMarkup` / `InlineKeyboardButton`).
* Реализовать хранение состояния (JSON / SQLite).
* Подключить деплой (Railway / Render / Fly.io).