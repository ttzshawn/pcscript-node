const axios = require('axios')
const config = require('./config')
const URLs = {
  list: 'https://pet-chain.baidu.com/data/market/queryPetsOnSale'
}

const sortTypes = {
  aa: 'AMOUNT_ASC', // 最便宜
  cd: "CREATETIME_DESC", // 最新 
  rd: "RAREDEGREE_DESC" // 高等级
}
const sortType = sortTypes.rd

const getPets = async () => {
  pageNo = 1
  const url = 'https://pet-chain.baidu.com/data/market/queryPetsOnSale'
  try {
    const res = await axios.post(URLs.list, {
      pageNo,
      'pageSize': 20,
      'querySortType': sortType,
      'petIds': [],
      'lastAmount': null,
      'lastRareDegree': null,
      'requestId': Math.floor(new Date()),
      'appId': 1,
      'tpl': ''
    })
    
    const pets = res.data.data.petsOnSale
    return pets

  } catch (err) {
    return false
  }
}
