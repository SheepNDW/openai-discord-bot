import { openAI } from '../connection'
import config from '../config'

const { OPEN_AI_GPT_MODEL, OPEN_AI_MAX_TOKENS } = config

export const aiAssistant = async (prompt) => {
  const { data } = await openAI.createCompletion({
    model: OPEN_AI_GPT_MODEL,
    prompt,
    max_tokens: Number(OPEN_AI_MAX_TOKENS),
  })
  console.log('data: ', data)
  const [choices] = data.choices

  return choices.text.trim() || '抱歉，我沒有話可說了。'
}
