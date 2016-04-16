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
var path = require('path');

var session = require('express-session');
var cookieParser = require('cookie-parser');
var port = process.env.PORT ||4000;
var dbUrl = 'mongodb://localhost:27017/test';

//var multipart = require('connect-multiparty');
//var mongoStroe = require('connect-mongo')(express);
//var crypto = require('crypto');
//var connect = require('connect');


mongoose.connect(dbUrl);

if ('development' == app.get('env')){
    app.set('showStackError',true);
    //app.use(express.logger(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug',true);
}

app.use(session({
    secret:'PhucDetBech',
    cookie: {
        maxAge  : 60 * 1000 //1分钟后过期
        //expires : new Date(Date.now() + 3600000), //1 Hour
    },
    resave: false,
    saveUninitialized: true
}));
if ('development' == app.get('env')){
    app.set('showStackError',true);
    //app.use(express.logger(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug',true);
}

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
//判断session中的user中间件
app.use(function(req, res, next){
    var _user = req.session.user;
    if (_user){
        app.locals.user = _user;
    }
    return next();
});

//路由
require('./router/router')(app);

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});








