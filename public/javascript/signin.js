/**
 * Created by yangyuwei on 16/4/12.
 */
$('form').on('submit',function(event){
    $.ajax({
        type: "POST",
        url: '/login',
        dataType:'json',
        data:{
            title: $('#user').val(),
            url:$('#password').val()
        },
        success: function (data){
           // var p1 = $('<p></p>');
            //var p2 = $('<p></p>');
            $('#user').val('');
            $('#password').val('');
            console.log(data)
           // $("#show-title")
            //    .append(p1.html(data.title))
              //  .append(p2.html(data.url));
        }
    });

    return false;
});