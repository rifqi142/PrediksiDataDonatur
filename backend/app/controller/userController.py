from app.model.user import User
from app import response, app, db
from flask import request

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

def singleTransform(data):
    data = {
        'id': data.id,
        'username': data.name,
        'email': data.email,
    }

def login():
    try:
        email = request.form.get('email')
        password = request.form.get('password')
        
        user = User.query.filter_by(email=email).first()
        
        if not user:
            return response.badRequest([], 'Email tidak terdaftar')
        
        if not user.checkPassword(password):
            return response.badRequest([], 'Password salah')
        
        data = singleTransform(user)
        return response.success(data, 'Berhasil login')
    except Exception as e:
        print(e)