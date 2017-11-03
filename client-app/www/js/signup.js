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
    $("#getStarted").bind('click', onNextClick);
    if (localStorage.getItem("studentId") !== undefined && localStorage.getItem("studentId") !== null){
        alert("User is already signed in.");
        window.location = "weekView.html";
    }
};

$(window).ready(function(){
    $.get('http://localhost/app_school.json').success(function(data){
        $.each(data.appSchool, function(i,s){ console.log(s); $("#app-school-id").append('<option value="'+s.id+'">'+s.school_name+'</option>'); });
    });
});

function validateUserInput() {
    var result = false;
    result = true;
    return result;
}



function onNextClick() {
    console.log("clicked!");
    if (validateUserInput())
        addNewUser();

}

function addNewUser() {
    var url = "http://localhost/app_students/add";
    var uName = $("#userName").val();
    var schId = $("#app-school-id").val();
    var year = $("#year").val();
    var dataToBeSent = {
        name: uName,
        app_school_id: schId,
        year: year
    };
    $.ajax({ type: 'POST', url: url, data: dataToBeSent, dataType: 'json' })
        .success(function (data) {
            if ((data.appStudent) && (data.appStudent.id)) {
                localStorage.setItem("studentId", data.appStudent.id);
                localStorage.setItem("usrSigned", true);
                localStorage.setItem("userName", uName);
                localStorage.setItem("schoolId", schId);
                localStorage.setItem("year", year);
                localStorage.setItem("secret", secret);
                window.location = "help1.html";
            }
        }).always(function (data){
          console.log(data);
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
