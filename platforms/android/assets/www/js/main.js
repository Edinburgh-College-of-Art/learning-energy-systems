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
var g_lightTotal = 0, g_computerTotal = 10, g_projectorTotal = 5, g_heaterTotal = 0;
var g_lightSlider, g_projectorSlider, g_computerSlider, g_heaterSlider;
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
    initialise();
    alert(localStorage.getItem("bar"));
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
    window.g_width = Math.max($(window).width(),$(window).height());
    window.g_height = Math.min($(window).height(),$(window).width());
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
    txt.attr({'text-anchor': "start", "font-size": "10px"});
    var t = window.g_paper.text(window.g_sliderW + window.g_iconW + 3 * window.g_leftMargin, 4.5 * window.g_iconH / 5, "Total");
    t.attr({'text-anchor': "star", "font-size": "14px"});


//    g_paper.image("img/icons/lightBulb-icon.png",100,100,80,80);
//    var circle = g_paper.circle(100, 100, 80);
//    window.g_slider1 = new Slider(0, 100, 100, 100, "img/icons/lightBulb-icon.png", 40, 40, 0, 0);
    window.g_lightSlider = new Slider("light", "img/icons/lightBulb-icon.png", window.g_iconW, window.g_iconW, 0, window.g_iconH, 0, 50, 5, 0);
    window.g_projectorSlider = new Slider("projector", "img/icons/projector-Icon.png", window.g_iconW, window.g_iconW, 0, window.g_iconH * 2, 0, 50, 5, 0);
    window.g_computerSlider = new Slider("computer", "img/icons/computerIcon.png", window.g_iconW, window.g_iconW, 0, window.g_iconH * 3, 0, 50, 5, 0);
    window.g_heaterSlider = new Slider("heater", "img/icons/heaterIcon.png", window.g_iconW, window.g_iconW, 0, window.g_iconH * 4, 0, 50, 5, 0);
//    var circle = window.g_paper.rect(0, 0, window.g_width,window.g_height);
//    circle.attr({
//      "fill": "200-#f00:10-#100:400",
//      "fill-opacity": 0.1,
//      "opacity": 0.1
//    });
    window.g_paper.image("img/backgrounds/Detailview_head.png", 0, 0, window.g_width, 2 * window.g_iconH / 3);

    var titleHeading = window.g_paper.text(window.g_width / 2, window.g_iconH / 3, window.g_title);
    titleHeading.attr({'text-anchor': "middle", "font-size": "26px"});
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
    if (this.title === "light")
        this.total = window.g_paper.text(window.g_sliderW + window.g_iconW + 3 * window.g_leftMargin, this.startY + window.g_sliderH / 2 + window.g_sliderTopMargin, g_lightTotal);
    else if (this.title === "computer")
        this.total = window.g_paper.text(window.g_sliderW + window.g_iconW + 3 * window.g_leftMargin, this.startY + window.g_sliderH / 2 + window.g_sliderTopMargin, g_computerTotal);
    else if (this.title === "projector")
        this.total = window.g_paper.text(window.g_sliderW + window.g_iconW + 3 * window.g_leftMargin, this.startY + window.g_sliderH / 2 + window.g_sliderTopMargin, g_projectorTotal);
    else if (this.title === "heater")
        this.total = window.g_paper.text(window.g_sliderW + window.g_iconW + 3 * window.g_leftMargin, this.startY + window.g_sliderH / 2 + window.g_sliderTopMargin, g_heaterTotal);
    this.total.attr({'text-anchor': "middle", "font-size": "18px"});
    this.iconImage = window.g_paper.image(this.iconSrc, window.g_leftMargin + this.startX, this.startY, this.iconW, this.iconW);
    var sliderSteps = (this.max - this.min) / this.interval;
    var stepsWidth = window.g_sliderW / sliderSteps;
    var startSliderX = this.startX + window.g_iconW + window.g_leftMargin;
    for (var i = 0; i < sliderSteps; i++) {
        var sliderBtn = new SliderSection(startSliderX, this.startY + g_sliderTopMargin, stepsWidth, window.g_sliderH, false, _title + i, _title);
        if ((i + 1) % 3 === 0) {
            var t = window.g_paper.text(startSliderX + stepsWidth - 5, this.startY + window.g_sliderH / 2 + g_sliderTopMargin, (i + 1) * 5);
            t.attr({'text-anchor': "end", "font-size": "14px"});
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

function SliderSection(_x, _y, _w, _h, _status, _id, _parent) {
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
    this.sliderBtn.node.onclick = function () {
        localStorage.setItem("bar", "foo");
        console.log(this.parent);
        this.status = !this.status;
        this.setAttribute("fill", this.status ? "#f00" : "#fff");
        var val = this.status ? 5 : -5;
        switch (this.parent) {
            case "light":
                window.g_lightSlider.updateTotal(val);
                break;
            case "heater":
                window.g_heaterSlider.updateTotal(val);
                break;
            case "projector":
                window.g_projectorSlider.updateTotal(val);
                break;
            case "computer":
                window.g_computerSlider.updateTotal(val);
                break;
        }

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