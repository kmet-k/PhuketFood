var menu = [];
var type = [];
var meat = [];
var text;
$(document).ready(function () {
    menu = JSON.parse(localStorage.getItem("menu"));
    type = JSON.parse(localStorage.getItem("type"));
    meat = JSON.parse(localStorage.getItem("meat"));
    text = localStorage.getItem("text");
    console.log(menu)
    console.log(type)
    console.log(meat)
    console.log(text)

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



            $("#cardResult").append(object);




        });


    }
})

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
        $("#type").empty();
        if (type == "t_001") {
            $("#type").append("Soup");
        } else if (type == "t_002") {
            $("#type").append("Noodle");
        } else if (type == "t_003") {
            $("#type").append("Cold dishes");
        } else if (type == "t_004") {
            $("#type").append("Rice");
        } else if (type == "t_005") {
            $("#type").append("Curry");
        } else if (type == "t_006") {
            $("#type").append("Barbecue");
        } else if (type == "t_007") {
            $("#type").append("Stir-fry");
        } else if (type == "t_008") {
            $("#type").append("Fried");
        } else if (type == "t_009") {
            $("#type").append("Dessert and snack");
        } else if (type == "t_010") {
            $("#type").append("Beverage");
        } else if (type == "t_011") {
            $("#type").append("Fruit");
        }
    } else if (type == "t_012") {
        $("#type").empty();
        $("#type").append("Other types");
    }
    
    $("#meatModal").show();
    if (meat == "m_001") {
        $("#meatModal").css("background-image", "url('img/pig.png')")
    } else if (meat == "m_002") {
        $("#meatModal").css("background-image", "url('img/chicken.png')")
    } else if (meat == "m_003") {
        $("#meatModal").css("background-image", "url('img/cow.png')")
    } else if (meat == "m_004") {
        $("#meatModal").css("background-image", "url('img/fish.png')")
    } else if (meat == "m_005") {
        $("#meatModal").css("background-image", "url('img/shrimp.png')")
    } else if (meat == "m_006") {
        $("#meatModal").css("background-image", "url('img/crab.png')")
    } else if (meat == "m_007") {
        $("#meatModal").css("background-image", "url('img/shellfish.png')")
    } else if (meat == "m_008") {
        $("#meatModal").css("background-image", "url('img/squid.png')")
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
        window.open('res_information.html')
    });

}