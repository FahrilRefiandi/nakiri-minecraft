import { autoEat } from '#behaviors/eat'

export default async (bot) => {
  bot.on('health', () => {
    autoEat(bot)
  })
}
