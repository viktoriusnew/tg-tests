module.exports = function registerStart(bot) {
  bot.start(async (ctx) => {
    const name = ctx.from?.first_name || 'друг';
    await ctx.reply(`Привет, ${name}! Я эхо-бот. Напиши что-нибудь.`);
  });
};


