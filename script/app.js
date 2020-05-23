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
var menu=[];
var menuLang=[]
var menuFilter=[]
var typeData=[]
var meatData=[]
var type=[]
var meat=[]
var lang="cn";
var menuFinal=[];
var menuText=[];
var text="";
var typeName=[]
var meatName=[]

function setType(setID,setType){
    var del = false;

    type.forEach((value,key) => {
        console.log(value[0])
        console.log(value[0])
        if(setID==value[0]){
            type.splice(key, 1);
            del=true
        }
    })
    typeName.forEach((value,key) => {
        if(setType==value[0]){
            typeName.splice(key, 1);z
            del=true
        }
    })
    if(!del){
        type.push([setID])
        typeName.push([setType])
    }
}

function setMeat(setID,setMeat){
    var del = false;
    meat.forEach((value,key) => {
        console.log(value[0])
        console.log(value[0])
        if(setID==value[0]){
            meat.splice(key, 1);
            del=true
        }
    })
    meatName.forEach((value,key) => {
        if(setMeat==value[0]){
            meatName.splice(key, 1);z
            del=true
        }
    })
    if(!del){
        meat.push([setID])
        meatName.push([setMeat])
    }
}







$(document).ready(function(){
    $("#result").hide();
    db.collection("menu").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            menu.push([doc.data().english_Name,doc.data().thai_Name,doc.data().chinese_Name,doc.data().id_Meat,doc.data().id_Type,doc.data().recommend,doc.data().spiciness,doc.data().picture,doc.data().id_Menu])
            //0en , 1th ,2cn , 3meat ,4type ,5recommend ,6spiciness,7picture,8id
        });
    })

    db.collection("type").orderBy("id_Type").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            typeData.push([doc.data().id_Type,doc.data().type])
        });
    });

    db.collection("meat").orderBy("id_Meat").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            meatData.push([doc.data().id_Meat,doc.data().meat])
        });
    });

    $(".iconFilter").click(function(){

        if ( $('#type').is(':empty') ) { 
            typeData.forEach((item, index) => {
                var item = ` <label class="typeCheck" > ${item[1]} <input type="checkbox" onClick="setType('${item[0]}','${item[1]}')"><span class="checkmark"></span></label>`;
                $('#type').append(item);
            }); 
            meatData.forEach((item, index) => {
                var item = ` <label class="typeCheck" > ${item[1]} <input type="checkbox" onClick="setMeat('${item[0]}','${item[1]}')"><span class="checkmark"></span></label>`;
                $('#meat').append(item);
            });
        } 
            
            
            
            
            
        
        
    });

    $("#search").keyup(function(){
        $("#result").empty();
        text = $("#search").val()
        if (/^[a-zA-Z]+$/.test(text)) {
            lang="eng"
            clear()
        }else if(/^[ก-๙]+$/.test(text)){
            lang="th"
            clear()
        }else{
            if(text==""){
                lang="en"
                clear()
            }else{
                lang="cn"
                clear()
            }
        }

        if(text==""){
            $("#result").hide();
        }
        match()
    })

    $("#myFilter").on('hide.bs.modal', function(){
        console.log(type)
        console.log(typeName)
        console.log(meatName)
        $("#by").empty().show().append("Filter >").css("color", "rgb(109, 108, 108)");
        if(type.length!==0){
            typeName.forEach((item,index)=>{
                $("#by").append("<b>&nbsp;&nbsp;&nbsp;"+item[0]+"<b>");
            })
        }if(meat.length!==0){
            meatName.forEach((item,index)=>{
                
                $("#by").append("<b>&nbsp;&nbsp;&nbsp;"+item[0]+"<b>");
            })
        }if(meat.length==0&&type.length==0){
            $("#by").empty().show().append("Filter by >").css("color", "rgb(233, 233, 233)");
        }
        
    });

})

