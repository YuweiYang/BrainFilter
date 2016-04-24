/**
 * Created by yangyuwei on 16/4/24.
 */
var http = require('http');
var fs = require('fs');
var request = require('request');

http.createServer(function(req,res){
    //读取本地文件
    //fs.createReadStream('../public/images/ava.png').pipe(res);
    // 读取网上的内容

    request('https://pic3.zhimg.com/5044d786bd39dd2d10c29ded7a08e396_s.jpg').pipe(res);
}).listen('5000');