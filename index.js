const config = require('./lib/config')

const files = ['config/config.json', 'config/config.production.json']

config.init({
  files,
  format: 'json'
})

let cnf = config.getConfig()

console.log(1, cnf)

let cnf1 = config.getConfigUsingObj('cache.redis')

console.log(2, cnf1)
