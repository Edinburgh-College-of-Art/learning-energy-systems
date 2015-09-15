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
var g_title = "TODAY";
var g_heightUnit;
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
    window.g_paper = new Raphael('canvas_container');
    window.g_paper.setViewBox(0, 0, window.g_width, window.g_height, true);
    window.g_paper.setSize(window.g_width, window.g_height);
    window.g_heightUnit = window.g_height / 10;
    window.g_paper.image("img/backgrounds/Timetable_Green.png", 0, 0, window.g_width, window.g_height);

    var titleHeading = window.g_paper.text(window.g_width / 2, window.g_heightUnit/2, window.g_title);
    titleHeading.attr({'text-anchor': "middle", "font-size": "26px"});
    var headLine = window.g_paper.path('M' + 50 + " " + (window.g_height / 10) + "L" + (window.g_width - 50) + " " + (window.g_height / 10));
}


function Subject(_title, _total) {
    

}

function detectPortrait(mainDiv) {
    if (screen.width < screen.height) {
        $(mainDiv).addClass("portrait_mode");
    }
    else {
        $(mainDiv).removeClass("portrait_mode");
    }
}