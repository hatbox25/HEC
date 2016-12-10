$(document).ready(function(){
    $("#btn-login").click(function(){
        var data = $('#login-form').serialize();
        $.ajax({
            type:'POST',
            url:'http://ehc.hol.es/login.php',
            data:data,
            async:false,
            crossDomain:true,
            cache:false,
            success:function(hasil){                 
                if(hasil == 0){
                    alert("Invalid NPM AND Password");
                }else{
                    sessionStorage.setItem('npm',hasil);
                    window.location.href='friendlist.html';
                }
            }
        });
        return false;
    });
});