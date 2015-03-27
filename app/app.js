var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
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

http.createServer(app).listen(process.env.port || 8080, function(){
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

app.post('/admin', function(req, resp, next){
    if(req.body.login == 'ztu_admin_iof' && req.body.password == 'ztuiofadminsecret'){
        fs.readFile('app/students.json', 'utf-8', function (err, fileContents) {
            if (err) next(err);
            resp.render('admin-content', {
                students: JSON.parse(fileContents)
            });
        });
        return;
    }
    next(new Error());
});

app.post('/admin/createStudent', function(req, resp, next){
    var student = req.body.student;
    if(student.length < 10){
        resp.end('Данные не корректные');
        return;
    }
    fs.readFile('app/students.json', 'utf-8', function (err, fileContents) {
        if (err) next(err);
        var studentCollection = JSON.parse(fileContents);
        studentCollection[studentCollection.length] = student;
        resp.render('admin-content', {
            students: studentCollection
        });
    });
});

app.use(function(req, res, next){
    next(new Error());
});

app.use(function(err, req, res, next){
    res.render('error');
});

