const Mongo = require('./db/Mongo')

class Logger {
  constructor (config) {
    if (config.hasOwnProperty('mongo')) {
      this.db = new Mongo(config.mongo)
    }
    else {
      throw new Error('Database client not set!')
    }
  }

  record (type, ...aData) {
    this.db.insertOne(type, this.normalize(aData))
  }

  delete (...types) {
    for (const type of types) {
      this.db.deleteMany(type)
    }
  }

  normalize (aData) {
    let arr = []
    for (let data of aData) {
      if (typeof data === 'string') {
        arr.push(data)
      }
      else {
        arr.push(JSON.stringify(data))
      }
    }
    return arr.join('')
  }
}

const __aLoggers = {}

module.exports = {
  createLogger (config, logger = null) {
    if (typeof logger === 'string') {
      return __aLoggers[logger] = new Logger(config)
    }
    if (typeof config === 'string') {
      if (!__aLoggers.hasOwnProperty(config)) throw  new Error(`Manager '${config}' doesn't exists!`)
      return __aLoggers[config]
    }
    return new Logger(config)
  }
}
