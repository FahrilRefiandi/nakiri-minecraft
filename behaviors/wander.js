import pathfinder from 'mineflayer-pathfinder'
import consola from 'consola'
import { BOT_STATE, BOT_MODE } from '#utils/bot_status'

export function wander(bot) {
  // 1. Cek Syarat:
  // - Harus mode IDLE (bukan Follow/Guard)
  // - Tidak sedang makan
  // - Tidak sedang jalan (biar tujuannya gak gonta-ganti tiap detik)
  if (BOT_STATE.mode !== BOT_MODE.IDLE) return
  if (BOT_STATE.isEating) return
  if (bot.pathfinder.isMoving()) return

  // 2. Random Chance (Agar tidak jalan non-stop)
  // Ada kemungkinan 1% setiap tick bot akan memutuskan untuk jalan.
  // Sesuaikan angkanya: 0.01 (jarang) - 0.05 (sering)
  if (Math.random() > 0.02) return

  try {
    // 3. Tentukan Jarak Random (Radius)
    const range = 10 // Bot akan jalan max 10 blok dari posisi sekarang

    // Hitung koordinat acak
    const currentPos = bot.entity.position
    const rX = (Math.random() * range) - (range / 2)
    const rZ = (Math.random() * range) - (range / 2)

    const targetX = currentPos.x + rX
    const targetZ = currentPos.z + rZ

    // 4. Eksekusi Jalan
    // Kita pakai GoalNear (mendekat dalam jarak 1 blok)
    // Kita tetapkan Y sama dengan posisi bot agar dia tidak mencoba memanjat tebing tinggi/terjun
    const goal = new pathfinder.goals.GoalNear(targetX, currentPos.y, targetZ, 1)

    consola.info(`[ WANDER ] Jalan-jalan gabut ke X:${Math.floor(targetX)} Z:${Math.floor(targetZ)}`)
    bot.pathfinder.setGoal(goal)

  } catch (e) {
    // Error biasanya terjadi kalau pathfinder belum siap, abaikan saja
  }
}
