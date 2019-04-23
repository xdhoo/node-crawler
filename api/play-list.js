const cheerio = require('cheerio');
const request = require('request');
const config = require('./../config');
const iconv = require('iconv-lite');
const fs = require('fs')

getPlayList = () => {
  return new Promise((resolved, rejected) => {
    request({
      url: config.BASE_URL + '/discover/playlist',
      method: 'GET',
      headers: {'User-Agent': 'Mozilla/5.0'}
    },(err, res, body) => {
      if(err) {
        rejected(err)
      }
      let list = []
      let $ = cheerio.load(body);
      $('ul#m-pl-container li').each((idx, element)=> {
        
        let $element = $(element);
        list.push({
          img: $element.find('img').attr('src'),
          title: $element.find('a.msk').attr('title'),
          id: $element.find('a.msk').attr('href').match(/\d+/g)[0],
          amount: $element.find('span.nb').text(),
          author: $element.find('a.nm').text(),
          homeId: $element.find('a.nm').attr('href').match(/\d+/g)[0]
        })
      })
      resolved(list)
    })
  })
}

getPlayListById = (id) => {
  return new Promise((resolved, rejected) => {
    request({
      url: config.BASE_URL + '/playlist?id=' + id,
      method: 'GET',
      headers: {'User-Agent': 'Mozilla/5.0'}
    },(err, res, body) => {
      if(err) {
        rejected(err)
      }
      let list = [];
      let $ = cheerio.load(body);
      fs.appendFile('./data/body.txt', $('textarea#song-list-pre-data').html(), 'utf-8', (err)=>{})
  
      // list = new Buffer($('textarea#song-list-pre-data').text(), 'base64').toString()

      let data = new Buffer($('textarea#song-list-pre-data').text().replace(/\n/g,''), 'base64')
      let lists = iconv.decode(data, 'utf-8')
      fs.appendFile('./data/html.txt', lists, 'utf-8', (err)=>{})

      resolved(list)
    })
  }) 
}

module.exports = {
  getPlayList,
  getPlayListById
}