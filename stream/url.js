/**
 * Created by yangyuwei on 16/4/27.
 */
var url = require('url');
var qs = require('querystring');
var path = require('path');

var queryUrl = "http://localhost:8888/index/bb?name=bigbear&memo=helloworld#a";
console.log(typeof url.parse(queryUrl)) ;
console.log(url.parse(queryUrl)) ;

queryUrl1 = url.parse(queryUrl).query ;
console.log(queryUrl) ;
console.log(qs.parse(queryUrl1)) ;
var root = path.basename(queryUrl) ;
console.log(root);

