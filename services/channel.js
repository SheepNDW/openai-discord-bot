import config from '../config'
import { replyMessage } from '../utils/replyMessage'
import { aiAssistant } from './aiAssistant'

const { DISCORD_CHANNEL_MAX_MESSAGE, OPEN_AI_GPT_PERSONA } = config
const { defaultReplyMessage, errorMessage } = replyMessage()

/**
 * 文字頻道 Bot 回應訊息
 * @param {import("discord.js").Message} message
 */
export async function channelMessageHandler(message) {
  let cacheMsg = null
  try {
    cacheMsg = await message.channel.send(defaultReplyMessage)

    let messages = []
    if (DISCORD_CHANNEL_MAX_MESSAGE === 1) {
      messages.push({
        role: 'user',
        content: message.content,
      })
    } else {
      const channelMessageData = await message.channel.messages.fetch({
        limit: DISCORD_CHANNEL_MAX_MESSAGE + 1,
      })
      const reverseMessages = channelMessageData.reverse()
      messages = reverseMessages.map((msg) => {
        if (msg.author.bot) {
          if (msg.content === defaultReplyMessage)
            return null

          return {
            role: 'system',
            content: msg.content,
          }
        }

        return {
          role: 'user',
          content: msg.content,
        }
      }).filter(msg => msg !== null)
    }

    messages.unshift({
      role: 'user',
      content: OPEN_AI_GPT_PERSONA,
    })

    const aiResponse = await aiAssistant(messages)

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
