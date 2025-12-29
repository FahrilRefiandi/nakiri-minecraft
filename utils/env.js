import 'dotenv/config'

export class EnvSchema {
  static string(opts = {}) {
    return {
      type: 'string',
      default: opts.default,
      optional: opts.optional,
    }
  }

  static number(opts = {}) {
    return {
      type: 'number',
      default: opts.default,
      optional: opts.optional,
    }
  }

  static boolean(opts = {}) {
    return {
      type: 'boolean',
      default: opts.default,
      optional: opts.optional,
    }
  }

  static enum(values, opts = {}) {
    return {
      type: 'enum',
      values,
      default: opts.default,
      optional: opts.optional,
    }
  }
}

/**
|--------------------------------------------------------------------------
| Env Service
|--------------------------------------------------------------------------
*/
export class Env {
  static schema = EnvSchema

  constructor() {
    this.values = new Map()
  }

  static async create(schema) {
    const service = new Env()

    for (const key in schema) {
      const rule = schema[key]
      let raw = process.env[key]

      // Missing ENV
      if (raw === undefined || raw === '') {
        if (rule.default !== undefined) {
          service.values.set(key, rule.default)
          continue
        }

        if (rule.optional) {
          service.values.set(key, undefined)
          continue
        }

        throw new Error(`[ENV: ${key}] is required`)
      }

      // Cast value
      let casted = raw

      switch (rule.type) {
        case 'number': {
          casted = Number(raw)
          if (Number.isNaN(casted)) {
            throw new Error(`[ENV: ${key}] must be number`)
          }
          break
        }

        case 'boolean':
          casted = raw === 'true' || raw === '1'
          break

        case 'enum':
          if (!rule.values || !rule.values.includes(raw)) {
            throw new Error(
              `[ENV: ${key}] must be one of: ${rule.values.join(', ')}`
            )
          }
          casted = raw
          break

        case 'string':
        default:
          casted = raw
      }

      service.values.set(key, casted)
    }

    return service
  }

  get(key) {
    if (!this.values.has(key)) {
      throw new Error(`[ENV: ${key}] not registered in schema`)
    }

    return this.values.get(key)
  }
}
