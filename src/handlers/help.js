module.exports = function registerHelp(bot) {
  bot.help(async (ctx) => {
    await ctx.reply('Доступные команды:\n/start — приветствие\n/help — помощь\nПросто напишите текст — я повторю его.');
  });
};


