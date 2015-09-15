/* 
 * Copyright (C) 2015 Hadi Mehrpouya <http://www.hadi.link>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var g_paper; //raphael paper
var g_width, g_heaight;  //screen width and height
var g_slider1;
var g_leftMargin, g_iconW, g_sliderW, g_numbersW, g_sliderH, g_sliderTopMargin;
var g_dataChanged = false;
var g_title = "Computer Science";
var g_lightTotal = 0, g_computerTotal = 0, g_projectorTotal = 0, g_heaterTotal = 0;
var g_lightTotalString = "0000000000", g_computerTotalString = "0000000000", g_projectorTotalString = "0000000000", g_heaterTotalString = "0000000000";
var g_lightSlider, g_projectorSlider, g_computerSlider, g_heaterSlider;
var g_subject = "computer science";
var g_subjectId = 1;
$(document).bind('mobileinit', function () {
    $.mobile.loadingMessage = false;
});


window.onload = function () {
    window.StatusBar && window.StatusBar.hide();
    $(".ui-loader").hide();
    detectPortrait("#mainView");
    $(".selector").loader("hide");
    $.mobile.loadingMessage = false;
    reset();
    loadData();
//    alert(localStorage.getItem("bar"));
};
$(window).bind("resize", function () {
    detectPortrait("#mainView");
    reset();
    initialise();
});
$(window).on("orientationchange", function (event) {
    reset();
    initialise();
});

function reset() {
    if (window.g_paper) {
        window.g_paper.clear();
        window.g_paper.remove();
    }
}
function initialise() {
//    screen.lockOrientation('landscape');
    $(".ui-loader").hide();
    window.g_width = $(window).width();
    window.g_height = $(window).height();
    window.g_leftMargin = g_width / 60;
    window.g_iconW = g_width / 10;
    window.g_iconH = g_height / 5;
    window.g_sliderW = 3 * g_width / 4 + 4 * window.g_leftMargin;

    window.g_numbersW = g_width / 10;
    window.g_sliderH = window.g_iconW / 2;
    window.g_sliderTopMargin = g_iconW / 4;




    window.g_paper = new Raphael('canvas_container');
    window.g_paper.setViewBox(0, 0, window.g_width, window.g_height, true);
    window.g_paper.setSize(window.g_width, window.g_height);

    window.g_paper.image("img/backgrounds/Detailview_body.png", 0, 0, window.g_width, window.g_height);





    var txt = window.g_paper.text(window.g_iconW + window.g_leftMargin, 4.5 * window.g_iconH / 5, "When was the energy source switched on?");
    txt.attr({'text-anchor': "start", "font-size": "10px","font-family":"TTRounds-Regular"});
    var t = window.g_paper.text(window.g_sliderW + window.g_iconW + 3 * window.g_leftMargin, 4.5 * window.g_iconH / 5, "Total");
    t.attr({'text-anchor': "star", "font-size": "14px","font-family":"TTRounds-Regular"});


//    g_paper.image("img/icons/lightBulb-icon.png",100,100,80,80);
//    var circle = g_paper.circle(100, 100, 80);
//    window.g_slider1 = new Slider(0, 100, 100, 100, "img/icons/lightBulb-icon.png", 40, 40, 0, 0);
    window.g_lightSlider = new Slider("light", "img/icons/lightBulb-subject-icon.png", window.g_iconW, window.g_iconW, 0, window.g_iconH, 0, 50, 5, 0);
    window.g_projectorSlider = new Slider("projector", "img/icons/projector-subject-Icon.png", window.g_iconW, window.g_iconW, 0, window.g_iconH * 2, 0, 50, 5, 0);
    window.g_computerSlider = new Slider("computer", "img/icons/computer-subject-icon.png", window.g_iconW, window.g_iconW, 0, window.g_iconH * 3, 0, 50, 5, 0);
    window.g_heaterSlider = new Slider("heater", "img/icons/heater-subject-Icon.png", window.g_iconW, window.g_iconW, 0, window.g_iconH * 4, 0, 50, 5, 0);
//    var circle = window.g_paper.rect(0, 0, window.g_width,window.g_height);
//    circle.attr({
//      "fill": "200-#f00:10-#100:400",
//      "fill-opacity": 0.1,
//      "opacity": 0.1
//    });
    window.g_paper.image("img/backgrounds/Detailview_head.png", 0, 0, window.g_width, 2 * window.g_iconH / 3);

    var titleHeading = window.g_paper.text(window.g_width / 2, window.g_iconH / 3, window.g_title);
    titleHeading.attr({'text-anchor': "middle", "font-size": "26px","font-family":"TTRounds-Regular"});
    titleHeading.node.onclick = function () {
        window.location = "weekView.html";
    }
//    var headLine = window.g_paper.path('M' + window.g_iconH / 3 + " " + (2 * window.g_iconH / 3) + "L" + (window.g_width - window.g_iconH / 3) + " " + (2 * window.g_iconH / 3));

//    var headLind = window.g_paper.path("M50 50L500 50 ");

//    headLine.attr({stroke: "#000"});
}


function Slider(_title, _icon, _iconW, _iconH, _x, _y, _min, _max, _interval, _value) {
//function Slider(_icon) {
    this.min = _min;
    this.max = _max;
    this.interval = _interval;
    this.startX = _x;
    this.startY = _y;
    this.val = _value;
    this.iconSrc = _icon;
    this.iconW = _iconW;
    this.iconH = _iconH;
    this.title = _title;
    var s = "0000000000";
    if (this.title === "light") {
        this.total = window.g_paper.text(window.g_sliderW + window.g_iconW + 3 * window.g_leftMargin, this.startY + window.g_sliderH / 2 + window.g_sliderTopMargin, g_lightTotal);
        s = window.g_lightTotalString;
    }
    else if (this.title === "computer") {
        this.total = window.g_paper.text(window.g_sliderW + window.g_iconW + 3 * window.g_leftMargin, this.startY + window.g_sliderH / 2 + window.g_sliderTopMargin, g_computerTotal);
        s = window.g_computerTotalString;
    }
    else if (this.title === "projector") {
        this.total = window.g_paper.text(window.g_sliderW + window.g_iconW + 3 * window.g_leftMargin, this.startY + window.g_sliderH / 2 + window.g_sliderTopMargin, g_projectorTotal);
        s = window.g_projectorTotalString;
    }
    else if (this.title === "heater") {
        this.total = window.g_paper.text(window.g_sliderW + window.g_iconW + 3 * window.g_leftMargin, this.startY + window.g_sliderH / 2 + window.g_sliderTopMargin, g_heaterTotal);
        s = window.g_heaterTotalString;
    }
    this.total.attr({'text-anchor': "middle", "font-size": "18px","font-family":"TTRounds-Regular"});
    this.iconImage = window.g_paper.image(this.iconSrc, window.g_leftMargin/2 + this.startX, this.startY, this.iconW, this.iconW);
    var sliderSteps = (this.max - this.min) / this.interval;
    var stepsWidth = window.g_sliderW / sliderSteps;
    var startSliderX = this.startX + window.g_iconW + window.g_leftMargin;
    var status = false;
    console.log(s);
    for (var i = 0; i < sliderSteps; i++) {
        status = s.charAt(i) === "1" ? true : false;
        console.log(status);
        var sliderBtn = new SliderSection(startSliderX, this.startY + g_sliderTopMargin, stepsWidth, window.g_sliderH, status, _title + i, _title, i);
        /*
         * TODO:
         * Move the numbers of the buttons into the sliderbtn so they can be grouped with the button for onclick event.
         */
        if ((i + 1) % 3 === 0) {
            var t = window.g_paper.text(startSliderX + stepsWidth - 5, this.startY + window.g_sliderH / 2 + g_sliderTopMargin, (i + 1) * 5);
            t.attr({'text-anchor': "end", "font-size": "14px","font-family":"TTRounds-Regular"});
        }
        startSliderX += stepsWidth;
    }
}

