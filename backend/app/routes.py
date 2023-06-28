from app import app
from app.controller import userController, predictController, dataController, masterController
from flask_cors import CORS, cross_origin
from flask import request, jsonify
# import pandas as pd
from app.model.dataset import Dataset

cors = CORS(app)

@app.route('/', methods=['POST'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type', 'Authorization'])
def login():
    return userController.login()

@app.route('/<id>', methods=['GET'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type', 'Authorization'])
def get_user(id):
    return userController.get_user(id)

@app.route('/register', methods=['POST'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type', 'Authorization'])
def register():
    return userController.add_user()
    

@app.route('/input-data', methods=['POST'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type', 'Authorization'])
def input_data():
    return dataController.add_data()

@app.route('/get-new-data', methods=['GET'])
def get_new_data():
    return dataController.get_data()

@app.route('/get-last-data', methods=['GET'])
def get_last_data():
    return dataController.get_last_data()

@app.route('/get-new-data/<id>', methods=['GET'])
def get_new_data_id(id):
    return dataController.get_data_id(id)

@app.route('/delete-data/<id>', methods=['DELETE'])
def delete_data(id):
    return dataController.delete_data(id)

@app.route('/get-data-master', methods=['GET'])
def get_data_master():
    return masterController.get_data()

@app.route('/proses-predict', methods=['POST'])
def proses_predict():
    return predictController.proses_predict()


