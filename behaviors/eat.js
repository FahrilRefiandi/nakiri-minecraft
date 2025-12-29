import MCData from 'minecraft-data'
const MinecraftData = MCData('1.21.8')
import consola from 'consola'
import { BOT_STATE } from '#utils/bot_status'
const NO_FOOD_CHAT_COOLDOWN = 30_000

export async function autoEat(bot) {
  if (BOT_STATE.isEating) return

  if (bot.food > 17) return

  BOT_STATE.isEating = true

  try {
    while (bot.food < 20) {
      const foodIds = MinecraftData.foodsArray.map((f) => f.id)
      const foodItem = bot.inventory
        .items()
        .find((item) => foodIds.includes(item.type))

      if (!foodItem) {
        consola.info('[BOT HEALTH] Tidak ada makanan di inventory.')

        const now = Date.now()
        if (now - BOT_STATE.lastNoFoodChatAt >= NO_FOOD_CHAT_COOLDOWN) {
          BOT_STATE.lastNoFoodChatAt = now
          bot.chat('Lapar banget… ada yang bisa kasih makanan?')
        }

        break
      }
      await bot.equip(foodItem, 'hand')

      consola.info(
        `[BOT HEALTH] Sedang makan ${foodItem.name}... (Food: ${bot.food}/20)`
      )
      await bot.consume()
      await bot.waitForTicks(10)
    }

    consola.success('[BOT HEALTH] Sudah kenyang!')
  } catch (e) {
    if (!e.message.includes('cancelled')) {
      consola.error(`[BOT HEALTH] Error: ${e.message}`)
    }
  } finally {
    BOT_STATE.isEating = false
  }
}
