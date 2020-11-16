// const html2pdfBundleMin = require("html2pdf.bundle.min");

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
var getemailuser = localStorage.getItem("emailusercollection");
var getCanvas;
numCountFile.countFile = 1;
numCountText.countText = 1;
numCountPaper.paperCount = 0;
var bg = '';
var color = '';
var setBg = function (input) {
    bg = input
}
var getBg = function () {
    return bg
}

var setColor = function (input) {
    color = input
}
var getColor = function () {
    return color
}


var idMenu = []
var picMenu = []
var nameMenu = []
var id = "";

$(document).ready(function () {
    id = localStorage.getItem("datacollec")
    console.log(id);


    var refdbCollection = db.collection("collection")
    refdbCollection.where("id_user", "==", getemailuser).get().then((snapshot) => {
        snapshot.forEach(doc => {
            if (doc.id == id) {
                idMenu = doc.data().id_menu
                console.log(idMenu);
            }
        })
    }).then(function () {
        console.log(idMenu);
        for (let index = 0; index < idMenu.length; index++) {
            console.log(idMenu[index]);

            var refdbMenu = db.collection("menuNew")

            refdbMenu.where("id_Menu", "==", idMenu[index]).get().then((snapshot) => {
                snapshot.forEach(doc => {

                    chinese_Name = doc.data().chinese_Name
                    english_Name = doc.data().english_Name
                    thai_Name = doc.data().thai_Name
                    picture = doc.data().picture
                    id = doc.data().id_menu
                    nameMenu.push([chinese_Name, english_Name, thai_Name, id])
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
    $('.toolColorTemp').hide()
    $('#textTool').hide()
    $('.textToolBox').hide()
    $('.page').hide()
    $('.imgtoolBox').hide()
    $('#toolPic').hide()
    $('#nav').hide()

    $(window).on('load', function () {
        $('#myModal').modal('show');
    });

    $('.ok').click(function () {
        // $('#bin').show()
        // $('#toolIcon').show()
        // $('#textTool').show()
        $('.template').show()


        var index = 1;
        db.collection("template").orderBy("name", "asc").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var item = `<div class="col-3" id="template" style="margin-bottom: 40px;">
                    <img src="/background/${doc.data().name}/ex.jpg" class="templateItem" 
                    onclick='selectTemplate("${doc.data().name}","${doc.data().mainColor}")'>
                    </div>`
                $('.template').append(item)
            });
        })
        dropText()

    })

    $('.zoom-out').click(function () {

        var zoom = $('.zoom').html()
        if (zoom == 100) {
            zoomPaper(90, 0.5);
        } else if (zoom == 90) {
            zoomPaper(80, 0.4);
        } else if (zoom == 110) {
            zoomPaper(100, 0.6);
        } else if (zoom == 120) {
            zoomPaper(110, 0.7);
        }
    })

    $('.zoom-in').click(function () {
        var zoom = $('.zoom').html()
        if (zoom == 100) {
            zoomPaper(110, 0.7);
        } else if (zoom == 110) {
            zoomPaper(120, 0.8);
        } else if (zoom == 90) {
            zoomPaper(100, 0.6);
        } else if (zoom == 80) {
            zoomPaper(90, 0.5);
        }
    })


    $('#toolIcon').click(function () {
        $('#tool').show()
        $('#toolIcon').hide()
        $('#textTool').hide()
    })

    $('#textTool').click(function () {

        $('.textToolBox').show()
        $('#toolIcon').hide()
        $('#textTool').hide()
    })
    $('#toolPic').click(function () {

        $('.imgtoolBox').show()
        $('#toolIcon').hide()
        $('#textTool').hide()
    })

    $('#toolClose').click(function () {
        $('#tool').hide()
        $('#toolIcon').show()
        $('#textTool').show()
    })

    $('#textToolClose').click(function () {
        $('.textToolBox').hide()
        $('#toolIcon').show()
        $('#textTool').show()
    })

    $('#toolBg').click(function () {
        $('#bg').show()
        $('#toolIcon').hide()
        $('#textTool').hide()
    })

    $('#bgToolClose').click(function () {
        $('#bg').hide()
        $('#toolIcon').show()
        $('#textTool').show()

    })
    $('#imgToolClose').click(function () {
        $('#img').hide()
        $('#toolIcon').show()
        $('#textTool').show()
    })

    $('#textIcon').draggable({
        cursor: "move",
        helper: 'clone',
        // accept:'.paper',
        stop: function (event, object) {
            console.log('drop');
            numCountText()
            dropText()
        }
    });

    $("body").delegate(".templateItem", "click", function (event) {
        $('#bin').show()
        $('#toolIcon').show()
        $('#textTool').show()
        $('#toolBg').show()
        $('.template').hide()
        $('.page').show()
        $('#toolPic').show()
        $('.toolColorTemp').show()
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

    }
    dropPNG()

});
function setBG(background) {
    var paper = $('#selectPaper option:selected').val()
    var img = `BG/BG${background}.jpg`
    console.log(img);

    $('.paper' + paper).css("background-image", "url('" + img + "')")
}

$(function () {
    var imagesPreview = function (input, placeToInsertImagePreview) {
        if (input.files) {
            var filesAmount = input.files.length;
            for (i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = function (event) {



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

    $('#addPhoto').on('change', function () {
        imagesPreview(this, 'div.gallery');
    });

});

function dropText() {
    console.log(numCountText.countText);

    $(".paper").droppable({
        accept: "#textIcon",
        // activeClass: "ui-state-default",
        // hoverClass: "ui-state-hover",
        drop: function () {
            console.log('drophere');

            var id = "textBox" + numCountText.countText;
            console.log(id);

            var item = `<div class="dropped"><textarea id="${id}" rows="4" cols="50" class="textbox" placeholder="type something ..." onClick="forEdit('#${id}')"></textarea></div>`;
            $(this).append(item);

            drop()

        }
    })
}

function selectTemplate(name, color) {
    $('#nav').show()
    setBg(name)
    console.log(color);
    var size = $('.size').val();
    console.log("picMenu.length --> " + picMenu.length);
    var value = "";
    if (name == "BG1") {

        var paperCount = 0;
        var divied = picMenu.length / 4;
        console.log(divied);

        for (let index = 0; index < divied; index++) {
            var item = `<div class="paper paper${index}" style=" 
                            width: 1240px;
                            height: 1754px;">
                            </div>`;
            $('.page').append(item)
            $('.page').css("height", "0px")
            numCountPaper()
            dropText()
        }
        $('.paper').css("background-image", " url('/background/" + name + "/mainPic.jpg')");
        createChangeBgTool(name)
        addImg(name)
        addText(name, color)

    } else if (name == "BG2") {

        var paperCount = 0;
        var divied = picMenu.length / 6;
        console.log(divied);

        for (let index = 0; index < divied; index++) {
            var item = `<div class="paper paper${index}" style=" 
                            width: 1240px !important;
                            height: 1754px !important;">
                            </div>`;
            $('.page').append(item)
            $('.page').css("height", "0px")
            numCountPaper()
            dropText()
        }

        $('.paper').css("background-image", " url('/background/" + name + "/mainPic.jpg')");
        createChangeBgTool(name)
        addImg(name)
        addText(name, color)

    } else if (name == "BG3") {

        var paperCount = 0;
        var divied = picMenu.length / 3;
        console.log(divied);

        for (let index = 0; index < divied; index++) {
            var item = `<div class="paper paper${index}" style=" 
                            width: 1240px !important;
                            height: 1754px !important;">
                            </div>`;
            $('.page').append(item)
            $('.page').css("height", "0px")
            numCountPaper()
            dropText()
        }
        $('.paper').css("background-image", " url('/background/" + name + "/mainPic.jpg')");
        createChangeBgTool(name)
        addImg(name)
        addText(name, color)

    } else if (name == "BG4" || name == "BG5") {

        var paperCount = 0;
        var divied = picMenu.length / 9;
        console.log(divied);

        for (let index = 0; index < divied; index++) {
            var item = `<div class="paper paper${index}" style=" 
                            width: 1240px !important;
                            height: 1754px !important;">
                            </div>`;
            $('.page').append(item)
            $('.page').css("height", "0px")
            numCountPaper()
            dropText()
        }
        $('.paper').css("background-image", " url('/background/" + name + "/mainPic.jpg')");
        createChangeBgTool(name)
        addImg(name)
        addText(name, color)

    } else if (name == "BG6") {

        var paperCount = 0;
        var divied = picMenu.length / 6;
        console.log(divied);

        for (let index = 0; index < divied; index++) {
            var item = `<div class="paper paper${index}" style=" 
                            width: 1240px !important;
                            height: 1754px !important;">
                            </div>`;
            $('.page').append(item)
            $('.page').css("height", "0px")
            numCountPaper()
            dropText()
        }
        $('.paper').css("background-image", " url('/background/" + name + "/mainPic.jpg')");
        createChangeBgTool(name)
        addImg(name)
        addText(name, color)

    }
    display()
}

function createChangeBgTool(name) {
    db.collection("template").where("name", "==", name).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            for (var i = 0; i < doc.data().more.length; i++) {
                color = doc.data().more[i]["color"]
                var item = `<i class="fas fa-circle" style="color:#${color}" onclick="changeBg('${name}','${color}')"></i><p>`
                $('.toolColorTemp').append(item)
                console.log(color);
            }
        });
    })
}

function changeBg(name, color) {
    var paper = (numCountPaper.paperCount - 1)
    console.log(color);
    setColor(color)
    for (let index = 0; index < picMenu.length; index++) {
        $('.paper').css("background-image", "url('/background/" + name + "/" + color + ".jpg')")
    }
}

function display() {
    var size = $('.size').val();
    $('.paper').hide()
    $('.paper0').show()
    let papaerCount = numCountPaper.paperCount
    for (let index = 0; index < papaerCount; index++) {
        var option = `<option value="${index}">${(index + 1)}</option>`
        $('#selectPaper').append(option)
    }

    $('.addpage').unbind("click").click(function () {
        numCountPaper()
        let papaerCount = numCountPaper.paperCount
        let paperMinusOne = papaerCount - 1
        var option = `<option value="${(paperMinusOne)}">${papaerCount}</option>`
        $('#selectPaper').append(option)
        $('.paper').hide()
        var paper = numCountPaper.paperCount

        var item = `<div class="paper paper${paperMinusOne}" style=" 
                width: 1240px !important;
                height: 1754px !important;">
                            </div>`;
        $('.page').append(item)
        $('.page').css("height", "0px")
        dropText()

        console.log(papaerCount);

        $('#selectPaper').val(paperMinusOne)
        $('.paper' + paperMinusOne).show()

        var bg = getBg()
        var color = getColor()
        $('.paper').css("background-image", " url('/background/" + bg + "/" + color + ".jpg')");
    })



    selectPaper()
}

function selectPaper() {
    $('#selectPaper').unbind("change").change(function () {
        var numSelect = $('#selectPaper').val()
        var paper = numCountPaper.paperCount
        for (let index = 0; index < paper; index++) {

            if (index == numSelect) {
                $('.paper' + index).show()
            } else {
                $('.paper' + index).hide()
            }
        }
    });
}

function addImg(value) {
    if (value == "BG1") {
        var papaerCount = 0
        for (let index = 0; index < picMenu.length; index++) {

            if ((index + 1) % 4 == 1) {
                var item = `<div id="divimage${index + 1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; margin-top: 500px; width:400px; margin-left:10.5px; height:210px; z-index:5;">
                <img id="image${index + 1}" src="${picMenu[index]}" style="height: 100%; border: 5px solid white;">
                </div>`
                $('.paper' + papaerCount).append(item)
            } else if ((index + 1) % 4 == 2) {
                var item = `<div id="divimage${index + 1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; margin-top: 800px; width:400px; margin-left:10.5px; height:210px; z-index:5;">
                <img id="image${index + 1}" src="${picMenu[index]}" style="height: 100%; border: 5px solid white;">
                </div>`
                $('.paper' + papaerCount).append(item)

            } else if ((index + 1) % 4 == 3) {
                var item = `<div id="divimage${index + 1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; margin-top: 1100px; width:400px; margin-left:10.5px; height:210px; z-index:5;">
                <img id="image${index + 1}" src="${picMenu[index]}" style="height: 100%; border: 5px solid white;">
                </div>`
                $('.paper' + papaerCount).append(item)

            } else if ((index + 1) % 4 == 0) {
                var item = `<div id="divimage${index + 1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; margin-top: 1400px; width:400px; margin-left:10.5px; height:210px; z-index:5;">
                <img id="image${index + 1}" src="${picMenu[index]}" style="height: 100%; border: 5px solid white;">
                </div>`
                $('.paper' + papaerCount).append(item)
                papaerCount = papaerCount + 1

            }
            dragPic('image' + (index + 1))
        }
    } if (value == "BG2") {
        var papaerCount = 0
        for (let index = 0; index < picMenu.length; index++) {

            if ((index + 1) % 6 == 1) {
                var item = `<div id="divimage${index + 1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; margin-top: 175.4px; width:496px; margin-left:12.5px; height:298px; z-index:5;">
                <img id="image${index + 1}" src="${picMenu[index]}" style="height: 100%; border: 5px solid white; border-radius: 50%;">
                </div>`
                $('.paper' + papaerCount).append(item)
            } else if ((index + 1) % 6 == 3) {
                var item = `<div id="divimage${index + 1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; margin-top: 526.2px; width:496px; margin-left:12.5px; height:298px; z-index:5;">
                <img id="image${index + 1}" src="${picMenu[index]}" style="height: 100%; border: 5px solid white; border-radius: 50%">
                </div>`
                $('.paper' + papaerCount).append(item)

            } else if ((index + 1) % 6 == 4) {
                var item = `<div id="divimage${index + 1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; margin-top: 877px; width:496px; margin-left:12.5px; height:298px; z-index:5;">
                <img id="image${index + 1}" src="${picMenu[index]}" style="height: 100%; border: 5px solid white; border-radius: 50%">
                </div>`
                $('.paper' + papaerCount).append(item)

            } else if ((index + 1) % 6 == 0) {
                var item = `<div id="divimage${index + 1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; margin-top: 1227px; width:496px; margin-left:12.5px; height:298px; z-index:5;">
                <img id="image${index + 1}" src="${picMenu[index]}" style="height: 100%; border: 5px solid white; border-radius: 50%">
                </div>`
                $('.paper' + papaerCount).append(item)
                papaerCount = papaerCount + 1
            } dragPic('image' + (index + 1))
        }
    } if (value == "BG3") {
        var papaerCount = 0
        console.log('halo');
        for (let index = 0; index < picMenu.length; index++) {

            if ((index + 1) % 3 == 1) {
                var item = `<div id="divimage${index + 1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; margin-top: 263px; width:620px; margin-left:607px; height:350px; z-index:5;">
                <img id="image${index + 1}" src="${picMenu[index]}" style="width:100%; height: auto; border: 5px solid white;">
                </div>`
                $('.paper' + papaerCount).append(item)
            } else if ((index + 1) % 3 == 2) {
                var item = `<div id="divimage${index + 1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; margin-top: 648px; width:620px; margin-left:607px; height:350px; z-index:5;">
                <img id="image${index + 1}" src="${picMenu[index]}" style="width:100%;  height: auto; border: 5px solid white;">
                </div>`
                $('.paper' + papaerCount).append(item)

            } else if ((index + 1) % 3 == 0) {
                var item = `<div id="divimage${index + 1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; margin-top: 1034px; width:620px; margin-left:607px; height:350px; z-index:5;">
                <img id="image${index + 1}" src="${picMenu[index]}" style="width:100%;  height: auto; border: 5px solid white;">
                </div>`
                $('.paper' + papaerCount).append(item)
                papaerCount = papaerCount + 1
            }
            dragPic('image' + (index + 1))
        }
    } if (value == "BG4") {
        var papaerCount = 0
        for (let index = 0; index < picMenu.length; index++) {

            if ((index + 1) % 1 == 0) {
                var item = `<div id="divimage${index + 1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; margin-top: 1227px; width:620px; margin-left:607px; height:350px; z-index:5;">
                <img id="image${index + 1}" src="${picMenu[index]}" style="width:100%;  height: auto; border: 5px solid white;">
                </div>`
                $('.paper' + papaerCount).append(item)
                papaerCount = papaerCount + 1
            }
            dragPic('image' + (index + 1))
        }
    } if (value == "BG5") {
        var papaerCount = 0
        for (let index = 0; index < picMenu.length; index++) {

            if ((index + 1) % 9 == 1) {
                var item = `<div id="divimage${index + 1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; margin-top: 1262px;  width:620px;  margin-left:12.5px; height:350px; z-index:5;">
                <img id="image${index + 1}" src="${picMenu[index]}" style="width:100%; height: auto; border: 5px solid white;">
                </div>`
                $('.paper' + papaerCount).append(item)
            } else if ((index + 1) % 9 == 5) {
                var item = `<div id="divimage${index + 1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; margin-top: 17.5px;  width:620px; margin-left:607px; height:350px; z-index:5;">
                <img id="image${index + 1}" src="${picMenu[index]}" style="width:100%;  height: auto; border: 5px solid white;">
                </div>`
                $('.paper' + papaerCount).append(item)
                papaerCount = papaerCount + 1

            }
            dragPic('image' + (index + 1))
        }
    } if (value == "BG6") {
        var papaerCount = 0
        for (let index = 0; index < picMenu.length; index++) {

            if ((index + 1) % 6 == 1) {
                var item = `<div id="divimage${index + 1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; margin-top: 1262px; width:413.29px;  margin-left:0px; height:210px; z-index:5;">
                <img id="image${index + 1}" src="${picMenu[index]}" style="height: 100%; border: 5px solid white;">
                </div>`
                $('.paper' + papaerCount).append(item)
            } else if ((index + 1) % 6 == 2) {
                var item = `<div id="divimage${index + 1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; margin-top: 1262px; width:413.29px; margin-left:413.29px; height:210px;  z-index:5;">
                <img id="image${index + 1}" src="${picMenu[index]}" style="height: 100%; border: 5px solid white;">
                </div>`
                $('.paper' + papaerCount).append(item)

            } else if ((index + 1) % 6 == 3) {
                var item = `<div id="divimage${index + 1}" class="imgBox"
                style="position: absolute; display:inline-block; text-align:center; margin-top: 1262px; width:413.29px; margin-left:826.58px; height:210px; z-index:5;">
                <img id="image${index + 1}" src="${picMenu[index]}" style="height: 100%; border: 5px solid white;">
                </div>`
                $('.paper' + papaerCount).append(item)
                papaerCount = papaerCount + 1

            }
            dragPic('image' + (index + 1))
        }
    }
}



function addText(value, color) {
    if (value == "BG1") {
        var paperIndex = 0;
        for (let index = 0; index < nameMenu.length; index++) {
            var restName = $('#restName').val();
            var tel = $('#tel').val();

            if ((index + 1) % 4 == 1) {
                var header = `
                <div id="div_headers${paperIndex}" style="position: absolute; margin-left: 450px; margin-top: 440px;">
                <textarea  rows="4" cols="50" id="headers${paperIndex}" 
                style="color:white; width: 779px; font-size: 80px; text-align: center; margin: 0px; resize: none;  height: 180px; font-weight: bold; border-top: 5px solid white; border-bottom: 5px solid white;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(headers${paperIndex})">MENU</textarea>
                </div>`
                $('.paper' + paperIndex).append(header)

                drag('headers' + paperIndex)

                var tel = `
                <div id="div_tel${paperIndex}" style="position: absolute; margin-left: 970.4px; margin-top: 1700px; ">
                <textarea  rows="3" cols="50" id="tel${paperIndex}" 
                style="font-family: Kanit, sans-serif; color: white; width: 261px; font-size: 25px; text-align: justify; margin: 0px; resize: none; height: 50px; font-weight: bold; position: static; zoom: 1; display: block;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(tel${paperIndex})">Tel. ${tel}</textarea>
                </div>`
                $('.paper' + paperIndex).append(tel)

                drag('tel' + paperIndex)

                var restName = `
                <div id="div_restName${paperIndex}" style="position: absolute; margin-left: 630px; margin-top: 100px; ">
                <textarea  rows="4" cols="50" id="restName${paperIndex}" 
                style="font-family :Kanit, sans-serif; color:white; color:white; width: 590px; font-size: 100px; text-align: justify; margin: 0px; resize: none;  height: 200px; font-weight: bold; " class="textbox" 
                placeholder="type something ..." onClick="forEdit(restName${paperIndex})">${restName}</textarea>
                </div>`
                $('.paper' + paperIndex).append(restName)

                drag('restName' + paperIndex)


                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 490px; margin-top: 700px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" color:white; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 490px; margin-top: 750px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:#feecc6; width: 600px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 490px; margin-top: 800px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:white; width: 600px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 100px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)


            } else if ((index + 1) % 4 == 2) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 490px; margin-top: 900px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" color:white;  width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 490px; margin-top: 950px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:#feecc6; width: 600px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 490px; margin-top: 1000px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:white; width: 600px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 100px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)

            } else if ((index + 1) % 4 == 3) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 490px; margin-top: 1100px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="color:white; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 490px; margin-top: 1150px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#feecc6; width: 600px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 490px; margin-top: 1200px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:white; width: 600px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 100px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)

            } else if ((index + 1) % 4 == 0) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 490px; margin-top: 1300px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="color:white; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 490px; margin-top: 1350px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#feecc6; width: 600px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 490px; margin-top: 1400px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:white; width: 600px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 100px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)
                paperIndex++
            }
            drag('text' + nameMenu[index][0])
        }
    } else if (value == "BG2") {
        var paperIndex = 0;
        for (let index = 0; index < nameMenu.length; index++) {
            console.log(color);
            if ((index + 1) % 6 == 1) {
                var restName = $('#restName').val();
                var tel = $('#tel').val();
                var header = `
        <div id="div_headers${paperIndex}" style="position: absolute; margin-left: 600px; margin-top: 350px;">
        <textarea  rows="4" cols="50" id="headers${paperIndex}" 
        style="color:white; width: 640px; font-size: 40px; text-align: center; margin: 0px; background-color: #${color}; resize: none;  height: 90px; font-weight: bold; " class="textbox" 
        placeholder="type something ..." onClick="forEdit(headers${paperIndex})">MENU</textarea>
        </div>`
                $('.paper' + paperIndex).append(header)

                drag('headers' + paperIndex)

                var tel = `
        <div id="div_tel${paperIndex}" style="position: absolute; margin-left: 980px; margin-top: 1600px;">
        <textarea  rows="3" cols="50" id="tel${paperIndex}" 
        style="font-family: Kanit, sans-serif; color: white; width: 261px; font-size: 25px; text-align: right; margin: 0px; resize: none; height: 50px; font-weight: bold; position: static; zoom: 1; display: block;" class="textbox" 
        placeholder="type something ..." onClick="forEdit(tel${paperIndex})">Tel. ${tel}</textarea>
        </div>`
                $('.paper' + paperIndex).append(tel)

                drag('tel' + paperIndex)

                var restName = `
        <div id="div_restName${paperIndex}" style="position: absolute; margin-left: 650px; margin-top: 160px;">
        <textarea  rows="4" cols="50" id="restName${paperIndex}" 
        style="font-family :Kanit, sans-serif; color:white; color:white; width: 600px; font-size: 100px; text-align: left; margin: 0px; resize: none;  height: 200px; font-weight: bold; " class="textbox" 
        placeholder="type something ..." onClick="forEdit(restName${paperIndex})">${restName}</textarea>
        </div>`
                $('.paper' + paperIndex).append(restName)

                drag('restName' + paperIndex)

                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 620px; margin-top: 438.5px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" color:white;  width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 620px; margin-top: 499.9px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:#feecc6; width: 600px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position:absolute; margin-left: 620px; margin-top: 543.74px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:white; width: 600px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 100px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)


            } else if ((index + 1) % 6 == 2) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 620px; margin-top: 613.9px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" color:white;  width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 620px; margin-top: 675.29px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:#feecc6; width: 600px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 620px; margin-top: 719.14px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:white; width: 600px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 100px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)

            } else if ((index + 1) % 6 == 3) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 620px; margin-top: 789.3px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="color:white; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 620px; margin-top: 850.69px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#feecc6; width: 600px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 620px; margin-top: 894.54px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:white; width: 600px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 100px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)

            } else if ((index + 1) % 6 == 4) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 620px; margin-top: 964.7px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="color:white; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 620px; margin-top: 1026.09px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#feecc6; width: 600px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 620px; margin-top: 1069.94px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:white; width: 600px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 100px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)

            } else if ((index + 1) % 6 == 5) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 620px; margin-top: 1140.1px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="color:white; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 620px; margin-top: 1201.5px">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#feecc6; width: 600px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 620px; margin-top: 1245.35px">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:white; width: 600px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 100px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)

            } else if ((index + 1) % 6 == 0) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 620px; margin-top: 1315.5px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="color:white; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 620px; margin-top: 1376.89px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#feecc6; width: 600px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 620px; margin-top: 1420.74px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:white; width: 600px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 100px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)
                paperIndex++

            }
            drag('text' + nameMenu[index][0])
        }
    } else if (value == "BG3") {

        var paperIndex = 0;

        for (let index = 0; index < nameMenu.length; index++) {

            if ((index + 1) % 3 == 1) {
                var restName = $('#restName').val();
                var tel = $('#tel').val();
                var header = `
        <div id="div_headers${paperIndex}" style="position: absolute; margin-left: 24.8px; margin-top: 350.8px; ">
        <textarea  rows="4" cols="50" id="headers${paperIndex}" 
        style="color:white; width: 500px; font-size: 35px; text-align: center; margin: 0px; resize: none;  height: 90px; font-weight: bold; border-bottom: 5px solid white;" class="textbox" 
        placeholder="type something ..." onClick="forEdit(headers${paperIndex})">MENU</textarea>
        </div>`
                $('.paper' + paperIndex).append(header)

                drag('headers' + paperIndex)

                var tel = `
        <div id="div_tel${paperIndex}" style="position: absolute; margin-left: 12.40px; margin-top: 1666.3px; ">
        <textarea  rows="3" cols="50" id="tel${paperIndex}" 
        style="font-family: Kanit, sans-serif; color: white; width: 240px; font-size: 25px; text-align: left; margin: 0px; resize: none; height: 50px; font-weight: bold; position: static; zoom: 1; display: block;" class="textbox" 
        placeholder="type something ..." onClick="forEdit(tel${paperIndex})">Tel. ${tel}</textarea>
        </div>`
                $('.paper' + paperIndex).append(tel)

                drag('tel' + paperIndex)

                var restName = `
        <div id="div_restName${paperIndex}" style="position: absolute; margin-left: 68.2px; margin-top: 245.56px; ">
        <textarea  rows="4" cols="50" id="restName${paperIndex}" 
        style="font-family :Kanit, sans-serif; color:#ffe07d; width: 500px; font-size: 70px; text-align: left; margin: 0px; resize: none;  height: 150px; font-weight: bold; " class="textbox" 
        placeholder="type something ..." onClick="forEdit(restName${paperIndex})">${restName}</textarea>
        </div>`
                $('.paper' + paperIndex).append(restName)

                drag('restName' + paperIndex)

                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 24.8px; margin-top: 526.2px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" color:#ffe07d;  width: 500px; font-size: 45px; text-align: center; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 24.8px; margin-top: 605.13px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:white; width: 500px; font-size: 28px; text-align: center; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 24.8px; margin-top: 648.98px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:white; width: 500px; font-size: 25px; text-align: center; margin: 0px; resize: none;  height: 100px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)


            } else if ((index + 1) % 3 == 2) {
                var textarea = `
                <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 24.8px; margin-top: 824.38px;">
                <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
                style=" color:#ffe07d;  width: 500px; font-size: 45px; text-align: center; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
                </div>
                <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 24.8px; margin-top: 903.31px;">
                <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
                style="font-family :Kanit, sans-serif; color:white; width: 500px; font-size: 28px; text-align: center; margin: 0px; resize: none;  height: 80px;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
                </div>
                <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 24.8px; margin-top: 947.16px;">
                <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
                style="font-family :Kanit, sans-serif; color:white; width: 500px; font-size: 25px; text-align: center; margin: 0px; resize: none;  height: 100px;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
                </div>
                `
                $('.paper' + paperIndex).append(textarea)

            } else if ((index + 1) % 3 == 0) {
                var textarea = `
                <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 24.8px; margin-top: 1122.56px;">
                <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
                style=" color:#ffe07d;  width: 500px; font-size: 45px; text-align: center; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
                </div>
                <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 24.8px; margin-top: 1201.5px;">
                <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
                style="font-family :Kanit, sans-serif; color:white; width: 500px; font-size: 28px; text-align: center; margin: 0px; resize: none;  height: 80px;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
                </div>
                <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 24.8px; margin-top: 1245.34px;">
                <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
                style="font-family :Kanit, sans-serif; color:white; width: 500px; font-size: 25px; text-align: center; margin: 0px; resize: none;  height: 100px;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
                </div>
                `
                $('.paper' + paperIndex).append(textarea)
                paperIndex++
            }
            drag('text' + nameMenu[index][0])
        }
    } else if (value == "BG4") {
        var paperIndex = 0;
        for (let index = 0; index < nameMenu.length; index++) {
            var restName = $('#restName').val();
            var tel = $('#tel').val();

            if ((index + 1) % 9 == 1) {
                var tel = `
                <div id="div_tel${paperIndex}" style="position: absolute; margin-left: 970.4px; margin-top:1700.86px; ">
                <textarea  rows="3" cols="50" id="tel${paperIndex}" 
                style="font-family: Kanit, sans-serif; color: white; width: 261px; font-size: 25px; text-align: right; margin: 0px; resize: none; height: 50px; font-weight: bold; position: static; zoom: 1; display: block;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(tel${paperIndex})">Tel. ${tel}</textarea>
                </div>`
                $('.paper' + paperIndex).append(tel)

                drag('tel' + paperIndex)

                var restName = `
                <div id="div_restName${paperIndex}" style="position: absolute; margin-left: 62px; margin-top:157.86px; ">
                <textarea  rows="4" cols="50" id="restName${paperIndex}" 
                style="font-family :Kanit, sans-serif; color:white; color:black; width: 424px; font-size: 100px; text-align: left; margin: 0px; resize: none;  height: 414px; font-weight: bold; " class="textbox" 
                placeholder="type something ..." onClick="forEdit(restName${paperIndex})">${restName}</textarea>
                </div>`
                $('.paper' + paperIndex).append(restName)

                drag('restName' + paperIndex)


                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 62px; margin-top:876.9px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" color:white; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 62px; margin-top:938.39px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:#${color}; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 62px; margin-top: 982.24px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:white; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)


            } else if ((index + 1) % 9 == 2) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 62px; margin-top: 1087.48px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" color:white;  width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 62px; margin-top: 1148.87px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:#${color}; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 62px; margin-top: 1192.72px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:white; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)

            } else if ((index + 1) % 9 == 3) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 62px; margin-top:1262.88px">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="color:white; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 62px; margin-top: 1324.27px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#${color}; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 62px; margin-top: 1368.12px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:white; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)

            } else if ((index + 1) % 9 == 4) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 62px; margin-top:1508.44px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="color:white; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 62px; margin-top:1569.83px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#${color}; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 62px; margin-top: 1613.68px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:white; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)

            } else if ((index + 1) % 9 == 5) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 644.8px; margin-top:87.7px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" color:white;  width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 644.8px; margin-top:149.09px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:#${color}; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 644.8px; margin-top:192.94px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:white; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)

            } else if ((index + 1) % 9 == 6) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 644.8px; margin-top:298.18px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="color:white; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 644.8px; margin-top: 359.57px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#${color}; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 644.8px; margin-top: 403.42px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:white; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)

            } else if ((index + 1) % 9 == 7) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 644.8px; margin-top:508.66px">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="color:white; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 644.8px; margin-top:570.05px">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#${color}; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 644.8px; margin-top:613.90px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:white; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)
            } else if ((index + 1) % 9 == 8) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 644.8px; margin-top:719.14px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="color:white; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 644.8px; margin-top:780.53px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#${color}; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 644.8px; margin-top:824.38px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:white; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)
            } else if ((index + 1) % 9 == 0) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 644.8px; margin-top:929.62px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="color:white; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 644.8px; margin-top:991.01px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#${color}; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 644.8px; margin-top:1034.86px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:white; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)
                paperIndex++
            }
            drag('text' + nameMenu[index][0])
        }
    } else if (value == "BG5") {
        var paperIndex = 0;
        for (let index = 0; index < nameMenu.length; index++) {
            var restName = $('#restName').val();
            var tel = $('#tel').val();

            if ((index + 1) % 9 == 1) {
                var tel = `
                <div id="div_tel${paperIndex}" style="position: absolute; margin-left: 970.4px; margin-top:1683.84px; ">
                <textarea  rows="3" cols="50" id="tel${paperIndex}" 
                style="font-family: Kanit, sans-serif; color: white; width: 261px; font-size: 25px; text-align: right; margin: 0px; resize: none; height: 50px; font-weight: bold; position: static; zoom: 1; display: block;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(tel${paperIndex})">Tel. ${tel}</textarea>
                </div>`
                $('.paper' + paperIndex).append(tel)

                drag('tel' + paperIndex)

                var restName = `
                <div id="div_restName${paperIndex}" style="position: absolute; margin-left: 62px; margin-top:157.86px;">
                <textarea  rows="5" cols="50" id="restName${paperIndex}" 
                style="font-family :Kanit, sans-serif; height: 154px;  color:#${color}; width: 462px; font-size: 80px; text-align: left; margin: 0px; resize: none; font-weight: bold; border-top: 5px solid #${color}; border-bottom: 5px solid #${color};" class="textbox" 
                placeholder="type something ..." onClick="forEdit(restName${paperIndex})">${restName}</textarea>
                </div>`
                $('.paper' + paperIndex).append(restName)

                drag('restName' + paperIndex)


                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 68.2px; margin-top:438.5px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" color:#545454; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 68.2px; margin-top:499.89px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:#${color}; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 68.2px; margin-top:543.74px">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:#545454; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)


            } else if ((index + 1) % 9 == 2) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 68.2px; margin-top:648.98px">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" color:#545454;  width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 68.2px; margin-top:710.37px">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:#${color}; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 68.2px; margin-top:754.22px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:#545454; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)

            } else if ((index + 1) % 9 == 3) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 68.2px; margin-top:859.46px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="color:#545454; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 68.2px; margin-top:920.85px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#${color}; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 68.2px; margin-top:964.7px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#545454; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)

            } else if ((index + 1) % 9 == 4) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 68.2px; margin-top:1069.94px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="color:#545454; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 68.2px; margin-top:1131.33px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#${color}; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 68.2px; margin-top:1175.18px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#545454; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)

            } else if ((index + 1) % 9 == 5) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:526.2px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" color:white;  width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:587.59px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:#ffde59; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:631.44px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:white; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)

            } else if ((index + 1) % 9 == 6) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:736.68px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="color:white; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:798.07px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#ffde59; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:841.92px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:white; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)

            } else if ((index + 1) % 9 == 7) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:929.62px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="color:white; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top: 991.01px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#ffde59; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top: 1034.86px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:white; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)
            } else if ((index + 1) % 9 == 8) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:1140.10px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="color:white; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:1201.49px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#ffde59; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:1245.34px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:white; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)
            } else if ((index + 1) % 9 == 0) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:1350.58px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="color:white; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:1411.97px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#ffde59; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:1455.82px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:white; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)
                paperIndex++
            }
            drag('text' + nameMenu[index][0])
        }
    } else if (value == "BG6") {
        var paperIndex = 0;
        for (let index = 0; index < nameMenu.length; index++) {
            var restName = $('#restName').val();
            var tel = $('#tel').val();

            if ((index + 1) % 6 == 1) {
                var header = `
                <div id="div_headers${paperIndex}" style="position: absolute; margin-left: 434.4px; margin-top:350.84px; ">
                <textarea  rows="4" cols="50" id="headers${paperIndex}" 
                style="color:#${color}; width: 462px; font-size: 35px; text-align: center; margin: 0px; resize: none;  height: 90px; font-weight: bold;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(headers${paperIndex})">M E N U</textarea>
                </div>`
                $('.paper' + paperIndex).append(header)

                var tel = `
                <div id="div_tel${paperIndex}" style="position: absolute; margin-left: 970.4px; margin-top:1683.84px; ">
                <textarea  rows="3" cols="50" id="tel${paperIndex}" 
                style="font-family: Kanit, sans-serif; color:#545454; width: 261px; font-size: 25px; text-align: right; margin: 0px; resize: none; height: 50px; font-weight: bold; position: static; zoom: 1; display: block;" class="textbox" 
                placeholder="type something ..." onClick="forEdit(tel${paperIndex})">Tel. ${tel}</textarea>
                </div>`
                $('.paper' + paperIndex).append(tel)

                drag('tel' + paperIndex)

                var restName = `
                <div id="div_restName${paperIndex}" style="position: absolute; margin-left: 427.8px; margin-top:157.84px;">
                <textarea  rows="5" cols="50" id="restName${paperIndex}" 
                style="font-family :Kanit, sans-serif; height: 154px;  color:#${color}; width: 462px; font-size: 80px; text-align: left; margin: 0px; resize: none; font-weight: bold; border-top: 5px solid #${color}; border-bottom: 5px solid #${color};" class="textbox" 
                placeholder="type something ..." onClick="forEdit(restName${paperIndex})">${restName}</textarea>
                </div>`
                $('.paper' + paperIndex).append(restName)

                drag('restName' + paperIndex)


                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 74.4px; margin-top:438.59px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" color:#545454; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 74.4px; margin-top:499.89px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:#${color}; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 74.4px; margin-top:543.74px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:#545454; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)


            } else if ((index + 1) % 6 == 2) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 74.4px; margin-top:648.98px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" color:#545454;  width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 74.4px; margin-top:710.37px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:#${color}; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 74.4px; margin-top:754.22px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:#545454; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)

            } else if ((index + 1) % 6 == 3) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 74.4px; margin-top:859.46px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="color:#545454; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 74.4px; margin-top:920.85px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#${color}; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 74.4px; margin-top:964.70px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#545454; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)

            } else if ((index + 1) % 6 == 4) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:438.59px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="color:#545454; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:499.89px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#${color}; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:543.74px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#545454; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)

            } else if ((index + 1) % 6 == 5) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:648.98px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style=" color:#545454;  width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:710.37px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:#${color}; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:754.22px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif; color:#545454; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)

            } else if ((index + 1) % 6 == 0) {
                var textarea = `
            <div id="Cn_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:859.46px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="color:#545454; width: 235px; font-size: 35px; text-align: left; margin: 0px; resize: none;  height: 80px; font-weight: bold;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][0]}</textarea>
            </div>
            <div id="Th_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:920.85px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#${color}; width: 500px; font-size: 28px; text-align: left; margin: 0px; resize: none;  height: 80px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][2]}</textarea>
            </div>
            <div id="En_divtext${nameMenu[index][0]}" style="position: absolute; margin-left: 657.20px; margin-top:964.70px;">
            <textarea  rows="4" cols="50" id="text${nameMenu[index][0]}" 
            style="font-family :Kanit, sans-serif;  color:#545454; width: 500px; font-size: 25px; text-align: left; margin: 0px; resize: none;  height: 110px;" class="textbox" 
            placeholder="type something ..." onClick="forEdit(text${nameMenu[index][0]})">${nameMenu[index][1]}</textarea>
            </div>
            `
                $('.paper' + paperIndex).append(textarea)
                paperIndex++

            }
            drag('text' + nameMenu[index][0])
        }
    }
}


