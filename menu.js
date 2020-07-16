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

var paper = []
paper[0] = ["A3",1754,2480]
paper[1] = ["A4",1240,1754]
paper[2] = ["A5",874,1240]
var getCanvas;
numCountFile.countFile=1;
numCountText.countText=1;
numCountPaper.paperCount=0;

var imgTemplate = []
imgTemplate[0] ='https://www.thairath.co.th/media/dFQROr7oWzulq5FZUEw0KblrwGhr0kAwIWuwsU809ZTPNtdIXzKxLcMk67L77kat2Nc.webp'
imgTemplate[1] ='https://i.pinimg.com/originals/d7/83/af/d783af669d6fb03a0f9f94891084739f.jpg'
imgTemplate[2] ='https://www.smeleader.com/wp-content/uploads/2020/01/%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3%E0%B8%AB%E0%B8%A1%E0%B8%B9%E0%B8%81%E0%B8%A3%E0%B8%AD%E0%B8%9A-3.jpg'
imgTemplate[3] ='https://f.ptcdn.info/296/035/000/1441812461-1441805850-o.jpg'
imgTemplate[4] ='https://i.ytimg.com/vi/KMW3By8jnuU/maxresdefault.jpg'
var idMenu = []
var picMenu = []
var nameMenu=[]
var id="";
var textTemplate = []
textTemplate[0] =["ขาหมู","卤猪脚","Pork’ hocks in brown sauce"]
textTemplate[1] =["ข้าวมันไก่","鸡油饭","Chicken rice"]
textTemplate[2] =["หมูกรอบ","脆皮猪肉","Crispy pork"]
textTemplate[3] =["ข้าวหมูแดง","叉烧饭","Red BBQ pork with rice"]
textTemplate[4] =["เป็ดยาง","烤鸭","Roasted duck"]

