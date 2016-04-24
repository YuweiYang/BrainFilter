/**
 * Created by yangyuwei on 16/4/24.
 */
var Readable = require('stream').Readable;
var Writdable = require('stream').Writable;

var readStream = new Readable();
var writeStream = new Writdable();

readStream.push('I ');
readStream.push('Love ');
readStream.push('You.');
readStream.push(null);

writeStream._write = function (chunk,encode,callback){
    console.log(chunk.toString());
    callback();
};

readStream.pipe(writeStream);