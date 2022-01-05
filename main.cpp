//=============================================
//ESP32 WebSocket Server: potentiometer voltage
//=============================================
#include <WiFi.h>
#include <WebServer.h>
#include <WebSocketsServer.h>
//-----------------------------------------------
const char* ssid = "Tasin";
const char* password = "01995393442";
//-----------------------------------------------
WebServer server(80);
WebSocketsServer webSocket = WebSocketsServer(81);
//-----------------------------------------------
String JSONtxt;
//-----------------------------------------------
#include "webpage.h"
//-----------------------------------------------
void handleRoot()
{
  server.send(200,"text/html", webpageCont);
}
//====================================================================
void setup()
{
  Serial.begin(9600);
  pinMode(34,OUTPUT);

  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED)
  {
    Serial.print("."); delay(500);  
  }
  WiFi.mode(WIFI_STA);
  Serial.print(" Local IP: ");
  Serial.println(WiFi.localIP());
  
  server.on("/", handleRoot);
  server.begin(); webSocket.begin();
}
//====================================================================
void loop() 
{
  webSocket.loop(); server.handleClient();

  String POTvalString = String(float(analogRead(34))/1170.0);
  JSONtxt = "{\"POT\":\""+POTvalString+"\"}";
  webSocket.broadcastTXT(JSONtxt);
}