$(document).ready(function() {
    id = localStorage.getItem("datacollec")
    console.log(id);
    

    var refdbCollection = db.collection("collection")
    refdbCollection.where("id_user", "==", "u_001").get().then((snapshot) => {
        snapshot.forEach(doc => {
            if(doc.id==id){
                idMenu = doc.data().id_menu
                console.log(idMenu);
            }
        })
    }).then(function() {
        console.log(idMenu);
        for (let index = 0; index < idMenu.length; index++) {
            console.log(idMenu[index]);

            var refdbMenu = db.collection("menu")

            refdbMenu.where("id_Menu", "==",idMenu[index]).get().then((snapshot) => {
                snapshot.forEach(doc => {
                    
                    chinese_Name = doc.data().chinese_Name
                    english_Name = doc.data().english_Name
                    thai_Name = doc.data().thai_Name
                    picture = doc.data().picture
                    nameMenu.push([chinese_Name,english_Name,thai_Name])
                    picMenu.push(picture)
                })
            })
        }
    })



    
    $('#bg').hide()
    $('#toolBg').hide()
    $('#toolIcon').hide()
    $('#tool').hide()
    $('#bin').hide()
    $('#textTool').hide()
    $('.textToolBox').hide()
    // $('#previewImage').hide()
    $('.page').hide()
    $('.imgtoolBox').hide()
    $('#toolPic').hide()
    $('#nav').hide()

    $(window).on('load',function(){
        $('#myModal').modal('show');
    });

    $('.ok').click(function() {
        // $('#bin').show()
        // $('#toolIcon').show()
        // $('#textTool').show()
        $('.template').show()

        var size = $('.size').val(); 
        var rayout = $('.rayout').val(); 

        if (rayout=="vertical") {
            for (let index = 0; index < 9; index++) {
                var item = `<div class="col-3 " id="template" style="margin-bottom: 40px;">
                                <img src="Tp_Ver/V${index}.png" class="templateItem" 
                                onclick="selectTemplate(${index+1})">
                            </div>`
                            $('.template').append(item)
            }
            dropText()
        }else{
            paper.forEach(element => {
                if(size==element[0]){
                    var item =  `<div class="paper" style=" 
                                width: ${element[2]}px;
                                height: ${element[1]}px;">
                                </div>`;
                    $('.page').append(item)
                    dropText()
                }
            });
        }
    });

    $('.zoom-out').click(function() {
        
    var zoom = $('.zoom').html()
        if(zoom==100){
            zoomPaper(90,0.5);
        }else if(zoom==90){
            zoomPaper(80,0.4);
        }else if(zoom==110){
            zoomPaper(100,0.6);
        }else if(zoom==120){
            zoomPaper(110,0.7);
        }
    })

    $('.zoom-in').click(function() {
        var zoom = $('.zoom').html()
        if(zoom==100){
            zoomPaper(110,0.7);
        }else if(zoom==110){
            zoomPaper(120,0.8);
        }else if(zoom==90){
            zoomPaper(100,0.6);
        }else if(zoom==80){
            zoomPaper(90,0.5);
        }
    })


    $('#toolIcon').click(function(){
        $('#tool').show()
        $('#toolIcon').hide()
        $('#textTool').hide()
    })

    $('#textTool').click(function(){
        
        $('.textToolBox').show()
        $('#toolIcon').hide()
        $('#textTool').hide()
    })
    $('#toolPic').click(function(){
        
        $('.imgtoolBox').show()
        $('#toolIcon').hide()
        $('#textTool').hide()
    })

    $('#toolClose').click(function(){
        $('#tool').hide()
        $('#toolIcon').show()
        $('#textTool').show()
    })

    $('#textToolClose').click(function(){
        $('.textToolBox').hide()
        $('#toolIcon').show()
        $('#textTool').show()
    })

    $('#toolBg').click(function(){
        $('#bg').show()
        $('#toolIcon').hide()
        $('#textTool').hide()
    })

    $('#bgToolClose').click(function(){
        $('#bg').hide()
        $('#toolIcon').show()
        $('#textTool').show()
        
    })
    $('#imgToolClose').click(function(){
        $('#img').hide()
        $('#toolIcon').show()
        $('#textTool').show()````
    })
    
    $('#textIcon').draggable({
        cursor: "move",
        helper: 'clone',
        // accept:'.paper',
        stop: function(event,object) { 
            console.log('drop');
            numCountText()
            dropText()
        }
    });

    $( "body" ).delegate( ".templateItem", "click", function( event ) {
        $('#bin').show()
        $('#toolIcon').show()
        $('#textTool').show()
        $('#toolBg').show()
        $('.template').hide()
        $('.page').show()
        $('#toolPic').show()
    });

    for (let index = 1; index <= 6; index++) {
        var item = `<img src='BG/BG${index}.jpg' class='imgBg' id='bg${index}' onclick='setBG(${index})'>`
        $('#bgFree').append(item)
    }

    for (let index = 1; index <= 10; index++) {
        var item = `<div id="pic${index}" class="imgBox pngDiv">
        <img src='pic/pic${index}.png' class='png' style="display:inline-block" 
        id='bg${index}' >
        </div>`
        $('#imgFree').append(item)
        dragPNG()
        dropPNG() 
    }
    
    
});
function setBG(background) {
    var paper = $('#selectPaper option:selected').val() 
    var img = `BG/BG${background}.jpg`
    console.log(img);
    
    $('.paper'+paper).css("background-image","url('"+img+"')")
}

$(function() {
    var imagesPreview = function(input, placeToInsertImagePreview) {
        if (input.files) {
            var filesAmount = input.files.length;
            for (i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = function(event) {
                    
                   
                    
                    var item = `<div id="image${numCountFile.count}" class="imgBox" 
                    style="display:inline-block"><img src="${event.target.result}"  
                    class="imageGallery"></div>`
                    
                    $(item).appendTo("#gallery");
                    numCountFile()
                }
                reader.readAsDataURL(input.files[i]);
            }
        }
    };

    $('#addPhoto').on('change', function() {
        imagesPreview(this,'div.gallery');
    });

});

function dropText() {
    console.log(numCountText.countText);
    
    $(".paper").droppable({
        accept: "#textIcon",
        // activeClass: "ui-state-default",
        // hoverClass: "ui-state-hover",
        drop: function() {  
            console.log('drophere');
            
            var id="textBox"+numCountText.countText;
            console.log(id);
             
            var item = `<div class="dropped"><textarea id="${id}" rows="4" cols="50" class="textbox" placeholder="type something ..." onClick="forEdit('#${id}')"></textarea></div>`;  
            $(this).append(item);
            
            drop()
            
        }
    })
}

