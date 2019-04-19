const cheerio = require('cheerio');
const request = require('request');
const config = require('./../config')

getArtists = () => {
  return new Promise((resolved, rejected) => {
    request({
      url: config.BASE_URL + '/discover/artist',
      method: 'GET',
      headers: {'User-Agent': 'Mozilla/5.0'}
    }, (err, res, body) => {
      if(err) {
        rejected(err)
      }
      let artists = [];
      let $ = cheerio.load(body);
      $('div.m-sgerlist ul li').each((idx, element) => {
        let $element = $(element);
        artists.push({
          img: $element.find('img').attr('src'),
          id: $element.find('a.nm').attr('href').match(/\d+/g)[0],
          artist: $element.find('a.nm').text(),
          homeId: $element.find('a.f-tdn').attr('href').match(/\d+/g)[0]
        })
      })
      resolved(artists)
    })
  })
}

getArtistById = (id) => {
  return new Promise((resolved, rejected) => {
    request({
      url: config.BASE_URL + '/discover/artist?id=' + id,
      method: 'GET',
      headers: {'User-Agent': 'Mozilla/5.0'}
    },(err, res, body) => {
      if(err) {
        rejected(err)
      }
      let artists = [];
      let $ = cheerio.load(body);
      $('div.m-sgerlist ul li').each((idx, element) => {
        let $element = $(element);
        artists.push({
          img: $element.find('img').attr('src'),
          id: $element.find('a.nm').attr('href').match(/\d+/g)[0],
          artist: $element.find('a.nm').text(),
          homeId: $element.find('a.f-tdn').attr('href').match(/\d+/g)[0]
        })
      })
      resolved(artists)
    })
  })
}
module.exports = {
  getArtists,
  getArtistById
}