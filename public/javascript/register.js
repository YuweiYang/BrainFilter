/**
 * Created by yangyuwei on 16/4/12.
 */
$('form').on('submit',function(event){

    var pass1 = $('#password').val();
    var pass2 = $('#password2').val();

    if (pass1 != pass2){
        alert('两次输入的密码不一致,请重新输入!');
        $('#password').val('');
        $('#password2').val('');
        return false;
    }

});