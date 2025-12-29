export default async (bot) => {
  bot.once('spawn', () => {
    bot.chat('/logout')
  })
}
