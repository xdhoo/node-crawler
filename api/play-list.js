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
      let playlist = {id};
      let $ = cheerio.load(body,{decodeEntities: false});
      let $author = $('.user')
      playlist.title = $('.tit').text();
      playlist.image = $('.u-cover-dj img').attr('src')
      playlist.author = {
        id: $author.find('.face').attr('href').match(/\d+/g)[0],
        name: $author.find('.name a').text(),
        createTime: $author.find('.time').text(),
        image: $author.find('img').attr('src')
      }
      playlist.tags = []
      $('.tags a.u-tag i').each((idx, element) => {
        playlist.tags.push($(element).text())
      })
      playlist.description = $('p#album-desc-more').html()
      playlist.playCount = $('#play-count').text()

      resolved(playlist)
    })
  }) 
}

module.exports = {
  getPlayList,
  getPlayListById
}