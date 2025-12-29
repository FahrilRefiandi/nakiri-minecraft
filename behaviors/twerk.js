import { BOT_MODE, BOT_STATE } from '#utils/bot_status'

export function mimicTwerk(bot) {
  if (BOT_STATE.isEating) return
  if (BOT_STATE.mode !== BOT_MODE.IDLE) return
  if (bot.pathfinder.isMoving()) return

  const filter = (e) => e.type === 'player'
  const player = bot.nearestEntity(filter)

  if (!player) {
    bot.setControlState('sneak', false)
    return
  }

  const dist = bot.entity.position.distanceTo(player.position)
  if (dist > 3) {
    bot.setControlState('sneak', false)
    return
  }

  const isCrouching = player.metadata[0] & 0x02

  if (isCrouching) {
    bot.setControlState('sneak', true)
  } else {
    bot.setControlState('sneak', false)
  }
}
