import mineflayer from 'mineflayer'
import { pathfinder } from 'mineflayer-pathfinder'
import events from '#events/index'
import env from '#start/env'

const bot = mineflayer.createBot({
  host: env.get('SERVER_HOST'),
  port: env.get('SERVER_PORT'),
  auth: 'offline',
  username: env.get('BOT_USERNAME'),
  version: false,
  connectTimeout: 30000,
  hideErrors: true,
})

// Load Plugins
bot.loadPlugin(pathfinder)

bot._client.on('packet', (data, meta) => {
  if (meta.name === 'world_particles') return
})

events(bot)
