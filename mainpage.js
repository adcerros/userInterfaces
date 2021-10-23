
function setSignUpCookie(userId, userPass, userName, userEmail, userBornDate){
    Cookies.set("userId", userId);
    Cookies.set("userPass", userPass);
    Cookies.set("userName", userName);
    Cookies.set("userEmail", userEmail);
    Cookies.set("userBornDate", userBornDate);
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
        Cookies.set("prueba", "prueba");
        document.cookie = "nueva ";
        var x = Cookies.get("prueba");
        alert(x);
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



    //Funciones para la validacion de expresiones regulares
    $.validator.addMethod(
        "userPass",
        function(value, element) {
            return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
        },
        "<br>El formato no es valido, se admiten letras y numeros (8 maximo)"
    );

    $.validator.addMethod(
        "userEmail",
        function(value, element) {
            return this.optional(element) || /^[a-zA-Z0-9]+@{1}[a-zA-Z0-9]+(\.{1})[a-zA-Z0-9]+$/.test(value);
        },
        "<br>El formato no es valido, debe ser del tipo: nombre@dominio.extensión"
    );

    $.validator.addMethod(
        "userBornDate",
        function(value, element) {
            return this.optional(element) || /^^([0-2][0-9]|3[0-1])(\/)(0[1-9]|1[0-2])\2(\d{4})$/.test(value);
        },
        "<br>El formato no es valido, debe ser del tipo: dd/mm/aaaa"
    );

    $.validator.addMethod(
        "userEmailDup",
        function(value) {
            if(value == true){
                return true;
            }
            return false;
        },
        "<br>Email duplicado"
    );
    
    //Validacion del formulario de alta
    var validator = $("#signUp-form").validate({
        submitHandler: function(){
            $("#signUp-form").hide(); 
            $("#signUpOk-form").show();
            $("#signUp-form").trigger("reset"); 
            setSignUpCookie($("#userId").val(), $("#userPass").val(), $("#userName").val(), $("#userEmail").val(), $("#userBornDate").val());
        },
        rules: {
            userId: "required",
            userPass: {
                required: true, 
                userPass: true,
                maxlength: 8
            },
            userName: "required",
            userEmail: {
                required: true, 
                userEmail: true,
            },
            userBornDate: {
                required: true, 
                userBornDate: true,
            },
            chckTerms: "required"
        },
        messages: {
            userId: "<br>Por favor, introduce tu nombre de usuario",
            userPass: "<br>Por favor, introduce una contraseña (letras y numeros, 8 maximo)",
            userName: "<br>Por favor, introduce tu nombre y tus apellidos",
            userEmail: "<br>Por favor, introduce un mail valido (nombre@dominio.extensión)",
            userBornDate: "<br>Por favor, introduce tu fecha de nacimiento (dd/mm/aaaa)",
            chckTerms: "Tienes que aceptar los terminos de uso<br>"
        },
        errorElement : 'span'  
    });

    //Cierre boton confirmacion registro
    $("#clsSignInOk-form").click(function(){
        $("#signUpOk-form").hide();
    });  
});


