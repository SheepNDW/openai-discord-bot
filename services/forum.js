import config from '../config'
import { replyMessage } from '../utils/replyMessage'
import { aiAssistant } from './aiAssistant'

const { OPEN_AI_GPT_PERSONA } = config
const { defaultReplyMessage, errorMessage } = replyMessage()

/**
 * 論壇 Bot 回應訊息
 * @param {import("discord.js").Message} message
 */
export async function forumMessageHandler(message) {
  /** @type {import("discord.js").Message<false> | import("discord.js").Message<true> | null} */
  let cacheMsg = null

  try {
    cacheMsg = await message.channel.send(defaultReplyMessage)
    const forumMessages = await message.channel.messages.fetch()
    const reverseMessages = forumMessages.reverse()
    const messages = reverseMessages.map((msg) => {
      if (msg.author.bot) {
        if (msg.content === defaultReplyMessage) return null

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

    messages.unshift({
      role: 'user',
      content: OPEN_AI_GPT_PERSONA,
    })

    const aiResponse = await aiAssistant(messages)
    await cacheMsg.delete()
    message.reply(aiResponse)
  } catch (error) {
    console.error(error)

    await cacheMsg.delete()

    message.reply(errorMessage({
      status: error.response.status,
      statusText: error.response.statusText,
    }))
  }
}
