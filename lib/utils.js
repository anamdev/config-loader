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

const parseFile = (file) => {

  let data = fs.readFileSync(file, 'utf8')
  const res = data.toString() !== '' ? format.parse(data.toString()) : {}

  if (!res) return new Error('Unable to read file')
  else return res

}

const loadFiles = (files) => {
  if (!files) {
    return new Error('Files is required')
  }
  let data = files.map(function (file) {
    return parseFile(file)
  })

  return merge(...data)
}
const createMap = () => {
  //TODO
}

const findConfVal = (obj, pathArr) => {

  if (obj == null) return undefined

  let index = 0, len = pathArr.length
  while (obj != null && index < len) {
    obj = obj[pathArr[index++]];
  }

  return (index && index == len) ? obj : undefined;
}

utils.merge = merge
utils.loadFiles = loadFiles
utils.createMap = createMap
utils.findConfVal = findConfVal