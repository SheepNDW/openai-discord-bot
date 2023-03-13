import config from '../config'
import { channelMessageHandler } from './channel'

const { DISCORD_CHANNEL_ID, DISCORD_MODE } = config

/**
 * 處理 Bot 回應訊息
 * @param {import("discord.js").Message} message
 */
export async function messageHandler(message) {
  console.log(`「${message.channel.name}」${message.author.username}：${message.content} `)

  // 只有在自己發話時會產生回應 for development
  if (message.author.tag !== 'Sheep#2929') return

  switch (DISCORD_MODE) {
    case 'channel':
      if (message.channel.id === DISCORD_CHANNEL_ID) channelMessageHandler(message)
      break
    case 'forum':
      console.log('forum only mode')
      break
    case 'all':
      console.log('all mode')
      break
    default:
      throw new Error('invalid mode')
  }
}
