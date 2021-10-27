

//Configuracion de las cookies de registro
function setSignUpCookie(userId, userPass, userName, userEmail, userBornDate, chckMusica , chckCombates, chckHobbits, chckUc3m){
    let userData = { "pass": userPass, "name": userName, "email": userEmail, "bornDate": userBornDate, "musica": chckMusica , "combates": chckCombates, "hobbits": chckHobbits, "uc3m": chckUc3m, "numberOfExperiences": 0};
    Cookies.set(String(userEmail) + "-" + "userEmail", userEmail, {secure:true});
    Cookies.set(String(userId), JSON.stringify(userData), {secure:true});
    var userExperiences = new Array();
    localStorage.setItem(userId + "-" + "experiences", JSON.stringify(userExperiences));
    
}

//Cambia la interfaz y pasa a modo usuario
function showUserProfile(userId){
    // Se carga la imagen del usuario
    let userProfileImage = localStorage.getItem(userId + "-" +"profileImg");
    if (userProfileImage != "null"){
        $("#userImage").attr("src",userProfileImage);
    }
    else{
        localStorage.setItem(userId + "-" +"profileImg", null);
        $("#userImage").attr("src","./images/common/default-icon.png");
    }
    // Se cambia el nombre por defecto del id en la interfaz
    document.getElementById("userId-p").innerHTML = userId;
    Cookies.set("currentUser", userId, {secure:true});
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


// Funcion para actualizar la imagen del usuario
function changeAndSaveImage(userId, userProfileImage){
    var reader = new FileReader();
    reader.onload = function(){
        d = new Date();
        localStorage.setItem(userId + "-" +"profileImg", reader.result);
        $("#profileImage").attr("src", reader.result);
        $("#userImage").attr("src", reader.result); 
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
        Cookies.set("currentUser", "", {secure:true});
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

    //Cambio de intereses
    $("#changeProfileInterest-btn").click(function(){
        $("#changeProfileInterest-form").show();
        $("#myProfile").hide();
    }); 

    //Cierre
    $("#clschangeProfileInterest-btn").click(function(){
        $("#changeProfileInterest-form").hide();
        $("#myProfile").show();
    }); 

    //Almacenmiento del cambio de intereses
    $("#changeProfileInterest-form").validate({
        submitHandler: function(){
            $("#signUp-form").hide();
            $("#changeProfileInterest-form").hide();
            let userId = Cookies.get("currentUser");
            let chckMusica = false;
            let chckCombates = false;
            let chckHobbits = false;
            let chckUc3m = false;
            if ($("#changeMusica").is(":checked")){
                chckMusica = true;
            }
            if ($("#changeCombates").is(":checked")){
                chckCombates = true;
            }
            if ($("#changeHobbits").is(":checked")){
                chckHobbits = true;
            }
            if ($("#changeUc3m").is(":checked")){
                chckUc3m = true;
            }
            let userData = JSON.parse(Cookies.get(userId));
            userData.musica = chckMusica;
            userData.combates = chckCombates;
            userData.hobbits = chckHobbits;
            userData.uc3m = chckUc3m;
            Cookies.set(String(userId), JSON.stringify(userData), {secure:true});
            //Se muestran los cambios
            document.getElementById("profileHobbits").innerHTML = ""; 
            document.getElementById("profileUc3m").innerHTML = ""; 
            document.getElementById("profileCombat").innerHTML = "";
            document.getElementById("profileMusic").innerHTML = "";  
            if (chckMusica == true){
                document.getElementById("profileMusic").innerHTML = "Musica popular de Gondor";          
            }  
            if (chckCombates == true){
                document.getElementById("profileCombat").innerHTML = "Combates a espada";
            } 
            if (chckHobbits == true){
                document.getElementById("profileHobbits").innerHTML = "Hierba de los hobbits";        
            } 
            if (chckUc3m == true){
                document.getElementById("profileUc3m").innerHTML = "Soy profesor/a de la Uc3m";       
            } 
            $("#myProfile").show(); 
            $("#changeProfileInterest-form").trigger("reset");          
        }
    }); 

    //Boton de submit cambio de intereses
    $("#saveProfileInterest-btn").click(function(){
        $("#changeProfileInterest-form").trigger("submit");
    }); 

    //Cambia imagen usuario
    $(document).on("change", "#changeuserProfileImage", function() {
        let userId = Cookies.get("currentUser");
        var newImage =  document.getElementById("changeuserProfileImage").files[0];
        if(newImage != null){
            changeAndSaveImage(userId, newImage);
        }
    });

    //Cambio de Id
    $("#changeProfileId-btn").click(function(){
        $("#changeProfileId-form").show();
        $("#myProfile").hide();
    }); 

    //Cierre
    $("#clschangeProfileId-btn").click(function(){
        $("#changeProfileId-form").hide();
        $("#myProfile").show();
    }); 

    //Boton de submit cambio de Id
    $("#saveProfileId-btn").click(function(){
        $("#changeProfileId-form").trigger("submit");
    }); 

    //Almacenmiento del cambio de id
    $("#changeProfileId-form").validate({
        submitHandler: function(){
            $("#changeProfileId-form").hide();
            let userId = Cookies.get("currentUser");
            let userData = JSON.parse(Cookies.get(userId));
            let newuserId = $("#changeuserId").val();
            //Se crea la nueva cookie
            Cookies.set("currentUser", newuserId);
            Cookies.set(String(newuserId), JSON.stringify(userData), {secure:true});
            //Se destruye la antigua
            Cookies.set(String(userId), null, {expires:0});
            //Se cambian los datos de las imagenes
            let userProfileImage = localStorage.getItem(userId + "-" +"profileImg");
            localStorage.setItem(newuserId + "-" + "profileImg", userProfileImage);
            localStorage.removeItem(userId + "-" + "profileImg", null);
            let userExperiences = localStorage.getItem(userId + "-" +"experiences");
            localStorage.setItem(newuserId + "-" + "experiences", userExperiences);
            localStorage.removeItem(userId + "-" + "experiences", null);
            //Se muestran los cambios
            document.getElementById("userId-p").innerHTML = newuserId;    
            document.getElementById("profileId").innerHTML = newuserId;        
            $("#myProfile").show(); 
            $("#changeProfileId-form").trigger("reset");  
        },
        messages: {
            changeuserId: "<br>Por favor, introduce tu nuevo nombre de usuario",
        },
        errorElement : 'span'  
    }); 

    // SECCION MI PERFIL /////////////////////////////////////////////////
    $("#profile-btn").click(function(){
        $("#myProfile").show();
        // Se cargan los datos
        let userId = Cookies.get("currentUser");
        let userProfileImage = localStorage.getItem(userId + "-" + "profileImg");
        let userData = JSON.parse(Cookies.get(userId));
        if (userProfileImage != "null"){
            $("#profileImage").attr("src",userProfileImage);
        }
        else{
            $("#profileImage").attr("src", "./images/common/default-icon.png");
        }
        document.getElementById("profileId").innerHTML = "Nombre de usuario: " + userId;
        document.getElementById("profilePass").innerHTML = "Contraseña: " + userData.pass;
        document.getElementById("profileName").innerHTML = "Nombre y apellidos: " + userData.name;
        document.getElementById("profileEmail").innerHTML = "Email: " + userData.email;
        document.getElementById("profileBornDate").innerHTML = "Fecha de nacimiento: " + userData.bornDate;
        document.getElementById("profileHobbits").innerHTML = ""; 
        document.getElementById("profileUc3m").innerHTML = ""; 
        document.getElementById("profileCombat").innerHTML = "";
        document.getElementById("profileMusic").innerHTML = "";  
        if (userData.musica == true){
            document.getElementById("profileMusic").innerHTML = "Musica popular de Gondor";          
        }  
        if (userData.combates == true){
            document.getElementById("profileCombat").innerHTML = "Combates a espada";
        } 
        if (userData.hobbits == true){
            document.getElementById("profileHobbits").innerHTML = "Hierba de los hobbits";        
        } 
        if (userData.uc3m == true){
            document.getElementById("profileUc3m").innerHTML = "Soy profesor/a de la Uc3m";       
        } 

        $("#userProfileImage").attr("src",userProfileImage);
    }); 

    $("#clsmyProfile-btn").click(function(){
        $("#myProfile").hide();
    }); 
    
    // MIS EXPERIENCIAS ////////////////////////////////////////////////////
    $("#experiences-btn").click(function(){
        $("#myExperiences").show();
    }); 
    //Cierre
    $("#clsmyExperiences-btn").click(function(){
        $("#myExperiences").hide();
    });
    
    // Añadir experiencia
    $("#addExperience-btn").click(function(){
        $("#addExperience-form").show();
        $("#myExperiences").hide();
    }); 
    //Cierre
    $("#clsaddExperience-btn").click(function(){
        $("#addExperience-form").hide();
        $("#myExperiences").show();
    }); 


    //Almacenmiento de experiencias
    $("#addExperience-form").validate({
        submitHandler: function(){
            $("#addExperience-form").hide();
            $("#loadedExperienceImage").hide();
            // Lectura de datos
            let userId = Cookies.get("currentUser");
            let userExperiences = JSON.parse(localStorage.getItem(userId + "-" + "experiences"));
            let experienceTitle = $("#experienceTitle").val();
            let experienceDescription = $("#experienceDescription").val();
            let experiencePlace = $("#experiencePlace").val();
            let experienceImage = document.getElementById("experienceImage").files[0]
            var reader = new FileReader();
            // Carga de imagen
            var image;
            if (experienceImage == undefined){
                experienceImage = "./images/common/default-icon.png";
            }
            reader.onload = function(){
                image = reader.result;
            }
            reader.readAsDataURL(experienceImage);
            // Almacenamiento de la experiencia
            if (image == null){
                image = "null";
            }
            var experience = {experienceTitle, experienceDescription, experiencePlace, image};
            userExperiences.push(experience);
            localStorage.setItem(userId + "-" + "experiences", userExperiences);
            $("#myExperiences").show(); 
        },
        messages: {
            experienceTitle: "<br>Por favor, introduce el titulo de la experiencia",
            experienceDescription: "<br>Por favor, introduce la descripcion de la experiencia",
            experiencePlace: "<br>Por favor, introduce el lugar de la experiencia",
        },
        errorElement : 'span'  
        }); 
    
        //Boton de submit añadir experiencias
        $("#saveExperience-btn").click(function(){
            $("#addExperience-form").trigger("submit");
        }); 
    
        //Tick de imagen cargada
        $(document).on("change", "#experienceImage", function() {
            $("#loadedExperienceImage").show();
        });


    // VALIDACIONES DE FORMULARIOS //////////////////////////////////////////
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
            let userCookie = Cookies.get(logInId)
            if (userCookie != null){
                let userData = JSON.parse(userCookie);
                let logInPass = $("#logInPass").val();
                if(logInPass != userData.pass){
                    $("#badLogIn").show();
                    $("#logIn-form").hide(); 
                } 
                else{
                    $("#logIn-form").hide();
                    $("#logInOk").show();  
                    showUserProfile(logInId);  
                }
            }
            else{
                $("#badLogInId").show();
                $("#logIn-form").hide(); 
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