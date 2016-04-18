/**
 * Created by yangyuwei on 16/4/18.
 */
/**
 * Created by yangyuwei on 16/4/13.
 */
$(function(){
    $('#login').on('click',function(){
        $.ajax({
            type : "POST",
            url : '/log',
            dataType : 'json',
            data:{
                name : $('#user').val(),
                password : $('#password').val()
            },success : function (data){
                var li = $('<li id = "user_name"></li>');
                var li2 = $('<li id = "sign_out"></li>');
                var a = $('<a href="javascript:;"></a>');
                var a2 = $('<a href="javascript:;">退出登录</a>');
                $('#user').val('');
                $('#password').val('');
                a.html('Hello ' + data.name + ' !').appendTo(li);
                a2.appendTo(li2);
                $('#register').remove();
                $('#log-modal-btn').remove();
                ($('.navbar-nav.pull-right')).append(li).append(li2);
            }
        });
    });

    $('.navbar-nav').on('click','#sign_out',function(){
        $.ajax({
            type:'POST',
            url:'/signout',
            dataType:'json',
            data:1,
            success:function(data){
                console.log(data.title);
                var li = $('<li id = "register"></li>');
                var li2 = $('<li id = "log-modal-btn"></li>');
                var a = $('<a href="/register">注册</a>');
                var a2 = $('<a data-toggle="modal" data-target="#myModal">登录</a>');
                li.append(a);
                li2.append(a2);
                ($('.navbar-nav.pull-right')).append(li).append(li2);
                $('#sign_out').remove();
                $('#user_name').remove();
            }
        })
    })

});
