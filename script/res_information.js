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
const auth = firebase.auth();

var db = firebase.firestore();

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
   
var getChaiName = localStorage.getItem("chaiName")
var getEngName = localStorage.getItem("engName")
var getThaiName = localStorage.getItem("thaiName")
var getid = localStorage.getItem("setID");
var getIm = localStorage.getItem("setImage");
console.log("อะไรก็ได้")
console.log(getid)
console.log(getIm)

function initMap() {
    var location = { lat: 7.8948671, lng: 98.3531003 };
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: location
        // center: new google.maps.LatLng(markers[0].lat, markers[0].lng)
    });

    var lat_lng = new Array();
    db.collection("locationres").get().then(function (snapshot) {
        snapshot.forEach(function (doc) {

            latmarker = doc.data().lat;
            lngmarker = doc.data().lng;
            var myLatlng = new google.maps.LatLng(latmarker, lngmarker);
            console.log(myLatlng)
            //   lat_lng.push(myLatlng);



            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
            });


        });
    });

}
db.collection("locationres").get().then(function (snapshot) {
    snapshot.forEach(function (doc) {

        getlat = doc.data().lat;
        getlng = doc.data().lng;
        getresname = doc.data().res_name;

        var carouselshow = `
          <div  class="card">
            <div class="card-body pointer class="overflow-auto"" id="tclick" onclick="tclick('${getlat}','${getlng}','${getresname}')">${getresname}</div>
          </div>`
        $(".carouselres").append(carouselshow);

        console.log(getresname);
    });
});




function tclick(latres, lngres, nameres) {

    // console.log(latres);
    // console.log(lngres);
    var myLatlng = new google.maps.LatLng(latres, lngres);
    // console.log(myLatlng)
    // console.log(valid)

    if (latres != null && lngres != null) {
        localStorage.setItem("lat", latres)
        localStorage.setItem("lng", lngres)
        localStorage.setItem("name", nameres)
    }


    // var getR = localStorage.getItem("valiable1")
    var getR1 = localStorage.getItem("lat")
    var getR2 = localStorage.getItem("lng")
    // console.log(getR)
    console.log(getR1)
    console.log(getR2)

    window.open('gps.html'); 

}


var getID;

numCountSize.countSize = 0;
function numCountSize() {
    numCountSize.countSize++
}
function showAllCollection(usercollec) {

    if (usercollec != null) {
        db.collection("collection").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {

                getCollec = doc.data().collection_name;
                getid = doc.id
                iduser = doc.data().id_user
                console.log(getid)

                if (usercollec == iduser) {
                    var nameCollec = `<div class="pointer" onclick="addMenu('${getid}')" >
                    <div class="setdivshowtype">
                    <div class="aa" align = 'left' id="">${getCollec}</div>
                    </div>
                    </div>`
                    $("#showName").append(nameCollec);
                    console.log(getCollec)
                }

            });

            console.log(snapshot.size)
        });
    }
}

var user = '';
var setUser = function (input) {
    user = input
}
var getUser = function () {
    return user
}