Slider.prototype.updateTotal = function (_val) {
    console.log(this.title);
    if (this.title === "light") {
        this.total.remove();
        window.g_lightTotal += _val;
        this.total = window.g_paper.text(window.g_sliderW + window.g_iconW + 3 * window.g_leftMargin, this.startY + window.g_sliderH / 2 + window.g_sliderTopMargin, window.g_lightTotal);
    }
    else if (this.title === "computer") {
        this.total.remove();
        window.g_computerTotal += _val;
        this.total = window.g_paper.text(window.g_sliderW + window.g_iconW + 3 * window.g_leftMargin, this.startY + window.g_sliderH / 2 + window.g_sliderTopMargin, window.g_computerTotal);
    }
    else if (this.title === "projector") {
        this.total.remove();
        window.g_projectorTotal += _val;
        this.total = window.g_paper.text(window.g_sliderW + window.g_iconW + 3 * window.g_leftMargin, this.startY + window.g_sliderH / 2 + window.g_sliderTopMargin, window.g_projectorTotal);
    }
    else if (this.title === "heater") {
        this.total.remove();
        window.g_heaterTotal += _val;
        this.total = window.g_paper.text(window.g_sliderW + window.g_iconW + 3 * window.g_leftMargin, this.startY + window.g_sliderH / 2 + window.g_sliderTopMargin, window.g_heaterTotal);
    }
    this.total.attr({'text-anchor': "middle", "font-size": "18px"});
};