function drag(value) {
    $('#Cn_div' + value).draggable({
        distance: 0,
        cursorAt: [0, 0],
        // appendTo: ".paper",
        cursor: "move",
        drag: function () {
            console.log('drag');
            $('#div' + value).css({ 'position': 'relative', 'left': '', 'top': '', 'right': '' });
        }
    })
    $('#Th_div' + value).draggable({
        distance: 0,
        cursorAt: [0, 0],
        // appendTo: ".paper",
        cursor: "move",
        drag: function () {
            console.log('drag');
            $('#div' + value).css({ 'position': 'relative', 'left': '', 'top': '', 'right': '' });
        }
    })
    $('#En_div' + value).draggable({
        distance: 0,
        cursorAt: [0, 0],
        // appendTo: ".paper",
        cursor: "move",
        drag: function () {
            console.log('drag');
            $('#div' + value).css({ 'position': 'relative', 'left': '', 'top': '', 'right': '' });
        }
    })

    $("#div_" + value).draggable({
        distance: 0,
        cursorAt: [0, 0],
        // appendTo: ".paper",
        cursor: "move",
        drag: function () {
            console.log('drag');
            $('#div' + value).css({ 'position': 'relative', 'left': '', 'top': '', 'right': '' });
        }
    })

    $("#" + value).resizable({ autoHide: true });
}

