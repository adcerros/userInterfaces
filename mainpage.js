
function setSignUpCookie(userId, userPass, userName, userEmail, userBornDate, userProfileImage, chckMusica , chckCombates, chckHobbits, chckUc3m){
    Cookies.set(String(userEmail) + "-" + "userId", userId, {secure:true});
    Cookies.set(String(userEmail) + "-" + "userPass", userPass, {secure:true});
    Cookies.set(String(userEmail) + "-" + "userName", userName, {secure:true});
    Cookies.set(String(userEmail) + "-" + "userEmail", userEmail, {secure:true});
    Cookies.set(String(userEmail) + "-" + "userBornDate", userBornDate, {secure:true});
    Cookies.set(String(userEmail) + "-" + "chckMusica", chckMusica, {secure:true});
    Cookies.set(String(userEmail) + "-" + "chckCombates", chckCombates, {secure:true});
    Cookies.set(String(userEmail) + "-" + "chckHobbits", chckHobbits, {secure:true});
    Cookies.set(String(userEmail) + "-" + "chckUc3m", chckUc3m, {secure:true});
}

function showUserProfile(userEmail){
    userProfileImage = localStorage.getItem(userEmail);
    if (userProfileImage != null){
        $("#userImage").attr("src",userProfileImage);
    }
    $("#userId-info").show();
    $("#userImage-div").show();
}

function saveImage(userEmail, userProfileImage){
    var reader = new FileReader();
    reader.onload = function(){
        localStorage.setItem(userEmail, reader.result);
    }
    reader.readAsDataURL(userProfileImage);
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

    //Carga imagen de perfil
    // $("#userProfileImage").change(function(value){
    //     saveImage(value);
    // });



    //Funciones para la validacion de expresiones regulares
    $.validator.addMethod(
        "userPass",
        function(value) {
            return /^[a-zA-Z0-9]+$/.test(value);
        },
        "<br>El formato no es valido, se admiten letras y numeros (8 maximo)"
    );

    $.validator.addMethod(
        "userEmail",
        function(value) {
            return /^[a-zA-Z0-9]+@{1}[a-zA-Z0-9]+(\.{1})[a-zA-Z0-9]+$/.test(value);
        },
        "<br>El formato no es valido, debe ser del tipo: nombre@dominio.extensión"
    );

    $.validator.addMethod(
        "userBornDate",
        function(value) {
            return /^^([0-2][0-9]|3[0-1])(\/)(0[1-9]|1[0-2])\2(\d{4})$/.test(value);
        },
        "<br>El formato no es valido, debe ser del tipo: dd/mm/aaaa"
    );

    $.validator.addMethod(
        "userEmailDup",
        function(value) {
            if (Cookies.get(String(value) + "-" + "userEmail") == value){
                $("#dupEmail").show();
                return false;
            }
            return true;
        },
    );

    
    //Validacion del formulario de alta
    var validator = $("#signUp-form").validate({
        submitHandler: function(){
            $("#signUp-form").hide(); 
            let userId = $("#userId").val();
            let userPass = $("#userPass").val();
            let userName = $("#userName").val();
            let userEmail = $("#userEmail").val();
            let userBornDate = $("#userBornDate").val()
            let userProfileImage = document.getElementById("userProfileImage").files[0];
            let chckMusica = false;
            let chckCombates = false;
            let chckHobbits = false;
            let chckUc3m = false;
            if ($("#chckMusica").is(":checked")){
                chckMusica = true;
            }
            if ($("#chckCombates").is(":checked")){
                chckCombates = true;
            }
            if ($("#chckHobbits").is(":checked")){
                chckHobbits = true;
            }
            if ($("#chckUc3m").is(":checked")){
                chckUc3m = true;
            }
            saveImage(userEmail, userProfileImage);
            alert("prueba");
            setSignUpCookie(userId, userPass, userName, userEmail, userBornDate, userProfileImage, chckMusica , chckCombates, chckHobbits, chckUc3m);
            showUserProfile(userEmail)   
            $("#signUpOk-form").show(); 
            $("#logIn-btn").hide();
            $("#signUp-btn").hide();
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
                userEmailDup: true,
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

