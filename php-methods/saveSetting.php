<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$ini = parse_ini_file("config.ini");
$username = $ini['username'];
$password = $ini['password'];
$database = $ini['database'];
$host = 'localhost';
$connection = mysqli_connect($host, $username, $password, $database);
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

if (isset($_GET['user'])) {
    $user = mysqli_real_escape_string($connection, $_GET["user"]);
} else {
    $user = "anonymous";
}
if (isset($_GET['roomsetting'])) {
    $roomsetting = mysqli_real_escape_string($connection, $_GET["roomsetting"]);
}
if (isset($_GET['roomid'])) {
    $roomid = mysqli_real_escape_string($connection, $_GET["roomid"]);
}
$query = "SELECT t1 . room_id as roomid,t1 . room_setting as setting
FROM rooms t1
WHERE t1.datetime = (
SELECT MAX( t2.datetime )
FROM rooms t2
WHERE t2.room_id = t1.room_id )
AND t1.room_id <>$roomid";

$result = mysqli_query($connection, $query);
$kwh = 0.0;
$kwh_room=0.0;
if (mysqli_num_rows($result) <= 0) {
    $kwh = -1.759;
     if ($id == 0) {
           $kwh_room= - 0.334;
        } else if ($id == 1) {
           $kwh_room= - 0.165;
        } else if ($id == 2) {
            $kwh_room= - 0.795;
        } else if ($id == 3) {
           $kwh_roo= - 0.465;
        }
} else {
    while ($row = $result->fetch_assoc()) {
        $setting = $row['setting'];
        $id = $row['roomid'];
        echo "$id id is";
        if ($id == 0) {
            echo $kwh . "  just";
            $kwh+=(
                    (intval($setting{0}) * 0.334) +
                    (intval($setting{1}) * 0.165) +
                    (intval($setting{2}) * 0.3)) - 0.334;
                    echo $kwh . "  after";
        } else if ($id == 1) {
            echo $kwh . "  in";
            $kwh+=(
                    (intval($setting{0}) * 0.334) +
                    (intval($setting{1}) * 0.3)) - 0.165;
        } else if ($id == 2) {
            echo $kwh . "  in";
            $kwh+=(
                    (intval($setting{0}) * 0.334) +
                    (intval($setting{1}) * 3.3) +
                    (intval($setting{2}) * 0.3)) - 0.795;
        } else if ($id == 3) {
            echo $kwh . "  in";
            $kwh+=(
                    (intval($setting{0}) * 0.334) +
                    (intval($setting{1}) * 0.15) +
                    (intval($setting{2}) * 0.4)) - 0.465;
        }
    }
    $kwh_room = 0;
    if ($roomid == 0) {
        $kwh_room+=(
                (intval($roomsetting{0}) * 0.334) +
                (intval($roomsetting{1}) * 0.165) +
                (intval($roomsetting{2}) * 0.3)) - 0.334;
    } else if ($roomid == 1) {
        $kwh_room+=(
                (intval($roomsetting{0}) * 0.334) +
                (intval($roomsetting{1}) * 0.3)) - 0.165;
    } else if ($roomid == 2) {
        $kwh_room+=(
                (intval($roomsetting{0}) * 0.334) +
                (intval($roomsetting{1}) * 3.3) +
                (intval($roomsetting{2}) * 0.3)) - 0.795;
    } else if ($roomid == 3) {
        $kwh_room+=(
                (intval($roomsetting{0}) * 0.334) +
                (intval($roomsetting{1}) * 0.15) +
                (intval($roomsetting{2}) * 0.4)) - 0.465;
    }
    $kwh+=$kwh_room;
}
echo $kwh;
echo "/n/r";
$kwh = max($kwh,-1.759);
echo $kwh;
$query = "INSERT INTO `rooms`(`room_id`, `room_setting`, `user`,`kwh`,`kwh_room`) VALUES ($roomid,'$roomsetting','$user','$kwh','$kwh_room')";
if (mysqli_query($connection, $query)) {
    echo "New record created successfully";
} else {
    http_response_code(404);
    echo "Error: " . $query . "<br>" . mysqli_error($connection);
}

mysqli_close($connection);
?>