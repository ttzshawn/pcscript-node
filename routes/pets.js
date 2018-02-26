const express = require('express');
const axios = require('axios');
const router = express.Router();

const getPets = async (page) => {
  const url = 'https://pet-chain.baidu.com/data/market/queryPetsOnSale'
  try {
    const res = await axios.post(url, {
      pageNo: page,
      'pageSize': 20,
      'querySortType': "RAREDEGREE_DESC",
      'petIds': [],
      'lastAmount': null,
      'lastRareDegree': null,
      'requestId': Math.floor(new Date()),
      'appId': 1,
      'tpl': ''
    })

    const pets = res.data.data.petsOnSale
    return pets.filter(item => item.rareDegree >= 4)
  } catch (err) {
    return []
  }
}

router.get('/pets', async (req, res, next) => {
  let result = []
  let petsInCurrentPage = []
  let page = 1
  do {
    try {
      petsInCurrentPage = await getPets(page)
      page = page + 1;
      result = result.concat(petsInCurrentPage);
    } catch (err) {
      petsInCurrentPage = []
    }
  } while (petsInCurrentPage.length === 20);
  res.json(result);
});

module.exports = router;