function readData(){
    menu.forEach((item, index) => {
        if(lang=="eng"){ 
            if(item[0]!==""){
                menuLang.push([ item[0],item[1],item[2],item[3],item[4],item[5],item[6],item[7],item[8] ])
            }
        }else if(lang=="th"){ 
            if(item[1]!==""){
                menuLang.push([ item[1],item[0],item[2],item[3],item[4],item[5],item[6],item[7],item[8] ])
            }
        }else if(lang=="cn"){ 
            if(item[2]!==""){
                menuLang.push([ item[2],item[1],item[0],item[3],item[4],item[5],item[6],item[7],item[8] ])
            }
        } 
    });    
}

function match() {
    readData()
    scanFilter()
    scanText(text)
}

function typeAndMeat(){
    menuFilter=[]
    menuLang=[]
    menuFinal=[]
    readData()
    console.log(menuLang)
    scanFilter()
    console.log(menuFilter)
    menuFilter.forEach((item, index) => {
            menuFinal.push([item[0],item[1],item[2],item[3],item[4],item[5],item[6],item[7],item[8]])
    });
}

function scanText(){
    
    if(lang=="eng"){
        text = text.toLowerCase().toString()
    }
    text = text.toString();
    $("#result").empty();
    console.log(text)
    $("#result").show();

    menuFilter.forEach((item, index) => {
        var str = item[0].toString()
        if(lang=="eng"){ 
            var STR =str.toString().toLowerCase()
        }else{
            var STR =str.toString()
        }
        if (STR.startsWith(text)) {
            menuFinal.push([ item[0],item[1],item[2],item[3],item[4],item[5],item[6],item[7],item[8] ])
            console.log(menuFinal)
        }
    });
    appendResult()
}

function scanFilter(){
    if(type.length >0 && meat.length == 0){
        console.log("1")
        for(var i =0; i < type.length ; i++){
            menuLang.forEach((item, index) => {
                if(item[4] == type[i]){
                    menuFilter.push([item[0],item[1],item[2],item[3],item[4],item[5],item[6],item[7],item[8]])
                } 
            });
        }
    }else if(type.length ==0 && meat.length > 0){
        console.log("2")
        for(var i =0; i <   meat.length ; i++){
            menuLang.forEach((item, index) => {
                if(item[3] == meat[i]){
                    menuFilter.push([item[0],item[1],item[2],item[3],item[4],item[5],item[6],item[7],item[8]])
                } 
            });
        }
    }else if(type.length ==0 && meat.length == 0){
        console.log("3")
        menuLang.forEach((item, index) => {
            menuFilter.push([item[0],item[1],item[2],item[3],item[4],item[5],item[6],item[7],item[8]])
        })
    }else if(type.length >0 && meat.length > 0){
        console.log("4")
        for(var i =0; i < type.length ; i++){
            for(var j =0; j < meat.length ; j++){
            menuLang.forEach((item, index) => {
                if(item[4] == type[i] && item[3] == meat[j]){
                        
                    menuFilter.push([item[0],item[1],item[2],item[3],item[4],item[5],item[6],item[7],item[8]])
                }
            });
            }
        }
        
    }    
}
function appendResult(){
    menuFinal.forEach((item,index) => {
        var object = `<div class="col-12" onclick="resultClick('${item[0]}')" style="background-color: white; text-align: left; font-size: 15px; height: 50px; padding-left: 3px; padding-top: 15px;"> ${item[0]} </div>`
        $('#result').append(object);
    });
}

function resultClick(str){
    
    text = str.toString()
    $('#search').val(text);
    menuFinal=[]
    scanText()
    $('#result').hide();
}

function searchNow(){
    if(text==""){
        typeAndMeat()
        console.log(menuFinal)
        localStorage.setItem("menu", JSON.stringify(menuFinal));
        localStorage.setItem("type", JSON.stringify(typeName));
        localStorage.setItem("meat", JSON.stringify(meatName));
        localStorage.setItem("text", text);
        $("#search").val('');
        window.location.href = 'new.html';

    }else{
        console.log(menuFinal)
        localStorage.setItem("menu", JSON.stringify(menuFinal));
        localStorage.setItem("type", JSON.stringify(typeName));
        localStorage.setItem("meat", JSON.stringify(meatName));
        localStorage.setItem("text", text);
        $("#search").val('');
        window.location.href = 'new.html';
        
    }
}

function clear(){
    menuLang=[]
    menuFilter=[]
    menuFinal=[]
}

