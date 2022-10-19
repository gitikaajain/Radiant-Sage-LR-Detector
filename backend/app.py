from flask import Flask, request
# import flask_cors
import cv2
import test
from flask_cors import CORS, cross_origin
from flask import jsonify

app = Flask(__name__)
HOST = "http://192.168.29.245"
PORT = 5000
cors = CORS(app)

@app.route('/', methods = ['GET'])
def greet():
    return {"greet": "Hellooo"}
    # img = request.form.get('inputImage')
    # test.scan_image(img)

@app.route('/scan', methods = ['POST'])
def scan():
    bytesOfImage = request.get_data()
    with open('image.jpeg', 'wb') as out:
        out.write(bytesOfImage)
    return jsonify({"audio_no": test.scan_image(cv2.imread('./image.jpeg'))})
    print("HELLOO")
    img = cv2.imread('./pictures/left_hand.jpg')
    
    # img = request.form.get('inputImage')
    # test.scan_image(img)

if __name__ == "__main__":
    app.run(debug=True)

# print(test.scan_image(cv2.imread('./pictures/left_hand.jpg')))