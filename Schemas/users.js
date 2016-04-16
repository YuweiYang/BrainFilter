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
    password:String,
    avatar:String,
    new:Number,//判断是否为刚注册的新用户
    logTimes:Number

});
//给schema添加静态方法
Users.static = {
    fn:function(){}
};
//添加实例方法
Users.methods = {
    comparePassword : function(_password,callback){
        bcrypt.compare(_password,this.password,function(err,isMatch){
            if (err) return callback(err);
            callback('null',isMatch);
        })
    }
};

//优先于save执行本中间件
Users.pre('save',function(next){
    user = this;
    if(user.new == 0){
        bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
            if (err) return next(err);
            bcrypt.hash(user.password,salt,function(err,hash){
                if (err) return next(err);
                user.password = hash;
                console.log(user.password);
                user.new = 1;
                next();
            });
        })
    }
});
//打包Users
module.exports = Users;