function selectTemplate(value) {
    $('#nav').show()
    var size = $('.size').val(); 
    if(value==1){
        for (let index = 0; index < imgTemplate.length; index++) {
          
            paper.forEach(element => {
                if(size==element[0]){
                    var item =  `<div class="paper paper${index}" style=" 
                                width: ${element[1]}px;
                                height: ${element[2]}px;">
                                </div>`;
                    $('.page').append(item)
                    $('.page').css("height","0px")
                    numCountPaper()
                    dropText()
                    
                }
            });

           
        }
        addImg(1)
        addText(1)

    }else if(value==2||value==3||value==4||value==5||value==6){
        var paperCount=0;
        var divied = imgTemplate.length/4
   
        
        for (let index = 0; index < divied; index++) {
            console.log(index+1);
                paper.forEach(element => {
                    if(size==element[0]){
                        var item =  `<div class="paper paper${paperCount}" style=" 
                                    width: ${element[1]}px;
                                    height: ${element[2]}px;">
                                    </div>`;
                        $('.page').append(item)
                        $('.page').css("height","0px")
                        dropText()
                    }
                });
                paperCount=paperCount+1;
                numCountPaper()
        }

        
        
        if(paperCount<divied){
            console.log('wow');
            
             paper.forEach(element => {
                    if(size==element[0]){
                        var item =  `<div class="paper paper${paperCount}" style=" 
                                    width: ${element[1]}px;
                                    height: ${element[2]}px;">
                                    </div>`;
                        $('.page').append(item)
                        $('.page').css("height","0px")
                        dropText()
                    }
                });
                paperCount=paperCount+1
                numCountPaper()

        }
        if(value == 2){
            console.log('paper'+(numCountPaper.paperCount));
            addImg(2)
            addText(2)
        }else if(value == 3){
            
            addImg(3)
            addText(3)
        }else if(value == 4){
            addImg(4)
            addText(4)
        }else if(value == 5){
            addImg(5)
            addText(5)
        }else if(value == 6){
            addImg(6)
            addText(6)
        }
        
    }else if(value==7||value==8){
        var paperCount=0;
        var divied = imgTemplate.length/5
   
        
        for (let index = 0; index < divied; index++) {
            console.log(index+1);
                paper.forEach(element => {
                    if(size==element[0]){
                        var item =  `<div class="paper paper${paperCount}" style=" 
                                    width: ${element[1]}px;
                                    height: ${element[2]}px;">
                                    </div>`;
                        $('.page').append(item)
                        $('.page').css("height","0px")
                        dropText()
                    }
                });
                paperCount=paperCount+1;
                numCountPaper()
        }

        if(paperCount<divied){
             paper.forEach(element => {
                    if(size==element[0]){
                        var item =  `<div class="paper paper${paperCount}" style=" 
                                    width: ${element[1]}px;
                                    height: ${element[2]}px;">
                                    </div>`;
                        $('.page').append(item)
                        $('.page').css("height","0px")
                        dropText()
                    }
                });
                paperCount=paperCount+1
                numCountPaper()

        }
        if(value == 7){
            console.log('paper'+(numCountPaper.paperCount)+1);
            
            addImg(7)
            addText(7)
        }else if(value == 8){
            addImg(8)
            addText(8)
        }
        
    }else if(value==9){
        paper.forEach(element => {
            if(size==element[0]){
                var item =  `<div class="paper paper0" style=" 
                            width: ${element[1]}px;
                            height: ${element[2]}px;">
                            </div>`;
                $('.page').append(item)
                $('.page').css("height","0px")
                dropText()
                numCountPaper()
            }
        });
        
    }
    display()
}
function display() {
    var size = $('.size').val();
    $('.paper').hide()
    $('.paper0').show()
    let  papaerCount = numCountPaper.paperCount
    for (let index = 0; index < papaerCount; index++) {
        var option = `<option value="${index}">${(index+1)}</option>`
        $('#selectPaper').append(option)
    }

    $('.addpage').unbind("click").click(function(){
        numCountPaper()
        let  papaerCount = numCountPaper.paperCount
        let paperMinusOne = papaerCount-1
        var option = `<option value="${(paperMinusOne)}">${papaerCount}</option>`
        $('#selectPaper').append(option)
        $('.paper').hide()

        paper.forEach(element => {
            if(size==element[0]){
                var item =  `<div class="paper paper${paperMinusOne}" style=" 
                            width: ${element[1]}px;
                            height: ${element[2]}px;">
                            </div>`;
                $('.page').append(item)
                $('.page').css("height","0px")
                dropText()
            }
        });
        console.log(papaerCount);
        
        $('#selectPaper').val(paperMinusOne)
        $('.paper'+paperMinusOne).show()
    })



    selectPaper()
}

