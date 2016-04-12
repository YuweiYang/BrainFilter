/**
 * Created by yangyuwei on 16/4/9.
 */
var mongoose = require('mongoose');
//var db = mongoose.createConnection('localhost','runoob');
mongoose.connect('mongodb://localhost:27017/test');

var Tasks = new mongoose.Schema({
    title:String,
    likes:Number,
    url:String
});


var Task = mongoose.model('Task',Tasks);

var task = new Task();
//task.title = 'hhhh';
//task.likes = 130;
//task.url = 'www.zhihu.com';
//task.save(function(err){
//    if (err) throw err;
//    console.log('Task saved')
//});
var id ='';
var that = this;
Task.find({'title':'hhhh'},function(err,tasks){
    if (err) throw err;
    for (var i=0;i<tasks.length;i++){
        that.id = tasks[i]._id;
        console.log(that.id);
        console.log('ID:'+tasks[i]._id);
        console.log('url:'+tasks[i].url)
    }
});
console.log(that.id);
Task.update(
    {_id:'5709cdc8a624796097238eb0'},
    {url:'www.google.com'},
    {multi:false},
    function (err,rows_update){
    if (err) throw err;
    console.log('updated.')
}
);
Task.find({'title':'hhhh'},function(err,tasks){
    if (err) throw err;
    for (var i=0;i<tasks.length;i++){
        console.log('ID:'+tasks[i]._id);
        console.log('url:'+tasks[i].url)
    }
});
