import * as dotenv from 'dotenv'
dotenv.config()

const { env } = process

export default {
  DISCORD_BOT_TOKEN: env.DISCORD_BOT_TOKEN,
  DISCORD_CHANNEL_ID: env.DISCORD_CHANNEL_ID,
  DISCORD_CHANNEL_MAX_MESSAGE: Number(env.DISCORD_CHANNEL_MAX_MESSAGE) || 5,
  OPEN_AI_API_KEY: env.OPEN_AI_API_KEY,
  OPEN_AI_GPT_MODEL: env.OPEN_AI_GPT_MODEL || 'text-curie-001',
  OPEN_AI_MAX_TOKENS: Number(env.OPEN_AI_MAX_TOKENS) || 100,
  MAX_TEXT_LENGTH: Number(env.MAX_TEXT_LENGTH) || 1000,
}
