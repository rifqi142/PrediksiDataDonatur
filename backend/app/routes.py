from app import app, response
from app.controller import userController
from app.controller import dataController

from flask import request, jsonify

@app.route('/', methods=['POST'])
def login():
    return userController.login()

@app.route('/register', methods=['POST'])
def register():
    return userController.add_user()

@app.route('/input-data', methods=['POST', 'GET'])
def input_data():
    if request.method == 'POST':
        return dataController.add_data()
    else: 
        return dataController.get_data()

