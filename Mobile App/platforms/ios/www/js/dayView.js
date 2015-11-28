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
var g_adding = false;
var g_status = "add";
var g_colors = ["#fff", "#004A73", "#04757F", "#00A66E", "#A8D063", "#F5F199", "#EB9663", "#E5646B", "#ED1553", "#AA2951"];
$(document).bind('mobileinit', function () {
    $.mobile.loadingMessage = false;
});
$(function () {
    FastClick.attach(document.body);
    $("#dayViewPopup").bind('click', function () {
        $("#dayViewPopup").fadeOut("slow");
    });
    $("#dvpBody").bind('click', function () {
        event.stopPropagation();
    });
    $("#addSubject").bind('click', function () {
      /*
      TODO:
      Add pop up window when the user tries to add more than 7 subjects so they know the maximum is 7
      */
        if ((!window.g_adding) && g_numberOfSubjects<7) {
            window.g_adding = true;
            var r = window.g_heightUnit / 3;
            var w = window.g_width - 2 * window.g_leftMargin - 2 * window.g_elementMargin - 2 * r;
            var h = window.g_heightUnit - window.g_topMargin;
            var top = window.g_lastHeight + r + window.g_topMargin;
            var inputLeft=window.g_leftMargin + 2 * window.g_elementMargin + 2 * r;
            var tickLeft = inputLeft + w - r - 5;
            var crossLeft = window.g_leftMargin + window.g_elementMargin - (h-r) / 2;
            var tempItem = $("<img src='img/icons/tick-icon.png' id='tempOK' \n\
                style='position: absolute; z-index: 1999;  top: " + (top+5) + "px;   \n\
                left: " + (tickLeft-30) + "px; height: 40px; border-radius:5px; cursor:pointer;   '>\n\
                <img src='img/icons/cross-icon.png' id='tempDelete' \n\
                style='position: absolute; z-index: 1999;  top: " + (top+5 ) + "px;   \n\
                left: " + (crossLeft) + "px; height: 40px; border-radius:5px;  cursor:pointer;'>\n\
                <input type='text' id='tempText' placeholder='Class name' style='height:40px; position: absolute; \n\
                z-index: 999;  top: " + (top) + "px;   left: " + (inputLeft) + "px; \n\
                width: " + (w - r - 5) + "px; border-radius:5px;   padding: " + 13 + "px; font-size:20px; appearance: none;  box-shadow: none;   outline: none; border-style: none;'>").hide();
            $("#canvas_container").append(tempItem);
            tempItem.fadeIn("slow");

            $("#tempOK").bind("click", okClicked).hide();
            $("#tempText").bind("keyup", tempTextChanged);
            $("#tempDelete").bind("click", cancelClicked);
        }
    });
    $("#okButton").bind('click', function () {
        okClicked();
    });
    $("#lessonName").keyup(function (e) {
        if (e.which === 13) {
            okClicked();
        }
    });
});

function tempTextChanged() {
    if ($(this).val().length > 0)
        $("#tempOK").fadeIn();
    else
        $("#tempOK").hide();
}
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
    window.g_heightUnit = window.g_height / 10;
    window.g_topMargin = window.g_heightUnit / 10;
    window.g_dayRadius = Math.min(window.g_width / 9, window.g_heightUnit < 70 ? 10 : window.g_heightUnit - 50);
    window.g_leftMargin = window.g_width / 20;
    window.g_currDate = localStorage.getItem("currentDate");
    window.g_studentUID = localStorage.getItem("studentId");
    window.g_title = localStorage.getItem("currentDay").toUpperCase();
    window.g_elementMargin = window.g_width / 40;
    window.g_paper = new Raphael('canvas_container');
    window.g_paper.customAttributes.arc = archFn;
    window.g_paper.setViewBox(0, 0, window.g_width, window.g_height, true);
    window.g_paper.setSize(window.g_width, window.g_height);
    window.g_paper.image("img/backgrounds/Timetable_Green.png", 0, 0, window.g_width, window.g_height);
    var titleHeading = window.g_paper.text(window.g_width / 2, window.g_heightUnit / 2, window.g_title);
    titleHeading.attr({'text-anchor': "middle", "font-size": "26px", "fill": "#fff", "font-family": "TTRounds-Bold"});
    var homeIcon = window.g_paper.image("img/icons/home-icon.png", window.g_width - window.g_heightUnit / 2 - 10, window.g_heightUnit / 4, window.g_heightUnit / 2, window.g_heightUnit / 2);
    homeIcon.node.setAttribute("class", "donthighlight pointerCursor");
    homeIcon.node.id = "homeIcon";
    $("#homeIcon").bind('click', function () {
        window.location = "weekView.html";
    });
    var helpIcon = window.g_paper.image("img/icons/pencil-icon-white.png", 10, window.g_heightUnit / 4, window.g_heightUnit / 2, window.g_heightUnit / 2);
    helpIcon.node.setAttribute("class", "donthighlight pointerCursor");
    helpIcon.node.id = "helpIcon";
    $("#helpIcon").bind('click', function () {
      if(g_numberOfSubjects>0){
        window.location = "editDay.html";}
    });
