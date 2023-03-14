import config from '../config'
import { channelMessageHandler } from './channel'
import { forumMessageHandler } from './forum'

const { DISCORD_CHANNEL_ID, DISCORD_FORUM_ID, DISCORD_MODE } = config

/**
 * 處理 Bot 回應訊息
 * @param {import("discord.js").Message} message
 * @param {import("discord.js").Client} client
 */
export async function messageHandler(message, client) {
  // console.log(`「${message.channel.name}」${message.author.username}：${message.content} `)

  switch (DISCORD_MODE) {
    case 'channel':
      if (message.channel.id !== DISCORD_CHANNEL_ID || !message.mentions.has(client.user)) return
      channelMessageHandler(message)
      break
    case 'forum':
      if (message.channel.parentId !== DISCORD_FORUM_ID) return
      forumMessageHandler(message)
      break
    case 'all':
      if (message.channel.id === DISCORD_CHANNEL_ID && message.mentions.has(client.user)) channelMessageHandler(message)
      if (message.channel.parentId === DISCORD_FORUM_ID) forumMessageHandler(message)
      break
    default:
      console.error('invalid mode')
      break
  }
}
