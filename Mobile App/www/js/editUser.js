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


window.onload = function () {
     $("#userName").val(localStorage.getItem("userName"));
     $("#schoolName").val(localStorage.getItem("schoolName"));
     $("#year").val(localStorage.getItem("year"));
   $("#footer").bind('click', onNextClick);
   $("#updateUser").bind("click",function(){
     if(validateUserInput())
       updateUser();
   });
   $("#homeIcon").bind("click",function(){
     window.location="weekView.html";
   });
};


function validateUserInput() {
    var result = false;
    result = true;
    return result;
}

function onNextClick() {
  window.location="help1.html";
    }

//http://www.learningenergy.eca.ed.ac.uk/appAddNewUser.php?username=hadi&school=porty&year=1980
function updateUser() {
    var url = "http://www.learningenergy.eca.ed.ac.uk/appUpdateUser.php"
    var uName = $("#userName").val();
    var schName = $("#schoolName").val();
    var year = $("#year").val();
    $("#progImg").show();
    var id = localStorage.getItem("studentId");
    console.log(id);
    var dataToBeSent = {
        username: uName,
        school: schName,
        year: year,
        id:id
    };
    $.post(url, dataToBeSent)
            .success(function (data) {
              localStorage.setItem("userName",uName);
              localStorage.setItem("schoolName",schName);
              localStorage.setItem("year",year);
              $("#progImg").hide("slow");
            }
            ).always(function (data){
              localStorage.setItem("userName",uName);
              localStorage.setItem("schoolName",schName);
              localStorage.setItem("year",year);
              $("#progImg").hide("slow");
            });
    //window.location="help.html";
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
