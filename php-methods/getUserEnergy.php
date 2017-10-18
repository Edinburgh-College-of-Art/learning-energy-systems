<?php
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
$query = "SELECT *,unix_timestamp(datetime) as unixdate FROM `rooms` where datetime >= CURDATE()";
$result = mysqli_query($connection, $query);
$rows=array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
echo json_encode($rows);
//while ($row = $result->fetch_assoc()) {
//    echo $row;
//}
?>
