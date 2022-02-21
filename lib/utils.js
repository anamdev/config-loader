const fs = require('fs')
const async = require('async')
const formats = require('./formats')

const utils = exports

const format = formats.json // TODO: make it configurable

const isObject = (obj) => obj && typeof obj === 'object'

const merge = (...objects) => objects.reduce((aggr, obj) => {
  Object.keys(obj).forEach((key) => {
    const aVal = aggr[key]
    const oVal = obj[key]

    if (Array.isArray(aVal) && Array.isArray(oVal)) {
      aggr[key] = oVal
    } else if (isObject(aVal) && isObject(oVal)) {
      aggr[key] = merge(aVal, oVal)
    } else {
      aggr[key] = oVal
    }
  })

  return aggr
}, {})

const parseFile = (file, next) => {
  fs.readFile(file, (err, data) => {
    const res = data.toString() !== '' ? format.parse(data.toString()) : {}
    return !err
      ? next(null, res)
      : next(err)
  })
}

const loadFiles = (files, callback) => {
  if (!files) {
    return callback(null, {})
  }

  async.map(files, parseFile, (err, objs) => (err ? callback(err) : callback(null, merge(...objs))))
}

utils.loadFiles = loadFiles
utils.merge = merge