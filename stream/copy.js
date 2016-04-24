/**
 * Created by yangyuwei on 16/4/24.
 */

//读取文件 以流的形式写入 判断内存是否被写完 防止内存溢出
var fs = require('fs');

var readStream = fs.createReadStream('../public/data.json');
var writeStream = fs.createWriteStream('datacopy.json');

readStream.on('data',function(chunk){
    if (writeStream.write(chunk) === false){
        console.log('still cached');
        readStream.pause();
    }
});
readStream.on('end',function(){
    writeStream.end();
    console.log('end')
});

writeStream.on('drain',function(){
    console.log('read drain');
    readStream.resume();
});