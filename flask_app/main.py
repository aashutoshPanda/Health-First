from flask import jsonify
import cloudinary.uploader
import os
from pathlib import Path
from werkzeug.utils import secure_filename
from flask import Flask, render_template, request, jsonify
import cv2
import numpy as np
import environ
env = environ.Env()
environ.Env.read_env()

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = os.getcwd() + "/api_uploaded_files/"

cloudinary.config.update = ({
    'cloud_name': env('CLOUDINARY_CLOUD_NAME'),
    'api_key': env('CLOUDINARY_API_SECRET'),
    'api_secret':  env('CLOUDINARY_API_KEY'),
})

# route to extract text from given pdf file


@app.route('/detect', methods=['GET', 'POST'])
def detect():
    if request.method == 'POST':
        # saving the recived pdf file to upload folder
        f = request.files['file']
        f.save(os.path.join(
            app.config['UPLOAD_FOLDER'], secure_filename(f.filename)))

        # making pathlib 'Path' object to send to helper function
        img_path = os.getcwd() + "/api_uploaded_files/" + f.filename

        pedsCascade = cv2.CascadeClassifier("cascade.xml")

        # Read the image
        image = cv2.imread(img_path)
        # resized_img = cv2.resize(image, (128, 128))
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # detect coins in pic

        catarat = pedsCascade.detectMultiScale(
            gray,
            scaleFactor=1.3,
            minNeighbors=2,
            minSize=(50, 50)
        )

        print("Found {0} catarats!".format(len(catarat)))

        # Draw a rectangle around the peds
        for (x, y, w, h) in catarat:
            cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)

        # cv2.imshow("Faces found", image)
        status = cv2.imwrite(f'{f.filename}-processed.jpg', image)
        print("Image written to file-system : ", status)

        img_encode = cv2.imencode('.jpg', image)[1]
        data_encode = np.array(img_encode)
        str_encode = data_encode.tostring()

        cloudinary_response = cloudinary.uploader.upload(str_encode)
        profile_image_url = cloudinary_response["secure_url"]
        print(profile_image_url)

        return jsonify(
            img_url=profile_image_url,
            found="true" if len(catarat) > 0 else "false"
        )

    return render_template('index.html')

# route to extract text(without stop-words) from given pdf file


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
