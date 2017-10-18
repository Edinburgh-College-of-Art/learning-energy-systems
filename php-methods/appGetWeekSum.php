<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type:text/plain');
$ini = parse_ini_file("config.ini");
$username = $ini['username'];
$password = $ini['password'];
$database = $ini['database'];
$host = 'localhost';
    $connection = mysqli_connect($host, $username, $password, $database);
    if ($connection->connect_error) {
        die("Connection failed: " . $connection->connect_error);
    }
    $query = "select sum(`light`)+sum(`computer`)+sum(`heater`)+sum(`projector`) as total from `app_data` where `date`>='2015-09-21' and `date`<='2015-09-25'";
    $result = mysqli_query($connection , $query);
    $r = mysqli_fetch_assoc($result);
    $row = $r["total"];
    echo $row;
?>
