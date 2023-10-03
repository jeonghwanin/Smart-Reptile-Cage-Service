#!/bin/usr/env python

import cv2
import numpy as np

# load yolo
net = cv2.dnn.readNet("yolov3.weights", "yolov3.cfg")
classes = []
with open("coco.names", "r") as f:
    classes = f.read().strip().split("\n")

# load image and perform object detection
def detect_reptiles():

    cap = cv2.VideoCapture(0)

    cap.set(3,640)
    cap.set(4,480)

    while True:

        ret, frame = cap.read()
        if not ret:
            break
        img = frame
        height, width, _ = img.shape

        
    # Preprocess image
        blob = cv2.dnn.blobFromImage(img, scalefactor=1/255.0, size=(416,416), swapRB=True, crop=False)
        net.setInput(blob)
        print('1')
        
    # Perform forward pass
        layer_names = net.getUnconnectedOutLayersNames()
        outs = net.forward(layer_names)


        #class_ids = []
        #confidences = []
        #boxes = []

    # process detection results
        for out in outs:
            for detection in out:
                scores = detection[5:]
                class_id = np.argmax(scores)
                confidence = scores[class_id]

                if confidence > 0.5:
                    center_x = int(detection[0] * width)
                    center_y = int(detection[1] * height)
                    w = int(detection[2] * width)
                    h = int(detection[3] * height)

                    x = int(center_x - w / 2)
                    y = int(center_y - h / 2)
                    label = f"{classes[class_id]}: {confidence:.2f}"
                    cv2.rectangle(img, (x,y), (x+w,y+h), (0,255,0), 2)
                    cv2.putText(frame, label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

                    #class_ids.append(class_id)
                    #confidences.append(float(confidence))
                    #boxes.append([x,y,w,h])
   
        #indexes = cv2.dnn.NMSBoxes(boxes, confidences, score_threshold=0.5, nms_threshold=0.4)
        print('2')

        #for i in indexes:
            #i = i[0]
            #box = boxes[i]
            #x, y, w, h = box
            #label = str(classes[class_ids[i]])
            #confidence = confidences[i]


        #cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
        #cv2.putText(img, f"{label}: {confidence:.2f}", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        #print('3')

        cv2.imshow("Reptile Detection", img)
        if cv2.waitKey(1) == ord('q'):
            break
        print('4')
    camera.release()
    cv2.destoryAllWindows()

detect_reptiles()

