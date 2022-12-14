from unittest import result
import cv2
import mediapipe as mp
# Import the required module for text 
# to speech conversion
# from gtts import gTTS

# This module is imported so that we can 
# play the converted audio
import os
from playsound import playsound
# import pygame

def alert():
  playsound('./audios/np_input.wav')

def voiceover(hand, side):
  print("hey")
  if(hand == 'Left'):
    if(side == "palm"):
      return 1
    else:
      return 2
  else:
    if(side == "palm"):
      return 3
    else:
      return 4

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
    print('Handedness:', results.multi_handedness)
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
      print(hand)
      print(thumb_x)
      print(pinky_x)
      if(hand == "Left"):
        if(thumb_x > pinky_x):
          output = 1
        else:
          output = 2
      else:
        if(thumb_x > pinky_x):
          output = 4
        else:
          output = 3
      print(output)
      return output