function selectPaper() {
    $( '#selectPaper').unbind("change").change(function(){
        var numSelect = $( '#selectPaper').val()
        var paper = numCountPaper.paperCount
        for (let index = 0; index < paper; index++) {
            
            if(index==numSelect){
                $('.paper'+index).show()
            }else{
                $('.paper'+index).hide()
            }
        }
    });
}

function addImg(value) {
    console.log(value);
    
    if(value==1){
        for (let index = 0; index < picMenu.length; index++) {
            var item = `<div id="divimage${index+1}" class="imgBox"
            style="position: absolute; display:inline-block; text-align:center; top: 150px; width:1243; ">
            <img id="image${index+1}" src="${picMenu[index]}" style="width: 98%;">
            </div>`
            $('.paper'+index).append(item)
            dragPic('image'+(index+1))
         
        }
    }
    if(value==2){
        var papaerCount = 0
        for (let index = 0; index < picMenu.length; index++) {
            
            if((index+1)%4==1){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 6%; width:50%; left:45%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 98%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))
            }else if((index+1)%4==2){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 30%; width:50%; left:5%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 98%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))
            }else if((index+1)%4==3){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 53%; width:50%; left:45%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 98%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))

            }else if((index+1)%4==0){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 77%; width:50%; left:5%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 98%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                papaerCount=papaerCount+1
                dragPic('image'+(index+1))
                
            }
        }
    }
    if(value==3){
        var papaerCount = 0
        for (let index = 0; index < picMenu.length; index++) {
            
            if((index+1)%4==1){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 6%; width:50%; left:5%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 98%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))
            }else if((index+1)%4==2){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 30%; width:50%; left:45%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 98%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))
            }else if((index+1)%4==3){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 53%; width:50%; left:5%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 98%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))

            }else if((index+1)%4==0){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 77%; width:50%; left:45%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 98%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                papaerCount=papaerCount+1
                dragPic('image'+(index+1))
                
            }
        }
    }
    if(value==4){
        var papaerCount = 0
        for (let index = 0; index < picMenu.length; index++) {
            
            if((index+1)%4==1){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 6%; width:50%; left:5%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 98%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))
            }else if((index+1)%4==2){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 30%; width:50%; left:5%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 98%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))
            }else if((index+1)%4==3){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 53%; width:50%; left:5%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 98%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))

            }else if((index+1)%4==0){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 77%; width:50%; left:5%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 98%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                papaerCount=papaerCount+1
                dragPic('image'+(index+1))
                
            }
        }
    }if(value==5){
        var papaerCount = 0
        for (let index = 0; index < picMenu.length; index++) {
            
            if((index+1)%4==1){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 6%; width:50%; right:5%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 98%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))
            }else if((index+1)%4==2){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 30%; width:50%; right:5%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 98%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))
            }else if((index+1)%4==3){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 53%; width:50%; right:5%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 98%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))

            }else if((index+1)%4==0){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 77%; width:50%; right:5%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 98%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                papaerCount=papaerCount+1
                dragPic('image'+(index+1))
            }
        }
    }if(value==6){
        var papaerCount = 0
        for (let index = 0; index < picMenu.length; index++) {
            
            if((index+1)%4==1){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 60%; width:50%; left:0%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 100%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))
            }else if((index+1)%4==2){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 60%; width:50%; right:0%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 100%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))
            }else if((index+1)%4==3){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 80%; width:50%; left:0%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 100%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))

            }else if((index+1)%4==0){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 80%; width:50%; right:0%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 100%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                papaerCount=papaerCount+1
                dragPic('image'+(index+1))
                
            }
        }
    }if(value==7){
        var papaerCount = 0
        for (let index = 0; index < picMenu.length; index++) {
            
            if((index+1)%5==1){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 58%; width:31%; right:2%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 100%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))
            }else if((index+1)%5==2){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 72%; width:31%; right:2%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 100%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))
            }else if((index+1)%5==3){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 86%; width:31%; left:2%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 100%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))

            }else if((index+1)%5==4){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 86%; width:31%; left:34.5%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 100%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))
                
            }else if((index+1)%5==0){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 86%; width:31%; right:2%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 100%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                papaerCount=papaerCount+1
                dragPic('image'+(index+1))
                
            }
        }
    }if(value==8){
        var papaerCount = 0
        for (let index = 0; index < picMenu.length; index++) {
            
            if((index+1)%5==1){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 0%; width:100%; right:0%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 100%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))
            }else if((index+1)%5==2){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 39.8%; width:38%; left:0%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 100%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))
            }else if((index+1)%5==3){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 54.8%; width:38%; left:0%;">
                <img id="image${index+1}" src="${imgTemplate[index]}" style="width: 100%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))

            }else if((index+1)%5==4){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 69.8%; width:38%; left:0%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 100%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                dragPic('image'+(index+1))
                
            }else if((index+1)%5==0){
                var item = `<div id="divimage${index+1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; top: 85%; width:38%; left:0%;">
                <img id="image${index+1}" src="${picMenu[index]}" style="width: 100%;">
                </div>`
                $('.paper'+papaerCount).append(item)
                papaerCount=papaerCount+1
                dragPic('image'+(index+1))
                
            }
        }
    }
}

