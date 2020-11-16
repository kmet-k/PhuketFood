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

var db = firebase.firestore();
var menu = [];
var menuLang = []
var menuFilter = []
var typeData = []
var meatData = []
var type = []
var meat = []
var lang = "cn";
var menuFinal = [];
var menuText = [];
var text = "";
var typeName = []
var meatName = []

function setType(setID, setType) {
    var del = false;

    type.forEach((value, key) => {
        console.log(value[0])
        console.log(value[0])
        if (setID == value[0]) {
            type.splice(key, 1);
            del = true
        }
    })
    typeName.forEach((value, key) => {
        if (setType == value[0]) {
            typeName.splice(key, 1); z
            del = true
        }
    })
    if (!del) {
        type.push([setID])
        typeName.push([setType])
    }
}

function setMeat(setID, setMeat) {
    var del = false;
    meat.forEach((value, key) => {
        console.log(value[0])
        console.log(value[0])
        if (setID == value[0]) {
            meat.splice(key, 1);
            del = true
        }
    })
    meatName.forEach((value, key) => {
        if (setMeat == value[0]) {
            meatName.splice(key, 1); z
            del = true
        }
    })
    if (!del) {
        meat.push([setID])
        meatName.push([setMeat])
    }
}



$(document).ready(function () {
    $("#loginuser").hide();
    $("#logoutuser").hide();
    $("#searchBox").hide();
    $("#result").hide();
    $(".bgdiv").hide();
    $(".imglogo").hide();
    

    db.collection("menuNew").limit(5).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            menu.push([doc.data().english_Name, doc.data().thai_Name, doc.data().chinese_Name, doc.data().id_Meat, doc.data().id_Type, doc.data().recommend, doc.data().spiciness, doc.data().picture, doc.data().id_Menu])
        });
    }).then(function () {
        console.log('success');
        $("#searchBox").show();
        $(".bgdiv").show();
        $("#loading").hide();
        $(".imglogo").show();
        authen()
        search()

        if (text !== "") {
            $("#text").append(text);
        } else {
            $("#text").hide();
            $("#head").hide();
            $("#by").css("margin-top", "20px")
        }
        $("#rec").hide(text);

        $("#by").empty().show().append("Filter >").css("color", "rgb(109, 108, 108)");
        if (type.length !== 0) {
            type.forEach((item, index) => {

                $("#by").append("<b>&nbsp;&nbsp;&nbsp;" + item[0] + "<b>");
            })
        } if (meat.length !== 0) {
            meat.forEach((item, index) => {

                $("#by").append("<b>&nbsp;&nbsp;&nbsp;" + item[0] + "<b>");
            })
        } if (meat.length == 0 && type.length == 0) {
            $("#by").empty().show().append("Filter > ").css("color", "rgb(233, 233, 233)");
        }

        menu.forEach((item, index) => {

        });

        if (menu.length == 0) {
            var object = `<div class="col-12" style="margin-top: 5%; font-size: 50px; "> --- Not found --- </div>`
            $("#cardResult").append(object);
        } else {
            menu.forEach((item, value) => {
                var spicy = "";
                if (item[6] == "no spicy") {
                    spicy = `<div class="col-2 spicy" id="spicy" style="border-radius: 15px 15px 15px 15px; background-color: white;">
                    </div>`
                } else if (item[6] == "little spicy") {
                    spicy = `<div class="col-2 spicy" id="spicy" style="border-radius: 15px 15px 15px 15px; 
                    background-color: yellow;
                    background-image: url('img/spicy.png');
                    background-repeat: no-repeat;
                    background-size: contain;
                    width: 100%;
                    height: auto;
                    background-position: center; 
                    position: relative;
                    display: inline-block;">
                    </div>`
                } else {
                    spicy = `<div class="col-2 spicy" id="spicy" style="border-radius: 15px 15px 15px 15px; 
                    background-color: 	#8B0000;
                    background-image: url('img/spicy.png');
                    background-repeat: no-repeat;
                    background-size: contain;
                    width: 100%;
                    height: auto;
                    background-position: center; 
                    position: relative;
                    display: inline-block;">
                    </div>`
                }
                // RICE
                if (item[4] == "t_004") {
                    var object = `<div class="col col-3" style="margin-top:2%;" onClick="createModal('${item[0]}','${item[1]}','${item[2]}','${item[3]}','${item[4]}','${item[5]}','${item[7]}','${item[8]}')" data-toggle="modal" data-target="#showModal">
                <div class="card col-10" style=" margin:auto">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-10" style="text-align: left; font-size: 20px; border-bottom: 5px;" id="name">
                                ${item[0]}
                            </div>
                            ${spicy}
                        
                            <div id="imgCard" class="imgCard" style="background-image: url('${item[7]}')">
    
                            </div>
                    </div>
                </div>
             </div>`
                    $("#rice").append(object);

                }
                //noodle 
                if (item[4] == "t_002") {
                    var object = `<div class="col col-3" style="margin-top:2%;" onClick="createModal('${item[0]}','${item[1]}','${item[2]}','${item[3]}','${item[4]}','${item[5]}','${item[7]}','${item[8]}')" data-toggle="modal" data-target="#showModal">
                    <div class="card col-10" style=" margin:auto">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-10" style="text-align: left; font-size: 20px; border-bottom: 5px;" id="name">
                                    ${item[0]}
                                </div>
                                ${spicy}
                            
                                <div id="imgCard" class="imgCard" style="background-image: url('${item[7]}')">
        
                                </div>
                        </div>
                    </div>
                </div>`
                    $("#noodle").append(object);

                }
                //SOUP
                if (item[4] == "t_001") {
                    var object = `<div class="col col-3" style="margin-top:2%;" onClick="createModal('${item[0]}','${item[1]}','${item[2]}','${item[3]}','${item[4]}','${item[5]}','${item[7]}','${item[8]}')" data-toggle="modal" data-target="#showModal">
                    <div class="card col-10" style=" margin:auto">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-10" style="text-align: left; font-size: 20px; border-bottom: 5px;" id="name">
                                    ${item[0]}
                                </div>
                                ${spicy}
                            
                                <div id="imgCard" class="imgCard" style="background-image: url('${item[7]}')">
        
                                </div>
                        </div>
                    </div>
                </div>`
                    $("#soup").append(object);

                }
                //CURRY
                if (item[4] == "t_005") {
                    var object = `<div class="col col-3" style="margin-top:2%;" onClick="createModal('${item[0]}','${item[1]}','${item[2]}','${item[3]}','${item[4]}','${item[5]}','${item[7]}','${item[8]}')" data-toggle="modal" data-target="#showModal">
                    <div class="card col-10" style=" margin:auto">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-10" style="text-align: left; font-size: 20px; border-bottom: 5px;" id="name">
                                    ${item[0]}
                                </div>
                                ${spicy}
                            
                                <div id="imgCard" class="imgCard" style="background-image: url('${item[7]}')">
        
                                </div>
                        </div>
                    </div>
                </div>`
                    $("#curry").append(object);

                }
                //Grill
                if (item[4] == "t_006") {
                    var object = `<div class="col col-3" style="margin-top:2%;" onClick="createModal('${item[0]}','${item[1]}','${item[2]}','${item[3]}','${item[4]}','${item[5]}','${item[7]}','${item[8]}')" data-toggle="modal" data-target="#showModal">
                    <div class="card col-10" style=" margin:auto">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-10" style="text-align: left; font-size: 20px; border-bottom: 5px;" id="name">
                                    ${item[0]}
                                </div>
                                ${spicy}
                            
                                <div id="imgCard" class="imgCard" style="background-image: url('${item[7]}')">
        
                                </div>
                        </div>
                    </div>
                </div>`
                    $("#grill").append(object);

                }
                //Stir-fry
                if (item[4] == "t_007") {
                    var object = `<div class="col col-3" style="margin-top:2%;" onClick="createModal('${item[0]}','${item[1]}','${item[2]}','${item[3]}','${item[4]}','${item[5]}','${item[7]}','${item[8]}')" data-toggle="modal" data-target="#showModal">
                    <div class="card col-10" style=" margin:auto">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-10" style="text-align: left; font-size: 20px; border-bottom: 5px;" id="name">
                                    ${item[0]}
                                </div>
                                ${spicy}
                            
                                <div id="imgCard" class="imgCard" style="background-image: url('${item[7]}')">
        
                                </div>
                        </div>
                    </div>
                </div>`
                    $("#stirfry").append(object);

                }
                //Fried
                if (item[4] == "t_008") {
                    var object = `<div class="col col-3" style="margin-top:2%;" onClick="createModal('${item[0]}','${item[1]}','${item[2]}','${item[3]}','${item[4]}','${item[5]}','${item[7]}','${item[8]}')" data-toggle="modal" data-target="#showModal">
                    <div class="card col-10" style=" margin:auto">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-10" style="text-align: left; font-size: 20px; border-bottom: 5px;" id="name">
                                    ${item[0]}
                                </div>
                                ${spicy}
                            
                                <div id="imgCard" class="imgCard" style="background-image: url('${item[7]}')">
        
                                </div>
                        </div>
                    </div>
                </div>`
                    $("#fried").append(object);

                }
                //Cold dishes
                if (item[4] == "t_003") {
                    var object = `<div class="col col-3" style="margin-top:2%;" onClick="createModal('${item[0]}','${item[1]}','${item[2]}','${item[3]}','${item[4]}','${item[5]}','${item[7]}','${item[8]}')" data-toggle="modal" data-target="#showModal">
                    <div class="card col-10" style=" margin:auto">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-10" style="text-align: left; font-size: 20px; border-bottom: 5px;" id="name">
                                    ${item[0]}
                                </div>
                                ${spicy}
                            
                                <div id="imgCard" class="imgCard" style="background-image: url('${item[7]}')">
        
                                </div>
                        </div>
                    </div>
                </div>`
                    $("#colddishes").append(object);

                }
                //Dessert and snack
                if (item[4] == "t_009") {
                    var object = `<div class="col col-3" style="margin-top:2%;" onClick="createModal('${item[0]}','${item[1]}','${item[2]}','${item[3]}','${item[4]}','${item[5]}','${item[7]}','${item[8]}')" data-toggle="modal" data-target="#showModal">
                    <div class="card col-10" style=" margin:auto">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-10" style="text-align: left; font-size: 20px; border-bottom: 5px;" id="name">
                                    ${item[0]}
                                </div>
                                ${spicy}
                            
                                <div id="imgCard" class="imgCard" style="background-image: url('${item[7]}')">
        
                                </div>
                        </div>
                    </div>
                </div>`
                    $("#dessertandsnack").append(object);

                }
                //Beverage
                if (item[4] == "t_010") {
                    var object = `<div class="col col-3" style="margin-top:2%;" onClick="createModal('${item[0]}','${item[1]}','${item[2]}','${item[3]}','${item[4]}','${item[5]}','${item[7]}','${item[8]}')" data-toggle="modal" data-target="#showModal">
                    <div class="card col-10" style=" margin:auto">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-10" style="text-align: left; font-size: 20px; border-bottom: 5px;" id="name">
                                    ${item[0]}
                                </div>
                                ${spicy}
                            
                                <div id="imgCard" class="imgCard" style="background-image: url('${item[7]}')">
        
                                </div>
                        </div>
                    </div>
                </div>`
                    $("#beverage").append(object);

                }
                //Fruit
                if (item[4] == "t_011") {
                    var object = `<div class="col col-3" style="margin-top:2%;" onClick="createModal('${item[0]}','${item[1]}','${item[2]}','${item[3]}','${item[4]}','${item[5]}','${item[7]}','${item[8]}')" data-toggle="modal" data-target="#showModal">
                    <div class="card col-10" style=" margin:auto">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-10" style="text-align: left; font-size: 20px; border-bottom: 5px;" id="name">
                                    ${item[0]}
                                </div>
                                ${spicy}
                            
                                <div id="imgCard" class="imgCard" style="background-image: url('${item[7]}')">
        
                                </div>
                        </div>
                    </div>
                </div>`
                    $("#fruit").append(object);

                }
                //Other types
                if (item[4] == "t_012") {
                    var object = `<div class="col col-3" style="margin-top:2%;" onClick="createModal('${item[0]}','${item[1]}','${item[2]}','${item[3]}','${item[4]}','${item[5]}','${item[7]}','${item[8]}')" data-toggle="modal" data-target="#showModal">
                    <div class="card col-10" style=" margin:auto">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-10" style="text-align: left; font-size: 20px; border-bottom: 5px;" id="name">
                                    ${item[0]}
                                </div>
                                ${spicy}
                            
                                <div id="imgCard" class="imgCard" style="background-image: url('${item[7]}')">
        
                                </div>
                        </div>
                    </div>
                </div>`
                    $("#othertypes").append(object);

                }
            });


        }


    })
    db.collection("type").orderBy("id_Type").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            typename = doc.data().type
            typeData.push([doc.data().id_Type, doc.data().type])


            //         var showtypename = `<div class="hdiv">
            //     <h1>${typename}</h1>
            //     <button class="btnshowall" id="togglebtn">Show all</button>
            // </div>`
            //     $("gettypename").append(showtypename);
        });
    }).then(function () {
        typeData.forEach((item, value) => {
            if (item[1] == "Rice") {
                var showtypename = `<div class="hdiv">
                <div class="togglebutton">
            <h1>${item[1]}</h1>
            <button class="btn" id="togglebtn" onclick="togglefunc()">Show all</button>
            </div>
            </div>`
                $(".typerice").append(showtypename);

            }
            if (item[1] == "Noodle") {
                var showtypename = `<div class="hdiv">
                <div class="togglebutton">
            <h1>${item[1]}</h1>
            <button  class="btn" id="togglebtn1" onclick="togglefuncn()">Show all</button>
            </div>
            </div>`

                $(".typenoodle").append(showtypename);

            }
            if (item[1] == "Soup") {
                var showtypename = `<div class="hdiv">
                <div class="togglebutton">
            <h1>${item[1]}</h1>
            <button class="btn" id="togglebtn2" onclick="togglefuncs()">Show all</button>
            </div>
            </div>`
                $(".typersoup").append(showtypename);

            }
            if (item[1] == "Curry") {
                var showtypename = `<div class="hdiv">
                <div class="togglebutton">
            <h1>${item[1]}</h1>
            <button class="btn" id="togglebtn3" onclick="togglefuncc()">Show all</button>
            </div>
            </div>`
                $(".typecurry").append(showtypename);

            }
            if (item[1] == "Grill") {
                var showtypename = `<div class="hdiv">
                <div class="togglebutton">
            <h1>${item[1]}</h1>
            <button class="btn" id="togglebtn4" onclick="togglefuncg()">Show all</button>
            </div>
            </div>`
                $(".typegrill").append(showtypename);

            }
            if (item[1] == "Stir-fry") {
                var showtypename = `<div class="hdiv">
                <div class="togglebutton">
            <h1>${item[1]}</h1>
            <button class="btn" id="togglebtn5" onclick="togglefuncsf()">Show all</button>
            </div>
            </div>`
                $(".typestirfry").append(showtypename);

            }
            if (item[1] == "Fried") {
                var showtypename = `<div class="hdiv">
                <div class="togglebutton">
            <h1>${item[1]}</h1>
            <button class="btn" id="togglebtn6" onclick="togglefuncfr()">Show all</button>
            </div>
            </div>`
                $(".typefried").append(showtypename);

            }
            if (item[1] == "Cold dishes") {
                var showtypename = `<div class="hdiv">
                <div class="togglebutton">
            <h1>${item[1]}</h1>
            <button class="btn" id="togglebtn7" onclick="togglefunccd()">Show all</button>
            </div>
            </div>`
                $(".typecolddishes").append(showtypename);

            }
            if (item[1] == "Dessert and snack") {
                var showtypename = `<div class="hdiv">
                <div class="togglebutton">
            <h1>${item[1]}</h1>
            <button class="btn" id="togglebtn8" onclick="togglefuncds()">Show all</button>
            </div>
            </div>`
                $(".typedesert").append(showtypename);

            }
            if (item[1] == "Beverage") {
                var showtypename = `<div class="hdiv">
                <div class="togglebutton">
            <h1>${item[1]}</h1>
            <button class="btn" id="togglebtn9" onclick="togglefuncb()">Show all</button>
            </div>
            </div>`
                $(".typebeverage").append(showtypename);

            }
            if (item[1] == "Fruit") {
                var showtypename = `<div class="hdiv">
                <div class="togglebutton">
            <h1>${item[1]}</h1>
            <button class="btn" id="togglebtn10" onclick="togglefuncfrt()">Show all</button>
            </div>
            </div>`
                $(".typefruit").append(showtypename);

            }
            if (item[1] == "Other types") {
                var showtypename = `<div class="hdiv">
                <div class="togglebutton">
            <h1>${item[1]}</h1>
            <button class="btn" id="togglebtn11" onclick="togglefuncot()">Show all</button>
            </div>
            </div>`
                $(".typeother").append(showtypename);

            }
        });
    

    })


    db.collection("meat").orderBy("id_Meat").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            meatData.push([doc.data().id_Meat, doc.data().meat])
        });
    });
   


})
function authen(){
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log(user);
      console.log(user.email);
      $("#logoutuser").show();
      $("#loginuser").hide();
      $("#hideUsernotlogin").show();
    //   var user = firebase.auth().currentUser;
    //   if (user != null) {
   
    //     // User is signed in.
    //   } else {
    //     // No user is signed in.
    //   }
       

    } else {
      // No user is signed in.
      $("#logoutuser").hide();
      $("#loginuser").show();
      $("#hideUsernotlogin").hide();
    }
  });
}

