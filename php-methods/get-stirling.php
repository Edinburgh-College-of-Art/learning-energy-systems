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
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
//    $_GET = array_map("strip_tags", $_GET);
//    $_GET = array_map("trim", $_GET);
if ($db->connect_errno > 0) {
    die('Unable to connect to database [' . $db->connect_error . ']');
} else {
    $field = "total_watts";
    if (isset($_GET["field"])) {
        $field = htmlspecialchars($_GET["field"]);
    }
    $query = "select $field from `stirling` order by date_time DESC limit 1 ";
    
    if ($result= $db->query($query)) {
        // output data of each row
        while ($row = $result->fetch_row()) {
            echo $row[0];
        }
        $db->close();
    }
}
?>