function addText(value) {
    
    console.log(nameMenu);
    console.log(id);

    if (value==1) {
        nameMenu.forEach((item, index)=>{ 
            console.log(index);
            var textarea = `<div id="Cn_divtext${item[0]}" style="position: absolute; left: 40%; top: 60%;">
            <textarea  rows="4" cols="50" id="text${item[0]}" 
            style=" width: 235px; font-size: 45px; text-align: center; margin: 0px; resize: none;  height: 141px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${item[0]})">${item[0]}</textarea>
            </div>
            <div id="Th_divtext${item[0]}" style="position: absolute; left: 40%; top: 65%;">
            <textarea  rows="4" cols="50" id="text${item[0]}" 
            style=" width: 235px; font-size: 30px; text-align: center; margin: 0px; resize: none;  height: 90px; " class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${item[0]})">${item[2]}</textarea>
            </div>
            <div id="En_divtext${item[0]}" style="position: absolute; left: 37%; top: 70%;">
            <textarea  rows="4" cols="50" id="text${item[0]}" 
            style=" width: 320px; font-size: 25px; text-align: center; margin: 0px; resize: none;  height: 75px; " class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${item[0]})">${item[1]}</textarea>
            </div>`
            $('.paper'+index).append(textarea)
            drag('text'+item[0])
        })   
    }else if(value==2){
        var paperIndex=0;
        for (let index = 0; index < nameMenu.length; index++) {
            if((index+1)%4==1){
                console.log(nameMenu[index][0]);

            var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 9%; top: 9%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 9%; top: 14%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 9%; top: 19%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
           
          
            }else if((index+1)%4==2){
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 73%; top: 32%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: right; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 73%; top: 37%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: right; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 60%; top: 42%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: right; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
            
            }else if((index+1)%4==3){
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 9%; top: 57%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 9%; top: 62%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 9%; top: 67%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
            
            }else if((index+1)%4==0){
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 73%; top: 80%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: right; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 73%; top: 85%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: right; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 60%; top:90%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: right; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
                paperIndex++
            }
            drag('text'+nameMenu[index][0])
        }     
    }else if(value==3){
        var paperIndex=0;
        for (let index = 0; index < textTemplate.length; index++) {
            if((index+1)%4==1){
            var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 73%; top: 9%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: right; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 73%; top: 14%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: right; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${id})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}}" style="position: absolute; left: 60%; top: 19%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: right; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
           
          
            }else if((index+1)%4==2){
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 9%; top: 32%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 9%; top: 37%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}}" style="position: absolute; left: 9%; top: 42%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
            
            }else if((index+1)%4==3){
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 73%; top: 57%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: right; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 73%; top: 62%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: right; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 60%; top: 67%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: right; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
            
            }else if((index+1)%4==0){
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 9%; top: 80%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 9%; top: 85%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 9%; top:90%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
                paperIndex++
            }
            drag('text'+nameMenu[index][0])
        }     
    }else if(value==4){
        var paperIndex=0;
        for (let index = 0; index < textTemplate.length; index++) {
            if((index+1)%4==1){
            var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; right: 5%; top: 9%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: right; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; right: 5%; top: 14%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: right; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; right: 5%; top: 19%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: right; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
           
          
            }else if((index+1)%4==2){
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; right: 5%; top: 32%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: right; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; right: 5%; top: 37%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: right; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; right: 5%; top: 42%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: right; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
            
            }else if((index+1)%4==3){
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; right: 5%; top: 57%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: right; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; right: 5%; top: 62%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: right; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; right: 5%; top: 67%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: right; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
            
            }else if((index+1)%4==0){
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; right: 5%; top: 80%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: right; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; right: 5%; top: 85%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: right; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; right: 5%; top:90%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: right; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
                paperIndex++
            }
            drag('text'+nameMenu[index][0])
        }     
    }else if(value==5){
        var paperIndex=0;
        for (let index = 0; index < textTemplate.length; index++) {
            if((index+1)%4==1){
            var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 5%; top: 9%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 5%; top: 14%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 5%; top: 19%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
           
          
            }else if((index+1)%4==2){
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 5%; top: 32%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 5%; top: 37%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 5%; top: 42%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
            
            }else if((index+1)%4==3){
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 5%; top: 57%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 5%; top: 62%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 5%; top: 67%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
            
            }else if((index+1)%4==0){
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 5%; top: 80%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 5%; top: 85%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 5%; top:90%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
                paperIndex++
            }
            drag('text'+nameMenu[index][0])
        }     
    }else if(value==6){
        var paperIndex=0;
        for (let index = 0; index < textTemplate.length; index++) {
            if((index+1)%4==1){
            var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 20%; top: 10%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 20%; top: 14%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 20%; top: 18%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
           
          
            }else if((index+1)%4==2){
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 60%; top: 10%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 60%; top: 14%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 60%; top: 18%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
            
            }else if((index+1)%4==3){
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 20%; top: 34%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 20%; top: 38%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 20%; top: 42%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
            
            }else if((index+1)%4==0){
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 60%; top: 34%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 60%; top: 38%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 60%; top:42%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
                paperIndex++
            }
            drag('text'+nameMenu[index][0])
        }     
    }else if(value==7){
        var paperIndex=0;
        for (let index = 0; index < textTemplate.length; index++) {
            if((index+1)%5==1){
            var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 20%; top: 10%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 20%; top: 14%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 20%; top: 18%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
           
          
            }else if((index+1)%5==2){
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 20%; top: 34%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 20%; top: 38%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 20%; top: 42%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
            
            }else if((index+1)%5==3){
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 20%; top: 56%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 20%; top: 60%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 20%; top: 64%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
            
            }else if((index+1)%5==4){
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 60%; top: 10%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 60%; top: 14%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 60%; top:18%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
            }else if((index+1)%5==0){
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 60%; top: 34%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 40px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 60%; top: 38%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 235px; font-size: 30px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 60%; top:42%;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" width: 400px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
            $('.paper'+paperIndex).append(textarea)
                paperIndex++
            }
            drag('text'+nameMenu[index][0])
        }
    }else if(value==8){
            var paperIndex=0;
            for (let index = 0; index < nameMenu.length; index++) {
                if((index+1)%5==1){
                var textarea = `
                <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 55%; top: 43%;">
                <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
                style=" width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
                </div>
                <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 55%; top: 46%;">
                <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
                style=" width: 235px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px; " class="textbox" 
                placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
                </div>
                <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 55%; top: 49%;">
                <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
                style=" width: 400px; font-size: 24px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
                </div>
                `
                $('.paper'+paperIndex).append(textarea)
               
              
                }else if((index+1)%5==2){
                    var textarea = `
                <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 55%; top: 54%;">
                <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
                style=" width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold" class="textbox" 
                placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
                </div>
                <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 55%; top: 57%;">
                <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
                style=" width: 235px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
                </div>
                <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 55%; top: 60%;">
                <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
                style=" width: 400px; font-size: 24px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
                </div>
                `
                $('.paper'+paperIndex).append(textarea)
                console.log(nameMenu[index][0]);
                
                }else if((index+1)%5==3){
                    var textarea = `
                <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 55%; top: 65%;">
                <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
                style=" width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold" class="textbox" 
                placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
                </div>
                <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 55%; top: 68%;">
                <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
                style=" width: 235px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
                </div>
                <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 55%; top: 71%;">
                <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
                style=" width: 400px; font-size: 24px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
                </div>
                `
                $('.paper'+paperIndex).append(textarea)
                
                }else if((index+1)%5==4){
                    var textarea = `
                <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 55%; top: 76%;">
                <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
                style=" width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold" class="textbox" 
                placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
                </div>
                <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 55%; top: 79%;">
                <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
                style=" width: 235px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
                </div>
                <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 55%; top:82%;">
                <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
                style=" width: 400px; font-size: 24px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
                </div>
                `
                $('.paper'+paperIndex).append(textarea)
                }else if((index+1)%5==0){
                    var textarea = `
                <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; left: 55%; top: 87%;">
                <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
                style=" width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold" class="textbox" 
                placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
                </div>
                <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; left: 55%; top: 90%; ">
                <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
                style=" width: 235px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
                </div>
                <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; left: 55%; top:93%;">
                <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
                style=" width: 400px; font-size: 24px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
                </div>
                `
                $('.paper'+paperIndex).append(textarea)
                    paperIndex++
                }
                drag('text'+nameMenu[index][0])
            }     
    }
}