function login() {
    
    var getemail = document.getElementById("email").value;
    var getpassword = document.getElementById("pwd").value;

    firebase.auth().signInWithEmailAndPassword(getemail, getpassword).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        alert("Error  : " + errorMessage);
        // ...
       
      });
      
}

function register(){

    var getregisemail = document.getElementById("regisemail").value;
    var getregispassword = document.getElementById("regispwd").value;

    

    firebase.auth().createUserWithEmailAndPassword(getregisemail,getregispassword).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}
function logout() {
firebase.auth().signOut().then(function() {
  });

}

function togglefunc(){
    var x = document.getElementById("ricetoggle");
    if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
}

function togglefuncn(){
    var x = document.getElementById("noodletoggle");
    if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
}

function togglefuncs(){
    var x = document.getElementById("souptoggle");
    if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
}

function togglefuncc(){
    var x = document.getElementById("currytoggle");
    if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
}

function togglefuncg(){
    var x = document.getElementById("grilltoggle");
    if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
}

function togglefuncsf(){
    var x = document.getElementById("stirfrytoggle");
    if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
}

function togglefuncfr(){
    var x = document.getElementById("friedtoggle");
    if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
}

function togglefunccd(){
    var x = document.getElementById("colddishestoggle");
    if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
}

function togglefuncds(){
    var x = document.getElementById("desserttoggle");
    if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
}

