from app import app, response

from flask import request, jsonify

@app.route('/')
def index():
    return 'Hello Flask App'