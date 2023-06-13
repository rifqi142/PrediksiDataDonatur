import io, csv, os
import datetime as dt
# import pandas as pd
from app.model.dataset import Dataset
from app import response, db
from flask import request

def add_data():
    try:
        file = request.files['file']
        load_data = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
        csv_data = csv.reader(load_data)
        next(csv_data)
        for row in csv_data:
            tanggal = dt.datetime.strptime(row[1], "%d/%m/%Y").date()  # Convert to date object
            iso_format = tanggal.isoformat()  # Convert to ISO format
            val = Dataset(no=row[0], tanggal=iso_format, jenis_donasi=row[2], jumlah_donasi=row[3])
            db.session.add(val)
            db.session.commit()
        return response.success('', 'Berhasil menambahkan data')
    except Exception as e:
        print(e)
        return response.badRequest([], 'Internal server error: ' + str(e))

def get_data():
    try:
        dataset = Dataset.query.all()
        data = formatArray(dataset)
        return response.success(data, 'Berhasil mengambil data')
    except Exception as e:
        print(e)

def formatArray(data):
    array = []
    
    for i in data:
        array.append(singleTransform(i))
        
    return array

def singleTransform(data):
    data = {
        'no': data.no,
        'tanggal': data.tanggal,
        'jenis_donasi': data.jenis_donasi,
        'jumlah_donasi': data.jumlah_donasi,
    }