function drag(value) {
    // $('#Cn_div'+value).draggable( {distance: 0,
    //     cursorAt: [0,0],
    //     // appendTo: ".paper",
    //     cursor: "move",
    //     drag: function(){
    //         console.log('drag');
    //         $('#div'+value).css({ 'position':'relative','left' : '', 'top' : '','right' : '' });
    //     }
    // }) 
    // $('#Th_div'+value).draggable( {distance: 0,
    //     cursorAt: [0,0],
    //     // appendTo: ".paper",
    //     cursor: "move",
    //     drag: function(){
    //         console.log('drag');
    //         $('#div'+value).css({ 'position':'relative','left' : '', 'top' : '','right' : '' });
    //     }
    // }) 
    // $('#En_div'+value).draggable( {distance: 0,
    //     cursorAt: [0,0],
    //     // appendTo: ".paper",
    //     cursor: "move",
    //     drag: function(){
    //         console.log('drag');
    //         $('#div'+value).css({ 'position':'relative','left' : '', 'top' : '','right' : '' });
    //     }
    // }) 

    $("#"+value).resizable( { autoHide: true });
}


function dragPic(value) {
    $('#div'+value).draggable({
        drag: function(){
            console.log('drag');
            $('#div'+value).css({ 'position':'','left' : '', 'top' : '','right' : '' });
        }
    })
    $('#div'+value).resizable( { autoHide: true })
}

