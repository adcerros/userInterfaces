//Configuracion de las cookies de registro
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

//Cambia la interfaz y pasa a modo usuario
function showUserProfile(userId){
    // Se carga la imagen del usuario
    let userProfileImage = localStorage.getItem(userId + "-" +"profileImg");
    if (userProfileImage != null){
        $("#userImage").attr("src",userProfileImage);
    }
    else{
        $("#userImage").attr("src","./images/common/default-icon.png");
    }
    // Se cambia el nombre por defecto del id en la interfaz
    document.getElementById("userId-p").innerHTML = userId;
    Cookies.set("CurrentUser", userId, {secure:true});
    // Se oculta la interfaz estandar
    $("#logIn-btn").hide();
    $("#signUp-btn").hide();
    $("#auxDiv").hide();
    // Se muestra la interfaz del usuario
    $("#userId-info").show();
    $("#userImage-div").show();
    $("#optionsBar-btn").show();
}

// Funcion para guardar la imagen en el localStorage
function saveImage(userId, userProfileImage){
    var reader = new FileReader();
    reader.onload = function(){
        localStorage.setItem(userId + "-" +"profileImg", reader.result);
    }
    reader.readAsDataURL(userProfileImage);
}


$(document).ready(function(){

    // LOGIN /////////////////////////////////////////////////
    // Boton de login
    $("#logIn-btn").click(function(){
        $("#logIn-form").show(); 
        $("#signUp-form").hide(); 
    });
    //Cierre
    $("#clslogIn-btn").click(function(){
        $("#logIn-form").hide(); 
    });

    //Cierre contraseña erronea
    $("#clsBadLogIn").click(function(){
        $("#badLogIn").hide();
        $("#logIn-form").show(); 
    }); 

    //Cierre id erronea
    $("#clsBadLogInId").click(function(){
        $("#badLogInId").hide();
        $("#logIn-form").show(); 
    }); 

    //Boton de submit formulario de logIn
    $("#savelogInData-btn").click(function(){
        $("#logIn-form").trigger("submit");
    }); 

    //Cierre mensaje loginOk
    $("#clsLogInOk").click(function(){
        $("#logInOk").hide();
    }); 

    // SIGNUP /////////////////////////////////////////////////
    // Boton de singUp
    $("#signUp-btn").click(function(){
        $("#signUp-form").show(); 
        $("#logIn-form").hide(); 
    });
    //Cierre
    $("#clsSignUp-btn").click(function(){
        $("#signUp-form").hide();
    });  
    
    //Carga imagen usuario
    $(document).on("change", "#userProfileImage", function() {
        saveImage($("#userId").val(), document.getElementById("userProfileImage").files[0]);
        $("#loadedImage").show();
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

    //Cierre mensaje confirmacion signUp
    $("#clsSignInOk-form").click(function(){
        $("#signUpOk-form").hide();
    }); 
    
    //Cierre mensaje email duplicado
    $("#clsDupEmail").click(function(){
        $("#dupEmail").hide();
        $("#signUp-form").show();
    }); 

    // LOGOUT //////////////////////////////////////////////////////
    //Cierre de sesion
    $("#logOut-btn").click(function(){
        $("#logOutConfirm").show();
    }); 
 
    $("#confirmLogOut-btn").click(function(){
        Cookies.set("CurrentUser", "", {secure:true});
        $("#logOutConfirm").hide();
        //Se oculta la interfaz de usuario
        $("#userId-info").hide();
        $("#userImage-div").hide();
        $("#optionsBar-btn").hide();
        $("#optionsBar").hide();
        $("#auxoptionsBar-btn").hide();
        $("#myProfile").hide();
        //Se muestra la interfaz estandar
        $("#logIn-btn").show();
        $("#auxDiv").show();
        $("#signUp-btn").show();
        $("#logOutOk").show(); 
        //Se reinician los formularios
        $("#signUp-form").trigger("reset");
        signUpValidator.resetForm();
        $("#logIn-form").trigger("reset");
        logInValidator.resetForm();
        $("#loadedImage").hide();
    }); 

    //Cancelar cierre de sesion
    $("#dontConfirmLogOut-btn").click(function(){
        $("#logOutConfirm").hide();
    }); 

    $("#clsLogOutConfirm").click(function(){
        $("#logOutConfirm").hide();
    });

    //Cierre del mensaje de confirmacion de logOut
    $("#clsLogOutOk").click(function(){
        $("#logOutOk").hide();
    });  
    

    // MENU OPTIONS //////////////////////////////////////////////////////
    $("#optionsBar-btn").click(function(){
        $("#optionsBar").show();
        $("#optionsBar-btn").hide();
        $("#auxoptionsBar-btn").show();
    }); 
    //Cierre
    $("#clsOptions-btn").click(function(){
        $("#optionsBar").hide();
        $("#optionsBar-btn").show();
        $("#auxoptionsBar-btn").hide();
    }); 

    $("#auxoptionsBar-btn").click(function(){
        $("#optionsBar").hide();
        $("#optionsBar-btn").show();
        $("#auxoptionsBar-btn").hide();
    }); 

    // SECCION MI PERFIL /////////////////////////////////////////////////
    $("#profile-btn").click(function(){
        $("#myProfile").show();
        // Se cargan los datos
        let userId = Cookies.get("CurrentUser");
        let userProfileImage = localStorage.getItem(userId + "-" + "profileImg");
        let userPass = Cookies.get(userId + "-" + "userPass");
        let userName = Cookies.get(userId + "-" + "userName");
        let userEmail = Cookies.get(userId + "-" + "userEmail");
        let userBornDate = Cookies.get(userId + "-" + "userBornDate");
        let userMusic = Cookies.get(userId + "-" + "chckMusica");
        let userCombat = Cookies.get(userId + "-" + "chckCombates");
        let userHobbits = Cookies.get(userId + "-" + "chckHobbits");
        let userUc3m = Cookies.get(userId + "-" + "chckUc3m");
        if (userProfileImage != null){
            $("#profileImage").attr("src",userProfileImage);
        }
        else{
            $("#profileImage").attr("src", "./images/common/default-icon.png");
        }
        document.getElementById("profileId").innerHTML = "Nombre de usuario: " + userId;
        document.getElementById("profilePass").innerHTML = "Contraseña: " + userPass;
        document.getElementById("profileName").innerHTML = "Nombre y apellidos: " + userName;
        document.getElementById("profileEmail").innerHTML = "Email: " + userEmail;
        document.getElementById("profileBornDate").innerHTML = "Fecha de nacimiento: " + userBornDate;
        document.getElementById("profileHobbits").innerHTML = ""; 
        document.getElementById("profileUc3m").innerHTML = ""; 
        document.getElementById("profileCombat").innerHTML = "";
        document.getElementById("profileMusic").innerHTML = "";  
        if (userMusic == String(true)){
            document.getElementById("profileMusic").innerHTML = "Musica popular de Gondor";          
        }  
        if (userCombat == String(true)){
            document.getElementById("profileCombat").innerHTML = "Combates a espada";
        } 
        if (userHobbits == String(true)){
            document.getElementById("profileHobbits").innerHTML = "Hierba de los hobbits";        
        } 
        if (userUc3m == String(true)){
            document.getElementById("profileUc3m").innerHTML = "Soy profesor/a de la Uc3m";       
        } 

        $("#userProfileImage").attr("src",userProfileImage);
    }); 

    $("#clsmyProfile-btn").click(function(){
        $("#myProfile").hide();
    }); 
    
    //Funciones para la validacion de expresiones regulares
    // Comprobacion de la expresion regular de la contraseña
    $.validator.addMethod(
        "userPass",
        function(value) {
            return /^[a-zA-Z0-9]+$/.test(value);
        },
        "<br>El formato no es valido, se admiten letras y numeros (8 maximo)"
    );

    // Comprobacion de la expresion regular del email
    $.validator.addMethod(
        "userEmail",
        function(value) {
            return /^[a-zA-Z0-9]+@{1}[a-zA-Z0-9]+(\.{1})[a-zA-Z0-9]+$/.test(value);
        },
        "<br>El formato no es valido, debe ser del tipo: nombre@dominio.extensión"
    );

    // Comprobacion de la expresion regular de la feha de nacimiento
    $.validator.addMethod(
        "userBornDate",
        function(value) {
            return /^^([0-2][0-9]|3[0-1])(\/)(0[1-9]|1[0-2])\2(\d{4})$/.test(value);
        },
        "<br>El formato no es valido, debe ser del tipo: dd/mm/aaaa"
    );

    // Comprobacion de email duplicado
    $.validator.addMethod(
        "userEmailDup",
        function(value) {
            if (Cookies.get(String(value) + "-" + "userEmail") == value){
                $("#dupEmail").show();
                $("#signUp-form").hide();
                return false;
            }
            return true;
        },
    );

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

    //Validacion del formulario de login
    var logInValidator = $("#logIn-form").validate({
        submitHandler: function(){
            let logInId = $("#logInId").val();
            let cookiesId = Cookies.get(String(logInId) + "-" + "userId");
            let logInPass = $("#logInPass").val();
            let cookiesPass = Cookies.get(String(logInId) + "-" + "userPass");
            if(logInId != cookiesId){
                $("#badLogInId").show();
                $("#logIn-form").hide(); 
            } 
            else if(logInPass != cookiesPass){
                $("#badLogIn").show();
                $("#logIn-form").hide(); 
            } 
            else{
                $("#logIn-form").hide();
                $("#logInOk").show();  
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