function SliderSection(_x, _y, _w, _h, _status, _id, _parent, _index) {
    this.w = _w;
    this.h = _h;
    this.x = _x;
    this.y = _y;
    this.status = _status;
    this.btnId = _id;
    this.sliderBtn = window.g_paper.rect(this.x, this.y, this.w, this.h);
    this.sliderBtn.attr({stroke: "#000", fill: this.status ? "#f00" : "#fff", 'stroke-dasharray': "-"});
    this.sliderBtn.node.id = _id;
    this.sliderBtn.node.parent = _parent;
    this.sliderBtn.node.status = this.status;
    this.sliderBtn.node.myX = this.x;
    this.sliderBtn.node.myY = this.y;
    this.sliderBtn.node.index = _index;
    this.sliderBtn.node.onclick = function () {
        localStorage.setItem("bar", "foo");
        console.log(this.parent);
        this.status = !this.status;
        this.setAttribute("fill", this.status ? "#f00" : "#fff");
        var val = this.status ? 5 : -5;
        switch (this.parent) {
            case "light":
                window.g_lightSlider.updateTotal(val);
                window.g_lightTotalString = window.g_lightTotalString.replaceAt(this.index, this.status ? "1" : "0");
                break;
            case "heater":
                window.g_heaterSlider.updateTotal(val);
                window.g_heaterTotalString = window.g_heaterTotalString.replaceAt(this.index, this.status ? "1" : "0");
                break;
            case "projector":
                window.g_projectorSlider.updateTotal(val);
                window.g_projectorTotalString = window.g_projectorTotalString.replaceAt(this.index, this.status ? "1" : "0");
                break;
            case "computer":
                window.g_computerSlider.updateTotal(val);
                window.g_computerTotalString=g_computerTotalString.replaceAt(this.index, this.status ? "1" : "0");
                console.log(g_computerTotalString);
                break;
        }
        
        updateDB();
    };
    this.sliderBtn.dblclick(function () {
        alert("double clike");
    });
}

function detectPortrait(mainDiv) {
    if (screen.width < screen.height) {
        $(mainDiv).addClass("portrait_mode");
    }
    else {
        $(mainDiv).removeClass("portrait_mode");
    }
}
function loadData() {
    var url = "http://www.learningenergy.eca.ed.ac.uk/appGetSubjectData.php";
    $.get(url,
            {
                id: g_subjectId
            })
            .always(function (data) {
                window.g_projectorTotal = parseInt(data[0].projector);
                window.g_computerTotal = parseInt(data[0].computer);
                window.g_lightTotal = parseInt(data[0].light);
                window.g_heaterTotal = parseInt(data[0].heater);
                window.g_projectorTotalString = data[0].projectorString;
                window.g_computerTotalString = data[0].computerString;
                window.g_lightTotalString = data[0].lightString;
                window.g_heaterTotalString = data[0].heaterString;
                initialise();
            });

}

function updateDB() {
//    $.put('http://www.learningenergy.eca.ed.ac.uk/backend/app_data/edit/1', {"light":g_lightTotal,
//       "computer":g_computerTotal,
//       "heater":g_heaterTotal,
//       "projector":g_projectorTotal}, function(result){
//   console.log(result);
//});
    var url = "http://www.learningenergy.eca.ed.ac.uk/updateAppData.php";
    $.post(url,
            {
                light: g_lightTotal,
                computer: g_computerTotal,
                heater: g_heaterTotal,
                projector: g_projectorTotal,
                lightString: window.g_lightTotalString,
                computerString: window.g_computerTotalString,
                heaterString: window.g_heaterTotalString,
                projectorString: window.g_projectorTotalString
            })
            .always(function (data) {
                console.log(data);
            });
//    $.ajax({
//        url: 'http://www.learningenergy.eca.ed.ac.uk/backend/app_data/view/1',
//        type: 'PUT',
//        dataType:"json",
//        data: {"light": g_lightTotal,
//            "computer": g_computerTotal,
//            "heater": g_heaterTotal,
//            "projector": g_projectorTotal},
//        success: function (response) {
//            console.log(response);
//        },
//        error: function (xhr, textStatus, errorThrown) {
//            console.log(textStatus,errorThrown,xhr);
//        }
//    });
//$.ajax({
//        url: 'http://www.learningenergy.eca.ed.ac.uk/backend/app_data/view/1',
//        type: 'GET',
//        dataType:"json",
//        success: function (response) {
//            alert(response);
//        },
//        error: function (xhr, textStatus, errorThrown) {
//            console.log(textStatus,errorThrown,xhr);
//        }
//    });
}


jQuery.each(["put", "delete"], function (i, method) {
    jQuery[ method ] = function (url, data, callback, type) {
        if (jQuery.isFunction(data)) {
            type = type || callback;
            callback = data;
            data = undefined;
        }

        return jQuery.ajax({
            url: url,
            type: method,
            dataType: type,
            data: data,
            always: callback
        });
    };
});

String.prototype.replaceAt = function (index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
};