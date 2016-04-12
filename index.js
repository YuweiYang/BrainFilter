/**
 * Created by yangyuwei on 16/4/7.
 */
var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//var db = mongoose.createConnection('localhost','runoob');
mongoose.connect('mongodb://localhost:27017/test');

var Tasks = new mongoose.Schema({
    title:String,
    likes:Number,
    url:String
});

var Task = mongoose.model('Task',Tasks);

//创建user schema (cellection)
var Users = new mongoose.Schema({
    name:{
        unique: true,
        type:String
    },
    password:String
});
var User

//public 文件夹为静态资源库
app.use(express.static('public'));
//解析json 限制大小1mb
app.use(bodyParser.json({limit: '1mb'}));
//解析url
app.use(bodyParser.urlencoded({extended: false}));

//使用ejs作为模板引擎
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
//使用html作为模板引擎
//app.engine('.html', ejs.__express);

app.get('/', function (req, res) {
  //  res.send('Hello World!');
    res.render('index',{title:'首页'})
});
app.get('/singin',function(req, res){
    res.render('singin',{title:'注册'})
});
app.get('/login',function(req, res){
    res.render('login',{title:'登录'})
});

app.get('/detail/:id', function (req, res) {
    res.render('detail',{title:'详情页'})
});
app.get('/react', function (req, res) {
    res.send('Hello React!');
});

var arr = [];
var task = new Task();
app.post('/login',function(req, res){
    //console.log(req.headers['content-type'])
    var user = {
        title:req.body.title,
        url:req.body.url
    };
    //arr.push(user);
    //console.log(arr)
    //console.log(user.title);
    //console.log(user.url);
    res.json(user);
    task.title = user.title;
    task.url = user.url;
    task.save(function(err){
        if (err) throw err;
        console.log('Task saved')
    });
});


var server = app.listen(4000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});


