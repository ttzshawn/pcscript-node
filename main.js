const axios = require('axios')
const vorpal = require('vorpal')()
const config = require('./config')

axios.interceptors.request.use((c) => {
  c.headers.Cookie = config.cookie
  return c
}, error => Promise.reject(error))

const getRequestId = () => {
  return Math.floor(new Date())
}

const URLs = {
  list: 'https://pet-chain.baidu.com/data/market/queryPetsOnSale',
  gen: 'https://pet-chain.baidu.com/data/captcha/gen',
  order: 'https://pet-chain.baidu.com/data/txn/create'
}

const sortTypes = {
  aa: 'AMOUNT_ASC',
  cd: "CREATETIME_DESC"
}

/**
 * 获取验证码并输出到当前目录
 * @param {*} petId 
 * @param {*} amount 
 * @param {*} validCode 
 */
const gen = async (petId, amount, validCode) => {
  try {
    const res = await axios.post(URLs.gen, {
      "requestId": getRequestId(), "appId": 1, "tpl": ""
    })
    const captcha = res.data.data
    const { seed, img } = captcha
    console.log(`得到验证码和Seed: ${seed}`)

    const base64Data = img
    require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
      console.log(err)
    })

    vorpal
      .delimiter('请输入验证码，格式为[a xxxx]: ')
      .show()
      .command('a <captcha>', 'Executes arbitrary sql.')
      .action((args, cb) => {
        const captcha = args.captcha
        order(petId, amount, validCode, seed, captcha)
      })
    // return captcha
  } catch (err) {
    // console.log(err.response.status)
  }
}

let pageNo = 0

const getCheapestPet = async () => {
  pageNo = pageNo >= 5 ? 1 : pageNo + 1
  try {
    console.log(`第${pageNo}页`)
    const res = await axios.post(URLs.list, {
      pageNo,
      'pageSize': 20,
      'querySortType': sortTypes.cd,
      'petIds': [],
      'lastAmount': null,
      'lastRareDegree': null,
      'requestId': getRequestId(),
      'appId': 1,
      'tpl': ''
    })
    
    const pets = res.data.data.petsOnSale
    pets.forEach(item => {
      const { petId, amount, validCode, rareDegree } = item
      const order = config.orderList[rareDegree]
      if (order.isOrder) {
        console.log(`${order.degree}: ${amount}`)
        if (amount <= order.maxAmount) {
          clearInterval(timmer)
          gen(petId, amount, validCode)
        }
      }
    })
  } catch (err) {
    // console.log('获取失败')
  }
}

const order = async (petId, amount, validCode, seed, captcha) => {
  console.log(`开始下单${petId} ${amount} ${validCode} ${seed} ${captcha}`)
  try {
    const res = await axios.post(URLs.order, {
      petId,
      amount,
      seed,
      captcha,
      validCode,
      "requestId": getRequestId(),
      "appId": 1,
      "tpl": ""
    })
    const result = res.data
    console.log(`下单结果: ${result.errorMsg}`)
    // return captcha
  } catch (err) {
    console.log(err.response.status)
  }
}

const timmer = setInterval(getCheapestPet, 800 + Math.floor(Math.random(1) * 100))
