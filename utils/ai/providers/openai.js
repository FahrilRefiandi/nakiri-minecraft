import OpenAI from 'openai'
import BaseProvider from '#utils/ai/index'
import env from '#start/env'

export default class OpenAIProvider extends BaseProvider {
  constructor() {
    super('openai')
    this.apiKey = env.get('OPENAI_API_KEY')
    this.model = env.get('OPENAI_MODEL')
  }

  async chat(message, options = {}) {
    try {
      const client = new OpenAI({ apiKey: this.apiKey })
      const completion = await client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI.',
          },
          { role: 'user', content: message },
        ],
        ...options,
      })

      return this.formatResponse({
        content: completion.choices[0].message.content,
        model: completion.model,
      })
    } catch (error) {
      return this.formatError(error)
    }
  }
}
