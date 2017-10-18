<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html');
$ini = parse_ini_file("config.ini");
$username = $ini['username'];
$password = $ini['password'];
$database = $ini['database'];
$host = 'localhost';
$connection = mysqli_connect($host, $username, $password, $database);
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$room = htmlspecialchars($_GET["room"]);
$roomid = 0;
$res = "";
if ($room == "geography") {
    $roomid = 0;
    $res = "0000";
} elseif ($room == "art") {
    $roomid = 1;
    $res = "00";
} elseif ($room == "computer") {
    $roomid = 2;
    $res = "0000";
} elseif ($room == "science") {
    $roomid = 3;
    $res = "000";
}
$query = "SELECT `room_setting` as setting FROM `rooms` WHERE room_id=$roomid order by datetime DESC limit 1";
$result = mysqli_query($connection, $query);

while ($row = $result->fetch_assoc()) {
    $res= $row['setting'];
}

echo $res;
mysqli_close($connection);
?>