$(document).ready(function () {

    showAllCollection()


    $("#Cpop").unbind("click").click(function () {
        // var getname = localStorage.getItem("setName")
        // document.getElementById("showName").innerHTML = getname;
        // console.log(getname);


        $("#popup").modal();
        // localStorage.clear(); 
    });


    $("#createCall").unbind("click").click(function () {
        document.getElementById("createCollecton").value = '';

        $("#submit").unbind("click").click(function () {
            if (document.getElementById("createCollecton").value != "") {
                numCountSize.countSize = 0;
                db.collection("collection").get().then(function (snapshot) {
                    snapshot.forEach(function (doc) {

                        console.log(doc.id)
                        getID = doc.id;
                        numCountSize()
                    })
                }).then(function () {
                    console.log('im here   ' + numCountSize.countSize);
                    var user = getUser()
                    console.log(user);
                    if (user != null) {
                        db.collection("collection").add({
                            collection_name: document.getElementById("createCollecton").value,
                            id_menu: [],
                            id_collection: "c" + numCountSize.countSize,
                            id_user: user
                        })
                    }

                    $("#showName").empty()
                    showAllCollection()
                })

            } else {
                alert("Plase enter Collection Name")
                console.log("มึงไม่ได้เขียน" + document.getElementById("createCollecton").value)
            }
        });
        $("#popCreate").modal();
    });
    $("#closeColl").click(function () {
        localStorage.clear();

    });

    var shaowName = `<div style="width:100%; margin-top: 21%;margin-left:0px; margin-right:0;">
<div class="card text-light " style="width:400px; height:531px;background-color:rgb(128,0,128);">
  <div style="margin-bottom: 5%; margin-top: 4%; font-size: 30px;">
  ${getChaiName}
  </div>
  <div style="margin-bottom: 5%; font-size: 30px;">${getEngName}</div>
  <div style="margin-bottom: 5%; font-size: 30px">${getThaiName}</div>
</div>

</div>`
    $("#Name_menu").append(shaowName);



    var showImage = `<div class="carousel-inner">  
<div class="carousel-item active " style="margin-left:0px;">
  
  <img  src="${getIm}"
    alt="Card image" style="width:100%; height:531px">
</div>`
    $("#imageS").append(showImage)

    var selectbtn = `<button class="fa  btn" onclick="collectionlist()" style="font-size: 30px; margin-left: 1000px"
aria-hidden="true"><i class="fa fa-print" aria-hidden="true"></i></button>`

    $("#selectcollec").append(selectbtn);

});


var arrayTest = []
function addMenu(getCollec) {
    
    var getvalue = getCollec
    console.log(getvalue)

    db.collection("collection").get().then(function (snapshot) {

        snapshot.forEach(function (doc) {
            var checkID = doc.data().id_menu



            if (doc.id == getvalue) {

                for (i = 0; i < checkID.length; i++) {
                    console.log("i" + i)
                    console.log("ค่าarray " + doc.data().id_menu[i])
                    var dataa = doc.data().id_menu[i]

                    arrayTest.push(dataa)

                }


            }

        });


    }).then(function () {
        console.log(arrayTest.length)
        setvalue(getvalue, arrayTest)
    })
    console.log("ASDASD")

    console.log(arrayTest.length)


}

function setvalue(idCollec, arrayName) {

    var getarrayName = arrayName
    var check = false;
    console.log(getarrayName)
    console.log(arrayName.length)

    // array.forEach(element => {
    var getid = localStorage.getItem("setID");
    // });
    for (let index = 0; index < getarrayName.length; index++) {

        console.log(getarrayName[index])

        if (getarrayName[index] == getid) {
            check = true;
            // document.getElementById("btnShowtype").disabled = true;
            break;
            
        }

    }
    if (check == false) {

        getarrayName.push(getid)
        console.log(getarrayName)
    }


    db.collection("collection").doc(idCollec).set({

        id_menu: getarrayName

    }, { merge: true });
    
    alert('Add Food Success')
    

}

function collectionlist() {
    var setemailuser = getUser()
    localStorage.setItem("emailusercollection", setemailuser)
    window.location.href = 'allCollection.html';
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        emailuser = user.email
        setUser(emailuser)
        showAllCollection(emailuser)
        $("#logoutuserres").show();
        $("#loginuserres").hide();
        $("#allcollectionbtn").show();
        $("#Cpop").show();

        //   var user = firebase.auth().currentUser;
        //   if (user != null) {

        //     // User is signed in.
        //   } else {
        //     // No user is signed in.
        //   }


    } else {
        // No user is signed in.
        $("#logoutuserres").hide();
        $("#loginuserres").show();
        $("#allcollectionbtn").hide();
        $("#Cpop").hide();

    }
});

function login() {

    var getemail = document.getElementById("email").value;
    var getpassword = document.getElementById("pwd").value;

    auth.signInWithEmailAndPassword(getemail, getpassword).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        alert("Error  : " + errorMessage);
        // ...

    });

}

function register() {

    var getregisemail = document.getElementById("regisemail").value;
    var getregispassword = document.getElementById("regispwd").value;



    auth.createUserWithEmailAndPassword(getregisemail, getregispassword).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

}
function logout() {
    auth.signOut().then(function () {
    });
}