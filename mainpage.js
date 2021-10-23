
function setSignUpCookie(userId, userPass, userName, userEmail, userBornDate){
    Cookies.set("userId", userId, {secure:true});
    Cookies.set("userPass", userPass, {secure:true});
    Cookies.set("userName", userName, {secure:true});
    Cookies.set("userEmail", userEmail, {secure:true});
    Cookies.set("userBornDate", userBornDate, {secure:true});
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
        function(value, element) {
            let x = Cookies.get("userEmail");
            if(value == x || element == x){
                return true;
            }
            return false;
        },
        "<br>Email duplicado"
    );
    
    //Validacion del formulario de alta
    var validator = $("#signUp-form").validate({
        submitHandler: function(){
            let userEmailaux = Cookies.get("userEmail");
            if (userEmailaux == $("#userEmail").val()){
                $("#dupEmail").show();
            }
            else if(userEmailaux != $("#userEmail").val()){
                $("#signUp-form").hide(); 
                $("#signUpOk-form").show();
                var userId = $("#userId").val();
                var userPass = $("#userPass").val();
                var userName = $("#userName").val();
                var userEmail = $("#userEmail").val();
                var userBornDate = $("#userBornDate").val()
                setSignUpCookie(userId, userPass, userName, userEmail, userBornDate);
            }
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
                userEmailDup: false,
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
    
    //Cierre boton email duplicado
    $("#clsDupEmail").click(function(){
        $("#dupEmail").hide();
    }); 
});


