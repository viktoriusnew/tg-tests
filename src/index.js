require('dotenv').config();
const { Telegraf } = require('telegraf');

const handleStart = require('./handlers/start');
const handleHelp = require('./handlers/help');
const handleEcho = require('./handlers/echo');

const botToken = process.env.BOT_TOKEN;
if (!botToken) {
  // Без токена нет смысла продолжать
  console.error('Ошибка: BOT_TOKEN не найден. Укажите его в файле .env');
  process.exit(1);
}

const bot = new Telegraf(botToken);

// Команды
bot.start(handleStart);
bot.help(handleHelp);

// Эхо для текстов
bot.on('text', handleEcho);

// Обработка инлайн-кнопок
bot.on('callback_query', async (ctx) => {
  const data = ctx.callbackQuery?.data;
  if (data === 'HELP') {
    await ctx.answerCbQuery();
    return ctx.reply('Доступные команды:\n/start — приветствие\n/help — эта справка');
  }
  await ctx.answerCbQuery();
});

// Игнорируем и молча глотаем остальные типы сообщений, чтобы не падать
bot.on('message', () => {});

async function launch() {
  try {
    // На всякий случай удаляем webhook, чтобы polling работал
    await bot.telegram.deleteWebhook().catch(() => {});
    await bot.launch();
    console.log('Бот запущен (long polling)');
  } catch (error) {
    console.error('Не удалось запустить бота:', error);
    process.exit(1);
  }
}

launch();

// Graceful shutdown
process.once('SIGINT', () => {
  console.log('Остановка по SIGINT');
  bot.stop('SIGINT');
});
process.once('SIGTERM', () => {
  console.log('Остановка по SIGTERM');
  bot.stop('SIGTERM');
});


