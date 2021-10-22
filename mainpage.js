function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

$(document).ready(function(){

    // Boton de login
    $("#logIn-btn").click(function(){
        $("#logIn-form").show(); 
    });
    //Cierre
    $("#clslogIn-btn").click(function(){
        $("#logIn-form").hide(); 
    });


    // Boton de singUp
    $("#signUp-btn").click(function(){
        $("#signUp-form").show(); 
    });
    //Cierre
    $("#clsSignUp-btn").click(function(){
        $("#signUp-form").hide();
    });  

    //Boton de borrar formulario de signUp
    $("#deleteSignUpData-btn").click(function(){
        $("#signUp-form").trigger("reset");
        validator.resetForm();
    }); 
    
    //Boton de submit formulario de signUp
    $("#saveSignUpData-btn").click(function(){
        $("#signUp-form").trigger("submit");
    }); 

    //Validacion del formulario de alta
    var validator = $("#signUp-form").validate({
        submitHandler: function(){
            $("#signUp-form").hide(); 
            $("#signUpOk-form").show();  
        },
        rules: {
            userId: "required",
            userPass: "required",
            userName: "required",
            userEmail: "required",
            userBornDate: "required",
            chckTerms: "required"
        },
        messages: {
            userId: "<br>Por favor, introduce tu nombre de usuario valido",
            userPass: "<br>Por favor, introduce una constraseña valida",
            userName: "<br>Por favor, introduce tu nombre y tus apellidos",
            userEmail: "<br>Por favor, introduce un email valido",
            userBornDate: "<br>Por favor, introduce una fecha de nacimiento valida",
            chckTerms: "Tienes que aceptar los terminos de uso<br>"
        },
        errorElement : 'span'  
    });

    //Cierre boton confirmacion registro
    $("#clsSignInOk-form").click(function(){
        $("#signUpOk-form").hide();
    });  
});


