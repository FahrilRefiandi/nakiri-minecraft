export function lookAtNearestPlayer(bot) {
  const filter = (e) => e.type === 'player' && e.username !== bot.username
  const entity = bot.nearestEntity(filter)
  if (entity) {
    const position = entity.position.offset(0, entity.height, 0)
    bot.lookAt(position, true)
  }
}
