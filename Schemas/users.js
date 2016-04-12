/**
 * Created by yangyuwei on 16/4/12.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
//创建user schema
var Users = new mongoose.Schema({
    name:{
        unique: true,
        type:String
    },
    password:String
});
//给schema添加静态方法
Users.static = {
    fn:function(){}
};

//优先于save执行本中间件
Users.pre('save',function(next){
    user = this;
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        if (err) return next(err);
        bcrypt.hash(user.password,salt,function(err,hash){
            if (err) return next(err);
            user.password = hash;
            next();

        });
    })
});


//打包Users
module.exports = Users;