/**
 * 配置1: cookie
 */
const cookie = ''

/**
 * 配置3: 要下单的信息
 * @key {boool} isOrder 是否购买
 * @key {number} maxAmount 价格上限
 */
const orderList = [{
  degree: '普通',
  isOrder: false,
  maxAmount: 1000
}, {
  degree: '稀有',
  isOrder: false,
  maxAmount: 1500
}, {
  degree: '卓越',
  isOrder: true,
  maxAmount: 3200
}, {
  degree: '史诗',
  isOrder: true,
  maxAmount: 12000
}, {
  degree: '神话',
  isOrder: true,
  maxAmount: 20000
}]

module.exports = {
  cookie,
  orderList
}