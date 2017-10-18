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
if (isset($_REQUEST ['room_name']) && isset($_REQUEST ['school_name'])) {
    $ini = parse_ini_file("config.ini");
    $username = $ini['username'];
    $password = $ini['password'];
    $database = $ini['database'];
    $host = 'localhost';
    $connection = mysqli_connect($host, $username, $password, $database);
    if ($connection->connect_error) {
        die("Connection failed: " . $connection->connect_error);
    }
    $room_name = htmlspecialchars($_REQUEST["room_name"]);
    if ($room_name == 502) {
        $query = "select sum(value1) from ((SELECT value1 as value1 FROM `sensors` WHERE sensor_name='94103E3E4A38' order by datetime DESC limit 1) union all (SELECT value1 as value1 FROM `sensors` WHERE sensor_name='94103E3E729C' order by datetime DESC limit 1) union all (SELECT value1 as value1 FROM `sensors` WHERE room_name=502 and sensor_name='lights' order by datetime DESC limit 1)) a";
////                , ($_GET['room_name'])
////                , ($_GET['school_name'])
////                , ($_GET['sensor_name'])
////                , ($_GET['value1'])
////                , ($_GET['value2']));
        if ($result = mysqli_query($connection, $query)) {
            // Fetch one and one row
            while ($row = mysqli_fetch_row($result)) {
                echo $row[0];
            }
            // Free result set
            mysqli_free_result($result);
        }

        mysqli_close($connection);
    } else if ($room_name == 1) {
        $query = "select sum(value1) from ((SELECT value1 as value1 FROM `sensors` WHERE sensor_name='94103E3E4A38' order by datetime DESC limit 1)
union all
(SELECT value1 as value1 FROM `sensors` WHERE sensor_name='94103E3E81EC' order by datetime DESC limit 1)
union all
(SELECT value1 as value1 FROM `sensors` WHERE sensor_name='LUX_S2' order by datetime DESC limit 1)) a";
////                , ($_GET['room_name'])
////                , ($_GET['school_name'])
////                , ($_GET['sensor_name'])
////                , ($_GET['value1'])
////                , ($_GET['value2']));
        if ($result = mysqli_query($connection, $query)) {
            // Fetch one and one row
            while ($row = mysqli_fetch_row($result)) {
                echo $row[0];
            }
            // Free result set
            mysqli_free_result($result);
        }
    } else if ($room_name == 2) {
        $query = "select sum(value1) from ((SELECT value1 as value1 FROM `sensors` WHERE sensor_name='94103E3B85E8' order by datetime DESC limit 1)
union all
(SELECT value1 as value1 FROM `sensors` WHERE sensor_name='94103E3E7168' order by datetime DESC limit 1)
union all
(SELECT value1 as value1 FROM `sensors` WHERE sensor_name='LUX_S1' order by datetime DESC limit 1)) a";
////                , ($_GET['room_name'])
////                , ($_GET['school_name'])
////                , ($_GET['sensor_name'])
////                , ($_GET['value1'])
////                , ($_GET['value2']));
        if ($result = mysqli_query($connection, $query)) {
            // Fetch one and one row
            while ($row = mysqli_fetch_row($result)) {
                echo $row[0];
            }
            // Free result set
            mysqli_free_result($result);
        }
    }
}
?>