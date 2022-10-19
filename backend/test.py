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

def voiceover(palm, side):
  if(palm == 'Left'):
    if(side == "palm"):
      return 1
    else:
      return 2
  else:
    if(side == "palm"):
      return 3
    else:
      return 4
  
    # playsound('./audios/left_palm.wav')
  # elif(palm == 'Right'):
    # playsound('./audios/right_palm.wav')

def scan_image(img):
  mp_drawing = mp.solutions.drawing_utils
  mp_drawing_styles = mp.solutions.drawing_styles
  mp_hands = mp.solutions.hands

  # For static images:
  # IMAGE_FILES = [img]
  with mp_hands.Hands(
      static_image_mode=True,
      max_num_hands=2,
      min_detection_confidence=0.5) as hands:
    # for idx, file in enumerate(IMAGE_FILES):
      # Read an image, flip it around y-axis for correct handedness output (see
      # above).
      # image = cv2.flip(cv2.imread(file), 1)
    image = cv2.flip(img, 1)
      # Convert the BGR image to RGB before processing.
    results = hands.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
      # Print handedness and draw hand landmarks on the image.
    print('Handedness:', results.multi_handedness)
    if not results.multi_hand_landmarks:
      print(0)
      return 0
    image_height, image_width, _ = image.shape
    annotated_image = image.copy()
    ans = results.multi_handedness
    output = 0
    if(ans == None):
      output = 0
      # alert()
    else:
      thumb_x = results.multi_hand_landmarks[0].landmark[4].x
      pinky_x = results.multi_hand_landmarks[0].landmark[20].x
      side = "back"
      if(thumb_x > pinky_x):
        side = "palm"
        output = voiceover(ans[0].classification[0].label, side)
        # print("palm")
      else:
          # print("back")
        output = voiceover(ans[0].classification[0].label, side)
      print(output)
      # return output
      # voiceover(ans[0].classification[0].label)
      return output
      # for hand_landmarks in results.multi_hand_landmarks:
      #   mp_drawing.draw_landmarks(
      #       annotated_image,
      #       hand_landmarks,
      #       mp_hands.HAND_CONNECTIONS,
      #       mp_drawing_styles.get_default_hand_landmarks_style(),
      #       mp_drawing_styles.get_default_hand_connections_style())
      # cv2.imwrite(
      #     '/tmp/annotated_image' + str(idx) + '.png', cv2.flip(annotated_image, 1))
      # Draw hand world landmarks.
      # if not results.multi_hand_world_landmarks:
      #   continue
      # for hand_world_landmarks in results.multi_hand_world_landmarks:
      #   mp_drawing.plot_landmarks(
      #     hand_world_landmarks, mp_hands.HAND_CONNECTIONS, azimuth=5)

# scan_image(cv2.imread('./pictures/left_hand.jpg'))