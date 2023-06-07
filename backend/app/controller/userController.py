from app.model.user import User
from app import response, db
from flask import request, jsonify

def add_user():
    try:
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        
        user = User(username=username, email=email, password=password)
        user.setPassword(password)
        #inser to db
        db.session.add(user)
        db.session.commit()
        return response.success('', 'Berhasil menambahkan data user!!')
    except Exception as e:
        print(e)
        return response.badRequest([], 'Internal server error')

def singleTransform(data):
    data = {
        'id': data.id,
        'username': data.username,
        'email': data.email,
    }

def login():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        
        user = User.query.filter_by(email=email).first()
        
        if not user:
            return response.badRequest([], 'Email tidak terdaftar')
        
        if not user.checkPassword(password):
            return response.badRequest([], 'Password salah')
        
        data = singleTransform(user)
        return response.success(data, 'Berhasil login')
    except Exception as e:
        print(e)
        return response.badRequest([], 'Internal server error')