function togglefuncb(){
    var x = document.getElementById("bevertoggle");
    if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
}

function togglefuncfrt(){
    var x = document.getElementById("fruittoggle");
    if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
}

function togglefuncot(){
    var x = document.getElementById("othertoggle");
    if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
}




function search() {

    $("#search").keyup(function () {
        $("#result").empty();
        text = $("#search").val()



        if (text == "") {
            $("#result").hide();
            clear()
        }else{
            $("#result").hide();
            if (/^[a-zA-Z ]+$/.test(text)) {
                lang = "eng"
                clear()
            } else if (/^[ก-๙]+$/.test(text)) {
                lang = "th"
                clear()
            } else {
                if (text == "") {
                    lang = "en"
                    clear()
                } else {
                    lang = "cn"
                    clear()
                }
            }

        }
        match()
    })

    $("#myFilter").on('hide.bs.modal', function () {
        // console.log(type)
        // console.log(typeName)
        // console.log(meatName)
        $("#by").empty().show().append("Filter >").css("color", "rgb(109, 108, 108)");
        if (type.length !== 0) {
            typeName.forEach((item, index) => {
                $("#by").append("<b>&nbsp;&nbsp;&nbsp;" + item[0] + "<b>");
            })
        } if (meat.length !== 0) {
            meatName.forEach((item, index) => {

                $("#by").append("<b>&nbsp;&nbsp;&nbsp;" + item[0] + "<b>");
            })
        } if (meat.length == 0 && type.length == 0) {
            $("#by").empty().show().append("Filter by >").css("color", "rgb(233, 233, 233)");
        }

    });

    $(".iconFilter").click(function () {

        if ($('#type').is(':empty')) {
            typeData.forEach((item, index) => {
                var item = ` <label class="typeCheck" > ${item[1]} <input type="checkbox" onClick="setType('${item[0]}','${item[1]}')"><span class="checkmark"></span></label>`;
                $('#type').append(item);
            });
            meatData.forEach((item, index) => {
                var item = ` <label class="typeCheck" > ${item[1]} <input type="checkbox" onClick="setMeat('${item[0]}','${item[1]}')"><span class="checkmark"></span></label>`;
                $('#meat').append(item);
            });
        }
    })

}

