<?php

/*
 * Copyright (C) 2015 Hadi Mehrpouya
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


/*
 * TODO:
 * Add a unique identifier to the user insert requests so if this is not them then don't insert.
 */
$ini = parse_ini_file("config.ini");
$username = $ini['username'];
$password = $ini['password'];
$database = $ini['database'];
$host = $ini['host'];
$db = new mysqli($host, $username, $password, $database);
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);
error_reporting(E_ALL & ~E_STRICT & ~E_NOTICE);
if ( isset($_POST['school_name']) && isset($_POST['room_name']) && isset($_POST['sensor_name']) && isset($_POST['value1'])) {
    $_POST = array_map("strip_tags", $_POST);
    $_POST = array_map("trim", $_POST);
    if ($db->connect_errno > 0) {
        die('Unable to connect to database [' . $db->connect_error . ']');
    } else {
        $sth = $db->prepare("INSERT INTO `sensors`( `room_name`, `school_name`, `sensor_name`, `value1`, `value2`)  VALUES (?,?,?,?,?)");
        $val2=0;
        if(isset($_POST['value2']))
            $val2=$_POST['value2'];
        $sth->bind_param('sssdd'
                , ($_POST['room_name'])
                , ($_POST['school_name'])
                , ($_POST['sensor_name'])
                , ($_POST['value1'])
                , $val2);
        /*
         * TODO:
         * add better error handling.
         */
        $OK = $sth->execute();
// return if successful or display error
        if ($OK) {
            $response = "Success";
        } else {
            $response = "Something went wrong.";
        }
        echo $response;
        $sth->close();
    }
}
?>



