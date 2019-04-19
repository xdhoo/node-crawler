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
      let list = [];
      let $ = cheerio.load(body);
      $('ul.f-hide li a').each((idx, element) => {
        let $element = $(element);
        list.push({
          id: $element.attr('href').match(/\d+/g)[0],
          title: $element.text()
        })
      })  
      resolved(list)
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
      let list = []
      $('ul.f-hide li a').each((idx, element) => {
        let $element = $(element);
        list.push({
          id: $element.attr('href').match(/\d+/g)[0],
          title: $element.text()
        })
      })
      resolved(list)
    })
  })
}
module.exports =  {
  getTopList,
  getTopListById
}

