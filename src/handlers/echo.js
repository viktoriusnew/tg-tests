module.exports = function handleEcho(ctx) {
  const text = ctx.message?.text ?? '';
  if (!text) return;
  return ctx.reply(`Эхо: ${text}`);
};


