/**
 * Created by yangyuwei on 16/4/16.
 */
var bodyParser = require('../node_modules/body-parser');

//var mongoose = require('../node_modules/mongoose');
var bcrypt = require('../node_modules/bcrypt');
var Users= require('../Schemas/users');
var User = require('../modules/user');
var multipart = require('connect-multiparty');
var url = require('url');
var path = require('path');
var fs = require('fs');

module.exports = function(app, pathname){

    app.get('/', function (req, res) {
        res.render('index',{title:'首页',user:app.locals.user});

    });

//上传图片 并且图片保存到本地
    app.post('/ava',multipart(),function(req, res){
        var filename = req.files.avatar.originalFilename || path.basename(req.files.avatar.path);
        //var targetPath = path.dirname(__filename) + '/image_repository/avatar/' + filename;
        var targetPath = pathname + '/image_repository/avatar/' + filename;
        fs.createReadStream(req.files.avatar.path).pipe(fs.createWriteStream(targetPath));
        var _url = '/avatar/' + filename;
        console.log(_url);
        console.log(targetPath);
        var _name = req.session.user;
        //用module方法保存数据
        User.update({name:_name},{$set:{avatar:_url}},function(err){
            if (err) throw err;


        });
        res.json({
            codetype : 200,
            msg:{url:'http://' + req.headers.host + '/' + filename},
            url:_url
        });
        //用entity方法保存数据,效果相同
        //User.findOne({name:_name},function(err, doc){
        //    if (err) throw err;
        //    if (doc){
        //        doc.set({avatar:targetPath});
        //        doc.save();
        //    }else{
        //        console.log('no user');
        //    }
        //});
        //res.json({
        //    codetype : 200,
        //    msg:{url:'http://' + req.headers.host + '/' + filename},
        //    url:_url
        //});
        //var _img = req.files;
        // console.log(_img);
        //res.json(_img);
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
                    req.session.user = _user.name;
                    _user.logTimes++;
                    res.json(_user);
                    console.log(req.session.user);
                    console.log("password is macthed.");
                }else{
                    //console.log(_user.password);
                    res.json({
                        title:"password is not macthed."
                    });
                    console.log("password is not macthed.");
                }

            });
        });

    });
    app.get('/setting', function (req, res) {
        res.render('setting',{title:'设置',user:app.locals.user});

    });
    app.get('/register',function(req, res){
        res.render('register',{title:'注册',user:''})
    });
    app.get('/login',function(req, res){
        res.render('login',{title:'登录'})
    });
    app.get('/detail', function (req, res) {
        //res.render('detail',{title:'详情页',user:app.locals.user});
        res.redirect('http://www.baidu.com');
        //res.end('detail')
    });
    app.post('/register',function(req, res){
        var pass1 = req.body.password;
        var pass2 = req.body.password2;
        if (pass1 != pass2){
            res.json({title:'两次输入的密码不一致'})

        }else{
            var entity = {
                name:req.body.name,
                password:req.body.password
            };
            var _user = new User(entity);

            User.findOne({name:_user.name},function(err, user){
                if (err) throw err;
                if (user) {
                    console.log('user is exist');
                    res.redirect('/register')
                }else{
                    req.session.user = _user.name;
                    _user.new = 0;
                    _user.logTimes = 1;
                    _user.save(function(err, user) {
                        if (err) {
                            console.log(err)
                        }
                        console.log('User sign in successed.');
                    });
                    res.redirect('/')
                }
            });

        }

    });
    app.post('/signout',function(req, res){
        req.session.user = null;
        app.locals.user = null;
        res.json({title:'signout'});
        console.log(req.session)
    });
    //app.get('/avatar/*',function(req, res){
    //    //fs()
    //    console.log
    //    console.log(req.url);
    //});




    app.get('/addairticle/:id',function(req, res){

        //根据id查询数据库获取对应文章
        //传到页面上
        res.render('addairticle',{title:'添加文章'})

    });


//404页面
    app.get('/*', function(req, res){
        res.render('404', {
            title: '404 Not Found'
        });
        //  res.writeHead(404,{"Content-Type":"text/html"});
        // res.write('404 NOT FOUND');
    });


};

