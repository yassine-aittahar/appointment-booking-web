const env = 'dev'

let envConfig = {}

switch (env) {
  case 'dev':
  case 'development':
    envConfig = require('./dev').config
    break
  case 'test':
  case 'testing':
    envConfig = require('./test').config
    break
  default:
    envConfig = require('./dev').config
}

export default envConfig
