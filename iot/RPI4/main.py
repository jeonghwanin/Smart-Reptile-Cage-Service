# module for camera
import cv2
from flask import Flask, Response
import ssl

# module for servo moter
import pigpio

# module for mqtt protocol
import paho.mqtt.client as mqtt

# module for multithreading
import threading
import time

# recognition
import numpy as np

# camera server
app = Flask(__name__)

n = 0
frame = 0
ret = False

def generate_frames():
    global n
    global ret
    # Get frames from camera on infinite loop

    # Open the Raspberry Pi camera
    cap = cv2.VideoCapture(0)

    # Set width and height  320,240
    #cap.set(3,512)
    #cap.set(4,384)

    #cap.set(3,640)
    #cap.set(4,480)
    
    #cap.set(3,300)
    #cap.set(4,300)
    
    cap.set(3,320)
    cap.set(4,240)

    # Start loop 
    while True:
        global frame 
        n = n + 1
        # Read a frame from the camera
        ret, frame = cap.read()

        # Encode the frame in JPEG format
        ret, buffer = cv2.imencode('.jpg', frame)
        

        # Convert the frame to bytes
        frame_bytes = buffer.tobytes()

        # Yield the frame as a byte string for streaming
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

    # Release the camera
    cap.release()

def recognize():
    global ret
    global frame
    # Load YOLO
    net = cv2.dnn.readNet("yolov3-tiny_obj_best.weights", "yolov3-tiny_obj.cfg")


    classes = []
    with open("ClassNames.names", "r") as f:
        classes = f.read().strip().split("\n")
    
    print('load model')
   
    while True:
        # Check getting correct frame
        if not ret:
            continue

        height, width, _ = frame.shape

        # Preprocess image
        blob = cv2.dnn.blobFromImage(frame, scalefactor=1/255.0, size=(416, 416), swapRB=True, crop=False)
        net.setInput(blob)

        # Perform forward pass
        layer_names = net.getUnconnectedOutLayersNames()
        outs = net.forward(layer_names)

        # Process and display detections
        for out in outs:
            for detection in out:
                scores = detection[5:]
                class_id = np.argmax(scores)
                confidence = scores[class_id]

                if confidence > 0.5:  # Set a confidence threshold
                    center_x = int(detection[0] * width)
                    center_y = int(detection[1] * height)
                    #w = int(detection[2] * width)
                    #h = int(detection[3] * height)

                    #x = int(center_x - w / 2)
                    #y = int(center_y - h / 2)

                    label = f"{classes[class_id]}: {confidence:.2f}"
                    #cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                    #cv2.putText(frame, label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
                    print(label)
                    if center_x < 320:
                        pin = 18
                        print('left')
                        set_servo_angle(pin, get_servo_angle(pin) - 10)
                    elif center_x > 320:
                        pin = 18
                        print('right')
                        set_servo_angle(pin, get_servo_angle(pin) + 10)
                    if center_y < 240:
                        pin = 13
                        print('up')
                        set_servo_angle(pin, get_servo_angle(pin) + 10)
                    elif center_y > 240:
                        pin = 13
                        print('down')
                        set_servo_angle(pin, get_servo_angle(pin) - 10)



        print('next') 
    print('load model')

# Flask servor routing
@app.route('/')
def video_feed():

    # Return the streaming response
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


# servo moter
def set_servo_angle(pin, angle):

    # arg1 : pin is pin number
    # arg2 : angle is degree you want to set for servo
    # set frequency, dutycycle to make servo angle
    if angle >= 140 or angle <= 40:
        return
    # set servo_pin frequency
    servo_pin = pin
    pi.set_PWM_frequency(servo_pin, 50)

    # get angle for now
    nowangle = get_servo_angle(servo_pin)

    # adjust servo untill nowangle is same for angle
    while nowangle != angle:
        if nowangle < angle:
            nowangle = nowangle + 1
        else:
            nowangle = nowangle - 1

        # get dutycycle for newangle
        dutycycle =  int(nowangle/180.0*255)
        # set dutycycle
        pi.set_PWM_dutycycle(servo_pin, dutycycle)
        # delay
        time.sleep(0.1)
    
    # it's finish
    print('finish')

def dir_servo_angle(dir):
    if dir == 'up':
        pin = 13
        set_servo_angle(pin, get_servo_angle(pin) + 10)
    elif dir == 'down':
        pin = 13
        set_servo_angle(pin, get_servo_angle(pin) - 10)
    elif dir == 'left':
        pin = 18
        set_servo_angle(pin, get_servo_angle(pin) - 10)
    elif dir == 'right':
        pin = 18
        set_servo_angle(pin, get_servo_angle(pin) + 10)

def get_servo_angle(pin):

    # arg : pin is pin_number
    # get angle for now

    duty = pi.get_PWM_dutycycle(pin)
    return int(duty/255.0*180)


# init pigpio
pi = pigpio.pi()
# set init frequency, dutycycle
pi.set_PWM_frequency(18, 50)
pi.set_PWM_range(18,2000)
pi.set_PWM_dutycycle(18, int(90/180.0*255))

pi.set_PWM_frequency(13, 50)
pi.set_PWM_range(13,2000)
pi.set_PWM_dutycycle(13, int(90/180.0*255))

# delay
time.sleep(1)


#mqtt
def on_connect(client, userdata, flags, rc):
    # arg1 : client is Clinet object for mqtt
    # arg2 : userdata 

    # subscribe topic "angle"
    client.subscribe("1/angle")


def on_message(client, userdata, msg):
    # arg1 : client is Clinet object for mqtt
    # arg2 : userdata 
    # arg3 : msg is data for mqtt communication
    

    #data = json.loads(msg.payload.decode('utf-8'))

    # decode meg to utf-8
    msg.payload = msg.payload.decode("utf-8")
    print(msg.payload)
    # set angle for msg degree
    dir_servo_angle(msg.payload)

    # print(msg)
    print(msg.payload)

# init mqtt client
client = mqtt.Client()
client.username_pw_set("RPI4", "1234")
client.on_connect = on_connect
client.on_message = on_message
client.connect("43.202.68.60", 1883, 60)

def mqtt_thread():
    # inifinite loop for mqtt communication
    while True:
        client.loop_forever()

def main():
    # multithreading mqtt_tjhread, app_thread
    try:
        t1 = threading.Thread(target=mqtt_thread)
        #t2 = threading.Thread(target=recognize)
        t1.start()
        #t2.start()
        #ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS)
        #ssl_context.load_cert_chain(certfile='fullchain1.pem', keyfile='privkey.pem')
        while True:
            #app.run(host='0.0.0.0', port=443, debug=True, ssl_context=ssl_context)
            #app.run(host='0.0.0.0', port=443, ssl_context=('./fullchain1.crt', './privkey.key'))
            app.run(host='0.0.0.0', port=443, ssl_context=('/home/pi/S09P12A101/iot/RPI4/fullchain1.crt', '/home/pi/S09P12A101/iot/RPI4/privkey.key'))
            #app.run(host='0.0.0.0', port='8008', debug=True)

    # to exit use Keyboard Interrupt
    except KeyboardInterrupt:
        t1.join()
        #t2.join()


if __name__ == '__main__':
    main()
    
