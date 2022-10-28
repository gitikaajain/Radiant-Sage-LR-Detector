import this
from unittest import result
import numpy as np
import cv2
import mediapipe as mp
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_hands = mp.solutions.hands

joint_list = [[3,0,6], [6,0,10], [10,0,14], [14,0,18]]
left_palm_close = [23.42, 10.13, 8.48, 13.67]
left_back_close = [12.9, 6.59, 6.06, 8.86]
right_palm_close = [20.84, 9.15, 11.77, 10.49]
right_back_close = [10.49, 9.46, 8.56, 13.28]


def scan_image(img):
  mp_drawing = mp.solutions.drawing_utils
  mp_drawing_styles = mp.solutions.drawing_styles
  mp_hands = mp.solutions.hands
  # For static images:
  with mp_hands.Hands(
      static_image_mode=True,
      max_num_hands=2,
      min_detection_confidence=0.5) as hands:
    image = cv2.flip(img, 1)
    # Convert the BGR image to RGB before processing.
    results = hands.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    # Print handedness and draw hand landmarks on the image.
    # print('Handedness:', results.multi_handedness)
    if not results.multi_hand_landmarks:
      return 0
    image_height, image_width, _ = image.shape
    annotated_image = image.copy()
    ans = results.multi_handedness
    output = 0
    if(ans == None):
      output = 0
      # alert()
    else:
      hand = ans[0].classification[0].label
      thumb_x = results.multi_hand_landmarks[0].landmark[4].x
      pinky_x = results.multi_hand_landmarks[0].landmark[20].x
      side = "back"
      if(hand == "Left"):
        if(thumb_x > pinky_x):
          output = 1
          side = "palm"
          print("LEFT PALM")
        else:
          output = 2
          print("LEFT BACK")
      else:
        if(thumb_x > pinky_x):
          output = 4
          print("RIGHT BACK")
        else:
          output = 3
          side = "palm"
          print("RIGHT PALM")

      arr = draw_finger_angles(results, joint_list, hand, side)
      return [output, arr]

def draw_finger_angles(results, joint_list, hand, side):
    print("In finger angle function")
    # Loop through hands
    thumb_index = False
    index_middle = False
    middle_ring = False
    ring_pinky = False
    for hand in results.multi_hand_landmarks:
        #Loop through joint sets 
        for idx, joint in enumerate(joint_list):
            a = np.array([hand.landmark[joint[0]].x, hand.landmark[joint[0]].y]) # First coord
            b = np.array([hand.landmark[joint[1]].x, hand.landmark[joint[1]].y]) # Second coord
            c = np.array([hand.landmark[joint[2]].x, hand.landmark[joint[2]].y]) # Third coord
            
            radians = np.arctan2(c[1] - b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
            angle = np.abs(radians*180.0/np.pi)
            
            if angle > 180.0:
                angle = round(360-angle, 2)
            if(idx == 0):
              if(side == "palm"):
                if(angle <= 23.42):
                  thumb_index = True
              else:
                if(angle <= 12.9):
                  thumb_index = True
              print("Thumb and Index angle: ", round(angle, 2))
            elif(idx == 1):
              if(side == "palm"):
                if(angle <= 10.13):
                  index_middle = True
              else:
                if(angle <= 9.46):
                  index_middle = True
              print("Index and Middle angle: ", angle)
            elif(idx == 2):
              if(side == "palm"):
                if(angle <= 11.77):
                  middle_ring = True
              else:
                if(angle <= 8.56):
                  middle_ring = True
              print("Middle and Ring angle: ", angle)
            elif(idx == 3):
              if(side == "palm"):
                if(angle <= 13.67):
                  ring_pinky = True
              else:
                if(angle <= 13.28):
                  ring_pinky = True
              print("Ring and Pinky angle: ", angle)
    print("Out of finger angle function")
    print("Thumb and Index Finger joined: ", thumb_index)
    print("Index and Middle Finger joined: ", index_middle)
    print("Middle and Ring Finger joined: ", middle_ring)
    print("Ring and Pinky Finger joined: ", ring_pinky)
    return [thumb_index, index_middle, middle_ring, ring_pinky]

# scan_image(cv2.imread('/home/mayank/Downloads/WhatsApp Unknown 2022-10-27 at 7.12.28 PM/3.jpeg'))