//    homeIcon.node.parent = _id;
    var headLine = window.g_paper.path('M' + 10 + " " + window.g_heightUnit + "L" + (window.g_width - 10) + " " + window.g_heightUnit);
    headLine.attr({"stroke": "#fff", "stroke-opacity": .4, "stroke-width": 1});
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
var g_lastHeight;
var g_numberOfSubjects=0;
function loadSubjects() {
    var url = "http://www.learningenergy.eca.ed.ac.uk/appGetClassList.php";
    $.get(url,
            {
                id: window.g_studentUID,
                date: window.g_currDate
            })
            .always(function (data) {
                var r = window.g_heightUnit / 3;
                var w = window.g_width - 2 * window.g_leftMargin - 2 * window.g_elementMargin - 2 * r;
                var h = window.g_heightUnit - window.g_topMargin;
                for (var i = 0; i < data.length; i++) {
                  g_numberOfSubjects+=1;
                    var sub = new Subject(window.g_leftMargin + window.g_elementMargin, window.g_heightUnit * (i + 1) + window.g_topMargin * 4, r, w, h, (i + 1), data[i].id, data[i].title, parseInt(data[i].total));
                }
                window.g_lastHeight = window.g_heightUnit * (data.length + 1);
            });
}
//A class that keeps the attributes for each day. It has onclick event.
function Subject(_x, _y, _r, _w, _h, _num, _id, _title, _total) {
    this.id = _id;
    this.title = _title;
    this.total = _total;
    this.x = _x;
    this.y = _y;
    this.subjectCircle = window.g_paper.circle(this.x, this.y + _r + window.g_topMargin, _r);
    this.subjectCircle.attr({stroke: "#FFF", "stroke-width": 3, fill: "#333", "fill-opacity": 0, "stroke-opacity": .7});
    var subjectHeading = window.g_paper.text(this.x, this.y + _r + window.g_topMargin, _num);
    subjectHeading.attr({'text-anchor': "middle", "font-size": "20px", "fill": "#fff", "font-family": "TTRounds-Regular"});
    subjectHeading.node.setAttribute("class", "donthighlight");
    var recX = this.x + 2 * _r + window.g_elementMargin;
    this.subjectBtn = window.g_paper.rect(recX, this.y, _w, _h - window.g_topMargin, 5);
    this.subjectBtn.hover(hoverIn, hoverOut, this.subjectBtn, this.subjectBtn);
    this.subjectBtn.attr({stroke: "#FFF", "stroke-width": 2, fill: "#fff", "fill-opacity": 1, "stroke-opacity": .7}).node.setAttribute("class", "donthighlight pointerCursor");
    this.subjectBtn.node.id = "subject" + _id;
    this.subjectBtn.node.parent = _id;
    var titleHeading = window.g_paper.text(recX + 2 * window.g_elementMargin, this.y - 4 + _h / 2, this.title);
    titleHeading.attr({'text-anchor': "start", "font-size": "20px", "fill": "#000", "font-family": "TTRounds-Regular"});
    titleHeading.node.setAttribute("class", "donthighlight pointerCursor");
    titleHeading.node.id = "subject" + _id + "_text";
    titleHeading.node.parent = _id;
    var rightArrow = window.g_paper.image("img/icons/arrow-right-icon.png", recX + _w - _h / 1.7, this.y + _h / 5, _h / 3, _h / 2);
    rightArrow.node.setAttribute("class", "donthighlight pointerCursor");
    rightArrow.node.id = "subject" + _id + "_arrow";
    rightArrow.node.parent = _id;
    $("#subject" + _id).bind('click', subjectClicked);
    $("#subject" + _id + "_arrow").bind('click', subjectClicked);
    $("#subject" + _id + "_text").bind('click', subjectClicked);
    $("#subject" + _id).bind('touchstart', subjectTouchStart);
    $("#subject" + _id + "_arrow").bind('touchstart', subjectTouchStart);
    $("#subject" + _id + "_text").bind('touchstart', subjectTouchStart);
    var totalVal = map_range(this.total, 0, 180, 10, 790);
    var my_arc = window.g_paper.path().attr({
        "stroke": window.g_colors[Math.round(this.total / 20)],
        "stroke-width": 3,
        arc: [this.x, this.y + _r + window.g_topMargin, totalVal, 400, _r] // x, y, valore su, totale, raggio
    });
}
function subjectDeleteClicked() {
    var url = "http://www.learningenergy.eca.ed.ac.uk/appAddUpdateSubject.php";
    console.log(this.parent);
    var dataToBeSent = {
        update: 'delete',
        id: this.parent
    };
    $.post(url, dataToBeSent)
            .success(function (data) {
                window.location = "dayView.html";
            }
            );
}
function cancelClicked() {
    window.g_adding = false;
    $("#tempDelete").fadeOut("slow").remove();
    $("#tempOK").fadeOut("slow").remove();
    $("#tempText").fadeOut("slow").remove();
}
function okClicked() {
    window.g_adding = false;
    if (window.g_status === "edit") {

    }
    else {
        $("#tempDelete").remove();
        $("#tempOK").attr("src", "img/icons/loader.gif");
        var url = "http://www.learningenergy.eca.ed.ac.uk/appAddUpdateSubject.php";
        var uId = window.g_studentUID;
        console.log(uId, window.g_currDate);
        var dataToBeSent = {
            userId: uId,
            update: false,
            subject: $("#tempText").val(),
            date: window.g_currDate
        };
        $.post(url, dataToBeSent)
                .success(function (data) {
                    console.log(data);
                    $("#tempDelete").fadeOut("slow").remove();
                    $("#tempOK").fadeOut("slow").remove();
                    $("#tempText").fadeOut("slow").remove();
                    window.location = "dayView.html";
                }
                );
    }
}
function subjectEditClicked() {
    console.log("edit clicked!");
}
function subjectTouchStart() {
    $("#subject" + this.parent).attr({"fill": "#eee"});
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

var hoverIn = function () {
    this.attr({"fill": "#eee"});
    this.attr({"fill-opacity": 0});
    $("#subject" + this.node.parent + "_arrow").attr("src", "");
};

var hoverOut = function () {
    this.attr({"fill": "#FFF"});
    this.attr({"fill-opacity": 1});
};
