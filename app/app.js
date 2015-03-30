var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var sort = require('./libs/sort');
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

var auth = express.basicAuth('ztu_admin_iof', 'ztuiofadminsecret');
var studentCollection = JSON.parse(fs.readFileSync('app/students.json', 'utf-8'));

http.createServer(app).listen(process.env.port || 8080, function(){
    console.log('Server listening on ' + 8080);
});

app.get('/', function(req, resp, next){
    resp.render('index');
});

app.post('/admin/createStudent', auth, function(req, resp, next){
    var student = req.body.student;
    if(!student || !student.length || student.length < 10){
        resp.end(JSON.stringify({error: "Данные введены не корректно"}));
        return;
    }

    var tempStudentCollection = studentCollection.slice();
    tempStudentCollection[tempStudentCollection.length] = student;
    tempStudentCollection = sort(tempStudentCollection);
    fs.writeFile('app/students.json', JSON.stringify(tempStudentCollection), function (err) {
        if (err){
            next(err);
            return;
        }
        studentCollection = tempStudentCollection;
        resp.end(JSON.stringify({
            success: student
        }));
    });
});

app.post('/admin/deleteStudent', auth, function(req, resp, next){
    var student = req.body.student;
    if(!student){
        resp.end(JSON.stringify({error: "Произошла ошибка, перезагрузите страницу"}));
        return;
    }

    var tempStudentCollection = studentCollection.slice();
    tempStudentCollection.splice(tempStudentCollection.indexOf(student), 1);
    fs.writeFile('app/students.json', JSON.stringify(tempStudentCollection), function (err) {
        if (err){
            next(err);
            return;
        }
        studentCollection = tempStudentCollection;
        resp.end(JSON.stringify({
            success: student
        }));
    });
});

app.get('/admin', auth, function(req, resp, next){
    resp.render('admin-content', {
        students: studentCollection
    });
});

app.get('/serverTime', function(req, resp, next){
    var date=new Date();
    var res=date.getTime().toString();
    resp.end(res);
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

app.get('/students', function(req, resp, next){
    resp.render('students', {
        students: studentCollection
    });
});

app.use(function(req, res, next){
    next(new Error());
});

app.use(function(err, req, res, next){
    res.render('error');
});

