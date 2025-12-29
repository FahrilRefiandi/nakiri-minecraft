import { lookAtNearestPlayer } from '#behaviors/look_at'
import { mimicTwerk } from '#behaviors/twerk'
import { wander } from '#behaviors/wander'

export default async (bot) => {
  bot.on('physicTick', () => {
    lookAtNearestPlayer(bot)
    mimicTwerk(bot)
    // wander(bot)
  })
}
