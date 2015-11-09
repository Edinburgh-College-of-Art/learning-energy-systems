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
var g_heightUnit;
var g_studentUID = "1";
var g_currDate;
var g_dayRadius;
var g_leftMargin;
var g_topMargin, g_elementMargin;
var g_adding = false;
var g_status = "edit";
var g_title = localStorage.getItem("currentDay").toUpperCase();
var g_colors = ["#fff", "#004A73", "#04757F", "#00A66E", "#A8D063", "#F5F199", "#EB9663", "#E5646B", "#ED1553", "#AA2951"];
var g_changedSubjects=[];
$(document).bind('mobileinit', function () {
  $.mobile.loadingMessage = false;
});
$(function () {
  $("#titleHeader").text(window.g_title);
  FastClick.attach(document.body);
  $("#helpIcon").bind('click', function () {
      window.location = "editUser.html";;
  });
  $("#homeIcon").bind('click', function () {
      window.location = "weekView.html";
  });
});
window.onload = function () {
  window.StatusBar && window.StatusBar.hide();
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
  if($("#editingSubjects")){
    $("#editingSubjects").html("");
  }
}
function initialise() {
  $(".ui-loader").hide();
  window.g_width = $(window).width();
  window.g_height = $(window).height();
  window.g_heightUnit = window.g_height / 10;
  window.g_topMargin = window.g_heightUnit / 10;
  window.g_leftMargin = window.g_width / 20;
  window.g_currDate = localStorage.getItem("currentDate");
  window.g_studentUID = localStorage.getItem("studentId");
  window.g_title = localStorage.getItem("currentDay").toUpperCase();
  window.g_elementMargin = window.g_width / 40;
  loadSubjects();
}
var g_lastHeight;
function loadSubjects() {
  $("#editingSubjects").html("");
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
        addSubject(window.g_leftMargin + window.g_elementMargin, window.g_heightUnit * (i + 1) + window.g_topMargin * 4, data[i].id, data[i].title, parseInt(data[i].total));
      }
      window.g_lastHeight = window.g_heightUnit * (data.length + 1);
    });
  }
  function subjectDeleteClicked() {
    var url = "http://www.learningenergy.eca.ed.ac.uk/appAddUpdateSubject.php";
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
  var changedItem;
  var jsonArr = [];
  //Adding all the updated subjects to a json array.
  for(var index=0 ; index<g_changedSubjects.length ; index++){
    changedItem = parseInt(g_changedSubjects[index]);
    jsonArr.push({
      id: changedItem,
      value: $("#subjectTitle_"+changedItem).val()
    });
  }
  console.log(jsonArr);
  //sending updated subjects to the server
  // $("#tempOK").attr("src", "img/icons/loader.gif");
  var url = "http://www.learningenergy.eca.ed.ac.uk/appAddUpdateSubject.php";
  var dataToBeSent = {
    update: true,
    data: jsonArr
  };
  $.post(url, dataToBeSent)
  .always(function (data) {
    console.log(data);
    // window.location = "dayView.html";
  }
);
}
function addSubject(_x,_y,_id,_title) {
  window.g_adding = true;
  var r = window.g_heightUnit / 3;
  var w = window.g_width - 2 * window.g_leftMargin - 2 * window.g_elementMargin - 2 * r;
  var h = window.g_heightUnit - window.g_topMargin;
  var top = window.g_lastHeight + r + window.g_topMargin;
  var tempItem = $("<div class='subjectsEdit input-group'>\n\
  <img class='crossImg'  src='img/icons/cross-icon.png' id='delete_"+ _id +"' parent='"+_id+"'>\n\
  <input type='text' id='subjectTitle_" + _id  +  "' class='form-control' placeholder='Name' value='"+_title +"' parent='"+_id+"'>\n\
  </div>").hide();
  $("#editingSubjects").append(tempItem);
  tempItem.fadeIn("slow");
  $("#updateSubjects").bind("click", okClicked);
  $("#subjectTitle_"+_id).bind("keyup", subjectTitleChanged);
  $("#delete_"+_id).bind("click", subjectDeleteClicked);
}

function subjectTitleChanged() {
  var parent = $(this).attr("parent")
  var alreadyChanged=false;
  for(item in g_changedSubjects){

    if(g_changedSubjects[item]===parent){
      alreadyChanged=true;
      break;
    }
  }
  if(!alreadyChanged)g_changedSubjects.push(parent);
}
