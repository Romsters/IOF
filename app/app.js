var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.favicon());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.cookieParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(8080, function(){
    console.log('Server listening on ' + 8080);
});

app.get('/', function(req, resp, next){
    resp.render('index');
});

app.get('/admin', function(req, resp, next){
    resp.render('admin');
});

app.get('/clock', function(req, resp, next){
   resp.render('clock');
});

app.get('/students', function(req, resp, next){
    resp.render('students');
});

app.use(function(req, res, next){
    if(req.url != '/'){
        next(new Error());
    }
});

app.use(function(err, req, res, next){
    res.render('error');
});

