const http = require('http')
const https = require('https')
const fs = require('fs')
const cheerio = require('cheerio')
const request = require('request')

const url = "https://music.163.com/"; 
function fetchPage(url) {
  startRequest(url)
}

function startRequest(url) {

  https.get(url, (res) => {
    let html = '';
    let titles = [];
    res.setEncoding('utf-8');
    res.on('data', (data) => {
      html += data;
      console.log(data)
    })
    res.on('end', () => {
      var $ = cheerio.load(html);
      var news_item = {
        title: $('div#container dt').text().trim()
      }
      let news_title = $('div#container dt').text().trim();
      console.log(news_item, news_title); 

      savedContent($, news_title);
      // savedImage($, news_title)
    })
  })
}

function savedContent($, news_title) {
  $('dd.info').each((item, index) => {
    console.log(item)
    let x = $(this).text();
    let y = x.substring(0, 2).trim();
    if (!y) {
      x = x + '\n';
      fs.appendFile('./data/' + news_title + '.txt', x, 'utf-8', err => {
        console.log(err)
      })
    }
  })
}

fetchPage(url)