module.exports = function handleStart(ctx) {
  const firstName = ctx.from?.first_name || 'друг';
  return ctx.reply(`Привет, ${firstName}! Я эхо-бот. Напиши что-нибудь.`, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Помощь', callback_data: 'HELP' }
        ]
      ]
    }
  });
};


