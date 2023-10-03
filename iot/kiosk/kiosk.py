# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'kiosk.ui'
##
## Created by: Qt User Interface Compiler version 6.5.1
##
## WARNING! All changes made in this file will be lost when recompiling UI file!
################################################################################

from PySide2.QtCore import (QCoreApplication, QDate, QDateTime, QLocale,
    QMetaObject, QObject, QPoint, QRect,
    QSize, QTime, QUrl, Qt)
from PySide2.QtGui import (QBrush, QColor, QConicalGradient, QCursor,
    QFont, QFontDatabase, QGradient, QIcon,
    QImage, QKeySequence, QLinearGradient, QPainter,
    QPalette, QPixmap, QRadialGradient, QTransform)
from PySide2.QtWidgets import (QApplication, QColumnView, QFrame, QLabel,
    QMainWindow, QMenuBar, QPushButton, QSizePolicy,
    QSlider, QStatusBar, QTextBrowser, QWidget)
import icon_rc

class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        if not MainWindow.objectName():
            MainWindow.setObjectName(u"MainWindow")
        MainWindow.resize(1024, 600)
        MainWindow.setAutoFillBackground(False)
        MainWindow.setStyleSheet(u"background-color: rgb(244, 246, 248)")
        self.centralwidget = QWidget(MainWindow)
        self.centralwidget.setObjectName(u"centralwidget")
        self.widget_4 = QWidget(self.centralwidget)
        self.widget_4.setObjectName(u"widget_4")
        self.widget_4.setGeometry(QRect(280, 40, 511, 91))
        self.widget_4.setStyleSheet(u"border:2px solid;\n"
"background-color: rgb(255, 255, 255);\n"
"border-radius: 25%;\n"
"border-color: rgb(3, 195, 90);")
        self.title = QLabel(self.widget_4)
        self.title.setObjectName(u"title")
        self.title.setGeometry(QRect(150, 10, 351, 71))
        self.title.setStyleSheet(u"font: 700 36pt \"\ub9d1\uc740 \uace0\ub515\";\n"
"color: rgb(3, 199, 90);\n"
"border-color: rgb(255, 255, 255);\n"
"")
        self.frame = QFrame(self.widget_4)
        self.frame.setObjectName(u"frame")
        self.frame.setGeometry(QRect(20, 10, 120, 80))
        self.frame.setStyleSheet(u"border-image: url(:/newPrefix/retile01.png);\n"
"border-radius: 25%;")
        self.frame.setFrameShape(QFrame.StyledPanel)
        self.frame.setFrameShadow(QFrame.Raised)
        self.dark_mode_btn = QPushButton(self.centralwidget)
        self.dark_mode_btn.setObjectName(u"dark_mode_btn")
        self.dark_mode_btn.setGeometry(QRect(70, 20, 61, 61))
        icon = QIcon()
        icon.addFile(u":/newPrefix/moon_ligh.png", QSize(), QIcon.Normal, QIcon.Off)
        icon.addFile(u":/newPrefix/moon_dark.png", QSize(), QIcon.Normal, QIcon.On)
        self.dark_mode_btn.setIcon(icon)
        self.dark_mode_btn.setIconSize(QSize(40, 40))
        self.dark_mode_btn.setCheckable(True)
        self.left_mode_btn = QPushButton(self.centralwidget)
        self.left_mode_btn.setObjectName(u"left_mode_btn")
        self.left_mode_btn.setGeometry(QRect(70, 100, 61, 61))
        icon1 = QIcon()
        icon1.addFile(u":/newPrefix/right_hand.png", QSize(), QIcon.Normal, QIcon.Off)
        icon1.addFile(u":/newPrefix/left_hand.png", QSize(), QIcon.Normal, QIcon.On)
        self.left_mode_btn.setIcon(icon1)
        self.left_mode_btn.setIconSize(QSize(40, 40))
        self.left_mode_btn.setCheckable(True)
        self.sense_layout = QWidget(self.centralwidget)
        self.sense_layout.setObjectName(u"sense_layout")
        self.sense_layout.setGeometry(QRect(60, 210, 411, 301))
        self.sense_layout.setStyleSheet(u"border-radius: 25%;")
        self.temp_img = QColumnView(self.sense_layout)
        self.temp_img.setObjectName(u"temp_img")
        self.temp_img.setGeometry(QRect(0, 10, 131, 121))
        self.temp_img.setStyleSheet(u"border-image: url(:/newPrefix/temp.png);\n"
"border-radius: 25%")
        self.temp_val = QLabel(self.sense_layout)
        self.temp_val.setObjectName(u"temp_val")
        self.temp_val.setGeometry(QRect(130, 30, 121, 71))
        self.temp_val.setStyleSheet(u"color: rgb(3, 199, 90);\n"
"font-weight: \"Bolder\";\n"
"font: 700 62pt \"\ub9d1\uc740 \uace0\ub515\";\n"
"")
        self.temp_unit = QTextBrowser(self.sense_layout)
        self.temp_unit.setObjectName(u"temp_unit")
        self.temp_unit.setGeometry(QRect(250, 20, 111, 101))
        self.temp_unit.setStyleSheet(u"border-image: url(:/newPrefix/temperature_celsius_icon_137115.png);")
        self.humid_img = QColumnView(self.sense_layout)
        self.humid_img.setObjectName(u"humid_img")
        self.humid_img.setGeometry(QRect(10, 170, 101, 101))
        self.humid_img.setStyleSheet(u"border-radius: 25%;\n"
"border-image: url(:/newPrefix/humid.png);")
        self.humid_val = QLabel(self.sense_layout)
        self.humid_val.setObjectName(u"humid_val")
        self.humid_val.setGeometry(QRect(130, 170, 121, 71))
        self.humid_val.setStyleSheet(u"\n"
"color: rgb(3, 199, 90);\n"
"font-weight: \"Bolder\";\n"
"font: 700 62pt \"\ub9d1\uc740 \uace0\ub515\";\n"
"")
        self.humid_unit = QTextBrowser(self.sense_layout)
        self.humid_unit.setObjectName(u"humid_unit")
        self.humid_unit.setGeometry(QRect(250, 150, 131, 121))
        self.humid_unit.setStyleSheet(u"border-radius: 25%;\n"
"color: rgb(3, 199, 90);")
        self.actuator_layout = QWidget(self.centralwidget)
        self.actuator_layout.setObjectName(u"actuator_layout")
        self.actuator_layout.setGeometry(QRect(550, 168, 439, 361))
        self.actuator_layout.setStyleSheet(u"border-radius: 25%;")
        self.waterfall_btn = QPushButton(self.actuator_layout)
        self.waterfall_btn.setObjectName(u"waterfall_btn")
        self.waterfall_btn.setGeometry(QRect(130, 260, 81, 81))
        self.waterfall_btn.setStyleSheet(u"color: rgb(5, 148, 81);\n"
"\n"
"border-radius:25%;\n"
"font: 700 22pt \"\ub9d1\uc740 \uace0\ub515\";")
        icon2 = QIcon()
        icon2.addFile(u":/newPrefix/off.png", QSize(), QIcon.Normal, QIcon.Off)
        icon2.addFile(u":/newPrefix/on.png", QSize(), QIcon.Normal, QIcon.On)
        self.waterfall_btn.setIcon(icon2)
        self.waterfall_btn.setIconSize(QSize(80, 80))
        self.waterfall_btn.setCheckable(True)
        self.waterfall_img = QColumnView(self.actuator_layout)
        self.waterfall_img.setObjectName(u"waterfall_img")
        self.waterfall_img.setGeometry(QRect(20, 260, 81, 81))
        self.waterfall_img.setStyleSheet(u"border-radius: 25 ;\n"
"border-image: url(:/newPrefix/waterfall.png);\n"
"\n"
"")
        self.humidifier_btn = QPushButton(self.actuator_layout)
        self.humidifier_btn.setObjectName(u"humidifier_btn")
        self.humidifier_btn.setGeometry(QRect(330, 260, 81, 81))
        self.humidifier_btn.setStyleSheet(u"color: rgb(5, 148, 81);\n"
"\n"
"border-radius:25%;\n"
"font: 700 22pt \"\ub9d1\uc740 \uace0\ub515\";")
        self.humidifier_btn.setIcon(icon2)
        self.humidifier_btn.setIconSize(QSize(80, 80))
        self.humidifier_btn.setCheckable(True)
        self.humidifier_img = QColumnView(self.actuator_layout)
        self.humidifier_img.setObjectName(u"humidifier_img")
        self.humidifier_img.setGeometry(QRect(230, 250, 81, 81))
        self.humidifier_img.setStyleSheet(u"border-image: url(:/newPrefix/humidifier.png);\n"
"border-radius: 25%;")
        self.fan_btn = QPushButton(self.actuator_layout)
        self.fan_btn.setObjectName(u"fan_btn")
        self.fan_btn.setGeometry(QRect(130, 130, 81, 81))
        self.fan_btn.setStyleSheet(u"color: rgb(5, 148, 81);\n"
"\n"
"border-radius:25%;\n"
"font: 700 22pt \"\ub9d1\uc740 \uace0\ub515\";")
        self.fan_btn.setIcon(icon2)
        self.fan_btn.setIconSize(QSize(80, 80))
        self.fan_btn.setCheckable(True)
        self.fan_img = QColumnView(self.actuator_layout)
        self.fan_img.setObjectName(u"fan_img")
        self.fan_img.setGeometry(QRect(20, 130, 81, 81))
        self.fan_img.setStyleSheet(u"border-image: url(:/newPrefix/fan.png);\n"
"border-radius: 25%;")
        self.columnView = QColumnView(self.actuator_layout)
        self.columnView.setObjectName(u"columnView")
        self.columnView.setGeometry(QRect(20, 20, 81, 81))
        self.columnView.setStyleSheet(u"border-image: url(:/newPrefix/led.png);\n"
"border-radius: 25%;")
        self.horizontalSlider = QSlider(self.actuator_layout)
        self.horizontalSlider.setObjectName(u"horizontalSlider")
        self.horizontalSlider.setGeometry(QRect(140, 40, 181, 41))
        self.horizontalSlider.setStyleSheet(u"selection-color: rgb(157, 178, 151);\n"
"")
        self.horizontalSlider.setMaximum(255)
        self.horizontalSlider.setSingleStep(3)
        self.horizontalSlider.setOrientation(Qt.Horizontal)
        self.lock_btn = QPushButton(self.actuator_layout)
        self.lock_btn.setObjectName(u"lock_btn")
        self.lock_btn.setGeometry(QRect(340, 30, 71, 61))
        self.lock_btn.setStyleSheet(u"border-radius: 50%;\n"
"")
        icon3 = QIcon()
        icon3.addFile(u":/newPrefix/lock.png", QSize(), QIcon.Normal, QIcon.Off)
        icon3.addFile(u":/newPrefix/unlock.png", QSize(), QIcon.Normal, QIcon.On)
        self.lock_btn.setIcon(icon3)
        self.lock_btn.setIconSize(QSize(40, 40))
        self.lock_btn.setCheckable(True)
        self.heat_btn = QPushButton(self.actuator_layout)
        self.heat_btn.setObjectName(u"heat_btn")
        self.heat_btn.setGeometry(QRect(330, 130, 81, 81))
        self.heat_btn.setStyleSheet(u"color: rgb(5, 148, 81);\n"
"\n"
"border-radius:25%;\n"
"font: 700 22pt \"\ub9d1\uc740 \uace0\ub515\";")
        self.heat_btn.setIcon(icon2)
        self.heat_btn.setIconSize(QSize(80, 80))
        self.heat_btn.setCheckable(True)
        self.heat_img = QColumnView(self.actuator_layout)
        self.heat_img.setObjectName(u"heat_img")
        self.heat_img.setGeometry(QRect(230, 120, 81, 81))
        self.heat_img.setStyleSheet(u"border-image: url(:/newPrefix/heater.png);\n"
"border-radius: 25%;")
        MainWindow.setCentralWidget(self.centralwidget)
        self.menubar = QMenuBar(MainWindow)
        self.menubar.setObjectName(u"menubar")
        self.menubar.setGeometry(QRect(0, 0, 1024, 22))
        MainWindow.setMenuBar(self.menubar)
        self.statusbar = QStatusBar(MainWindow)
        self.statusbar.setObjectName(u"statusbar")
        MainWindow.setStatusBar(self.statusbar)

        self.retranslateUi(MainWindow)
        self.fan_btn.clicked.connect(MainWindow.fan_on)
        self.heat_btn.clicked.connect(MainWindow.heat_on)
        self.waterfall_btn.clicked.connect(MainWindow.waterfall_on)
        self.lock_btn.clicked.connect(MainWindow.lock_on)
        self.horizontalSlider.sliderReleased.connect(MainWindow.led_on)
        self.horizontalSlider.sliderMoved.connect(self.horizontalSlider.setValue)
        self.dark_mode_btn.clicked.connect(MainWindow.dark_mode_on)
        self.left_mode_btn.clicked.connect(MainWindow.left_mode_on)
        self.humidifier_btn.clicked.connect(MainWindow.humidifier_on)

        QMetaObject.connectSlotsByName(MainWindow)
    # setupUi

    def retranslateUi(self, MainWindow):
        MainWindow.setWindowTitle(QCoreApplication.translate("MainWindow", u"MainWindow", None))
        self.title.setText(QCoreApplication.translate("MainWindow", u"\ud30c \ucda9 \ub958 \uce58 \uc6d0 ", None))
        self.dark_mode_btn.setText("")
        self.left_mode_btn.setText("")
        self.temp_val.setText(QCoreApplication.translate("MainWindow", u"23", None))
        self.temp_unit.setHtml(QCoreApplication.translate("MainWindow", u"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><meta charset=\"utf-8\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"hr { height: 1px; border-width: 0; }\n"
"li.unchecked::marker { content: \"\\2610\"; }\n"
"li.checked::marker { content: \"\\2612\"; }\n"
"</style></head><body style=\" font-family:'\ub9d1\uc740 \uace0\ub515'; font-size:9pt; font-weight:400; font-style:normal;\">\n"
"<p align=\"center\" style=\"-qt-paragraph-type:empty; margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><br /></p></body></html>", None))
        self.humid_val.setText(QCoreApplication.translate("MainWindow", u"23", None))
        self.humid_unit.setHtml(QCoreApplication.translate("MainWindow", u"<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><meta charset=\"utf-8\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"hr { height: 1px; border-width: 0; }\n"
"li.unchecked::marker { content: \"\\2610\"; }\n"
"li.checked::marker { content: \"\\2612\"; }\n"
"</style></head><body style=\" font-family:'\ub9d1\uc740 \uace0\ub515'; font-size:9pt; font-weight:400; font-style:normal;\">\n"
"<p align=\"center\" style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-family:'Sans Serif'; font-size:70pt; font-weight:600; color:#03c75a;\">%</span></p></body></html>", None))
        self.waterfall_btn.setText("")
        self.humidifier_btn.setText("")
        self.fan_btn.setText("")
        self.lock_btn.setText("")
        self.heat_btn.setText("")
    # retranslateUi

