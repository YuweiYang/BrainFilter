/**
 * Created by yangyuwei on 16/4/23.
 */
var fs = require('fs');

fs.readFile('./public/images/ava.png',function(err, original_buffer){
    console.log(Buffer.isBuffer(original_buffer));
    fs.writeFile('./public/images/ava_buffer.png',original_buffer,function(err){
        if (err) throw err;
    });

    var base64_img = original_buffer.toString('base64');
    var decoded_img = new Buffer(base64_img,'base64');
    console.log(Buffer.compare(original_buffer, decoded_img));

    fs.writeFile('./public/images/ava_base64.png',decoded_img,function(err){
        if (err) throw err;
    })
});
