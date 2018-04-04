var express = require('express');
var app = express();
var config = require('./config');
var http = require('http').Server(app);
var NounProject = require('the-noun-project');


app.use('/public', express.static(__dirname + "/public"));

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
})

http.listen(3000,function(){
    console.log(config.API_KEY);
    console.log('listening on 3000');
})