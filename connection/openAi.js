import { Configuration, OpenAIApi } from 'openai'
import config from '../config'

const { OPEN_AI_API_KEY } = config

const configuration = new Configuration({
  apiKey: OPEN_AI_API_KEY,
})

export const openAI = new OpenAIApi(configuration)
