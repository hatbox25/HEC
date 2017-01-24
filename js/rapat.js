$(document).ready(function(){
    if(sessionStorage.length == 0){
        //memeriksa jika session tidak ada maka akan kembali ke paga login.html
        window.location.href = "login.html";   
    }
    showRapat();
    setInterval(function(){
        //perintah logs untuh menjalankan fungsi tiap 1 detik
        var jml = document.querySelectorAll("#area li.left").length;
        checkMsg(jml);
    }, 1000);
    
    $("#input").click(function(){                   
        var s_npm = sessionStorage.getItem('npm');    
        var chat = $("#chat").val();
        
        if(chat.length == 0){
            //error handling jika chat kosong tetapi button SEND ditekan 
        }else{
            $.ajax({
            url : "http://hatbox.esy.es/insertRapat.php",
            type : "POST",
            async : false,
            data : {
                "done":1,
                "chat":chat,
                "s_npm" :s_npm
            },
            success : function(data){
                showRapat();
                $("#chat").val('');
            }
            })    
        }
    });     
});

function showRapat(){
    //fungsi untuk menampilkan chat grup
    var s_npm = sessionStorage.getItem('npm');//variable untuk mengambil npm sendiri
    $.ajax({
        type:'POST',
        url:'http://hatbox.esy.es/displayRapat.php',
        data: {
            "tampil" : 1
        },
        async:false,
        crossDomain:true,
        cache:false,
        success:function(a){
            
            if(a == 0){
                alert("salah");
            }else{                
                var result = $.parseJSON(a);//mengubah value dari JSON yang dikirm oleh php menjadi value atribut
                $('#area').empty();
                $.each(result,function(i,field){
                    if(field.npmSend == s_npm){
                        //untuk menampilkan chat yg dikirim oleh sendiri ditampilkan di sebelah kanan
                        $('#area').append("<li class='right'><span class='chat-img pull-right'><img src='http://hatbox.esy.es/SERVER/imgProf/"+field.foto+"' alt='User Avatar' class='img-circle' width='50px' height='50px' /></span><div class='chat-body clearfix'><div class='header'><strong class='pull-right primary-font'>"+field.nama+"</strong><br><small class='pull-right text-muted'><span class='glyphicon glyphicon-time'></span>"+field.timeStamp+"</small></div><br><p class='pull-right text-muted'>"+field.isiChat+"</p></div></li>");    
                    }else{
                        //untuk menampilkan chat yg dikirim oleh user lain ditampilkan di sebelah kiri
                        $('#area').append("<li class='left'><span class='chat-img pull-left'><img src='http://hatbox.esy.es/SERVER/imgProf/"+field.foto+"' alt='User Avatar' class='img-circle' width='50px' height='50px' /></span><div class='chat-body clearfix'><div class='header'><strong class='primary-font'>"+field.nama+"</strong><br><small class='text-muted'><span class='glyphicon glyphicon-time'></span>"+field.timeStamp+"</small></div><br><p>"+field.isiChat+"</p></div></li>");
                    }
                });
            }
        }
    });
    return false;
}

function checkMsg(textA){
//fungsi untuk memeriksa adanya chat baru atau tidak
    var jml=textA;
    var jmlx="";
    var s_npm = sessionStorage.getItem('npm'); 
    $.ajax({
        url : "http://hatbox.esy.es/countRapat.php",
        type : "POST",
        async : false,
        data:{
            "hasil" : jml,
            "s_npm" :s_npm
        },
        success: function(data){
            jmlx=data;
            if(jml != jmlx){
                //jika ditemukan chat baru maka akan menjalankan notif audio dan menampilkan chat baru tersebut
                showRapat();
                var audio = document.getElementById("SuaraNotif");
                audio.play();
            }
        }
    })
}