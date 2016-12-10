$(document).ready(function(){
    showRapat();
    setInterval(function(){
        var jml = document.querySelectorAll("#area li.left").length;
        checkMsg(jml);
    }, 1000);
    
    $("#input").click(function(){                   
        var s_npm = sessionStorage.getItem('npm');    
        var chat = $("#chat").val();

        $.ajax({
            url : "http://ehc.hol.es/insertRapat.php",
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
    });     
});

function showRapat(){
    var s_npm = sessionStorage.getItem('npm');
    $.ajax({
        type:'POST',
        url:'http://ehc.hol.es/displayRapat.php',
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
                var result = $.parseJSON(a);
                $('#area').empty();
                $.each(result,function(i,field){
                    
                    if(field.npmSend == s_npm){
                        $('#area').append("<li class='right'><span class='chat-img pull-right'><img src='http://ehc.hol.es/SERVER/imgProf/"+field.foto+"' alt='User Avatar' class='img-circle' width='50px' height='50px' /></span><div class='chat-body clearfix'><div class='header'><strong class='pull-right primary-font'>"+field.nama+"</strong><br><small class='pull-right text-muted'><span class='glyphicon glyphicon-time'></span>"+field.timeStamp+"</small></div><br><p class='pull-right text-muted'>"+field.isiChat+"</p></div></li>");    
                    }else{
                        $('#area').append("<li class='left'><span class='chat-img pull-left'><img src='http://ehc.hol.es/SERVER/imgProf/"+field.foto+"' alt='User Avatar' class='img-circle' width='50px' height='50px' /></span><div class='chat-body clearfix'><div class='header'><strong class='primary-font'>"+field.nama+"</strong><br><small class='text-muted'><span class='glyphicon glyphicon-time'></span>"+field.timeStamp+"</small></div><br><p>"+field.isiChat+"</p></div></li>");
                    }
                });
            }
        }
    });
    return false;
}

function checkMsg(textA){
    var jml=textA;
    var jmlx="";
    var s_npm = sessionStorage.getItem('npm'); 
    $.ajax({
        url : "http://ehc.hol.es/countRapat.php",
        type : "POST",
        async : false,
        data:{
            "hasil" : jml,
            "s_npm" :s_npm
        },
        success: function(data){
            jmlx=data;
            if(jml != jmlx){
                showRapat();
                var audio = document.getElementById("SuaraNotif");
                audio.play();
            }
        }
    })
}