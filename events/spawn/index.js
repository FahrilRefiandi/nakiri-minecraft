import { BOT_STATE } from '#utils/bot_status'

export default async (bot) => {
  bot.once('spawn', () => {
    bot.chat('/logout')

    BOT_STATE.spawnPoint = bot.entity.position.clone()
  })
}
