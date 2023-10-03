#!/usr/bin/env python3 

#qt
from PySide2.QtWidgets import *
from kiosk import Ui_MainWindow
from PySide2.QtCore import Qt

#uart communication
import serial
import json

#multi threading
import threading
from time import sleep

#mutex = threading.Lock()

def is_on(i):
    if i == "ON":
        return True
    else:
        return False


def is_off(i):
    if i == "OFF":
        return True
    else:
        return False


# thread for recieving Actuator and sense data from ESP32 with Serial
def recieve_thread():
    while True:
        if ser.readable():
            #mutex.acquire()
            res = ser.readline()
            #mutex.release()
            print(res)
            data = json.loads(res.decode()[:-1])
            #print(data)
            win.temp_val.setText(data["Temp"][0:2])
            win.humid_val.setText(data["Humid"][0:2])
            
            win.fan_btn.setChecked(data["cooling_fan"])
            win.waterfall_btn.setChecked(data["waterfall"])
            win.humidifier_btn.setChecked(data["humidifier"])
            win.heat_btn.setChecked(data["heat_pad"])

#transmit Actuator data to ESP32 with Serial
def act_publish():
    pub_data = { "LED" : 0, "heat_pad" : False, "cooling_fan" : False, "humidifier" : False, "waterfall" : False, "lock" : 1}
    if not win.lock_btn.isChecked():
        pub_data["lock"] = 1
    else:
        pub_data["lock"] =  0
    pub_data["LED"] = win.horizontalSlider.value()
    pub_data["heat_pad"] = win.heat_btn.isChecked()
    pub_data["cooling_fan"] = win.fan_btn.isChecked()
    pub_data["humidifier"] = win.humidifier_btn.isChecked()
    pub_data["waterfall"] = win.waterfall_btn.isChecked()
    pub_data = json.dumps(pub_data)
    #mutex.acquire()
    ser.write(pub_data.encode('utf-8'))
    #mutex.release()
    
class MyApp(QMainWindow, Ui_MainWindow):
    def __init__(self):
        super().__init__()
        Ui_MainWindow.setupUi(self, self)
        self.main()
         
    def main(self):
        self.showFullScreen()
        self.setCursor(Qt.BlankCursor)
        pass
   
    #btn signal function for actuator
    def fan_on(self):
        if win.lock_btn.isChecked():
            print("fan")
            act_publish()
            sleep(1)
            return
        win.fan_btn.setChecked(not win.fan_btn.isChecked())
        print("locked")

    def heat_on(self):
        if win.lock_btn.isChecked():
            print("heat")
            act_publish()
            sleep(1)
            return
        win.heat_btn.setChecked(not win.heat_btn.isChecked())
        print("locked")

    def humidifier_on(self):
        if win.lock_btn.isChecked():
            print("humi")
            act_publish() 
            sleep(1)
            return
        win.humidifier_btn.setChecked(not win.humidifier_btn.isChecked())
        print("locked")

    def waterfall_on(self):
        if win.lock_btn.isChecked():
            print("waterfall")
            act_publish()
            sleep(1)
            return
        win.waterfall_btn.setChecked(not win.waterfall_btn.isChecked())
        print("locked")

    def led_on(self):
        if win.lock_btn.isChecked():
            print("led")
            act_publish()
            sleep(1)
            return
        print("locked")
         
    def lock_on(self):
        act_publish()
        sleep(1)

    # user friendly feature
    def dark_mode_on(self):
        if win.dark_mode_btn.isChecked():
            win.setStyleSheet("background-color:#292A2D;")
        else:
            win.setStyleSheet("background-color:#F4F6F8;")

    def left_mode_on(self):
        if win.left_mode_btn.isChecked():
            win.sense_layout.move(570,210)
            win.actuator_layout.move(60,168)
        else:
            win.sense_layout.move(60,210)
            win.actuator_layout.move(550,168)


app = QApplication()
win = MyApp()
ser = serial.Serial('/dev/ttyAMA2', 115200)

def main():
    
    # multithreading
    try:
        t1 = threading.Thread(target=recieve_thread)
        t1.start()
        win.show()
        app.exec_()

    except KeyboardInterrupt:
        t1.join()

if __name__ == '__main__':
    main()



