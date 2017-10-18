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



window.onload=function () {
    if(userSigned()){
            window.location = "weekView.html";
    }
    else{
        window.location = "signup.html";
    }
};

//Check if user is signed in
function userSigned() {
    var result = localStorage.getItem("usrSigned")===true;
    return result;
}

//check if user has seen the app help?
function seenHelp() {
    var result = localStorage.getItem("seenHelp")===true;
    return result;
}