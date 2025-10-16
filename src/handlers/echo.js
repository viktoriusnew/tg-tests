module.exports = function registerEcho(bot) {
  bot.on('text', async (ctx) => {
    const text = ctx.message?.text ?? '';
    if (!text.trim()) return;
    await ctx.reply(`Эхо: ${text}`);
  });

  // Безопасно игнорируем не-текстовые апдейты, чтобы бот не падал
  bot.on(['sticker', 'photo', 'video', 'animation', 'document', 'voice', 'audio', 'video_note', 'contact', 'location', 'venue', 'poll', 'dice'], async (ctx) => {
    try {
      await ctx.reply('Я понимаю только текстовые сообщения 🙂');
    } catch (_) {
      // умышленно глушим, чтобы не ронять процесс из-за сетевых ошибок
    }
  });
};


