const config = require('./lib/config')

const files = ['config/config.json', 'config/config.production.json']
config.init({
  files,
  format: 'json',
}, (err, res) => {
  console.log('ENV', res.environment)
  console.log('DB PORT', res.database.port)
  console.log('CACHE', res.cache)
})