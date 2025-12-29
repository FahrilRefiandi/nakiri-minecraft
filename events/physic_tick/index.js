import { lookAtNearestPlayer } from '#behaviors/look_at'
import { wander } from '#behaviors/wander'

export default async (bot) => {
  bot.on('physicTick', () => {
    if (!bot.pathfinder.isMoving()) {
      lookAtNearestPlayer(bot)
      wander(bot)
    }
  })
}