function dragNumber(value) {
    $('#number' + value).draggable({
        distance: 0,
        cursorAt: [0, 0],
        // appendTo: ".paper",
        cursor: "move",
        drag: function () {
            console.log('drag');
            $('#div' + value).css({ 'position': 'relative', 'left': '', 'top': '', 'right': '' });
        }
    })
    $('#number' + value + 'onPic').draggable({
        distance: 0,
        cursorAt: [0, 0],
        // appendTo: ".paper",
        cursor: "move",
        drag: function () {
            console.log('drag');
            $('#div' + value).css({ 'position': 'relative', 'left': '', 'top': '', 'right': '' });
        }
    })

    $("#text" + value).resizable({ autoHide: true });
    $("#text" + value + "onPic").resizable({ autoHide: true });
}


function dragPic(value) {
    $('#div' + value).draggable({
        drag: function () {
            console.log('drag');
            $('#div' + value).css({ 'position': '', 'left': '', 'top': '', 'right': '' });
        }
    })
    $('#div' + value).resizable({ autoHide: true })
}

function preview() {

    var numPaper = numCountPaper.paperCount
    console.log(numPaper);


    $(".paper").css("transform", "scale(1)")
    $(".modalPreview").empty()


    for (let index = 0; index < numPaper; index++) {
        
        var paper = $('.paper' + 0).html()
        

        html2canvas($(".paper" + index).get(0)).then(function (canvas) {
            $(".modalPreview").append(canvas);
            window.getCanvas = canvas;
            $(".paper" + index).css("transform", "scale(0.6)")
        }
        )
    }

    $("#loadBtn").unbind("click").on('click', function () {
        console.log(window.getCanvas);
        var canvas = window.getCanvas;
        var imgageData = canvas.toDataURL("image/jpeg");
        var newData = imgageData.replace(/^data:image\/.jpg/, "data:application/octet-stream");
        $("#loadBtn").attr("download", "picture.jpg").attr("href", newData);
    });

}


