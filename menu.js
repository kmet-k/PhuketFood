var paper = []
paper[0] = ["A3",1754,2480]
paper[1] = ["A4",1240,1754]
paper[2] = ["A5",874,1240]
var getCanvas;
numCountFile.countFile=1;
numCountText.countText=1;

var imgTemplate = []
imgTemplate[0] ='https://www.thairath.co.th/media/dFQROr7oWzulq5FZUEw0KblrwGhr0kAwIWuwsU809ZTPNtdIXzKxLcMk67L77kat2Nc.webp'
imgTemplate[1] ='https://i.pinimg.com/originals/d7/83/af/d783af669d6fb03a0f9f94891084739f.jpg'
imgTemplate[2] ='https://www.smeleader.com/wp-content/uploads/2020/01/%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3%E0%B8%AB%E0%B8%A1%E0%B8%B9%E0%B8%81%E0%B8%A3%E0%B8%AD%E0%B8%9A-3.jpg'
imgTemplate[3] ='https://f.ptcdn.info/296/035/000/1441812461-1441805850-o.jpg'

var textTemplate = []
textTemplate[0] =["ขาหมู","卤猪脚","Pork’ hocks in brown sauce"]
textTemplate[1] =["ข้าวมันไก่","鸡油饭","Chicken rice"]
textTemplate[2] =["หมูกรอบ","脆皮猪肉","Crispy pork"]
textTemplate[3] =["ข้าวหมูแดง","叉烧饭","Red BBQ pork with rice"]

$(document).ready(function() {
    
    $('#toolIcon').hide()
    $('#tool').hide()
    $('#bin').hide()
    $('#textTool').hide()
    $('.textToolBox').hide()
    // $('#previewImage').hide()
    $('.page').hide()
    

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
            paper.forEach(element => {
                if(size==element[0]){
                    var item =  `<div class="paper" style=" 
                                width: ${element[1]}px;
                                height: ${element[2]}px;">
                                </div>`;
                    // $('.page').append(item)
                    $('.page').css("height","0px")
                    dropText()
                }
            });

            for (let index = 0; index < 8; index++) {
                var item = `<div class="col-3 " id="template" style="margin-bottom: 40px;">
                                <img src="Tp_Ver/V${index}.png" class="templateItem" 
                                onclick="selectTemplate(${index+1})">
                            </div>`
                            $('.template').append(item)
            }

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
        $('.template').hide()
        $('.page').show()
    });

});

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
                    dropText()
                }
            });

           
        }
        
        addImg(1)
        addText(1)
    }
    
}
function addImg(value) {
    console.log(value);
    
    if(value==1){
        for (let index = 0; index < imgTemplate.length; index++) {
            var item = `<div id="divimage${index+1}" class="imgBox"
            style="position: relative; display:inline-block; text-align:center; top: 150px; width:1243; ">
            <img id="image${index+1}" src="${imgTemplate[index]}" style="width: 98%;">
            </div>`
            $('.paper'+index).append(item)
            dragPic('image'+(index+1))
         
        }
        
    }
    
}

function addText(value) {
    if (value==1) {
        textTemplate.forEach((item, index)=>{ 
            console.log(index);
            var textarea = `<div class=""  id="divtext${item[0]}" style="position: relative; left: 500px; top: 400.3969px;">
            <textarea  rows="4" cols="50" id="text${item[0]}" 
            style=" width: 235px; font-size: 45px; text-align: center; margin: 0px; resize: none;  height: 141px; " class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${item[0]})">${item[0]}</textarea>
            </div>`
            $('.paper'+index).append(textarea)
            drag('text'+item[0])
   
        })       
    }
}


function drag(value) {
    $('#div'+value).draggable({
        // cancel: "text",
        start: function (){
            $('#textarea').focus();
        },
        stop: function (){
            $('#textarea').focus();
        } 
    })   
    reSize(value) 
}
function dragPic(value) {
    $('#'+value).draggable({
        cursor: "move"
    })

    $('#div'+value).resizable( { autoHide: true })
}


function reSize(value) {
console.log(value);

    $("#"+value).resizable( { autoHide: true });
    
}

function preview() {
    $(".modalPreview").empty()
    $(".paper").css("transform","scale(1)")
    var element = $(".paper").css("transform","scale(1)")

        html2canvas(element, {
        onrendered: function (canvas) {
               $(".modalPreview").append(canvas);
               window.getCanvas = canvas; 
               $(".paper").css("transform","scale(0.6)")
            }
        });
             
    $("#loadBtn").unbind("click").on('click', function () {
        // $('textarea').css("text-align","justify")

        console.log(window.getCanvas);
        var canvas = window.getCanvas;
        var imgageData = canvas.toDataURL("image/jpeg");
        var newData = imgageData.replace(/^data:image\/.jpeg/, "data:application/octet-stream");
        $("#loadBtn").attr("download", "picture.jpeg").attr("href", newData);
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
        // appendTo: ".paper",
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
