from flask import Flask
import test

app = Flask(__name__)
@app.route('/scan', methods = ['POST'])
def scan():
    img = request.form.get('inputImage')
    test.scan_image(img)
# test.scan_image('./pictures/left_hand.jpg')