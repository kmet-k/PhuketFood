var firebaseConfig = {
    apiKey: "AIzaSyDV6YCH-knnBtoCdvT1Z2wEkOU9y_NF_IU",
    authDomain: "phuketfood-a4623.firebaseapp.com",
    databaseURL: "https://phuketfood-a4623.firebaseio.com",
    projectId: "phuketfood-a4623",
    storageBucket: "phuketfood-a4623.appspot.com",
    messagingSenderId: "590945091329",
    appId: "1:590945091329:web:b0fdf7026b087cb8cc6500",
    measurementId: "G-2MDJF4T26J"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

$(document).ready(function () {
$("#corracRegistercard").hide();
})

function register(){

    var getregisemail = document.getElementById("inputEmail").value;
    var getregispassword = document.getElementById("inputPassword").value;
    var confirmpassword = document.getElementById("inputConfirmPassword").value;

    if(getregispassword != confirmpassword ){
        alert("confirmpassword is Uncorrect!!")

    }else{
        firebase.auth().createUserWithEmailAndPassword(getregisemail,getregispassword)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
          $("#registercard").hide();
          $("#corracRegistercard").show();
          
    }

}