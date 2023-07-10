from app import app
from app.controller import userController, predictController, dataController, masterController
from flask_cors import CORS, cross_origin
from flask import request, jsonify
# import pandas as pd
from app.model.dataset import Dataset

cors = CORS(app)

# login user
@app.route('/', methods=['POST'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type', 'Authorization'])
def login():
    return userController.login()

# get all user
@app.route('/<id>', methods=['GET'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type', 'Authorization'])
def get_user(id):
    return userController.get_user(id)

# register user
@app.route('/register', methods=['POST'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type', 'Authorization'])
def register():
    return userController.add_user()
    
# input data ke database
@app.route('/input-data', methods=['POST'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type', 'Authorization'])
def input_data():
    return dataController.add_data()

# get data by id untuk input pages
@app.route('/get-last-data', methods=['GET'])
def get_last_data():
    return dataController.get_last_data()

# get data by id untuk history pages
@app.route('/get-new-data/<id>', methods=['GET'])
def get_new_data_id(id):
    return dataController.get_data_id(id)

# delete data by id untuk history pages
@app.route('/delete-data/<id>', methods=['DELETE'])
def delete_data(id):
    return dataController.delete_data(id)

# get data hasil prediksi by id untuk history pages
@app.route('/get-data-master', methods=['GET'])
def get_data_master():
    return masterController.get_data()

# proses prediksi menggunakan random forest regressor untuk data terakhir
@app.route('/proses-predict', methods=['POST'])
def proses_predict():
    return predictController.proses_predict()

# get data hasil prediksi by id untuk history pages
@app.route('/get-data-predict/<id>', methods=['GET'])
def get_predict(id):
    return dataController.get_hasil_id(id)

# get data hasil prediksi by id untuk hasil proses prediksi
@app.route('/get-last-hasil', methods=['GET'])
def get_last_hasil():
    return dataController.get_last_hasil()

# mengirim data chart ke frontend jumdonasi
@app.route('/get-chart-donasi', methods=['GET'])
def get_chart_jumDonasi():
    return predictController.get_chart_data()

# mengirim data chart ke frontend jumdata
@app.route('/get-chart-data', methods=['GET'])
def get_chart_jumData():
    return predictController.get_chart_data2()

