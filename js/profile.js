$(document).ready(function(){ 
    if(sessionStorage.length == 0){
        //memeriksa jika session tidak ada maka akan kembali ke paga login.html
        window.location.href = "login.html";   
    }
    //menjalankan perintah untuk menampilkan data profile 
    var s_npm = sessionStorage.getItem('npm');
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
                var result = $.parseJSON(a);
                $.each(result,function(i,field){
                    $('#P_foto').append("<img src='http://hatbox.esy.es/SERVER/imgProf/"+field.foto+"'/>");
                    $('#P_nama').append(field.nama);
                    $('#P_npm').append(field.npm);
                    $('#P_angkatan').append(field.angkatan);
                    $('#P_minat').append(field.minat);
                    $('#P_hp').append(field.no_hp);
                    $('#P_email').append(field.email);
                    $('#P_alamat').append(field.alamat);
                });
            }
        }
    });
    return false;
});