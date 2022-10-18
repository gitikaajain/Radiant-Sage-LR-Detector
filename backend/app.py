from flask import Flask
import cv2
import test

app = Flask(__name__)
@app.route('/scan', methods = ['POST'])
def scan():
    img = cv2.imread('./pictures/left_hand.jpg')
    return test.scan_image(cv2.imread('./pictures/left_hand.jpg'))
    # img = request.form.get('inputImage')
    # test.scan_image(img)

print(test.scan_image(cv2.imread('./pictures/left_hand.jpg')))