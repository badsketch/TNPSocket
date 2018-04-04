var express = require('express');
var app = express();
var config = require('./config');
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var NounProject = require('the-noun-project');
var io = require('socket.io')(http);

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
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket){
    socket.on('message',function(msg){
        nounProject.getIconsByTerm(msg, {limit: 1}, function (err, data) {
                if (!err) {
                    io.emit('message',data.icons[0].preview_url);
                } else {
                    console.error(err);
                }
            });
        })

})



http.listen(3000,function(){
    console.log('listening on 3000');
})
