$(document).ready(function(){
    $('.pc-name').append(sessionStorage.getItem('namePC'));
    $('#close').click(function(){
        window.location.href = "chatlist.html";
    });
    showChat();
    setInterval(function(){
        var jml = document.querySelectorAll("#area li.left").length;
        checkMsg(jml);
    }, 1000);
    
    $("#input").click(function(){                   
        var s_npm = sessionStorage.getItem('npm');
        var pc_npm = sessionStorage.getItem('npmPC');   
        var chat = $("#chat").val();

        $.ajax({
            url : "http://ehc.hol.es/insertPC.php",
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
    });     
    
    
});

function showChat(){
    var s_npm = sessionStorage.getItem('npm');
    var pc_npm = sessionStorage.getItem('npmPC');
    $.ajax({
        url : "http://ehc.hol.es/displayPC.php",
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
            var result = $.parseJSON(d);
            $('#area').empty();
            $.each(result,function(i,field){
                if(field.npmDari == s_npm){
                        $('#area').append("<li class='right'><span class='chat-img pull-right'><img src='http://ehc.hol.es/SERVER/imgProf/"+field.fotoDari+"' alt='User Avatar' class='img-circle' width='50px' height='50px' /></span><div class='chat-body clearfix'><div class='header'><strong class='pull-right primary-font'>"+field.dari+"</strong><br><small class='pull-right text-muted'><span class='glyphicon glyphicon-time'></span>"+field.timestamp+"</small></div><br><p class='pull-right text-muted'>"+field.isiChat+"</p></div></li>");    
                    }else{
                        $('#area').append("<li class='left'><span class='chat-img pull-left'><img src='http://ehc.hol.es/SERVER/imgProf/"+field.fotoDari+"' alt='User Avatar' class='img-circle' width='50px' height='50px' /></span><div class='chat-body clearfix'><div class='header'><strong class='primary-font'>"+field.dari+"</strong><br><small class='text-muted'><span class='glyphicon glyphicon-time'></span>"+field.timestamp+"</small></div><br><p>"+field.isiChat+"</p></div></li>");
                    }
            });
        }
    });
}

function checkMsg(textA){
    var jml=textA;
    var jmlx="";
    var s_npm = sessionStorage.getItem('npm');
    var pc_npm = sessionStorage.getItem('npmPC'); 
    $.ajax({
        url : "http://ehc.hol.es/countPC.php",
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
                showChat();
                var audio = document.getElementById("SuaraNotif");
                audio.play();
            }
        }
    })
}