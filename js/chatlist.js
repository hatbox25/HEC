$(document).ready(function(){
    if(sessionStorage.length == 0){
        //memeriksa jika session tidak ada maka akan kembali ke paga login.html
        window.location.href = "login.html";   
    }
    showData();
    
    $('.friend').click(function(){
        //jika salah satu teman diclick maka akan menyimpan npm teman tersebut untuk dikirm kehalaman chatroom
        $npmpc  = $(this).find(".hide").html();
        $namepc  = $(this).find("p strong").html();
        
        sessionStorage.setItem('npmPC',$npmpc);
        sessionStorage.setItem('namePC',$namepc);

        window.location.href = "chatroom.html";
    });        
});

function showData(){
    var s_npm = sessionStorage.getItem('npm');//mengambil npm sendiri
    $.ajax({
        type:'POST',
        url:'http://hatbox.esy.es/displayCL.php',
        data: {
            "tampil" : 1,
            "s_npm" : s_npm
        },
        async:false,
        crossDomain:true,
        cache:false,
        success:function(d){
            if(d == 0){
                //jika tidak ditemukan hasil dari request chatlist
                $('#friendlist').append("<li class='list-group-item'>You dont have any personal chat</li>");
            }else{   
                //jika  ditemukan maka akan menampilkan hasil dari request chatlist
                var result = $.parseJSON(d);
                $('#friendlist').empty();
                $.each(result,function(i,field){
                    $('#friendlist').append("<div class='friend'><img src='http://hatbox.esy.es/SERVER/imgProf/"+field.foto+"'/><p><strong>"+field.nama+"</strong><br><span>"+field.email+"</span><span class='hide'>"+field.npm+"</span></p></div>");
                });
            }
        }
    });
    return false;
}