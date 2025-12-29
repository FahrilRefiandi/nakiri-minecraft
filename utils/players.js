export function getNearestPlayer(bot, maxDistance = 6) {
  let nearest = null
  let nearestDist = maxDistance

  for (const name in bot.players) {
    if (name === bot.username) continue

    const p = bot.players[name]
    if (!p.entity) continue

    const dist = bot.entity.position.distanceTo(p.entity.position)
    if (dist < nearestDist) {
      nearest = p.entity
      nearestDist = dist
    }
  }

  return nearest
}
