/**
 * Created by yangyuwei on 16/4/15.
 */
$('#upload').on('click',function(){
    var fd = new FormData($('#form')[0]);
   // fd.append('file', $('#update-avatar').prop('files')[0]);
    //fd.append('name','img');
    //fd.append("upload", 1);
    console.log($('#form')[0]);
    console.log($('update-avatar').val());
    $.ajax({
        type:'POST',
        url:'/ava',
        data:fd,
        async:false,
        processData: false,
        contentType: false,
        success:function(data){
            //console.log(data)
            if(200 == data.codetype){
                $('#avatar-image').attr('src',data.url);
                //console.log(data)
            }
        }
    })

});