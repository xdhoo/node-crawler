const express = require('express');
const app = express();
const fs = require('fs');
const topList = require('./api/top-list')
const playList = require('./api/play-list')
const artist = require('./api/artist')

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
next();
});

app.get('/topList', (req, res) => {

  if(req.query.id) {
    topList.getTopListById(req.query.id).then(list => {
      res.send(list);
      res.end()
    })
  } else {
    topList.getTopList().then((list) => { 
      res.send(list);
      res.end();
    })
  }  
})


app.get('/playList', (req, res) => {
  if(req.query.id) {
    playList.getPlayListById(req.query.id).then(list => {
      res.send(list);
      res.end;
    })
  } else {
    playList.getPlayList().then((list) => {
      res.send(list);
      res.end();
    })
  }
})

app.get('/artist', (req, res) => {
  if(req.query.id) {
    artist.getArtistById(req.query.id).then(artist => {
      res.send(artist);
      res.end();
    })
  } else {
    artist.getArtists().then(artists => {
      res.send(artists)
      res.end();
    })
  }  
})
const server = app.listen(7777, () => {
  console.log('Server Success...')
})