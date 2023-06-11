from app import app
from app.controller import userController
from app.controller import dataController
from flask_cors import CORS, cross_origin
from flask import request, jsonify
import io, csv
# import pandas as pd
from app.model.dataset import Dataset
from app import response, db

cors = CORS(app)

@app.route('/', methods=['POST'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type', 'Authorization'])
def login():
    return userController.login()

@app.route('/register', methods=['POST'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type', 'Authorization'])
def register():
    return userController.add_user()
    

@app.route('/input-data', methods=['POST'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type', 'Authorization'])
def input_data():
    return dataController.add_data()
    # if request.method == 'POST':
    #     file = request.files['file']
    #     if file:
    #         load_file = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
    #         csv_data = csv.reader(load_file)
    #         next(csv_data)
    #         for row in csv_data:
    #             val = Dataset(no=row[0], tanggal=row[1], jenis_donasi=row[2], jumlah_donasi=row[3])
    #             db.session.add(val)
    #             db.session.commit()
        
    
@app.route('/health' , methods=['GET'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type', 'Authorization'])
def health():
    return 'Health is ok'

