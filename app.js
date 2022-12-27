import { Client, GatewayIntentBits } from 'discord.js'
import config from './config'

const { DISCORD_BOT_TOKEN } = config

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('messageCreate', async (message) => {
  console.log('使用者發送的訊息：', message.content)
})

client.login(DISCORD_BOT_TOKEN)
