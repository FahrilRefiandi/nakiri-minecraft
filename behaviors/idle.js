import { BOT_MODE, BOT_STATE } from '#utils/bot_status'

export function startIdleBehavior(bot) {
  let lastEntity = null
  let staring = false
  let nextChange = 0

  setInterval(() => {
    if (!bot.entity) return
    if (BOT_STATE.mode !== BOT_MODE.IDLE) return

    const entity = bot.nearestEntity()

    const entityInView =
      entity &&
      entity.position.distanceTo(bot.entity.position) < 10 &&
      entity.name !== 'enderman' &&
      !(entity.type === 'player' && entity.username === bot.username)

    if (entityInView && entity !== lastEntity) {
      staring = true
      lastEntity = entity
      nextChange = Date.now() + Math.random() * 1000 + 4000
    }

    if (entityInView && staring) {
      const isBaby = entity.type !== 'player' && entity.metadata?.[16]
      const height = isBaby ? entity.height / 2 : entity.height

      bot.lookAt(entity.position.offset(0, height, 0), false)
    }

    if (!entityInView) {
      lastEntity = null
    }

    if (Date.now() > nextChange) {
      staring = Math.random() < 0.3

      if (!staring) {
        const yaw = Math.random() * Math.PI * 2
        const pitch = (Math.random() * Math.PI) / 2 - Math.PI / 4
        bot.look(yaw, pitch, false)
      }

      nextChange = Date.now() + Math.random() * 10000 + 2000
    }
  }, 500)
}