function zoomPaper(text, scale) {
    $(".zoom").html(text);
    $('.paper').css("transform", "scale(" + scale + ")")
    $('.paper').css("transform-origin", "top")
    $('.page').css("height", "0px")

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
        cursorAt: { left: 5, top: 5 },
        cursor: "move",
        helper: 'clone',
        revert: "invalid",
        stop: function (event, object) {

            dropPNG()
        }
    })



}
function dropPNG() {
    $(".paper").droppable({

        accept: ".pngDiv",
        drop: function (event, ui) {
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
        cursorAt: [0, 0],
        appendTo: ".paper",
        cursor: "move"


    });

    $('.resized').resizable({ autoHide: true });
}

function create() {
    id = "#image" + numCountFile.count
    console.log(id);

    $('.imgBox').draggable({

        cursorAt: { left: 5, top: 5 },
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
        drop: function (event, ui) {
            console.log(this);

            var item = $(ui.draggable).clone().removeClass().addClass("dropped").addClass("resized");

            $(this).append(item);
            drop()
        }
    })

    // $(id).resizable()


}

function drop() {


    $('.dropped').draggable({
        distance: 0,
        cursorAt: [0, 0],
        appendTo: ".paper",
        cursor: "move"
        // helper: 'clone',
        // revert: "invalid", 
    });

    $('.resized').resizable({ autoHide: true });
    $('.textbox').resizable({ autoHide: true })

    $('#bin').droppable({
        disabled: true,
        tolerance: "pointer",

        over: function (event, ui) {
            ui.draggable.remove();
            console.log('delete!');
        }
    });


}

function forEdit(id) {

    $('#bold').unbind("click").click(function () {

        var bold = $(id).css("font-weight")

        if (bold == '700') {
            $(id).css("font-weight", "400")
        } else {
            $(id).css("font-weight", "700")
        }
    })

    $('#underline').unbind("click").click(function () {

        var underline = $(id).css("text-decoration")

        if (underline == 'none solid rgb(0, 0, 0)') {
            $(id).css("text-decoration", "underline");
        } else {
            $(id).css("text-decoration", "none solid rgb(0, 0, 0)");
        }
    })

    $('#italic').unbind("click").click(function () {

        var italic = $(id).css("font-style")
        console.log(italic);

        if (italic == 'italic') {
            $(id).css("font-style", "normal");
        } else {
            $(id).css("font-style", "italic");
        }
    })

    $('#left').unbind("click").click(function () {
        $(id).css("text-align", "left");
    })
    $('#mid').unbind("click").click(function () {
        $(id).css("text-align", "center");
    })
    $('#right').unbind("click").click(function () {
        $(id).css("text-align", "right");
    })

    $("#colorChoice").unbind("change").change(function () {
        $(id).css('color', $(this).val());
    });

    $("#textSize").unbind("change").change(function () {
        size = $(this).val()
        $(id).css('font-size', size + 'px');
    });

    $("#textFamily").unbind("change").change(function () {
        font = $(this).val()
        if (font == 'Charm') {
            $(id).css('font-family', "'Charm', cursive");
        } else if (font == 'Chonburi') {
            $(id).css('font-family', "'Chonburi', cursive");
        } else if (font == 'Kanit') {
            $(id).css('font-family', "'Kanit', sans-serif");
        } else if (font == 'Pattaya') {
            $(id).css('font-family', "'Pattaya', sans-serif");
        } else if (font == 'Sarabun') {
            $(id).css('font-family', "'Sarabun', sans-serif");
        } else if (font == 'Sriracha') {
            $(id).css('font-family', "'Sriracha', cursive");
        } else if (font == 'Thasadith') {
            $(id).css('font-family', "'Thasadith', sans-serif");
        }

    });

    $("#sortUp").unbind("click").click(function () {
        var number = parseInt($('#textSize').val(), 10)
        console.log(number);

        if (Number.isNaN(number)) { number = 5 }

        var size = number + 5
        $('#textSize').val(size)
        $(id).css('font-size', size + 'px');
    });

    $("#sortDown").unbind("click").click(function () {
        var size = $('#textSize').val() - 5
        $('#textSize').val(size)
        $(id).css('font-size', size + 'px');
    });
}
