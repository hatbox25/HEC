$(document).ready(function(){    
    if(sessionStorage.length == 0){
        //memeriksa jika session tidak ada maka akan kembali ke paga login.html
        window.location.href = "login.html";   
    }
    
    $('.pc-name').append(sessionStorage.getItem('namePC'));
    $('#close').click(function(){
        //fungsi jika button X ditekan maka akan kembali ke halaman chatlist
        window.location.href = "chatlist.html";
    });
    showChat();
    setInterval(function(){
        //perintah logs untuh menjalankan fungsi tiap 1 detik
        var jml = document.querySelectorAll("#area li.left").length;
        checkMsg(jml);
    }, 1000);
    
    $("#input").click(function(){
        //fungsi mengirim chat jika button SEND ditekan
        var s_npm = sessionStorage.getItem('npm');
        var pc_npm = sessionStorage.getItem('npmPC');   
        var chat = $("#chat").val();
        
        if(chat.length == 0){
            //error handling jika chat kosong tetapi button SEND ditekan    
        }else{
            $.ajax({
                url : "http://hatbox.esy.es/insertPC.php",
                type : "POST",
                async : false,
                data : {
                    "done":1,
                    "chat":chat,
                    "s_npm" :s_npm,
                    "pc_npm" : pc_npm
                },
                success : function(data){
                    showChat();
                    $("#chat").val('');
                }
            })
        }
    });     
});

function showChat(){
    //fungsi untuk menampilkan chat personal
    var s_npm = sessionStorage.getItem('npm');//variable untuk mengambil npm sendiri
    var pc_npm = sessionStorage.getItem('npmPC');//variable untuk mengambil npm user yg diajak chating
    $.ajax({
        url : "http://hatbox.esy.es/displayPC.php",
        type : "POST",
        async : false,
        data: {
            "tampil" : 1,
            "s_npm" : s_npm,
            "pc_npm" : pc_npm
        },
        async:false,
        crossDomain:true,
        cache:false,
        success: function(d){
            var result = $.parseJSON(d);//mengubah value dari JSON yang dikirm oleh php menjadi value atribut
            $('#area').empty();
            $.each(result,function(i,field){
                if(field.npmDari == s_npm){
                    //untuk menampilkan chat yg dikirim oleh sendiri ditampilkan di sebelah kanan
                        $('#area').append("<li class='right'><span class='chat-img pull-right'><img src='http://hatbox.esy.es/SERVER/imgProf/"+field.fotoDari+"' alt='User Avatar' class='img-circle' width='50px' height='50px' /></span><div class='chat-body clearfix'><div class='header'><strong class='pull-right primary-font'>"+field.dari+"</strong><br><small class='pull-right text-muted'><span class='glyphicon glyphicon-time'></span>"+field.timestamp+"</small></div><br><p class='pull-right text-muted'>"+field.isiChat+"</p></div></li>");    
                    }else{
                    //untuk menampilkan chat yg dikirim oleh user lain ditampilkan di sebelah kiri
                        $('#area').append("<li class='left'><span class='chat-img pull-left'><img src='http://hatbox.esy.es/SERVER/imgProf/"+field.fotoDari+"' alt='User Avatar' class='img-circle' width='50px' height='50px' /></span><div class='chat-body clearfix'><div class='header'><strong class='primary-font'>"+field.dari+"</strong><br><small class='text-muted'><span class='glyphicon glyphicon-time'></span>"+field.timestamp+"</small></div><br><p>"+field.isiChat+"</p></div></li>");
                    }
            });
        }
    });
}

function checkMsg(textA){
//fungsi untuk memeriksa adanya chat baru atau tidak
    var jml=textA;
    var jmlx="";
    var s_npm = sessionStorage.getItem('npm');
    var pc_npm = sessionStorage.getItem('npmPC'); 
    $.ajax({
        url : "http://hatbox.esy.es/countPC.php",
        type : "POST",
        async : false,
        data:{
            "hasil" : jml,
            "s_npm" :s_npm,
            "pc_npm" : pc_npm
        },
        success: function(data){
            jmlx=data;
            if(jml != jmlx){
                //jika ditemukan chat baru maka akan menjalankan notif audio dan menampilkan chat baru tersebut
                showChat();
                var audio = document.getElementById("SuaraNotif");
                audio.play();
            }
        }
    })
}