function preview() {

    var numPaper = numCountPaper.paperCount
    console.log(numPaper);
    

   
    $(".modalPreview").empty()

    for (let index = 0; index < numPaper; index++) {
        $(".paper"+index).css("transform","scale(1)")
        var element = $(".paper"+index).css("transform","scale(1)")
        html2canvas(element, {
        onrendered: function (canvas) {
               $(".modalPreview").append(canvas);
               window.getCanvas = canvas; 
               $(".paper"+index).css("transform","scale(0.6)")
            }
        });
        
    }

    
             
    $("#loadBtn").unbind("click").on('click', function () {
        console.log(window.getCanvas);
        var canvas = window.getCanvas;
        var imgageData = canvas.toDataURL("image/jpeg");
        var newData = imgageData.replace(/^data:image\/.jpeg/, "data:application/octet-stream");
        $("#loadBtn").attr("download", "picture.jpg").attr("href", newData);
    });
        
} 



function zoomPaper(text,scale) {
    $(".zoom").html(text);
    $('.paper').css("transform","scale("+scale+")")
    $('.paper').css("transform-origin","top")
    $('.page').css("height","0px")
    
}

function numCountFile() {
    numCountFile.countFile++
    create()
}

function numCountText() {
    numCountText.countText++
}
function numCountPaper() {
    numCountPaper.paperCount++
}
function dragPNG() {
    $('.pngDiv').draggable({
        cursorAt: { left: 5,top:5 },
        cursor: "move",
        helper: 'clone',
        revert: "invalid",
        stop: function(event,object) { 
            
            dropPNG()
        }
    })

    
    
}
function dropPNG() {
    $(".paper").droppable({
        
        accept: ".pngDiv",
        drop: function(event, ui) {  
            console.log('dropPNG');
            var item = $(ui.draggable).clone().removeClass().addClass("newPNG").addClass("resized");  
              
            $(this).append(item);
            movePNG()
        }
    })
    
}
function movePNG() {
    $('.newPNG').draggable({
        distance: 0,
        cursorAt: [0,0],
        appendTo: ".paper",
        cursor: "move"
        
        
    });

    $('.resized').resizable( { autoHide: true });
}

