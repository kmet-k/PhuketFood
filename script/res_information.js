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
//test marker
var markers = [

    {
        "title": 'เจ้รัต',
        "lat": '7.8836764',
        "lng": '98.3879528',
        "description": ''
    }
    ,
    {
        "title": 'ขาหมู',
        "lat": '7.890030',
        "lng": '98.398178',
        "description": ''
    },
    {
        "title": 'บุญมาปอเปี๊ยะทอด',
        "lat": '7.8838546',
        "lng": '98.3132945',
        "description": ''
    }
    ,
    {
        "title": 'ครัวยายด้วง',
        "lat": '8.0597514',
        "lng": '98.3417014',
        "description": ''
    }
    , {
        "title": 'เจ๊หน่อยขนมเบื้อง',
        "lat": '7.8863897',
        "lng": '98.3216157',
        "description": ''
    }
    , {
        "title": 'ทอดมันทำเอง',
        "lat": '8.2680701',
        "lng": '98.2290773',
        "description": ''
    }
    , {
        "title": 'วันจันทร์',
        "lat": '7.885787',
        "lng": '98.390745',
        "description": ''
    }
    , {
        "title": 'แหลมหินซีฟู้ด',
        "lat": '7.8836764',
        "lng": '98.3879528',
        "description": ''
    }
    , {
        "title": 'ภูเก็ต-ระย้า',
        "lat": '7.8858435',
        "lng": '98.3909914',
        "description": ''
    },
];
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

    for (i = 0; i < markers.length; i++) {
        var data = markers[i]
        var myLatlng = new google.maps.LatLng(data.lat, data.lng);
        console.log(myLatlng)
        //   lat_lng.push(myLatlng);



        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
        });
        // latlngbounds.extend(marker.position);
    }

    // var marker = new google.maps.Marker({
    //   position: location,
    //   map: map
    // });
    // var marker = new google.maps.Marker({
    //   position: locate0,
    //   map: map
    // });
    // var marker = new google.maps.Marker({
    //   position: locate1,
    //   map: map
    // });

}



function tclick(valid) {

    for (j = 0; j < markers.length; j++) {
        var latlng = markers[j]
        var myLatlng = new google.maps.LatLng(latlng.lat, latlng.lng);
        // console.log(myLatlng)
        // console.log(valid)
        console.log(latlng)

        if (valid == latlng.title) {
            localStorage.setItem("valiable1", myLatlng)
            localStorage.setItem("lat", latlng.lat)
            localStorage.setItem("lng", latlng.lng)
            localStorage.setItem("name", latlng.title)
        }



    }
    // var getR = localStorage.getItem("valiable1")
    var getR1 = localStorage.getItem("lat")
    var getR2 = localStorage.getItem("lng")
    // console.log(getR)
    console.log(getR1)
    console.log(getR2)

    window.location.href = 'gps.html';

}


var getID;
countSize.snapsize = 0;


function countSize(snap) {
    countSize.snapsize = snap
}
// function getSize(){
//     return snapsize
// }

$(document).ready(function () {



    db.collection("collection").get().then(function (snapshot) {
        snapshot.forEach(function (doc) {

            getCollec = doc.data().collection_name;
            getid = doc.id
            console.log(getid)

            var nameCollec = `<div class="pointer" onclick="addMenu('${getid}')" ><p class="aa" align = 'left'>${getCollec}</p></div>`
            $("#showName").append(nameCollec);
            console.log(getCollec)
        });

        console.log(snapshot.size)
    });
    $("#Cpop").unbind("click").click(function () {
        // var getname = localStorage.getItem("setName")
        // document.getElementById("showName").innerHTML = getname;
        // console.log(getname);


        $("#popup").modal();
        // localStorage.clear(); 
    });


    $("#createCall").click(function () {
        document.getElementById("createCollecton").value = '';
        // $("#popup").modal('hide');


        $("#submit").click(function () {

            if (document.getElementById("createCollecton").value != "") {
                db.collection("collection").get().then(function (snapshot) {

                    snapshot.forEach(function (doc) {
                        console.log(doc.id)
                        getID = doc.id;
                        snapsize = (snapshot.size + 1);

                        countSize(snapsize)


                    });

                    db.collection("collection").add({
                        collection_name: document.getElementById("createCollecton").value,
                        id_menu: [],
                        id_collection: "c" + countSize.snapsize,
                        id_user:"u_001"

                    })

                });


            } else {
                alert("Plase enter Collection Name")
                console.log("มึงไม่ได้เขียน" + document.getElementById("createCollecton").value)


            }

            //  if(id_collection != id_collection)

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

var selectbtn =`<button class="fa  btn" onclick="collectionlist()" style="font-size: 30px; margin-left: 1000px"
aria-hidden="true"><i class="fa fa-print" aria-hidden="true"></i></button>`

$("#selectcollec").append(selectbtn);

});



function addMenu(getCollec) {
    var arrayTest = []
    var getvalue = getCollec
    console.log(getvalue)

    db.collection("collection").get().then(function (snapshot) {

        snapshot.forEach(function (doc) {
            var checkID = doc.data().id_menu



            if (doc.id == getvalue) {

                for (i = 0; i < checkID.length; i++) {
                    console.log("i" + i)
                    console.log("ค่าarray " + doc.data().id_menu[i])
                    var dataa  = doc.data().id_menu[i]

                    arrayTest.push(dataa)

                }


            }
          
        });

       
    }).then(function(){
        console.log(arrayTest.length)
        setvalue(getvalue,arrayTest)
    })
    console.log("ASDASD")
    // console.log(doc.data().collection_name)
    console.log(arrayTest.length)
 

}

function setvalue(idCollec , arrayName){

    var getarrayName = arrayName
    var check = false;
    console.log(getarrayName)
    console.log(arrayName.length)

    // array.forEach(element => {
    var getid = localStorage.getItem("setID");    
    // });
for (let index = 0; index < getarrayName.length; index++) {

    console.log(getarrayName[index])

    if ( getarrayName[index] == getid) {
        check = true;
      break;
    }
    
}
if(check == false){

    getarrayName.push(getid)
    console.log(getarrayName)
}

  
    db.collection("collection").doc(idCollec).set({

        id_menu: getarrayName

    }, { merge: true });

}

function collectionlist(){
    window.location.href = 'allCollection.html';
}
