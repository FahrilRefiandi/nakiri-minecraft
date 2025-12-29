import { GoogleGenerativeAI } from '@google/generative-ai'
import BaseProvider from '#utils/ai/index'
import env from '#start/env'

export default class GeminiProvider extends BaseProvider {
  constructor() {
    super('gemini')
    this.apiKey = env.get('GEMINI_API_KEY')
    this.model = env.get('GEMINI_MODEL')
  }

  async chat(message, options = {}) {
    try {
      const genAI = new GoogleGenerativeAI(this.apiKey)
      const model = genAI.getGenerativeModel({
        model: this.model,
        systemInstruction: ``,
      })
      const result = await model.generateContent(message)

      return this.formatResponse({
        content: result.response.text(),
        model: this.model,
      })
    } catch (error) {
      return this.formatError(error)
    }
  }
}