function create() {
    id="#image"+numCountFile.count
    console.log(id);
    
    $('.imgBox').draggable({
      
        cursorAt: { left: 5,top:5 },
        // appendTo: ".paper",
        cursor: "move",
        helper: 'clone',
        revert: "invalid",
        cancel: false,
        
       
    })

    $(".paper").droppable({
        // tolerance: "intersect",
        accept: ".imgBox",

        // activeClass: "ui-state-default",
        // hoverClass: "ui-state-hover",
        drop: function(event, ui) {  
            console.log(this);
             
            var item = $(ui.draggable).clone().removeClass().addClass("dropped").addClass("resized");  
              
            $(this).append(item);
            drop()
        }
    })

    // $(id).resizable()

    
}

function drop(){
    

    $('.dropped').draggable({
        distance: 0,
        cursorAt: [0,0],
        appendTo: ".paper",
        cursor: "move"
        // helper: 'clone',
        // revert: "invalid", 
    });

    $('.resized').resizable( { autoHide: true });
    $('.textbox').resizable( { autoHide: true  })

    $('#bin').droppable({
        disabled: true ,
        tolerance: "pointer",
        
        over: function(event, ui) {
            ui.draggable.remove();
            console.log('delete!');
        }
    });

   
}

function forEdit(id){

        $('#bold').unbind("click").click(function(){
            
            var bold = $(id).css("font-weight") 

            if(bold=='700'){
                $(id).css("font-weight","400")
            }else{
                $(id).css("font-weight","700")
            }
        })

        $('#underline').unbind("click").click(function(){
            
            var underline = $(id).css("text-decoration") 
                       
            if(underline=='none solid rgb(0, 0, 0)'){
                $(id).css("text-decoration","underline");
            }else{
                $(id).css("text-decoration","none solid rgb(0, 0, 0)");
            }
        })

        $('#italic').unbind("click").click(function(){
            
            var italic = $(id).css("font-style") 
            console.log(italic);
                       
            if(italic=='italic'){
                $(id).css("font-style","normal");
            }else{
                $(id).css("font-style","italic");
            }
        })

        $('#left').unbind("click").click(function(){
                $(id).css("text-align","left");
        })
        $('#mid').unbind("click").click(function(){
            $(id).css("text-align","center");
        })
        $('#right').unbind("click").click(function(){
            $(id).css("text-align","right");
        })

        $("#colorChoice").unbind("change").change(function(){
            $(id).css('color', $(this).val());
        });

        $("#textSize").unbind("change").change(function(){
            size=$(this).val()
            $(id).css('font-size', size+'px');
        });

        $("#textFamily").unbind("change").change(function(){
            font=$(this).val()
            if (font=='Charm') {
                $(id).css('font-family', "'Charm', cursive");
            }else if (font == 'Chonburi') {
                $(id).css('font-family', "'Chonburi', cursive");
            }else if (font == 'Kanit') {
                $(id).css('font-family', "'Kanit', sans-serif");
            }else if (font == 'Pattaya') {
                $(id).css('font-family', "'Pattaya', sans-serif");
            }else if (font == 'Sarabun') {
                $(id).css('font-family', "'Sarabun', sans-serif");
            }else if (font == 'Sriracha') {
                $(id).css('font-family', "'Sriracha', cursive");
            }else if (font == 'Thasadith') {
                $(id).css('font-family', "'Thasadith', sans-serif");
            }
            
        });

        $("#sortUp").unbind("click").click(function(){
            var number = parseInt($('#textSize').val(), 10)
            console.log(number);

            if(Number.isNaN(number)){ number = 5}

            var size=number+5
            $('#textSize').val(size)
            $(id).css('font-size', size+'px');
        });

        $("#sortDown").unbind("click").click(function(){
            var size=$('#textSize').val()-5
            $('#textSize').val(size)
            $(id).css('font-size', size+'px');
        });
}
