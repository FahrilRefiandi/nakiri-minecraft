import mineflayer from 'mineflayer'
import { pathfinder } from 'mineflayer-pathfinder'
import events from '#events/index'
import 'dotenv/config'

const bot = mineflayer.createBot({
  host: process.env.SERVER_HOST,
  port: process.env.SERVER_PORT,
  auth: 'offline',
  username: process.env.BOT_USERNAME,
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
