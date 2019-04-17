const http = require('http')
const https = require('https')
const fs = require('fs')
const cheerio = require('cheerio')
const request = require('request')
var iconv = require('iconv-lite');

const url = "https://music.163.com/discover/toplist"; 
function fetchPage(url) {
  startRequest(url)
}

function startRequest(url) {
  head={'User-Agent':'Mozilla/5.0'}
  https.headers = head
  request(url,(err, res, body) => {
    let $ = cheerio.load(body);
    fs.appendFile('./data/html.txt', body, 'utf-8', err => {
      console.log(err)
    })
  })
  // https.get(url, (res) => {
  //   let chunks = []
    
  //   res.on('data', (chunk) => {
  //     chunks.push(chunk);
  //   })
    
  //   res.on('end', () => {
  //     let titles = [];
  //     let html = iconv.decode(Buffer.concat(chunks), 'utf-8');
  //     fs.appendFile('./data/html.txt', html, 'utf-8', err => {
  //       console.log(err)
  //     })
  //     let $ = cheerio.load(html, {decodeEntities: false});
  //     $('ul.f-hide li').each(function (idx, element) {
  //       var $element = $(element);
  //       titles.push({
  //         title: $element.text()
  //       })
  //     })  
  //     // fs.appendFile('./data/html.txt', html, 'utf-8', err => {
  //     //   console.log(err)
  //     // })
  //     // fs.appendFile('./data/topList.txt', $('ul.f-hide').find('a'), 'utf-8', err => {
  //     //   console.log(err)
  //     // })
  //     // savedImage($, news_title)
  //     console.log(titles)
  //   })
  // })
}

function savedContent($) {
  console.log($)
  $('li a').each((item, index) => {
    console.log(item)
    let x = $(this).text();
    let y = x.substring(0, 2).trim();
    if (!y) {
      x = x + '\n';
      fs.appendFile('./data/topList.txt', x, 'utf-8', err => {
        console.log(err)
      })
    }
  })
}

fetchPage(url)