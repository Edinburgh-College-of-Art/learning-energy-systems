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
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
//    $_POST = array_map("strip_tags", $_POST);
//    $_POST = array_map("trim", $_POST);
    if ($db->connect_errno > 0) {
        die('Unable to connect to database [' . $db->connect_error . ']');
    } else {
        $sth = $db->prepare("INSERT INTO `stirling`(`total_watts`, `ahu_roof_plant_mcp`, `boiler_plant_mcp`, `kitchen_english_geography_maths_history`, `library_pupil_support`, `admin_reception_area`, `ac_unites_pool_ahu`, `games_hall_dance_studio_1st_floor`, `it_wing_gp`, `pool_plant_mcp`, `pe_changing_room_ground_floor`, `it_hub_room`, `tech_music_stage_lighting`, `art_he`, `he3`, `it_wing_ict`, `he2`, `he1`, `ext_lights`, `date_time`)  "
                . "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        $val2=0;
        $sth->bind_param('ddddddddddddddddddds'
                ,($_POST["total_watts"]),
	($_POST["ahu_roof_plant_mcp"]),
	($_POST["boiler_plant_mcp"]), 
	($_POST["kitchen_english_geography_maths_history"]),
	($_POST["library_pupil_support"]),
	($_POST["admin_reception_area"]),
	($_POST["ac_unites_pool_ahu"]),
	($_POST["games_hall_dance_studio_1st_floor"]),
	($_POST["it_wing_gp"]),
	($_POST["pool_plant_mcp"]),
	($_POST["pe_changing_room_ground_floor"]),
	($_POST["it_hub_room"]),
	($_POST["tech_music_stage_lighting"]),
	($_POST["art_he"]),
	($_POST["he3"]),
	($_POST["it_wing_ict"]),
	($_POST["he2"]),
	($_POST["he1"]),
	($_POST["ext_lights"]),
	($_POST["date_time"]));
        $OK = $sth->execute();
//        echo "aaaaaaaa";
//        echo ($_POST["total_watts"]) ;
//	($_POST["ahu_roof_plant_mcp"]). " " .
//	($_POST["boiler_plant_mcp"]). " " .
//	($_POST["kitchen_english_geography_maths_history"]). " " .
//	($_POST["library_pupil_support"]). " " .
//	($_POST["admin_reception_area"]). " " .
//	($_POST["ac_unites_pool_ahu"]). " " .
//	($_POST["games_hall_dance_studio_1st_floor"]). " " .
//	($_POST["it_wing_gp"]). " " .
//	($_POST["pool_plant_mcp"]). " " .
//	($_POST["pe_changing_room_ground_floor"]). " " .
//	($_POST["it_hub_room"]). " " .
//	($_POST["tech_music_stage_lighting"]). " " .
//	($_POST["art_he"]). " " .
//	($_POST["he3"]). " " .
//	($_POST["it_wing_ict"]). " " .
//	($_POST["he2"]). " " .
//	($_POST["he1"]). " " .
//	($_POST["ext_lights"]). " " .
//	($_POST["date_time"]);
//        echo $OK;
//// return if successful or display error
        if ($OK) {
            $response = "Success";
        } else {
            $response = "Something went wrong.";
        }
        echo $response;
        $sth->close();
    }
?>



