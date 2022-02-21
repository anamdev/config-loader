const utils = require('./utils')

const config = exports

config.init = (options, cb) => {
  const files = options.files || []

  utils.loadFiles(files, cb)
}