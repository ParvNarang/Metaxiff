import exiftool
from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
import os
import glob

app = Flask(__name__)
all_items = {}
upload_folder = os.path.join('static', 'uploads')
app.config['UPLOAD'] = upload_folder


def delete_files():
    files_to_delete = glob.glob('static/uploads/*')
    for img in files_to_delete:
        os.remove(img)


@app.route('/', methods=['GET', 'POST'])
def upload_file():
    delete_files()
    if request.method == 'POST':
        file = request.files['img']
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD'], filename))
        img = os.path.join(app.config['UPLOAD'], filename)
        files = [img]
        all_items.clear()
        with exiftool.ExifToolHelper() as et:
            metadata = et.get_metadata(files)
            print(metadata)
            # for data in metadata:
            for i in metadata[0]:
                print(i[5:]+':', metadata[0][i])
                all_items[str(i[5:])] = str(metadata[0][i])
        name = all_items['eFile'][15:]
        return render_template('index.html', img=img, content=all_items, name=name)
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True, port=5000,host='0.0.0.0')
