import message from '#events/message/index'
import spawn from '#events/spawn/index'
import physicTick from '#events/physic_tick/index'
import healt from '#events/healt/index'

export default async (bot) => {
  message(bot)
  spawn(bot)
  physicTick(bot)
  healt(bot)
}
