var express = require('express');
var app = express();
var config = require('./config');
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var NounProject = require('the-noun-project');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

nounProject = new NounProject({
    key: config.API_KEY,
    secret: config.SECRET
});


app.use('/public', express.static(__dirname + "/public"));


app.get('/', function(req,res){
    console.log('what i got was');
    console.log(req.query.stuff);
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