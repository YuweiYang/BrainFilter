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
                //var li = $('<li class="pull-right"></li>');
                //var a = $('<a href="javascript:void(0);"></a>');
                $('#user').val('');
                $('#password').val('');
                //a.html('Hello ' + data.name).appendTo(li);
                //li.appendTo($(".navbar-nav"));
                //$('#log-modal-btn').remove();

                console.log(data);
            }
        });
       // return false;
    })
});
