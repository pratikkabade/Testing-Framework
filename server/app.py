from flask import Flask, jsonify, send_file
import os
from flask_cors import CORS
import subprocess
import shutil

app = Flask(__name__)
CORS(app)

PORT = 5000

@app.route('/')
def home():
    print('server check successful')
    return jsonify(response='200')

@app.route('/<app>/<id>')
def run_script(app, id):
    file_path = f'scripts/{app}/{id}.py'
    if os.path.isfile(file_path):
        try:
            result = subprocess.run(['python', file_path], capture_output=True, text=True)
            print(f'Script #{id} executed!')
            return jsonify(result.stdout.splitlines())
        except Exception as e:
            print(f'Error executing script #{id}: {e}')
            return jsonify(['Error executing script', str(e)])
    else:
        print('No Script Found!')
        return jsonify(['No Script Found'])

@app.route('/<app>/<id>/Download')
def download_file(app, id):
    script_path = f'scripts/{app}/{id}.py'
    output_folder = f'output/{app}/{id}'
    zip_file = f'output/{app}/{id}.zip'
    download_file = f'output/{app}/{id}/Script-{int(id)+1}.zip'

    if os.path.isfile(script_path):
        try:
            # Run the script
            subprocess.run(['python', script_path], capture_output=True, text=True)
            print(f'Script #{id} executed!')

            # Check if the output folder exists
            if os.path.isdir(output_folder):
                # Create a zip file of the output folder
                shutil.make_archive(output_folder, 'zip', output_folder)
                shutil.move(zip_file, download_file)
                return send_file(download_file, as_attachment=True)
            else:
                return jsonify(['Output folder not found'])
        except Exception as e:
            print(f'Error executing script #{id}: {e}')
            return jsonify(['Error executing script'])
    else:
        print('No Script Found!')
        return jsonify(['No Script Found!'])

if __name__ == '__main__':
    app.run(port=PORT, debug=True)
