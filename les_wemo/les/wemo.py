'''
Created on 13 May 2015

@author: Hadi Mehrpouya
'''
import argparse
import sys
import time 
import requests #this is to send post requests to the php page for adding plug data to the database.
import ConfigParser #This is for reading information about which school this code is running from and so on.
import os
import glob

from ouimeaux.environment import Environment # this is the library that takes care of Belkin insight "smart" plug

if __name__ == "__main__":
    os.system("rm ~/.wemo/cache")
    print ""
    print "WeMo Randomizer"
    print "---------------"
    env = Environment()
    # TODO: run from 10am to 10pm
    env.start()
    env.discover(seconds=3)
    time.sleep(3)
    
    #reading Config files setting
    configParser = ConfigParser.RawConfigParser()
    configFilePath = r'config.ini'
    configParser.read(configFilePath)
    
    
    
    print env.list_switches()
    switchList = env.list_switches()
    start=time.time()
    '''
    In this loop we will go throuh list of devices and for each one will store the following information
    switch name, switch mac address, and current power consumption.
    we also search for new devices based on the rediscovery time
    for example if it's 20 we will refresh list of devices every 20 seconds. 
    this is for times when we unplug one device and plug it again for example.
    '''
    while True:
        for i in range(0,len(switchList)):
            switch = env.get_switch(switchList[i])
            try:
                power= switch.insight.GetPower()["InstantPower"]
                print power
                macAd = switch.basicevent.GetMacAddr()["MacAddr"]
                print macAd
                schoolName = configParser.get(macAd, 'school_name')
                room = configParser.get(macAd, 'room')
                mydata={'room_name':room,'sensor_name':macAd,'school_name':schoolName ,'value1':power}
                path='http://www.learningenergy.eca.ed.ac.uk/sense.php'    #the url you want to POST to
                print requests.post(path, mydata)
            except Exception as e:
                print 'Exception error is: %s' % e
            
        time.sleep(10);