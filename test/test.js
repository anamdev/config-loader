const { expect } = require('chai')
const deepEqualInAnyOrder = require('deep-equal-in-any-order')
const utils = require('../lib/utils')

require('chai').use(deepEqualInAnyOrder)

describe('merge', () => {
  it('should merge Objects and all nested Ones', () => {
    const obj1 = { a: { a1: 'A1' }, c: 'C', d: {} }
    const obj2 = { a: { a2: 'A2' }, b: { b1: 'B1' }, d: null }
    const obj3 = {
      a: { a1: 'A1', a2: 'A2' }, c: 'C', d: null, b: { b1: 'B1' },
    }
    expect(utils.merge({}, obj1, obj2)).to.deep.equalInAnyOrder(obj3)
  })
  it('should behave like Object.assign on the top level', () => {
    const obj1 = { a: { a1: 'A1' }, c: 'C' }
    const obj2 = { a: undefined, b: { b1: 'B1' } }
    expect(utils.merge({}, obj1, obj2)).to.deep.equalInAnyOrder({ ...obj1, ...obj2 })
  })
  it('should not merge array values, just override', () => {
    const obj1 = { a: ['A', 'B'] }
    const obj2 = { a: ['C'], b: ['D'] }
    expect(utils.merge({}, obj1, obj2)).to.deep.equalInAnyOrder({ a: ['C'], b: ['D'] })
  })
})

describe('loadFiles', () => {
  it('should load the files correctly', () => {
    const files = ['config/config.json', 'config/config.production.json']
    utils.loadFiles(files, (err, res) => {
      const obj = {
        environment: 'production',
        database: {
          host: 'mysql',
          port: 3306,
          username: 'divido',
          password: 'divido'
        },
        cache: { redis: { host: 'redis', port: 6379 } },
        email: false
      }
      expect(err).equal(null)
      expect(typeof res).equal('object')
      expect(res).to.deep.equalInAnyOrder(obj)
    })
  })
})
