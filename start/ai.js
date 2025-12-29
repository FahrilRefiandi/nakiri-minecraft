import OpenAIProvider from '#utils/ai/providers/openai'
import GeminiProvider from '#utils/ai/providers/gemini'
import env from '#start/env'

class AIManager {
  constructor() {
    this.providers = {
      openai: new OpenAIProvider(),
      gemini: new GeminiProvider(),
    }

    this.activeProvider = env.get('AI_PROVIDER')
  }

  driver(name = null) {
    const driverName = name || this.activeProvider
    const provider = this.providers[driverName]

    if (!provider) {
      throw new Error(`Provider AI [${driverName}] tidak didukung.`)
    }

    return provider
  }

  async chat(message, options = {}) {
    return this.driver().chat(message, options)
  }
}

const ai = new AIManager()
export default ai
