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

//创建user schema
var Users = new mongoose.Schema({
    name:{
        unique: true,
        type:String
    },
    password:String
});
//会在数据库创建一个collection
var User = mongoose.model('User',Users);
//创建实体 entity
var user = new User();

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
    res.render('index',{title:'首页'})
});
app.get('/signin',function(req, res){
    res.render('signin',{title:'注册'})
});
app.get('/login',function(req, res){
    res.render('login',{title:'登录'})
});

app.get('/detail/:id', function (req, res) {
    res.render('detail',{title:'详情页'})
});

var task = new Task();
app.post('/signin',function(req, res){
    //console.log(req.headers['content-type'])
    var entity = {
        title:req.body.title,
        url:req.body.url
    };
    //arr.push(user);
    //console.log(arr)
    //console.log(user.title);
    //console.log(user.url);
    //返回给ajax data对象
    res.json(entity);

    user.name = entity.name;
    user.password = entity.password;
    //task.title = user.title;
    //task.url = user.url;
    //task.save(function(err){
    //    if (err) throw err;
    //    console.log('Task saved')
    //});
    User.findOne({name:user.name},function(){

    });



    user.save(function(err){
        if (err) throw err;
        console.log('User sign in successed.')
    })



});


var server = app.listen(4000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});