function readData() {
    menu.forEach((item, index) => {
        if (lang == "eng") {
            if (item[0] !== "") {
                menuLang.push([item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8]])
            }
        } else if (lang == "th") {
            if (item[1] !== "") {
                menuLang.push([item[1], item[0], item[2], item[3], item[4], item[5], item[6], item[7], item[8]])
            }
        } else if (lang == "cn") {
            if (item[2] !== "") {
                menuLang.push([item[2], item[1], item[0], item[3], item[4], item[5], item[6], item[7], item[8]])
            }
        }
    });
}

function match() {
    readData()
    scanFilter()
    scanText(text)
}

function typeAndMeat() {
    menuFilter = []
    menuLang = []
    menuFinal = []
    readData()
    console.log(menuLang)
    scanFilter()
    console.log(menuFilter)
    menuFilter.forEach((item, index) => {
        menuFinal.push([item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8]])
    });
}

function scanText() {

    if (lang == "eng") {
        text = text.toLowerCase().toString()
    }
    text = text.toString();
    $("#result").empty();
    console.log(text)
    $("#result").show();

    menuFilter.forEach((item, index) => {
        var str = item[0].toString()
        if (lang == "eng") {
            var STR = str.toString().toLowerCase()
        } else {
            var STR = str.toString()
        }
        if (STR.startsWith(text)) {
            menuFinal.push([item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8]])
        }
    });
    appendResult()
}

