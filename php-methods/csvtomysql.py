#!/usr/bin/env python
# -*- Mode: Python; coding: utf-8; indent-tabs-mode: t; c-basic-offset: 4; tab-width: 4 -*- 
#
# main.py
# Copyright (C) 2015 Hadi Mehrpouya <h.mehrpouya@ed.ac.uk>
# 
# csvToMysql is free software: you can redistribute it and/or modify it
# under the terms of the GNU General Public License as published by the
# Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# 
# csvToMysql is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
# See the GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License along
# with this program.  If not, see <http://www.gnu.org/licenses/>.

import MySQLdb
import ftplib
import csv
import sys	
from StringIO import StringIO


ftp = ftplib.FTP("91.197.229.72")
ftp.login("tugrul@learningenergysystems.net", "")
files = []
def makeQuery (_data):
	values=""
	datetime=""
	for row in _data:
		
		if len(row)<=0: 
			continue
		if(row[0] == 'Total Watts'):
			values +=row[1]
		else:
			values +=row[2]
			datetime=row[1]
		values +=","	
		#print row[len(row)-1]
	values+="'"+datetime+"'"
	#values = v[1] + values
	print values
	storeValues(values)
def storeValues(_values):
	query="INSERT INTO `stirling`(`total_watts`, `ahu_roof_plant_mcp`, `boiler_plant_mcp`, `kitchen_english_geography_maths_history`, `library_pupil_support`, `admin_reception_area`, `ac_unites_pool_ahu`, `games_hall_dance_studio_1st_floor`, `it_wing_gp`, `pool_plant_mcp`, `pe_changing_room_ground_floor`, `it_hub_room`, `tech_music_stage_lighting`, `art_he`, `he3`, `it_wing_ict`, `he2`, `he1`, `ext_lights`, `date_time`) VALUES ("
	query = query + _values +")"
	host= "localhost"
	user="wwwlearn_webuser"
	password=""
	db="wwwlearn_school"
	connection = MySQLdb.connect(host,user, password, db)
	#cursor = connection.cursor()
	'''
	try:
		cursor.execute(query)
        connection.commit()
    except:
        connection.rollback()
	
	'''
	connection.close()
try:
    files = ftp.nlst()
except ftplib.error_perm, resp:
    if str(resp) == "550 No files found":
        print "No files in this directory"
    else:
        raise
for f in files:
	if len(f)>15:
		print f
		r = StringIO()
		ftp.retrbinary('RETR '+ f, r.write)
		val = r.getvalue()
		if(len(val)>10):
			reader = csv.reader(val.split('\n'), delimiter=',')
			if(reader):
				makeQuery(reader)
		break

print "Hello World!"
sys.exit()

