//Configuracion de las cookies de registro
function setSignUpCookie(userId, userPass, userName, userEmail, userBornDate, chckMusica , chckCombates, chckHobbits, chckUc3m){
    let userData = { "pass": userPass, "name": userName, "email": userEmail, "bornDate": userBornDate, "musica": chckMusica , "combates": chckCombates, "hobbits": chckHobbits, "uc3m": chckUc3m, "numberOfExperiences": 0};
    Cookies.set(String(userEmail) + "-" + "userEmail", userEmail, {secure:true});
    Cookies.set(String(userId), JSON.stringify(userData), {secure:true});   
}

//Cambia la interfaz y pasa a modo usuario
function showUserProfile(userId){
    // Se carga la imagen del usuario
    let userProfileImage = localStorage.getItem(userId + "-" +"profileImg");
    if (userProfileImage == "null" | userProfileImage == null | userProfileImage == undefined){
        localStorage.setItem(userId + "-" +"profileImg", "null");
        $("#userImage").attr("src",'./images/common/default-icon.png');
    }
    else{
        $("#userImage").attr("src",userProfileImage);
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

// Eliminar experiencias
function deleteExperience(numberOfExperience){
    $("#experience-" + numberOfExperience).empty();
    let userId = Cookies.get("currentUser");
    let userCookie = Cookies.get(userId);
    let userData = JSON.parse(userCookie);
    userData.numberOfExperience--;
    Cookies.set(String(userId), JSON.stringify(userData), {secure:true});
    $("#myExperiences").hide(); 
    $("#experienceDeleted").show(); 
}

// Muestra las paginas secundarias en popups
function showOnPopup(path){
    $("#secondaryFrame").attr("src",path);
    $("#secondaryOnPopUp").show();
}

//Muestra las experiencias en popups
function showExperienceOnPopup(path){
    $("#secondaryExperiencesFrame").attr("src",path);
    $("#secondaryExperienceOnPopUp").show();
}

//Reinicia las experiencias
function resetExperiences() {
    let i = 0;
    while (document.getElementById("exp" + i) != null) {
        $("#img" + i).show();
        $("#title" + i).show();
        $("#description" + i).show();
        i++;
    }
    return i;
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

    //Cierre mensaje id duplicado
    $("#clsdupUserIdSignUp").click(function(){
        $("#dupUserIdSignUp").hide();
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
        $("#myNewExperiences").empty();
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
            // Se cargan los datos que ha introducido el usuario
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
            $("#updatedInfo").show(); 
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
            $("#myProfile").hide();
            $("#updatedInfo").show(); 
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

    //Cierre usuario duplicado
    $("#clsdupUserIdchangeId").click(function(){
        $("#dupUserIdchangeId").hide();
        $("#changeProfileId-form").show();
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
            //Se muestran los cambios
            document.getElementById("userId-p").innerHTML = newuserId;    
            document.getElementById("profileId").innerHTML = newuserId;        
            $("#updatedInfo").show(); 
            $("#changeProfileId-form").trigger("reset");  
        },
        // Reglas de la validacion
        rules: {
            changeuserId:{
                required: true,
                userIdDupChangeId: true
            }
        },
        // Mensajes de error
        messages: {
            changeuserId: "<br>Por favor, introduce tu nuevo nombre de usuario",
        },
        // Estilo de los mensajes de error
        errorElement : 'span'  
    }); 

    // Confirmacion de cambios
    $("#clsupdatedInfo").click(function(){
        $("#updatedInfo").hide(); 
        $("#myProfile").show(); 
    });

    // SECCION MI PERFIL /////////////////////////////////////////////////
    $("#profile-btn").click(function(){
        $("#myProfile").show();
        // Se cargan los datos
        let userId = Cookies.get("currentUser");
        let userProfileImage = localStorage.getItem(userId + "-" + "profileImg");
        let userData = JSON.parse(Cookies.get(userId));
        // Se carga la imagen de perfil por almacenada, si no existe se carga la imagen por defecto
        if (userProfileImage != "null"){
            $("#profileImage").attr("src",userProfileImage);
        }
        else{
            $("#profileImage").attr("src", './images/common/default-icon.png');
        }
        // Se muestran los datos modificando el texto
        document.getElementById("profileId").innerHTML = "Nombre de usuario: " + userId;
        document.getElementById("profilePass").innerHTML = "Contraseña: " + userData.pass;
        document.getElementById("profileName").innerHTML = "Nombre y apellidos: " + userData.name;
        document.getElementById("profileEmail").innerHTML = "Email: " + userData.email;
        document.getElementById("profileBornDate").innerHTML = "Fecha de nacimiento: " + userData.bornDate;
        document.getElementById("profileHobbits").innerHTML = ""; 
        document.getElementById("profileUc3m").innerHTML = ""; 
        document.getElementById("profileCombat").innerHTML = "";
        document.getElementById("profileMusic").innerHTML = "";  
        // Comprobacion de intereses
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

    // //Almacenmiento del experiencias
    $("#addExperience-form").validate({
        submitHandler: function(){
            $("#addExperience-form").hide();
            $("#loadedExperienceImage").hide();
            // Lectura de datos
            let userId = Cookies.get("currentUser");
            let userCookie = Cookies.get(userId);
            let userData = JSON.parse(userCookie);
            userData.numberOfExperiences++;
            Cookies.set(String(userId), JSON.stringify(userData), {secure:true});
            let experienceTitle = $("#experienceTitle").val();
            let experienceDescription = $("#experienceDescription").val();
            let experiencePlace = $("#experiencePlace").val();
            let experienceImage = document.getElementById("experienceImage").files[0]
            var reader = new FileReader();
            $("#myNewExperiences").prepend("<div id=experience-" + userData.numberOfExperiences + "></div>")
            // Se añade el texto y la imagen
            $("#experience-" + userData.numberOfExperiences).append("<hr class=experiencehr></hr>");
            $("#experience-" + userData.numberOfExperiences).append("<p class=experiencesText>" + experienceTitle + "</p>");
            // Carga de imagen
            // Imagen por defecto
            if (experienceImage == null | experienceImage == undefined){
                $("#experience-" + userData.numberOfExperiences).append("<p class=experiencesText style=margin-top:5%; width:50%; margin-bottom:5%; display:inline-block;><img src='./images/common/default-icon.png' style=width:50%; class=responsiveimg></img></p>");
                $("#experience-" + userData.numberOfExperiences).append("<p class=experiencesText>" + experiencePlace + "</p>");
                $("#experience-" + userData.numberOfExperiences).append("<p class=experiencesText style=margin-bottom:5%;>" + experienceDescription + "</p>");
                $("#experience-" + userData.numberOfExperiences).append(          
                    "<div><p class=form-p style=margin-bottom:10%;>" + 
                        "<button class=deleteExperience-btn type=button onclick=deleteExperience(" + userData.numberOfExperiences +") >" +
                        "<label for=deleteExperience-btn>Eliminar experiencia</label></button>" +
                    "</p></div>");
            }
            // Imagen del usuario
            else{
                reader.onloadend = function(){
                    $("#experience-" + userData.numberOfExperiences).append("<p class=experiencesText style=margin-top:5%; width:50%; margin-bottom:5%; display:inline-block;><img src=" + "'" + reader.result + "'" +  "style=width:50%; class=responsiveimg></img></p>");
                    $("#experience-" + userData.numberOfExperiences).append("<p class=experiencesText>" + experiencePlace + "</p>");
                    $("#experience-" + userData.numberOfExperiences).append("<p class=experiencesText style=margin-bottom:5%;>" + experienceDescription + "</p>");
                    $("#experience-" + userData.numberOfExperiences).append(          
                        "<div><p class=form-p style=margin-bottom:10%;>" + 
                        "<button class=deleteExperience-btn type=button onclick=deleteExperience(" + userData.numberOfExperiences +") >" +
                        "<label for=deleteExperience-btn>Eliminar experiencia</label></button>" +
                    "</p></div>");
                }
                reader.readAsDataURL(experienceImage);
            }
            //Se muestran los cambios  
            $("#experienceAdded").show(); 
            $("#addExperience-form").trigger("reset");
        },
        // Mensajes de error
        messages: {
            experienceTitle: "<br>Por favor, introduce el titulo de la experiencia",
            experienceDescription: "<br>Por favor, introduce la descripcion de la experiencia",
            experiencePlace: "<br>Por favor, introduce el lugar de la experiencia",
        },
        // Estilo de los mensajes de error
        errorElement : 'span'  
        }); 

    //Confirmacion experiencia añadida
    $("#clsexperienceAdded").click(function(){
        $("#experienceAdded").hide();
        $("#myExperiences").show();
    }); 

    //Confirmacion experiencia eliminada
    $("#clsexperienceDeleted").click(function(){
        $("#experienceDeleted").hide();
        $("#myExperiences").show();
    }); 

    //Boton de submit añadir experiencias
    $("#saveExperience-btn").click(function(){
        $("#addExperience-form").trigger("submit");
    }); 

    //Tick de imagen cargada
    $(document).on("change", "#experienceImage", function() {
        $("#loadedExperienceImage").show();
    });

    // POP UPS DE PAGINAS SECUNDARIAS ///////////////////////////////
    // Cierre de popUps de paginas secundarias
    $("#clssecondaryOnPopUp").click(function(){
        $("#secondaryOnPopUp").hide(); 
    });

    // Cierre de popUps experiencias tercera seccion
    $("#clssecondaryExperienceOnPopUp").click(function(){
        $("#secondaryExperienceOnPopUp").hide(); 
    });

    // FILTRADO DE EXPERIENCIAS //////////////////////////////////////////////
    $("#filterExperiences-btn").click(function(){
        let keywords = $("#keywords").val();
        //Se muestra el searching for:
        $("#searchingForDiv").show();
        var hiddenExps = new Array();
        var showExps = new Array();
        // Se muestran todas por si hay alguna oculta y se almacenan el numero de experiencias y el numero de bloques
        let numberOfDefaultExperiences = resetExperiences();

        //Se almacenan los textos y las imagenes
        var experiencesImages = new Array();
        var experiencesTitles = new Array();
        var experiencesDescriptions = new Array();
        for(let j = 0; j < numberOfDefaultExperiences; j++){
            experiencesImages.push(document.getElementById("img" + j).src);  
            experiencesTitles.push(document.getElementById("title" + j).textContent);  
            experiencesDescriptions.push(document.getElementById("description" + j).textContent);  
        }
        // Se almacen las posiciones donde estan las experiencias a ocultar y a mostrar
        for(let j = 0; j < numberOfDefaultExperiences; j++){
            let currentElement = document.getElementById("exp" + j);
            if(currentElement.textContent.search(keywords) == -1){
                hiddenExps.push(j)
            }
            else{
                showExps.push(j)
            } 
        }
        // Se reorganizan intercambiando los contenidos entre mostradas y no mostradas
        var aux;
        for(let j = 0; j < showExps.length; j++){
            //Img
            aux = experiencesImages[j];
            experiencesImages[j] = experiencesImages[showExps[j]];
            experiencesImages[showExps[j]] = aux;
            //Title
            aux = experiencesTitles[j];
            experiencesTitles[j] = experiencesTitles[showExps[j]];
            experiencesTitles[showExps[j]] = aux;
            //Desc
            aux = experiencesDescriptions[j];
            experiencesDescriptions[j] = experiencesDescriptions[showExps[j]];
            experiencesDescriptions[showExps[j]] = aux;
        }
        // Se realiza el cambio en el html
        for(let j = 0; j < numberOfDefaultExperiences; j++){
            document.getElementById("img" + j).src = experiencesImages[j]; 
            document.getElementById("title" + j).innerHTML = experiencesTitles[j];
            document.getElementById("description" + j).innerHTML = experiencesDescriptions[j]; 
        }
        //Se ocultan las no seleccionadas recorriendo desde las seleccionadas
        for (j = showExps.length; j < numberOfDefaultExperiences; j++){
                $("#img" + j).hide(); 
                $("#title" + j).hide();
                $("#description" + j).hide();
        }
    });

    //Cierre del searching for y reinicio de el filtrado
    $("#clssearchingForBtn").click(function(){
        $("#searchingForDiv").hide(); 
        resetExperiences();
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

    // Comprobacion de Id duplicado en el signUp
    $.validator.addMethod(
        "userIdDupSignUp",
        function(value) {
            if (Cookies.get(String(value)) != null){
                $("#dupUserIdSignUp").show();
                $("#signUp-form").hide();
                return false;
            }
            return true;
        },
    );

    // Comprobacion de Id duplicado en el cambio de nombre
    $.validator.addMethod(
        "userIdDupChangeId",
        function(value) {
            if (Cookies.get(String(value)) != null){
                $("#dupUserIdchangeId").show();
                $("#changeProfileId-form").hide();
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
            // Se crean las cookies y se muestra la interfaz del usuario
            setSignUpCookie(userId, userPass, userName, userEmail, userBornDate, chckMusica , chckCombates, chckHobbits, chckUc3m);
            showUserProfile(userId);   
            $("#signUpOk-form").show(); 
        },
        // Reglas de la validacion
        rules: {
            userId:{
                required: true,
                userIdDupSignUp: true
            },
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
        // Mensajes de error
        messages: {
            userId: "<br>Por favor, introduce tu nombre de usuario",
            userPass: "<br>Por favor, introduce una contraseña (letras y numeros, 8 maximo)",
            userName: "<br>Por favor, introduce tu nombre y tus apellidos",
            userEmail: "<br>Por favor, introduce un mail valido (nombre@dominio.extensión)",
            userBornDate: "<br>Por favor, introduce tu fecha de nacimiento (dd/mm/aaaa)",
            chckTerms: "Tienes que aceptar los terminos de uso<br>"
        },
        // Estilo de los mensajes de error
        errorElement : 'span'  
    });

    //Validacion del formulario de login
    var logInValidator = $("#logIn-form").validate({
        submitHandler: function(){
            let logInId = $("#logInId").val();
            let userCookie = Cookies.get(logInId)
            // El usuario existe
            if (userCookie != null){
                let userData = JSON.parse(userCookie);
                let logInPass = $("#logInPass").val();
                // El usuario y la contraseña no coinciden
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
            // Usuario inexistente
            else{
                $("#badLogInId").show();
                $("#logIn-form").hide(); 
            }

        },
        // Reglas de la validacion del formulario
        rules: {
            logInId: "required",
            logInPass: "required"
        },
        // Mensajes de error
        messages: {
            logInId: "<br>Por favor, introduce tu nombre de usuario registrado",
            logInPass: "<br>Por favor, introduce una contraseña",
            
        },
        // Estilo de los mensajes de error
        errorElement : 'span'  
    });

});