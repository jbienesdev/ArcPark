#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
  
// Set these to run example.
#define FIREBASE_HOST "arcpark-1532921739973.firebaseio.com"
#define FIREBASE_AUTH "JDQuqkjbtF4b91H0G54mnROFsdyODEtMCQ59kha4"

#define DB_PATH_PARKING "parking_area/A1/distance_in_cm"
#define DB_PATH_STATUS "parking_area/A1/status"

#define WIFI_SSID "PLDTHOMEFIBRrestricted"  
#define WIFI_PASSWORD "zadeeq13"

#define TRIGGER 5
#define ECHO    4
#define LEDPIN  13

int wifiStatus;
 
void setup() {
  Serial.begin (9600);
  pinMode(TRIGGER, OUTPUT);
  pinMode(ECHO, INPUT);
  //For the LED Pin configuration  
  pinMode(LEDPIN, OUTPUT);
  digitalWrite(LEDPIN, LOW);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

void sensorReading() {
  float duration, distance;
  digitalWrite(TRIGGER, LOW);  
  delayMicroseconds(2); 
  
  digitalWrite(TRIGGER, HIGH);
  delayMicroseconds(10); 
  
  digitalWrite(TRIGGER, LOW);
  duration = pulseIn(ECHO, HIGH);
  distance = duration * 0.034 / 2;

  Firebase.setFloat(DB_PATH_PARKING, distance);
  if (Firebase.failed()) {
    Serial.print("setting distance failed:");
    Serial.println(Firebase.error());  
    return;
  }
  
  delay(15000);
}

void loop() {
  wifiStatus = WiFi.status();
  if(wifiStatus == WL_CONNECTED) {
    //LED turns on or off depending on the status
    if(Firebase.getString(DB_PATH_STATUS) == "occupied") {
      digitalWrite(LEDPIN, LOW);    
    } else {
      digitalWrite(LEDPIN, HIGH);
    }
    sensorReading();    
  }
}
