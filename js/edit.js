$(document).ready(function(){
    if(sessionStorage.length == 0){
        //memeriksa jika session tidak ada maka akan kembali ke paga login.html
        window.location.href = "login.html";   
    }
     
    var s_npm = sessionStorage.getItem('npm');
    $.ajax({
        //menjalankan perintah untuk menampilkan data profile
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
                var result = $.parseJSON(a);
                $.each(result,function(i,field){
                    $('#P_foto').append("<img src='http://hatbox.esy.es/SERVER/imgProf/"+field.foto+"'/>");
                    $('#P_nama').append(field.nama);
                    $('#P_npm').append(field.npm);
                    
                    $('#P_angkatan').val(field.angkatan);
                    $('#P_minat').val(field.minat);
                    $('#P_hp').val(field.no_hp);
                    $('#P_email').val(field.email);
                    $('#P_alamat').val(field.alamat);
                });
            }
        }
    });
    
    $("#btn-submit").click(function(){
    //jika button submit diclick maka akan mengupdate profil
        var angkatan = $('#P_angkatan').val();
        var minat = $('#P_minat').val();
        var hp = $('#P_hp').val();
        var email = $('#P_email').val();
        var alamat = $('#P_alamat').val();
        
        $.ajax({
            type:'POST',
            url:'http://hatbox.esy.es/updateProfile.php',
            data: {
                "submit": 1,
                "s_npm" : s_npm,
                "angkatan" : angkatan,
                "minat" : minat,
                "no_hp" : hp,
                "email" : email,
                "alamat" : alamat
            },
            async:false,
            crossDomain:true,
            cache:false,
            success:function(a){
                if(a == 0){
                    alert("salah");
                }else{
                    window.location.href='profil.html';
                }
            }
        });
    });
    
    return false;
});