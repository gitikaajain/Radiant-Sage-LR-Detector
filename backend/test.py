import cv2
import mediapipe as mp
# Import the required module for text 
# to speech conversion
from gtts import gTTS

# This module is imported so that we can 
# play the converted audio
import os
from playsound import playsound
import pygame



# pygame.quit()

mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_hands = mp.solutions.hands

print('hello')
import threading
def alert():
  pass
    # pygame.init()
    # pygame.mixer.music.load('welcome.wav')
    # pygame.mixer.music.play()
    # threading.Thread(target=playsound, args=('welcome.wav',), daemon=True).start()

# For webcam input:
cap = cv2.VideoCapture(0)
with mp_hands.Hands(
    model_complexity=0,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5) as hands:
  while cap.isOpened():
    success, image = cap.read()
    if not success:
      print("Ignoring empty camera frame.")
      # If loading a video, use 'break' instead of 'continue'.
      continue

    # To improve performance, optionally mark the image as not writeable to
    # pass by reference.
    image.flags.writeable = False
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = hands.process(image)

    # Draw the hand annotations on the image.
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    if results.multi_hand_landmarks:
      for hand_landmarks in results.multi_hand_landmarks:
        mp_drawing.draw_landmarks(
            image,
            hand_landmarks,
            mp_hands.HAND_CONNECTIONS,
            mp_drawing_styles.get_default_hand_landmarks_style(),
            mp_drawing_styles.get_default_hand_connections_style())
    # Flip the image horizontally for a selfie-view display.
    cv2.imshow('MediaPipe Hands', cv2.flip(image, 1))
    ans = results.multi_handedness
    if(ans == None):
      # # The text that you want to convert to audio
      # mytext = 'Hand input not received'
      # # Language in which you want to convert
      # language = 'en'
      # # Passing the text and language to the engine, 
      # # here we have marked slow=False. Which tells 
      # # the module that the converted audio should 
      # # have a high speed
      # myobj = gTTS(text=mytext, lang=language, slow=False)
      # # Saving the converted audio in a mp3 file named
      # # welcome 
      # myobj.save("welcome.mp3")
      # # Playing the converted file
      # os.system("mpg321 welcome.mp3")
      alert()
    else:
      print(ans[0].classification[0].label)
    # print(results.multi_handedness)
    if cv2.waitKey(5) & 0xFF == 27:
      break
cap.release()