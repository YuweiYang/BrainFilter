/**
 * Created by yangyuwei on 16/4/12.
 */
$('form').on('submit',function(event){
    $.ajax({
        type: "POST",
        url: '/signin',
        dataType:'json',
        data:{
            name: $('#user').val(),
            password:$('#password').val()
        },
        success: function (data){
            var li = $('<li class="pull-right"></li>');
            var a = $('<a href="javascript:void(0);"></a>');
            //var p2 = $('<p></p>');
            $('#user').val('');
            $('#password').val('');
          //  console.log(data)
            a.html('Hello ' + data.name).appendTo(li);
            li.appendTo($(".navbar-nav"));
        }
    });

    return false;
});