function scanFilter() {
    if (type.length > 0 && meat.length == 0) {
        console.log("1")
        for (var i = 0; i < type.length; i++) {
            menuLang.forEach((item, index) => {
                if (item[4] == type[i]) {
                    menuFilter.push([item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8]])
                }
            });
        }
    } else if (type.length == 0 && meat.length > 0) {
        console.log("2")
        for (var i = 0; i < meat.length; i++) {
            menuLang.forEach((item, index) => {
                if (item[3] == meat[i]) {
                    menuFilter.push([item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8]])
                }
            });
        }
    } else if (type.length == 0 && meat.length == 0) {
        console.log("3")
        menuLang.forEach((item, index) => {
            menuFilter.push([item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8]])
        })
    } else if (type.length > 0 && meat.length > 0) {
        console.log("4")
        for (var i = 0; i < type.length; i++) {
            for (var j = 0; j < meat.length; j++) {
                menuLang.forEach((item, index) => {
                    if (item[4] == type[i] && item[3] == meat[j]) {

                        menuFilter.push([item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8]])
                    }
                });
            }
        }

    }
}
function appendResult() {
    menuFinal.forEach((item, index) => {
        var object = `<div class="col-12" onclick="resultClick('${item[0]}')" style="background-color: white; text-align: left; font-size: 15px; height: 50px; padding-left: 3px; padding-top: 15px;"> ${item[0]} </div>`
        $('#result').append(object);
    });
}

