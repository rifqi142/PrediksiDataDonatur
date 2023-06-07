from app import app
from app.controller import userController
from app.controller import dataController
from flask_cors import CORS, cross_origin
from flask import request, jsonify

cors = CORS(app)

@app.route('/', methods=['POST'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type', 'Authorization'])
def login():
    return userController.login()

@app.route('/register', methods=['POST'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type', 'Authorization'])
def register():
    return userController.add_user()
    

@app.route('/input-data', methods=['POST', 'GET'])
def input_data():
    if request.method == 'POST':
        return dataController.add_data()
    else: 
        return dataController.get_data()

@app.route('/health' , methods=['GET'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type', 'Authorization'])
def health():
    return 'Health is ok'

