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


header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html');
$_REQUEST = array_merge($_GET, $_POST);
//if (isset($_REQUEST ['room_name']) && isset($_REQUEST ['school_name']) ) {
$ini = parse_ini_file("config.ini");
$username = $ini['username'];
$password = $ini['password'];
$database = $ini['database'];
$host = 'localhost';
$connection = mysqli_connect($host, $username, $password, $database);
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
$sensorName = htmlspecialchars($_REQUEST["sensor_name"]);
}
$query = "select max(value1) as maxVal,min(value1) as minVal from  sensors where datetime > DATE_SUB(NOW(),INTERVAL 1 HOUR) and ((sensor_name='94103E3E4A38' or sensor_name = '94103E3E729C') or (room_name=502))";
////                , ($_GET['room_name'])
////                , ($_GET['school_name'])
////                , ($_GET['sensor_name'])
////                , ($_GET['value1'])
////                , ($_GET['value2']));
if ($result=mysqli_query($connection,$query))
  {
  // Fetch one and one row
  while ($row=mysqli_fetch_row($result))
    {
    echo $row[0] . "," . $row[1];
    }
  // Free result set
  mysqli_free_result($result);
}

mysqli_close($connection);
//    if ($sensorName == "all")
//        echo rand(0, 10);
//    else
//        echo rand(0, 3);
////    mysqli_close($connection);
//}
?>