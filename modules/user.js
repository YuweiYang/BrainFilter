/**
 * Created by yangyuwei on 16/4/12.
 */
var mongoose = require('mongoose');
var Users = require('../Schemas/users');
var User = mongoose.model('User',Users);

module.exports = User;
