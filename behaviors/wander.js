import pathfinderPkg from 'mineflayer-pathfinder'
const { goals, Movements } = pathfinderPkg
import consola from 'consola'
import { BOT_STATE, BOT_MODE } from '#utils/bot_status'
let NEXt_WANDER_TIME = 0

export function wander(bot) {
  if (Date.now() < BOT_STATE.NEXt_WANDER_TIME) return

  if (BOT_STATE.mode !== BOT_MODE.IDLE) return
  if (BOT_STATE.isEating) return
  if (bot.pathfinder.isMoving()) return

  try {
    const moves = new Movements(bot)
    moves.canDig = false
    moves.allow1by1towers = false
    bot.pathfinder.setMovements(moves)

    // 3. Tentukan Tujuan (Logic Tetap Sama)
    const centerPoint = BOT_STATE.spawnPoint || bot.entity.position
    const range = 10

    const rX = (Math.random() * range) - (range / 2)
    const rZ = (Math.random() * range) - (range / 2)
    const targetX = centerPoint.x + rX
    const targetZ = centerPoint.z + rZ

    const goal = new goals.GoalNear(targetX, centerPoint.y, targetZ, 1)

    const delay = Math.random() * 10000 + 10000

    NEXt_WANDER_TIME = Date.now() + delay

    consola.info(`[ WANDER ] Jalan santai di area rumah... (Jeda berikutnya: ${Math.floor(delay/1000)}s)`)
    bot.pathfinder.setGoal(goal)

  } catch (e) {
    // Silent error
  }
}
