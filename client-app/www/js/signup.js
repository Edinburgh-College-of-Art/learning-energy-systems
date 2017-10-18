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
    if (localStorage.getItem("studentId") !== undefined && localStorage.getItem("studentId") !== null)
    {
        alert(localStorage.getItem(usrSigned));
        window.location = "weekView.html";
    }
};


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

//http://www.learningenergy.eca.ed.ac.uk/appAddNewUser.php?username=hadi&school=porty&year=1980
function addNewUser() {
    var url = "http://www.learningenergy.eca.ed.ac.uk/appAddNewUser.php"
    var uName = $("#userName").val();
    var schName = $("#schoolName").val();
    var year = $("#year").val();
    var dataToBeSent = {
        username: uName,
        school: schName,
        year: year
    };
    $.post(url, dataToBeSent)
            .success(function (data) {
                var studentID = parseInt(data);
                localStorage.setItem("studentId", studentID);
                localStorage.setItem("usrSigned", true);
                localStorage.setItem("userName", uName);
                localStorage.setItem("schoolName", schName);
                localStorage.setItem("year", year);
                window.location = "help1.html";
            }
            ).always(function (data){
              console.log(data);

            });
    // window.location="help1.html";
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
