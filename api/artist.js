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
      let artists = {
        nav: [],
        artists: []
      };
      let $ = cheerio.load(body);

      $('#singer-cat-nav div.blk').each((idx, element) => {
        let _nav = {
          title: $(element).find('h2').text(),
          items: []
        };
        $(element).find('ul li a').each((_idx, _element) => {
          _nav.items.push({
            id: $(_element).attr('data-cat'),
            name: $(_element).text()
          })
        })
        artists.nav.push(_nav);       
      })

      $('div.m-sgerlist ul li').each((idx, element) => {
        let $element = $(element);
        artists.artists.push({
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
      url: config.BASE_URL + '/artist?id=' + id,
      method: 'GET',
      headers: {'User-Agent': 'Mozilla/5.0'}
    },(err, res, body) => {
      if(err) {
        rejected(err)
      }
      let artistDetail = { id }
      let $ = cheerio.load(body);
      artistDetail.image = $('.n-artist img').attr('src')
      artistDetail.name = $('#artist-name').text()
      artistDetail.alias = $('#artist-alias').text()
      artistDetail.homeId = $('a#artist-home').attr('href').match(/\d+/g)[0]
      artistDetail.hotSong = JSON.parse($('#song-list-pre-data').text())
      resolved(artistDetail)
    })
  })
}
module.exports = {
  getArtists,
  getArtistById
}