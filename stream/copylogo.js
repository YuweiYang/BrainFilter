/**
 * Created by yangyuwei on 16/4/24.
 */
var fs = require('fs');

var readStream = fs.createReadStream('../public/data.json');
var n = 0;

readStream.on('data',function(chunk){
    n++;
    console.log('data emit');
    console.log(Buffer.isBuffer(chunk));
    //console.log(chunk.toString());
    readStream.pause();
    console.log('read pause');
    setTimeout(function(){
        readStream.resume();
        console.log('read pause end');
    },3000);
}).on('readable',function(){
    console.log('data readable');

}).on('end',function(){
    console.log('data ends');
    console.log(n);
}).on('close',function(){
    console.log('data close');
}).on('error',function(err){
    console.log('error' + err);
});