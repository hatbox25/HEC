$(document).ready(function(){
    if(sessionStorage.length == 0){
        //memeriksa jika session tidak ada maka akan kembali ke paga login.html
        window.location.href = "login.html";   
    }
    
    $('#PopToggle').click(function(){
        $('#PopUpWindow').toggle( "slow", function() {
            // Animation complete.
        });       
    });
    
    showData();
    $('.friend').click(function(){
        //jika salah satu teman diclick maka akan menyimpan npm teman tersebut untuk dikirm kehalaman chatroom
        $npmpc  = $(this).find(".hide").html();
        $namepc  = $(this).find("p strong").html();
        
        $('.popNama').append($namepc);
        $('.popNPM').append($npmpc);
        
        sessionStorage.setItem('npmPC',$npmpc);
        sessionStorage.setItem('namePC',$namepc);

        $('#PopUpWindow').toggle( "slow", function() {
            // Animation complete.
        });   
        
        var s_npm = sessionStorage.getItem('npmPC');
        $.ajax({
            type:'POST',
            url:'http://hatbox.esy.es/getProfile.php',
            data: {
                "tampil": 1,
                "s_npm" : s_npm
            },
            async:false,
            crossDomain:true,
            cache:false,
            success:function(a){
                if(a == 0){
                    alert("salah");
                }else{
                    $('.ImgWrap').empty();
                    $('#PopName').empty();
                    $('#PopNPM').empty();
                    var result = $.parseJSON(a);
                    $.each(result,function(i,field){
                        $('.ImgWrap').append("<img src='http://hatbox.esy.es/SERVER/imgProf/"+field.foto+"'/>");
                        $('#PopName').append("<span class='popNama'>"+field.nama+"</span>");
                        $('#PopNPM').append("<span class='popNPM'>"+field.npm+"</span>");
                    });
                }
            }
        });
        var s_npm = "";
    });    
});

function showData(){
//fungsi untuk menampilkan list teman 
    var s_npm = sessionStorage.getItem('npm');//mengambil npm sendiri
    $.ajax({
        type:'POST',
        url:'http://hatbox.esy.es/displayFL.php',
        data: {
            "tampil" : 1,
            "s_npm" : s_npm
        },
        async:false,
        crossDomain:true,
        cache:false,
        success:function(d){
            if(d == 0){
                //jika tidak ditemukan hasil dari request friendlist
                $('#friendlist').append("<li class='list-group-item'>You dont have any friend</li>");
            }else{        
                //jika ditemukan maka akan menampilkan friendlist
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