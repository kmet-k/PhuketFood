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
var remove = firebase.firestore.FieldValue;
var ele = 0;
var arraySetdata = []

var getemailuser = localStorage.getItem("emailusercollection");


$(document).ready(function () {
  console.log(getemailuser);
  var showli = 0;
  var refdb = db.collection("collection")
  refdb.where("id_user", "==", getemailuser).get().then((snapshot) => {

    snapshot.forEach(doc => {
      var collec = doc.data().collection_name;
      var collecid = doc.data().id_menu;
      var idmenu = doc.data().id_collection;
      var idcoll = doc.id;
      var data = doc.data()

      arraySetdata.push(data)

      // console.log(arraySetdata);
      // id='UL${idmenu}' คือการอิงให้รู้ว่าจะเอาข้อความมาวางไว้ตรงช่องไหน
      var thisx = this;
      var showCname = `<li class="list-group-item" id="${idcoll}">${collec}<a type="button" class="btn fa- pull-right" onClick="deletecollecton('${idcoll}')">Delete</a><a class="fa fa-print pull-right btn" onclick="selectCollection('${idcoll}')"></a><button onclick="dropup(this)" class="fa fa-caret-down pull-right btn" aria-hidden="false" data-toggle="collapse" data-target='#${idmenu}'></button>
      <div class="collapse" id='${idmenu}'>
      
            <ul class="list-group list-group-flush " id='UL${idmenu}'></ul>
            </div>
            </li>
            <hr>`
      $('#showCname').append(showCname)
      console.log('idcoll '+idcoll);
      console.log('idmenu '+idmenu);
      if (collecid == "") {
        $("#UL" + idmenu).append("<center>empty</center>");
      } else {
        
        arrayget(collecid, idcoll, idmenu);
        // console.log(collecid);
      }

    });
    
  });



});

function dropup(x){
  x.classList.toggle("fa-caret-up");
}
function arrayget(idnemu, idcoll, idmenu) {
  // console.log(aarray);
  for (let index = 0; index < idnemu.length; index++) {
    const element = idnemu[index];
    console.log(element);
    db.collection("menuNew").where("id_Menu", "==", element).get().then((snapshot) => {  
      snapshot.forEach(doc => {
        console.log(doc.data().chinese_Name);
        var name = doc.data().english_Name;

        var showli = `
        <li class="list-group-item" style="margin-top:10px;" id="${element}" >${name} <i  class="btn fa fa-trash-o pull-right" onClick="deleteArray('${idcoll}','${element}')"></i></li>`

        $('#UL' + idmenu).append(showli)

      });
    });
  }

}
// function delete array index 
function deleteArray(idcall, array) {
  db.collection("collection").doc(idcall).update({
    id_menu: remove.arrayRemove(array)
  });
  $("#" + array).empty();
}

// function confirm delete collection
function deletecollecton(idcollection) {
  var r = confirm("Are you Sure For Delete Collection");
  if (r == true) {
    db.collection("collection").doc(idcollection).delete().then(function() {
      console.log("Document successfully deleted!");
  });
  $("#"+ idcollection).empty();
  } else {
  console.log("cancle")
  }
  
}

// function set id ของ Collcetion ที่เลือก
function selectCollection(collecdata){
  console.log(collecdata);
if(collecdata==""){
  console.log("null");
}else{
  console.log(collecdata);
  localStorage.setItem("datacollec",collecdata);
  window.location.href = 'menu.html';
}
}

var getdataaa = localStorage.getItem("datacollec")
console.log(getdataaa);
