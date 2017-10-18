<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$ini = parse_ini_file("config.ini");
$username = $ini['username'];
$password = $ini['password'];
$database = $ini['database'];
$host = 'localhost';
if (isset($_GET['id'])) {
    $connection = mysqli_connect($host, $username, $password, $database);
    if ($connection->connect_error) {
        die("Connection failed: " . $connection->connect_error);
    }
    $query = "SELECT `subject`, `light`, `computer`, `heater`, `projector`,`lightString`, `computerString`, `heaterString`, `projectorString`  FROM `app_data` WHERE `id`=" . $_GET['id'];
    $result = mysqli_query($connection, $query);
    $rows = array();
    while ($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    print json_encode($rows);
}
?>
