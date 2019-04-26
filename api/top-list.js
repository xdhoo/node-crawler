const cheerio = require('cheerio')
const request = require('request')
const config = require('./../config')

getTopList = () => {
  return new Promise((resolved, rejected) => {
    request({
      url: config.BASE_URL + "/discover/toplist",
      method: "GET",
      headers: {
        'User-Agent':'Mozilla/5.0'
      }
    },(err, res, body) => {
      if(err) {
        rejected(err)
      }
      let topList = []
      let $ = cheerio.load(body);
      $('#toplist .n-minelst h2').each((idx, element) => {
        topList.push({
          name: $(element).text()
        })
      })
      $('#toplist .n-minelst ul').each((idx, element) => {
        let _list = []
        $(element).find('li').each((_idx, _element) => {
          _list.push({
            id: $(_element).find('a').attr('href').match(/\d+/g)[0],
            image: $(_element).find('img').attr('src'),
            name: $(_element).find('p.name').text(),
            update: $(_element).find('p.s-fc4').text()
          })
        })
        topList[idx].list = _list
      })
      // topList.list = $('textarea#song-list-pre-data').text()
      resolved(topList)
    })
  }) 
}

getTopListById = (id) => {
  return new Promise((resolved, rejected) => {
    request({
      url: config.BASE_URL + '/discover/toplist?id=' + id,
      method: 'GET',
      headers: {'User-Agent': 'Mozilla/5.0'}
    },(err, res, body) => {
      if(err) {
        rejected(err)
      }
      let $ = cheerio.load(body)
      let topList = {id}
      topList.name = $('.m-info-rank h2').text()
      topList.image = $('.m-info-rank .cover img').attr('src')
      topList.update = $('.m-info-rank .user span').text()
      topList.list = JSON.parse($('textarea#song-list-pre-data').text()) 
      resolved(topList)
    })
  })
}
module.exports = {
  getTopList,
  getTopListById
}

