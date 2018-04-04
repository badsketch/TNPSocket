var express = require('express');
var app = express();
var config = require('./config');
var http = require('http').Server(app);
var NounProject = require('the-noun-project');

nounProject = new NounProject({
    key: config.API_KEY,
    secret: config.SECRET
});


app.use('/public', express.static(__dirname + "/public"));

app.get('/', function(req,res){
    nounProject.getIconsByTerm('goat', {limit: 5}, function (err, data) {
        if (!err) {
            console.log(typeof data.icons);
        } else {
            console.error(err);
        }
    });
    res.sendFile(__dirname + '/index.html');
})

http.listen(3000,function(){
    console.log('listening on 3000');
})