/**
 * Created by yangyuwei on 16/4/12.
 */
var mongoose = require('mongoose');
var Users = require('../Schemas/users');
console.log(Users);
var User = mongoose.model('User',Users);
//添加实例方法
User.methods = {
    fn:function(){}
};
module.exports = User;
