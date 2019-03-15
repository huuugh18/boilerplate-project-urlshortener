'use strict';

const express = require('express');
const dns = require('dns')
const mongo = require('mongodb');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const Schema = mongoose.Schema
const uniq          = require('@trystal/uniq-ish')
const url = require('url');

// const {validUrl} = require('./calcs')

const validURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

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
    short_url: {type: String, required: true}
});
  
const ShortURL = mongoose.model('Url', urlSchema)

app.post('/api/shorturl/new', (req,res,next) => {
    console.log(req.body.url)
    const url = new URL(req.body.url);
    console.log('URL:',url)
    dns.lookup(url.host, (err, address) => {
        // if dns lookup returns error
        if(err){
            console.log(err)
            return res.json({error:'invalid URL'})
        }
        console.log('URL VALID')
        const shortUrlGen = uniq.randomId(5)
        // create database object
        const shortUrlDB =  new ShortURL({
            original_url: req.body.url,
            short_url: shortUrlGen
        })
        // save to database
        shortUrlDB.save( (err,data) => {
            if(err){console.log('SAVE ERROR:',err)}
            console.log('DATA:',data)
        });
        // display output after successful displayy
        const urlDisplay = {original_url:url.href, short_url: shortUrlGen}
        res.json(urlDisplay)
    })
});

app.get('/api/shorturl/:urlid', (req,res) => {
    const shortUrl = req.params.urlid
    console.log('SHORT URL:',shortUrl)
    ShortURL.findOne({short_url: shortUrl},(err,data) =>{
        if(err){console.log('QUERY ERROR:',err)};
        console.log('DATA',data.original_url)
        res.redirect(data.original_url)
    });
});

app.listen(port, function () {
  console.log('Node.js listening on port', port);
});