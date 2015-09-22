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
var g_width, g_height;  //screen width and height
var g_title = "Tuesday";
var g_heightUnit;
var g_studentUID = "1";
var g_currDate;
var g_dayRadius;
var g_leftMargin;
var g_topMargin, g_elementMargin;
var g_colors = ["#fff", "#004A73", "#04757F", "#00A66E", "#A8D063", "#F5F199", "#EB9663", "#E5646B", "#ED1553", "#AA2951"];
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
    $(".ui-loader").hide();
    window.g_width = $(window).width();
    window.g_height = $(window).height();
    window.g_heightUnit = window.g_height / 8;
    window.g_topMargin = window.g_heightUnit / 10;
    window.g_dayRadius = Math.min(window.g_width / 9, window.g_heightUnit < 70 ? 10 : window.g_heightUnit - 50);
    window.g_leftMargin = window.g_width / 20;
    window.g_currDate = localStorage.getItem("currentDate");
    window.g_title = localStorage.getItem("currentDay").toUpperCase();
    console.log(window.g_title,"asassssssssssssssssss");
    window.g_elementMargin = window.g_width / 40;

    window.g_paper = new Raphael('canvas_container');
    window.g_paper.customAttributes.arc = archFn;
    window.g_paper.setViewBox(0, 0, window.g_width, window.g_height, true);
    window.g_paper.setSize(window.g_width, window.g_height);
    window.g_paper.image("img/backgrounds/Timetable_Green.png", 0, 0, window.g_width, window.g_height);


    var titleHeading = window.g_paper.text(window.g_width / 2, window.g_heightUnit / 2, window.g_title);
    titleHeading.attr({'text-anchor': "middle", "font-size": "26px","fill":"#fff"});
    var homeIcon = window.g_paper.image("img/icons/home-icon.png", window.g_width-window.g_heightUnit , window.g_heightUnit / 4, window.g_heightUnit / 2, window.g_heightUnit / 2);
    homeIcon.node.setAttribute("class", "donthighlight pointerCursor");
    homeIcon.node.id = "homeIcon";
    $("#homeIcon").bind('touchstart click', function(){
        window.location = "weekView.html";
    });
//    homeIcon.node.parent = _id;
    var headLine = window.g_paper.path('M' + window.g_leftMargin + " " + window.g_heightUnit + "L" + (window.g_width - window.g_leftMargin) + " " + window.g_heightUnit);
    headLine.attr({"fill":"#fff","stroke": "#FFF", "stroke-width": 2});
    loadSubjects();
}


function detectPortrait(mainDiv) {
    if (screen.width < screen.height) {
        $(mainDiv).addClass("portrait_mode");
    }
    else {
        $(mainDiv).removeClass("portrait_mode");
    }
}


function loadSubjects() {
    var url = "http://www.learningenergy.eca.ed.ac.uk/appGetClassList.php";
    $.get(url,
            {
                id: window.g_studentUID,
                date: window.g_currDate
            })
            .always(function (data) {
                console.log(data);
                var r = window.g_heightUnit / 3;
                var w = window.g_width - 2 * window.g_leftMargin - 2 * window.g_elementMargin - 2 * r;
                var h = window.g_heightUnit - window.g_topMargin;
                for (var i = 0; i < data.length; i++) {
//                    console.log(data[i]);
                    var sub = new Subject(window.g_leftMargin + window.g_elementMargin, window.g_heightUnit * (i + 1) + window.g_topMargin * 4, r, w, h, (i + 1), data[i].id, data[i].title, parseInt(data[i].total));
                }
            });
}


//A class that keeps the attributes for each day. It has onclick event.
function Subject(_x, _y, _r, _w, _h, _num, _id, _title, _total) {

    this.id = _id;
    this.title = _title;
    this.total = _total;
    this.x = _x;
    this.y = _y;

    this.subjectCircle = window.g_paper.circle(this.x + _r, this.y + _r + window.g_topMargin, _r);
    this.subjectCircle.attr({stroke: "#FFF", "stroke-width": 2, fill: "#333", "fill-opacity": .1, "stroke-opacity": .7});
    var subjectHeading = window.g_paper.text(this.x + _r, this.y + _r+ window.g_topMargin, _num);
    subjectHeading.attr({'text-anchor': "middle", "font-size": "20px", "fill": "#000", "font-family": "TTRounds-Regular"});
     subjectHeading.node.setAttribute("class", "donthighlight");
    var recX = this.x + 2 * _r + window.g_elementMargin;
    this.subjectBtn = window.g_paper.rect(recX, this.y, _w, _h, 5);
    this.subjectBtn.attr({stroke: "#FFF", "stroke-width": 2, fill: "#fff", "fill-opacity": 1, "stroke-opacity": .7}).node.setAttribute("class", "donthighlight pointerCursor");
    ;
    this.subjectBtn.node.id = "subject" + _id;
    this.subjectBtn.node.parent = _id;
    var titleHeading = window.g_paper.text(recX + 2 * window.g_elementMargin, this.y + _h / 2, this.title);
    titleHeading.attr({'text-anchor': "start", "font-size": "20px", "fill": "#000", "font-family": "TTRounds-Regular"});
    titleHeading.node.setAttribute("class", "donthighlight pointerCursor");
    titleHeading.node.id = "subject" + _id + "_text";
    titleHeading.node.parent = _id;
    var rightArrow = window.g_paper.image("img/icons/rightArrow.png", recX + _w - _h / 2, this.y + _h / 4, _h / 2, _h / 2);
    rightArrow.node.setAttribute("class", "donthighlight pointerCursor");
    rightArrow.node.id = "subject" + _id + "_arrow";
    rightArrow.node.parent = _id;
    $("#subject" + _id).bind('touchstart click', subjectClicked);
    $("#subject" + _id + "_arrow").bind('touchstart click', subjectClicked);
    $("#subject" + _id + "_text").bind('touchstart click', subjectClicked);
    var totalVal = map_range(this.total,0,180,10,790);
//    console.log(this.total/20,window.g_colors[this.total/20]);
    var my_arc = window.g_paper.path().attr({
        "stroke": window.g_colors[Math.round(this.total/20)]  ,
        "stroke-width": 4,
        arc: [this.x + _r, this.y + _r + window.g_topMargin,totalVal, 400, _r] // x, y, valore su, totale, raggio
    });
    console.log(my_arc);
}
function subjectClicked() {
    localStorage.setItem("subjectView", this.parent);
    window.location = "subjectView.html";
}

var archFn = function (xloc, yloc, value, total, R) {
    var alpha = 180 / total * value,
            a = (90 - alpha) * Math.PI / 180,
            x = xloc + R * Math.cos(a),
            y = yloc - R * Math.sin(a),
            path;
    path = [
        ["M", xloc, yloc - R],
        ["A", R, R, 0, +(alpha > 180), 1, x, y] // 
    ];
    return {
        path: path
    };
};


function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}