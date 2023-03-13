import { client } from './connection'
import config from './config'
import { messageHandler } from './services'

const { DISCORD_BOT_TOKEN } = config

client.once('ready', (c) => {
  console.log(`Logged in as ${c.user.tag}!`)
})

client.on('messageCreate', async (message) => {
  if (message.author?.bot) return
  messageHandler(message, client)
})

client.login(DISCORD_BOT_TOKEN)
