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
        $("#logIn-popup").show(); 
    });
    $("#clslogIn-popup").click(function(){
        $("#logIn-popup").hide(); 
    });

    // Boton de singUp
    $("#signUp-btn").click(function(){
        $("#signUp-popup").show(); 
    });
    $("#clsSignUp-popup").click(function(){
        $("#signUp-popup").hide();
        $("#obFields").hide(); 
        $("#dupEmail").hide();  
    });

    //Creación de la cookie de registro
    $("#saveSignUpData-btn").click(function(){
        var userId = $("#userId").val();
        var userPass = $("#userPass").val();
        var userName = $("#userName").val();
        var userEmail = $("#userEmail").val();
        var userBornDate = $("#userBornDate").val();
        var userProfileImg = $("#userProfileImg").val();
        var chckMusica = false;
        var chckCombates = false;
        var chckHobbits = false;
        var chckUc3m = false;
        var checkTerms = false;
        if ($("#chckMusica").prop("checked") == undefined) {
            chckMusica = true;
        }       
        if ($("#chckCombates").prop("checked") == undefined) {
            chckCombates = true;
        }
        if ($("#chckHobbits").prop("checked") == undefined) {
            chckHobbits = true;
        }
        if ($("#chckUc3m").prop("checked") == undefined) {
            chckUc3m = true;
        }
        if ($("#checkTerms").prop("checked") == true) {
            checkTerms = true;
        }
        let auxEmail = getCookie("userEmail");
        if (userEmail != "" & userEmail== auxEmail){
            //Messaje de error
            $("#dupEmail").show(); 
        }
        else if (userId == "" | userPass == "" |userName == "" | userEmail == "" | userBornDate == "" | checkTerms == false){
            //Messaje de error
            $("#obFields").show(); 
        }
        else{
            setCookie("userId", userId);
            setCookie("userPass", userPass);
            setCookie("userName", userName);
            setCookie("userEmail", userEmail);
            setCookie("userBornDate", userBornDate);
            setCookie("userProfileImg", userProfileImg);
            setCookie("chckMusica", chckMusica);
            setCookie("chckCombates", chckCombates);
            setCookie("chckHobbits", chckHobbits);
            setCookie("chckUc3m", chckUc3m);
            setCookie("checkTerms", checkTerms);
            $("#signUp-popup").hide();
            $("#obFields").hide(); 
            $("#dupEmail").hide(); 
            $("#signInOk-popup").show(); 
        }
    });
    //Boton de cierre de la confirmacion del registro
    $("#clsSignInOk-popup").click(function(){
        $("#signInOk-popup").hide(); 
    });    
});
