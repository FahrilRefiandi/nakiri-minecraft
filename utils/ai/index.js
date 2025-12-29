export default class AI {
  constructor(providerName) {
    this.providerName = providerName
  }

  async chat(message, options = {}) {
    throw new Error('Method chat() harus diimplementasikan')
  }

  formatResponse(data) {
    return {
      ok: true,
      content: data.content,
      provider: this.providerName,
      model: data.model,
    }
  }

  formatError(error) {
    return {
      ok: false,
      error: error.message || error,
      provider: this.providerName,
    }
  }
}