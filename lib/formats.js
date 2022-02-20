const formats = exports

formats.json = {
  stringify(obj, replacer, spacing) {
    return JSON.stringify(obj, replacer || null, spacing || 2)
  },
  parse(str) {
    let parsedJSON
    try {
      parsedJSON = JSON.parse(str)
      return parsedJSON
    } catch (e) {
      // throw new Error('Invalid JSON')
      return {}
    }
  },
}
