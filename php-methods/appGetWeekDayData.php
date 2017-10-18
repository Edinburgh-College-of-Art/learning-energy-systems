<?php

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$ini = parse_ini_file("config.ini");
$username = $ini['username'];
$password = $ini['password'];
$database = $ini['database'];
$host = 'localhost';
if (isset($_GET['id']) && isset($_GET['date'])) {
    $connection = mysqli_connect($host, $username, $password, $database);
    if ($connection->connect_error) {
        die("Connection failed: " . $connection->connect_error);
    }
    $query = "SELECT sum(`light`) as light, sum(`computer`) as computer ,sum(`projector`) as projector,sum(`heater`) as heater FROM `app_data` WHERE date(`date`)='" . $_GET['date'] . "' and `app_students_unique_id`='" . $_GET['id'] . "'";
    $result = mysqli_query($connection, $query);
    $rows = array();
    $returned_array = array();
    $returned_array['day'] = array();
    $returned_array['week'] = array();
    while ($r = mysqli_fetch_assoc($result)) {
        $returned_array['day'][] = $r;
    }
    $query = "select (sum(`light`)+sum(`computer`)+sum(`heater`)+sum(`projector`)) as daySum,date  from `app_data` where `date` >= '" . date('Y-m-d', strtotime("Last Monday")) . "' and `date`<='" . date('Y-m-d', strtotime("This Friday"))  . "' group by `date` order by `date` ASC";
    $result = mysqli_query($connection, $query);
    while ($r = mysqli_fetch_assoc($result)) {
        $returned_array['week'][] = $r;
    }
    print json_encode($returned_array);
    mysqli_free_result($result);
    mysqli_close($connection);
}
?>
