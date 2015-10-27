/*
* This code reads a value over Software Serial, using pins 8 (RX) and 9 (TX).
* It maps the value from between 0-9, to a usable range for speed of the stepper motor.
* Author:  Mark Selby (mark@markmakedo.co.uk)
* Part of the Lesrning Energy Systems research project from the University of Edinburgh
* learningenergysystems.net
* Copyright (C) 2015 Mark Selby (markmakedo.co.uk)
* Uses AccelStepper Library, and adapted from ConstantSpeed.pde example by Mike McCauley (mikem@airspayce.com)
*/
//import the stepper motor Library
#include <AccelStepper.h>
//import the Software Serial Library
#include <SoftwareSerial.h>

// Set our software Serial RX to pin 8
const int IMP_SERIAL_RX = 8;
// Set our Software Serial TX to pin 9
const int IMP_SERIAL_TX = 9;
// Create an instance of software serial.
SoftwareSerial impSerial(IMP_SERIAL_RX, IMP_SERIAL_TX);

//
int motorSpeed;
int motorStepPin = 4;
int motorDirPin = 5;
AccelStepper stepper; // Defaults to AccelStepper::FULL4WIRE (4 pins) on 2, 3, 4, 5

void setup()
{  
  //Start the regular serial port
  Serial.begin(9600);
  // set the data rate for the SoftwareSerial port
  impSerial.begin(19200);
   //stepper.setMaxSpeed(600*8);
   stepper.setMaxSpeed(500*5);
}

void loop()
{  
  //
while (impSerial.available() > 0) {
  //read the value coming in from the imp over software serial
  int b = impSerial.read(); 
    
    //Print out the serial data, so we can check it's OK
    Serial.print("b: ");
    Serial.println(b);
    // we need to map the number from between 0-9, to a useable number for the speed of the motor.
    motorSpeed = map(b, 0,9,500,1000);// Use this line out if your motor IS microstepping
    //motorSpeed = map(b, 0,9,50,500);// Use this line  if your motor is NOT microstepping
    
    //Print out the motor speed so we can check it's OK
    Serial.print("motor speed: ");
    Serial.println(motorSpeed);
    // Set the speed of the motor
    stepper.setSpeed(motorSpeed);
  }
   // 
   stepper.runSpeed();
}
