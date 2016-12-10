$(document).ready(function(){
    showData();
    
    $('.friend').click(function(){
        $npmpc  = $(this).find(".hide").html();
        $namepc  = $(this).find("p strong").html();
        
        sessionStorage.setItem('npmPC',$npmpc);
        sessionStorage.setItem('namePC',$namepc);

        window.location.href = "chatroom.html";
    });        
});

function showData(){
    var s_npm = sessionStorage.getItem('npm');
    $.ajax({
        type:'POST',
        url:'http://ehc.hol.es/displayCL.php',
        data: {
            "tampil" : 1,
            "s_npm" : s_npm
        },
        async:false,
        crossDomain:true,
        cache:false,
        success:function(d){
            if(d == 0){
                $('#friendlist').append("<li class='list-group-item'>You dont have any personal chat</li>");
            }else{                
                var result = $.parseJSON(d);
                $('#friendlist').empty();
                $.each(result,function(i,field){
                    $('#friendlist').append("<div class='friend'><img src='http://ehc.hol.es/SERVER/imgProf/"+field.foto+"'/><p><strong>"+field.nama+"</strong><br><span>"+field.email+"</span><span class='hide'>"+field.npm+"</span></p></div>");
                });
            }
        }
    });
    return false;
}