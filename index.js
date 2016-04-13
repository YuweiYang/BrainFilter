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
var Users= require('./Schemas/users');
var User = require('./modules/user');
//var mongoStroe = require('connect-mongo')(express);
//var crypto = require('crypto');
//var connect = require('connect');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var dbUrl = 'mongodb://localhost:27017/test';
mongoose.connect(dbUrl);
//console.log(User)
//在数据库链接一个collection
var User = mongoose.model('User',Users);

app.use(session({
    secret:'PhucDetBech',
    cookie: {
        maxAge  :   60 * 1000 //1分钟后过期
        //expires : new Date(Date.now() + 3600000), //1 Hour
    },
    resave: false,
    saveUninitialized: true


}));
//app.use(connect.session({ secret: 'PhucDetBech', key: 'PhucDetBech' ,cookie: { maxAge: 20000}}));



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
    //res.redirect('/login');
    res.render('index',{title:'首页',user:'admin'})
});
app.post('/log',function (req, res){
    var entity = {
        name : req.body.name,
        password :req.body.password
    };
    var _user = new User(entity);

    User.findOne({name:_user.name},function(err, user){
        if (err) throw err;
        if (!user) {
            console.log('user is not exist');
            res.json({
                title:'user is not exist.'
            })
        }
        user.comparePassword(_user.password,function(err,isMatch){
            if (err) {
                console.log(err);
            }
            if (isMatch) {
                res.json(_user);
                console.log("password is not macthed.");
            }else{
                res.json({
                    title:"password id not macthed."
                });
                console.log("password is not macthed.");
            }

        });

        //res.json(_user);
    });

});
app.get('/signin',function(req, res){
    res.render('signin',{title:'注册'})
});
app.get('/login',function(req, res){
    res.render('login',{title:'登录'})
});
app.get('/detail', function (req, res) {
   // res.render('detail',{title:'详情页'})
    res.redirect('/');
});
app.post('/signin',function(req, res){
    var entity = {
        name:req.body.name,
        password:req.body.password
    };
    //返回给ajax data对象
   // res.json(entity);

    //创建实体 entity
    var _user = new User(entity);

    User.findOne({name:_user.name},function(err, user){
        if (err) throw err;
        if (user) {
            console.log('user is exist');
        }else{
            _user.save(function(err, user) {
                if (err) {
                    console.log(err)
                }
                console.log('User sign in successed.');
            })
        }

        res.json(_user);
    });
});

var server = app.listen(4000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});


