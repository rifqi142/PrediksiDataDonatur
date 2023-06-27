import pandas as pd
from sklearn.metrics import mean_absolute_percentage_error
import numpy as np
from sklearn.ensemble import RandomForestRegressor

from app.model.master import Master
from app.model.hasil_prediksi import Hasil_prediksi
from app.model.dataset import Dataset
from app import response, db
from flask import request
from sqlalchemy import desc

def formatArray(data):
    array = []
    
    for i in data:
        array.append(singleTransform(i))
        
    return array

def singleTransform(data):
    data = {
        'tahun': data.tahun,
        'bulan': data.bulan,
        'jenis_donasi': data.jenis_donasi,
        'jumlah_donasi': data.jumlah_donasi,
        'jumlah_data': data.jumlah_data,
        'id_master': data.id_master,
    }
    return data

def proses_predict(): 
    try:
        # mendapatkan data terakhir
        dataset = Dataset.query.order_by(desc(Dataset.id)).limit(1).all()
        
        if not dataset:
            return response.badRequest([], 'Data tidak ditemukan')
        
        datalast = Dataset.query.filter_by(id_master=dataset[0].id_master).all()
        data = formatArray(datalast)
        
        selected_value = request.json['selectedValue']
        
        ## jika value 1 maka proses prediksi jumlah donasi
        if selected_value == '1': 
            # Melakukan one-hot encoding pada kolom "jenis_donasi"
            dataset_encoded = pd.get_dummies(data, columns=['jenis_donasi'])
        
            # memisahkan fiture dan target
            X = dataset_encoded.drop(['tahun, bulan, jumlah_donasi'], axis=1)
            y = dataset_encoded['jumlah_donasi']
            
            # mambagi data menjadi data training dan data testing
            train_size = int(len(dataset_encoded) * 0.8)
            X_train, X_test = X[:train_size], X[train_size:]
            y_train, y_test = y[:train_size], y[train_size:]
            
            # membuat model random forest
            model = RandomForestRegressor()
            model.fit(X_train, y_train)
            
            # Melakukan prediksi pada data uji
            y_pred = model.predict(X_test)
            
            # Menghitung nilai MAPE
            mape = mean_absolute_percentage_error(y_test, y_pred)
            
            hasil_prediksi = pd.DataFrame({
                'tahun': data['tahun'].iloc[train_size:],
                'bulan': data['bulan'].iloc[train_size:],
                'jenis_donasi': data['jenis_donasi'].iloc[train_size:],
                'prediksi': y_pred,
                'ekspektasi': y_test,
                'mape': mape
            })
            
            for row in hasil_prediksi:
                val = Hasil_prediksi(tahun=row[1], bulan=row[2], jenis_donasi=row[3], prediksi_donasi=row[4], ekspektasi_donasi=row[5], mape=row[6])
                db.session.add(val)
                db.session.commit()
            return response.success('', 'Berhasil memproses data')
        else:
            ## jika value 2 maka proses prediksi jumlah data
            # Melakukan one-hot encoding pada kolom "jenis_donasi"
            dataset_encoded = pd.get_dummies(data, columns=['jenis_donasi'])
            
            # memisahkan fiture dan target
            X = dataset_encoded.drop(['tahun, bulan, jumlah_data'], axis=1)
            y = dataset_encoded['jumlah_data']
            
            # mambagi data menjadi data training dan data testing
            train_size = int(len(dataset_encoded) * 0.8)
            X_train, X_test = X[:train_size], X[train_size:]
            y_train, y_test = y[:train_size], y[train_size:]
            
            # membuat model random forest
            model = RandomForestRegressor()
            model.fit(X_train, y_train)
            
            # Melakukan prediksi pada data uji
            y_pred = model.predict(X_test)
            
            # Menghitung nilai MAPE
            mape = mean_absolute_percentage_error(y_test, y_pred)
            
            hasil_prediksi = pd.DataFrame({
                'tahun': data['tahun'].iloc[train_size:],
                'bulan': data['bulan'].iloc[train_size:],
                'jenis_donasi': data['jenis_donasi'].iloc[train_size:],
                'prediksi': y_pred,
                'ekspektasi': y_test,
                'mape': mape
            })
            
            for row in hasil_prediksi:
                val = Hasil_prediksi(tahun=row[1], bulan=row[2], jenis_donasi=row[3], prediksi_donasi=row[4], ekspektasi_donasi=row[5], mape=row[6])
                db.session.add(val)
                db.session.commit()
            return response.success('', 'Berhasil memproses data')
    except Exception as e:
        print(e)
        return response.badRequest([], 'Internal server error: ' + str(e))