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

$query = "SELECT FLOOR((kwh+ 2)*1.5) as kwh FROM `rooms` order by `datetime` DESC limit 1";
$result = mysqli_query($connection, $query);
while ($row = $result->fetch_assoc()) {
    echo $row['kwh'];
}
?>
