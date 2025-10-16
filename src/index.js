require('dotenv').config();
const { Telegraf } = require('telegraf');

const botToken = process.env.BOT_TOKEN;
if (!botToken) {
  // Используем явный вывод ошибки и корректный код завершения
  console.error('Не задан BOT_TOKEN в .env');
  process.exit(1);
}

const bot = new Telegraf(botToken);

// Подключаем обработчики
const registerStart = require('./handlers/start');
const registerHelp = require('./handlers/help');
const registerEcho = require('./handlers/echo');

registerStart(bot);
registerHelp(bot);
registerEcho(bot);

async function launch() {
  try {
    // Удаляем возможный старый webhook перед запуском long polling
    await bot.telegram.deleteWebhook().catch(() => {});

    await bot.launch();
    console.log('Бот запущен (long polling)');

    // Graceful shutdown
    process.once('SIGINT', () => {
      console.log('SIGINT получен. Останавливаю бота...');
      bot.stop('SIGINT');
    });
    process.once('SIGTERM', () => {
      console.log('SIGTERM получен. Останавливаю бота...');
      bot.stop('SIGTERM');
    });
  } catch (error) {
    console.error('Ошибка запуска бота:', error);
    process.exit(1);
  }
}

launch();


