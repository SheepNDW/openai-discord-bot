import { client } from './connection'
import config from './config'
import { messageHandler } from './services'

const { DISCORD_BOT_TOKEN, DISCORD_CHANNEL_ID } = config

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('messageCreate', async (message) => {
  if (message.author?.bot) return
  if (message.channel.id === DISCORD_CHANNEL_ID) messageHandler(client, message)
})

client.login(DISCORD_BOT_TOKEN)
