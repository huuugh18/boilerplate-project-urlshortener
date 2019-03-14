'use strict';

const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const Schema = mongoose.Schema



const cors = require('cors');

const app = express();

// Basic Configuration 
const port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
process.env.MONGO_URI = 'mongodb+srv://huuugh18:something@cluster0-pia27.mongodb.net/test?retryWrites=true';
const db = mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true})
.then(() => {
  console.log('CONNECTED TO MONGODB')
})
.catch(err => {
  console.log(err)
});


app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

const urlSchema = new Schema ({
    original_url: {type: String, required: true},
    short_url: {type: Number, required: true}
});
  
const ShortURL = mongoose.model('Url', urlSchema)
  


// your first API endpoint... 
app.get('/api/hello', function (req, res) {
  res.json({greeting: 'hello API'});
});

app.post('/api/shorturl/new', (req,res,next) => {
    console.log('req body',req.body)
    const shortUrl =  new ShortURL({
        original_url: req.body.url,
        short_url: 5
    })
    const urlDisplay = {original_url:req.body.url, short_url: 5}
    res.json(urlDisplay)
});


app.listen(port, function () {
  console.log('Node.js listening on port', port);
});