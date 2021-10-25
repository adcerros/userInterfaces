
function setSignUpCookie(userId, userPass, userName, userEmail, userBornDate, chckMusica , chckCombates, chckHobbits, chckUc3m){
    Cookies.set(String(userId) + "-" + "userId", userId, {secure:true});
    Cookies.set(String(userId) + "-" + "userPass", userPass, {secure:true});
    Cookies.set(String(userId) + "-" + "userName", userName, {secure:true});
    Cookies.set(String(userId) + "-" + "userEmail", userEmail, {secure:true});
    Cookies.set(String(userId) + "-" + "userBornDate", userBornDate, {secure:true});
    Cookies.set(String(userId) + "-" + "chckMusica", chckMusica, {secure:true});
    Cookies.set(String(userId) + "-" + "chckCombates", chckCombates, {secure:true});
    Cookies.set(String(userId) + "-" + "chckHobbits", chckHobbits, {secure:true});
    Cookies.set(String(userId) + "-" + "chckUc3m", chckUc3m, {secure:true});
    Cookies.set(String(userEmail) + "-" + "userEmail", userEmail, {secure:true});
}

function showUserProfile(userId){
    // Se carga la imagen del usuario
    let userProfileImage = localStorage.getItem(userId + "-" +"profileImg");
    if (userProfileImage != null){
        $("#userImage").attr("src",userProfileImage);
    }
    else{
        $("#userImage").attr("src","./images/mainpage/default-icon.png");
    }
    // Se cambia el nombre por defecto del id en la interfaz
    document.getElementById("#userId-p").innerHTML = userId;
    // Se oculta la interfaz estandar
    $("#logIn-btn").hide();
    $("#signUp-btn").hide();
    $("#auxDiv").hide();
    // Se muestra la interfaz del usuario
    $("#userId-info").show();
    $("#userImage-div").show();
    $("#logout-btn").show();
}

function saveImage(userId, userProfileImage){
    var reader = new FileReader();
    reader.onload = function(){
        localStorage.setItem(userId + "-" +"profileImg", reader.result);
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
        signUpValidator.resetForm();
    }); 
    
    //Boton de submit formulario de signUp
    $("#saveSignUpData-btn").click(function(){
        $("#signUp-form").trigger("submit");
    }); 

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

    //Cierre boton confirmacion registro
    $("#clsSignInOk-form").click(function(){
        $("#signUpOk-form").hide();
    }); 
    
    //Cierre boton email duplicado
    $("#clsDupEmail").click(function(){
        $("#dupEmail").hide();
    }); 

    //Cierre de sesion
    $("#logout-btn").click(function(){
        //Se oculta la interfaz de usuario
        $("#userId-info").hide();
        $("#userImage-div").hide();
        $("#logout-btn").hide();
        //Se muestra la interfaz estandar
        $("#logIn-btn").show();
        $("#auxDiv").show();
        $("#signUp-btn").show();
        //Se reinician los formularios
        $("#signUp-form").trigger("reset");
        signUpValidator.resetForm();
        $("#logIn-form").trigger("reset");
        logInValidator.resetForm();
        $("#loadedImage").hide();
    }); 

    //Carga imagen usuario
    $(document).on("change", "#userProfileImage", function() {
        saveImage($("#userId").val(), document.getElementById("userProfileImage").files[0]);
        $("#loadedImage").show();
    });
    
    //Validacion del formulario de alta
    var signUpValidator = $("#signUp-form").validate({
        submitHandler: function(){
            $("#signUp-form").hide(); 
            var userId = $("#userId").val();
            let userPass = $("#userPass").val();
            let userName = $("#userName").val();
            let userEmail = $("#userEmail").val();
            let userBornDate = $("#userBornDate").val()
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
            setSignUpCookie(userId, userPass, userName, userEmail, userBornDate, chckMusica , chckCombates, chckHobbits, chckUc3m);
            showUserProfile(userId);   
            $("#signUpOk-form").show(); 
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


    //Boton de submit formulario de logIn
    $("#savelogInData-btn").click(function(){
        $("#logIn-form").trigger("submit");
    }); 


    var logInValidator = $("#logIn-form").validate({
        submitHandler: function(){
            let logInId = $("#logInId").val();
            let logInPass = $("#logInPass").val();
            let cookiesPass = Cookies.get(String(logInId) + "-" + "userPass");
            if(logInPass != cookiesPass){
                $("#dupEmail").show(); 
            } 
            else{
                $("#logIn-form").hide();
                $("#signUpOk-form").show();  
                showUserProfile(logInId);  
            }
        },
        rules: {
            logInId: "required",
            logInPass: "required"
        },
        messages: {
            logInId: "<br>Por favor, introduce tu nombre de usuario registrado",
            logInPass: "<br>Por favor, introduce una contraseña",
            
        },
        errorElement : 'span'  
    });

});