function resultClick(str) {

    text = str.toString()
    $('#search').val(text);
    menuFinal = []
    scanText()
    $('#result').hide();
}

function searchNow() {
    localStorage.clear();
 
    if (text == "") {
        typeAndMeat()
        console.log(menuFinal)
        localStorage.setItem("menu", JSON.stringify(menuFinal));
        localStorage.setItem("type", JSON.stringify(typeName));
        localStorage.setItem("meat", JSON.stringify(meatName));
        localStorage.setItem("text", text);
        console.log(menu);
        $("#search").val('');
        window.open('new.html');

    } else {
        console.log(menuFinal)
        localStorage.setItem("menu", JSON.stringify(menuFinal));
        localStorage.setItem("type", JSON.stringify(typeName));
        localStorage.setItem("meat", JSON.stringify(meatName));
        localStorage.setItem("text", text);
        console.log(menu);
        $("#search").val('');
        window.open('new.html');


    }
}

function clear() {
    menuLang = []
    menuFilter = []
    menuFinal = []
}

function createModal(name, name_2, name_3, meat, type, rec, pic, id) {
    $("#exampleModalLabel").empty();
    $("#exampleModalLabel").append(name);

    if (rec == "No") {
        $("#exampleModalLabel").css("margin-left", "0px;");
        $("#rex").hide();
    } else {
        $("#rex").show();
    }

    if (name_2 !== "") {

        $("#name2").empty();
        $("#name2").append(name_2);
    } else {
        $("#name2").hide();
        $("#slash").hide();
    }
    if (name_3 !== "") {
        $("#name3").empty();
        $("#name3").append(name_3);
    } else {
        $("#slash").hide();
        $("#name3").hide();
    }

    if (type !== "t_012") {
        $("#typename").empty();
        if (type == "t_001") {
            $("#typename").append("Soup");
        } else if (type == "t_002") {
            $("#typename").append("Noodle");
        } else if (type == "t_003") {
            $("#typename").append("Cold dishes");
        } else if (type == "t_004") {
            $("#typename").append("Rice");
        } else if (type == "t_005") {
            $("#typename").append("Curry");
        } else if (type == "t_006") {
            $("#typename").append("Barbecue");
        } else if (type == "t_007") {
            $("#typename").append("Stir-fry");
        } else if (type == "t_008") {
            $("#typename").append("Fried");
        } else if (type == "t_009") {
            $("#typename").append("Dessert and snack");
        } else if (type == "t_010") {
            $("#typename").append("Beverage");
        } else if (type == "t_011") {
            $("#typename").append("Fruit");
        }
    } else if (type == "t_012") {
        $("#typename").empty();
        $("#typename").append("Other types");
    }
    $("#meatModal").show();
    if (meat == "meat_001") {
        $("#meatModal").css("background-image", "url('./img/pig.png')")
    } else if (meat == "meat_002") {
        console.log('chick hu');
        $("#meatModal").css("background-image", "url('./img/chicken.png')")
    } else if (meat == "meat_003") {
        $("#meatModal").css("background-image", "url('./img/cow.png')")
    } else if (meat == "meat_004") {
        $("#meatModal").css("background-image", "url('./img/goat.png')")
    } else if (meat == "meat_005") {
        $("#meatModal").css("background-image", "url('./img/seafood.png')")
    }else if (meat == "meat_006") {
        $("#meatModal").css("background-image", "url('./img/shrim.png')")
    } else if (meat == "meat_007") {
        $("#meatModal").css("background-image", "url('./img/fish.png')")
    } else if (meat == "meat_008") {
        $("#meatModal").css("background-image", "url('./img/squid.png')")
    } else if (meat == "meat_009") {
        $("#meatModal").css("background-image", "url('./img/crab.png')")
    }else if (meat == "meat_010") {
        $("#meatModal").css("background-image", "url('./img/duck.png')")
    } else if (meat == "meat_011") {
        $("#meatModal").css("background-image", "url('./img/shellfish.png')")
    } else {
        $("#meatModal").hide();
    }
    // image=pic
    // console.log(image)
    $("#imgModal").css("background-image", 'url(' + pic + ')').addClass(id);

    $('.' + id).click(function () {
        localStorage.setItem("thaiName", name_3);
        localStorage.setItem("engName", name_2);
        localStorage.setItem("chaiName", name);
        localStorage.setItem("setImage", pic);
        localStorage.setItem("setID", id);
        window.open('res_information.html');
    });

}


