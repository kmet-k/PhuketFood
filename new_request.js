

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
var img = "";
var setImg = function (input) {
    img = input
}
var getImg = function () {
    return img
}

var id = "";
var setId = function (input) {
    id = input
}
var getId = function () {
    return id
}

$(document).ready(function () {
    db.collection("type").orderBy("id_Type", "asc").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var option = `<option value="${doc.data().id_Type}">${doc.data().type}</option>`
            $('#typeSelect').append(option)
        });
    })

    db.collection("meat").orderBy("id_Meat", "asc").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var option = `<option value="${doc.data().id_Meat}">${doc.data().meat}</option>`
            $('#meatSelect').append(option)
        });
    })

    db.collection("request").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var id = doc.id
            console.log(id);
            console.log(doc.data().id_Meat);
            var card = `<div class="col col-3" style="margin-top:2%; ">
            <div class="card col-10" style=" margin:auto" data-toggle="modal" data-target="#showModal" onClick="createModal('${doc.data().chinese_Name}','${doc.data().english_Name}','${doc.data().thai_Name}','${doc.data().id_Type}','${doc.data().id_Meat}','${doc.data().picture}','${doc.id}')">
                <div class="card-body" style="padding-right:0px; padding-left:0px">
                    <div class="row">
                        <div class="col-9" style="text-align: left; font-size: 90%; border-bottom: 5px; color:grey; margin-top:0.5%;"
                            id="chinese_Name${id}">Chinese name</div>
                        <div class="col-9" style="text-align: left; font-size: 90%; border-bottom: 5px; color:grey; margin-top:0.5%;"
                            id="english_Name${id}">English name</div>
                        <div class="col-9" style="text-align: left; font-size: 90%; border-bottom: 5px; color:grey; margin-top:0.5%;"
                            id="thai_Name${id}">Thai name</div>
                    </div>
                    <div class="imgCard${id}">
                    </div>
                </div>
            </div>
        </div>`
            $('#cardResult').append(card)

            if (doc.data().chinese_Name !== "") {
                $('#chinese_Name' + id).empty()
                $('#chinese_Name' + id).css({ "color": "black", "font-weight": "bold" })
                $('#chinese_Name' + id).append(doc.data().chinese_Name)
            }
            if (doc.data().english_Name !== "") {
                $('#english_Name' + id).empty()
                $('#english_Name' + id).css({ "color": "black", "font-weight": "bold" })
                $('#english_Name' + id).append(doc.data().english_Name)
            }
            if (doc.data().thai_Name !== "") {
                $('#thai_Name' + doc.id).empty()
                $('#thai_Name' + doc.id).css({ "color": "black", "font-weight": "bold" })
                $('#thai_Name' + doc.id).append(doc.data().thai_Name)
            }
            var url = doc.data().picture
            if (url !== "") {
                $('.imgCard' + id).css({
                    "background-image": 'url("' + url + '")'
                    , "height": "200px"
                    , "background-size": "100% 100%"
                    , "margin-top": "3%"
                })
                console.log('he');
            }

        });
    })

    var imagesPreview = function (input, placeToInsertImagePreview) {
        if (input.files) {
            var filesAmount = input.files.length;
            for (i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = function (event) {
                    $(".gallery").empty()


                    var item = `<img src="${event.target.result}" class="imageGallery">`
                    setImg(event.target.result)
                    $(item).appendTo(".gallery");
                }
                reader.readAsDataURL(input.files[i]);
            }
        }
    };

    $('#addPhoto').on('change', function () {
        imagesPreview(this, 'div.gallery');
    });
})

function createModal(ch, en, th, type, meat, img, id) {
    $(".gallery").empty()
    $('input[name="Recommend"]').prop('checked', false);
    $('input[name="spicy"]').prop('checked', false);
    $("#inputChinese").val(ch)
    $("#inputEng").val(en)
    $("#inputThai").val(th)
    $("#typeSelect").val(type);
    console.log(meat);
    $("#meatSelect").val(meat);
    setImg(img)
    var img = `<img src="${img}" class="imageGallery">`
    $(img).appendTo(".gallery");
    setId(id)


}

function saveData() {
    var checkEng = false
    var checkChinese = true
    var checkThai = true
    var checkRec = true
    var checkSpicy = true
    var checkImg = true
    var eng = /^[A-Za-z ]+$/
    var img = getImg()
    var id = getId()
    var size = 0
    var chinese = document.getElementById("inputChinese").value;
    if (!(/^[\u4E00-\u9FA5]+$/).test(chinese) || !chinese) {
        alert("Check Chinese Name");
        checkChinese = false
    }
    console.log(checkChinese);

    var english = document.getElementById("inputEng").value;
    if (english.match(eng)) {
        checkEng = true
    } else {
        alert("Check English Name");
    }

    var thai = document.getElementById("inputThai").value;
    if (!(/^[ก-๏\s]+$/).test(thai) || !thai) {
        alert("Check Thai Name");
        checkThai = false
    }

    var type = $("#typeSelect :selected").val()
    var meat = $("#meatSelect :selected").val()
    var reccommend = $("input[name='Recommend']:checked").val();
    if (!reccommend) {
        alert("Check Reccommend");
        checkRec = false
    }
    var spicy = $("input[name='spicy']:checked").val();
    if (!spicy) {
        alert("Check spicy");
        checkSpicy = false
    }

    if (img == "") {
        alert("Check image");
        checkImg = false
    }

    if (checkEng == true && checkChinese == true && checkThai == true && checkRec == true && checkSpicy == true && checkImg == true) {
        db.collection("menu").get().then(snap => {
            size = snap.size
            console.log(size);
        }).then(function () {
            id_Menu = "m_" + (size + 1)

            db.collection("menu").add({
                chinese_Name: chinese,
                english_Name: english,
                thai_Name: thai,
                id_Type: type,
                id_Meat: meat,
                picture: img,
                reccommend: reccommend,
                spiciness: spicy,
                id_Menu: id_Menu
            }).then(function () {
                alert("Add to Database success");
                db.collection("request").doc(id).delete().then(function () {
                    console.log("Document successfully deleted!");
                }).then(function () {
                    location.reload()

                })
            })


        })
    }

}