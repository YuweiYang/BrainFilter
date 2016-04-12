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
           // var p1 = $('<p></p>');
            //var p2 = $('<p></p>');
            $('#user').val('');
            $('#password').val('');
          //  console.log(data)
        }
    });

    return false;
});