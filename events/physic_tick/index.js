import { lookAtNearestPlayer } from '#behaviors/look_at'

export default async (bot) => {
  bot.on('physicTick', () => {
    if (!bot.pathfinder.isMoving()) {
      lookAtNearestPlayer(bot)
    }
  })
}
