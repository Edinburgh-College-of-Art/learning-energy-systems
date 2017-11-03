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

$(document).ready(function(){
  $("#userName").val(localStorage.getItem("userName"));
  $("#year").val(localStorage.getItem("year"));
  
  $("#footer").bind('click', onNextClick);
  
  $("#updateUser").bind("click",function(){
    if(validateUserInput())
      updateUser();
  });

  $("#signOut").bind("click",function(){
    localStorage.clear();
    window.location="signup.html";
  });

  $("#homeIconn").bind("click",function(){
    window.location="weekView.html";
  });

  $.get('http://localhost/app_school.json').success(function(data){
    $.each(data.appSchool, function(i,s){ console.log(s); $("#app-school-id").append('<option value="'+s.id+'">'+s.school_name+'</option>'); });
    $("#app-school-id").val(localStorage.getItem("schoolId").toString());
  });

});

function validateUserInput() {
  var result = false;
  result = true;
  return result;
}

function onNextClick() {
  window.location="help1.html";
}

function updateUser() {
  var id = localStorage.getItem("studentId");
  var url = "http://localhost/app_students/edit/"+id+".json"
  var uName = $("#userName").val();
  var schId = $("#app-school-id").val();
  var year = $("#year").val();
  $("#progImg").show();
  
  var dataToBeSent = {
    name: uName,
    app_school_id: schId,
    year: year,
    id:id
  };

  $.ajax({ type: 'POST', url: url, data: dataToBeSent, dataType: 'json' })
    .success(function (data) {
      localStorage.setItem("userName", uName);
      localStorage.setItem("schoolId", schId);
      localStorage.setItem("year", year);
    }).always(function (data){
      console.log(data);
      $("#progImg").hide("slow");
    });
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
}
