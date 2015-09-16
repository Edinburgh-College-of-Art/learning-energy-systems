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
var g_daysLeftMargin, g_daysTopMargin, g_headerHeight, g_daysRadius, g_daysHeight;
var g_dataChanged = false;
var g_title = "WEEK";
var g_total, g_projectorTotal = 3, g_computerTotal = 2, g_heaterTotal = 10, g_lightTotal = 5;
var g_monday, g_tuesday, g_wednesday, g_thursday, g_friday;
var g_monT, g_tueT, g_wedT, g_thurT, g_friT;
var g_daysYScale = 5;

$(document).bind('mobileinit', function () {
    $.mobile.loadingMessage = false;
});
window.onload = function () {
    $.event.special.swipe.durationThreshold = 1000;
    reset();
    initialise();
};
$(window).bind("resize", function () {
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
    window.g_width = $(window).width();
    window.g_height = $(window).height();
    window.g_total = Math.floor(Math.random() * 20);

    window.g_headerHeight = window.g_height / 10;

    window.g_daysHeight = window.g_height / 10;
    window.g_daysTopMargin = window.g_daysHeight / 5;
    window.g_daysRadius = window.g_daysHeight - 5 * window.g_daysHeight / 7;

    window.g_daysLeftMargin = (window.g_width - (window.g_daysRadius * 5 + (window.g_daysRadius * 4 / 3))) / 5;
    window.g_daysMargin = (window.g_width - window.g_daysLeftMargin * 4 - window.g_daysRadius * 5) / 2;
    g_monT = Math.floor(Math.random() * 300);
    g_tueT = Math.floor(Math.random() * 300);
    g_wedT = Math.floor(Math.random() * 300);
    g_thurT = Math.floor(Math.random() * 300);
    g_friT = Math.floor(Math.random() * 300);


//var g_monday, g_tuesday, g_wednesday, g_thursday, g_friday; 
    window.g_paper = new Raphael('canvas_container');
    window.g_paper.setViewBox(0, 0, window.g_width, window.g_height, true);
    window.g_paper.setSize('100%', '100%');

    var rec = window.g_paper.image("img/backgrounds/" + (window.g_total - window.g_total % 2) + ".png", 0, 0, window.g_width, window.g_height);
    var titleHeading = window.g_paper.text(window.g_width / 2, window.g_headerHeight / 2, window.g_title);
    titleHeading.attr({'text-anchor': "middle", "font-size": "26px", "fill": "#fff","font-family":"TTRounds-Regular"});
   titleHeading .node.onclick = function () {
                           window.location = "index.html";
   }
    var headLine = window.g_paper.path('M' + 10 + " " + window.g_headerHeight + "L" + (window.g_width - 10) + " " + window.g_headerHeight);
    headLine.attr({"stroke": "#fff"});

    drawDays();
    drawConsumptions(Math.floor(Math.random() * 300) + 20, Math.floor(Math.random() * 300) + 20, Math.floor(Math.random() * 300) + 20, Math.floor(Math.random() * 300) + 20, window.g_total);
}

function drawDays() {
    var monX = window.g_daysMargin;
    var tueX = window.g_daysMargin + window.g_daysLeftMargin + window.g_daysRadius - window.g_daysRadius / 2;
    var wedX = window.g_daysMargin + window.g_daysLeftMargin * 2 + window.g_daysRadius * 2;
    var thurX = window.g_daysMargin + window.g_daysLeftMargin * 3 + window.g_daysRadius * 3
    var fridX = window.g_daysMargin + window.g_daysLeftMargin * 4 + window.g_daysRadius * 4;
    var monY = window.g_headerHeight + window.g_daysTopMargin * 4 + (150 - window.g_monT) / window.g_daysYScale;
    var tueY = window.g_daysTopMargin * 4 + window.g_headerHeight + (150 - window.g_tueT) / window.g_daysYScale;
    var wedY = window.g_daysTopMargin * 4 + window.g_headerHeight + (150 - window.g_wedT) / window.g_daysYScale;
    var thurY = window.g_daysTopMargin * 4 + window.g_headerHeight + (150 - window.g_thurT) / window.g_daysYScale;
    var fridY = window.g_daysTopMargin * 4 + window.g_headerHeight + (150 - window.g_friT) / window.g_daysYScale;

    drawLinesBetwDays(monX, monY, tueX, tueY, wedX, wedY, thurX, thurY, fridX, fridY);
    window.g_monday = new daySection(monX, monY, window.g_daysRadius, true, "M", "monday", window.g_monT);
    window.g_tuesday = new daySection(tueX, tueY, window.g_daysRadius, false, "T", "tuesday", window.g_tueT);
    window.g_wednesday = new daySection(wedX, wedY, window.g_daysRadius, true, "W", "wednesday", window.g_wedT);
    window.g_thursday = new daySection(thurX, thurY, window.g_daysRadius, false, "T", "thursday", window.g_thurT);
    window.g_friday = new daySection(fridX, fridY, window.g_daysRadius, false, "F", "friday", window.g_friT);
    var headLine = window.g_paper.path('M' + 10 + " " + (window.g_headerHeight + window.g_daysTopMargin * 8) + "L" + (window.g_width - 10) + " " + (window.g_headerHeight + window.g_daysTopMargin * 8));
    headLine.attr({"stroke": "#fff"});
}



function drawLinesBetwDays(_mx, _my, _tx, _ty, _wx, _wy, _thx, _thy, _fx, _fy) {
    var x = _mx, y = _my, x1 = _tx, y1 = _ty, x2 = _wx, y2 = _wy, x3 = _thx, y3 = _thy, x4 = _fx, y4 = _fy;
    console.log(x, y, x1, y1, x2, y2, x3, y3, x4, y4);
    var myPath = 'M' + x + " " + y +
            "L" + x1 + " " + y1 +
            "L" + x2 + " " + y2 +
            "L" + x3 + " " + y3 +
            "L" + x4 + " " + y4;
    console.log(myPath);
    var headLine = window.g_paper.path(myPath);
    headLine.attr({"stroke": "#fff"});
}


/*This function will draw the consumptions visualisation. 
 * it will get 5 inputs, projection time,
 *  computer use time, heater time, 
 *  lighting time and finaly total energy use
 *  The size of icons will indicate the amount of energy being used.
 *  */
function drawConsumptions(_p, _l, _c, _h, _t) {
    var topStuff = window.g_headerHeight + window.g_daysTopMargin * 8;
    var restOfHeight = window.g_height - topStuff;
    var centY = restOfHeight / 2 + topStuff;
    var circR = window.g_width / 10;
    var proj = window.g_paper.image("img/icons/projector-week-Icon.png", window.g_width / 5 - _p / 2, window.g_height / 2 - _p / 2, _p, _p);
    var comp = window.g_paper.image("img/icons/computer-week-Icon.png", 4 * window.g_width / 6 - _c / 2, window.g_height / 2 - _c / 2, _c, _c);
    var comp = window.g_paper.image("img/icons/lightBulb-week-icon.png", window.g_width / 5 - _l / 2, 4 * window.g_height / 5 - _l / 2, _l, _l);
    var comp = window.g_paper.image("img/icons/heater-week-Icon.png", 4 * window.g_width / 6 - _h / 2, 4 * window.g_height / 5 - _h / 2, _h, _h);
    var total = window.g_paper.circle(window.g_width / 2, centY, circR);
    var titleHeading = window.g_paper.text(window.g_width / 2, centY, _t);
    titleHeading.attr({'text-anchor': "middle", "font-size": "20px", "fill": "#000","font-family":"TTRounds-Regular"});
}


//A class that keeps the attributes for each day. It has onclick event.
function daySection(_x, _y, _r, _status, _title, _id, _total) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
//    this.y += (150 - _total) / window.g_daysYScale;
    this.dayBtn = window.g_paper.circle(this.x, this.y, this.r);
    this.dayBtn.node.status = _status;
    this.dayBtn.node.title = _title;
    this.dayBtn.node.id = _id;
    var titleHeading = window.g_paper.text(this.x, this.y, this.dayBtn.node.title);
    if (!_status) {
        this.dayBtn.attr({stroke: "#FFF", "stroke-width": 3, fill: "#333", "fill-opacity": 1, "stroke-opacity": 1});
        titleHeading.attr({'text-anchor': "middle", "font-size": "20px", "fill": "#fff","font-family":"TTRounds-Regular"});
    }
    else {
        this.dayBtn.attr({stroke: "#FFF", "stroke-width": 3, fill: "#fff", "fill-opacity": 1, "stroke-opacity": 1});
        titleHeading.attr({'text-anchor': "middle", "font-size": "20px", "fill": "#000","font-family":"TTRounds-Regular"});
    }

    titleHeading.node.setAttribute("class", "donthighlight");
    this.dayBtn.node.onclick = function () {

        this.status = !this.status;
        if (!this.status) {
            this.setAttribute("fill", "#333");
            this.setAttribute("stroke-opacity", 1);
            this.setAttribute("fill-opacity", 1);
        }
        else {
            this.setAttribute("fill-opacity", 1);
            this.setAttribute("fill", "#fff");
            this.setAttribute("stroke-opacity", 1);

        }
        console.log(this.status);
    };
}


daySection.prototype.getX = function () {
    return this.x;
};
daySection.prototype.getY = function () {
    return this.y;
};