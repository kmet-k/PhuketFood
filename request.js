

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
    $(".gallery").hide()
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


    var imagesPreview = function (input, placeToInsertImagePreview) {
        if (input.files) {
            var filesAmount = input.files.length;
            for (i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = function (event) {
                    $(".gallery").empty()

                    $(".gallery").show()

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

function sumbit() {
    var img = getImg()
    var chinese = document.getElementById("inputChinese").value;
    var eng = document.getElementById("inputEng").value;
    var thai = document.getElementById("inputThai").value;
    var type = $("#typeSelect :selected").val()
    var meat = $("#meatSelect :selected").val()
    $("#maincard").hide()
    var loading = `
    <div class="col-lg-10 col-xl-9 mx-auto" id="loading">
        <div id="registercard">
            <div class="card card-signin flex-row my-5">
                <div class="card-body">
                    <h5 class="card-title text-center"><b>Saving . . . . . </b></h5>
                    <div id="loadingIMG" style="text-align:center">
                        <img src="https://thumbs.gfycat.com/AcceptablePerfumedIraniangroundjay-small.gif" style="width: 10%;">
                    </div>
                </div>
            </div>
        </div>
    </div>`

    $(".row").append(loading)
    db.collection("request").get().then(snap => {
        size = snap.size
        console.log("requestID" + size);
        setId("requestID" + size)
    }).then(function () {
        $("#loading").hide()
        var id = getId()
        console.log(id);
        db.collection("request").add({
            chinese_Name: chinese,
            english_Name: eng,
            thai_Name: thai,
            id_Type: type,
            id_Meat: meat,
            picture: img
        }).then(function() {
            console.log("Document successfully written!");
            var success = `
        <div class="col-lg-10 col-xl-9 mx-auto">
            <div id="registercard">
                <div class="card card-signin flex-row my-5">
                    <div class="card-body">
                        <h5 class="card-title text-center"><b>Request Success</b></h5>
                        <button class="btn btn-lg btn-info btn-block text-uppercase requestBottom" type="submit" onclick="closeWindow()" >close</button>
                    </div>
                </div>
            </div>
        </div>`

        $(".row").append(success)

        })
        
        
    })


}

function closeWindow() {
    close();
}



