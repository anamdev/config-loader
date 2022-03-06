const utils = require('./utils')
let ConfigLoder = function () {
  this.configObj = {}
  this.configMap = new Map()
}

ConfigLoder.prototype.init = async function (options) {
  const files = options.files || []

  const response = utils.loadFiles(files)
  this.configObj = response
  utils.createMap(response)
}

ConfigLoder.prototype.getConfig = function () {
  return this.configObj
}

//first way to get config value from obj
ConfigLoder.prototype.getConfigUsingObj = function (path) {
  if (!path || path == null) return undefined
  const pathArr = path.split(".")
  return utils.findConfVal(this.configObj, pathArr)
}

//second way to get config from Map
ConfigLoder.prototype.getConfigUsingMap = function (str) {
  //TODO
}

module.exports = new ConfigLoder