import config from '../config'
import { replyMessage } from '../utils/replyMessage'
import { aiAssistant } from './aiAssistant'

const { DISCORD_CHANNEL_ID, DISCORD_CHANNEL_MAX_MESSAGE } = config
const { defaultReplyMessage, errorMessage } = replyMessage()

/**
 * 處理 Bot 回應訊息
 * @param {import("discord.js").Message} message
 */
export async function messageHandler(message) {
  console.log(`「${message.channel.name}」${message.author.username}：${message.content} `)

  if (message.channel.id === DISCORD_CHANNEL_ID) {
    let cacheMsg = null
    try {
      cacheMsg = await message.channel.send(defaultReplyMessage)

      let prompt = ''
      if (Number(DISCORD_CHANNEL_MAX_MESSAGE) === 1) {
        prompt = message.content
      } else {
        const channelMessageData = await message.channel.messages.fetch({
          limit: Number(DISCORD_CHANNEL_MAX_MESSAGE) + 1,
        })
        const channelMessageHistory = channelMessageData.map(msg => msg.content)
        prompt = channelMessageHistory
          .reverse()
          .filter(msg => msg !== defaultReplyMessage && msg !== '')
          .join('\n')
      }

      const aiResponse = await aiAssistant(prompt)
      await cacheMsg.delete()
      message.reply(aiResponse)
    } catch (error) {
      console.log(error)

      await cacheMsg.delete()

      message.reply(errorMessage({
        status: error.response.status,
        statusText: error.response.statusText,
      }))
    }
  }
}
