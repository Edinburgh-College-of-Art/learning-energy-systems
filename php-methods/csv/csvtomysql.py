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
import requests
import json

ftp = ftplib.FTP("91.197.229.72")
ftp.login("tugrul@learningenergysystems.net", "")
files = []
def makeQuery (_data):
	values=[]
	datetime=""
	for row in _data:
		if len(row)<=0: 
			continue
		if(row[0] == 'Total Watts'):
			values.append(row[1])
		else:
			values.append(row[2])
			datetime=row[1]
		#values +=":_values[],"	
		#print row[len(row)-1]
	values.append("'"+datetime+"'")
	#values = v[1] + values
	storeValues(values)
	
def storeValues(_values):
	#print _values
	userdata = {
	"total_watts":_values[0], 
	"ahu_roof_plant_mcp":_values[1],
	"boiler_plant_mcp":_values[2],
	"kitchen_english_geography_maths_history":_values[3],
	"library_pupil_support" :_values[4],
	"admin_reception_area" :_values[5],
	"ac_unites_pool_ahu" :_values[6],
	"games_hall_dance_studio_1st_floor" :_values[7],
	"it_wing_gp" :_values[8],
	"pool_plant_mcp" :_values[9],
	"pe_changing_room_ground_floor":_values[10],
	"it_hub_room" :_values[11],
	"tech_music_stage_lighting":_values[12], 
	"art_he":_values[13],
	"he3":_values[14],
	"it_wing_ict":_values[15],
	"he2":_values[16],
	"he1" :_values[17],
	"ext_lights":_values[18],
	"date_time":_values[19]
	}
	#print userdata
	url="http://www.learningenergy.eca.ed.ac.uk/stirling.php"
	headers = {'content-type': 'application/json'}
	resp=requests.post(url,userdata,headers) 
	#query = query + _values +")"
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

		print "Hello WorldDone!"

