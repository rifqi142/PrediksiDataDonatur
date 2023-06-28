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
from sklearn.preprocessing import OneHotEncoder

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
        # Mendapatkan data terakhir
        dataset = Dataset.query.order_by(Dataset.id.desc()).limit(1).all()  # mendapatkan data terakhir
        datalast = Dataset.query.filter_by(id_master=dataset[0].id_master).all()  # mendapatkan data terakhir berdasarkan id_master
        data = formatArray(datalast)
        # data sudah aman
        if not data:
            return response.badRequest([], 'Data tidak ditemukan')

        # Mendapatkan id_master
        # aman
        master = Master.query.order_by(Master.id.desc()).limit(1).first()
        print(master.id)

        # selection aman
        dataSelect = request.get_json()
        pilihan = dataSelect.get('pilihan')
        print(pilihan)
        # Jika value 1 maka proses prediksi jumlah donasi
        if pilihan == '1':
            # Melakukan one-hot encoding pada kolom "jenis_donasi"
            dataset_encoded = pd.get_dummies(data, columns=['jenis_donasi'])
            
            # Memisahkan fitur dan target
            X = dataset_encoded.drop(['tahun', 'bulan', 'jumlah_donasi'], axis=1)
            y = dataset_encoded['jumlah_donasi']

            # Membagi data menjadi data training dan data testing
            train_size = int(len(dataset_encoded) * 0.8)
            X_train, X_test = X[:train_size], X[train_size:]
            y_train, y_test = y[:train_size], y[train_size:]

            # Membuat model random forest
            model = RandomForestRegressor()
            model.fit(X_train, y_train)

            # Melakukan prediksi pada data uji
            y_pred = model.predict(X_test)

            # Menghitung nilai MAPE
            mape = mean_absolute_percentage_error(y_test, y_pred)
            hasil_prediksi = []

            for i in range(train_size, len(dataset_encoded)):
                prediksi = {
                    'tahun': dataset_encoded.iloc[i]['tahun'],
                    'bulan': dataset_encoded.iloc[i]['bulan'],
                    'jenis_donasi': dataset_encoded.iloc[i]['jenis_donasi'],
                    'prediksi': y_pred[i - train_size],
                    'ekspektasi': y_test[i - train_size],
                    'mape': mape,
                    'id_master': master.id
                }
                hasil_prediksi.append(prediksi)

            for prediksi in hasil_prediksi:
                hasil_prediksi_obj = Hasil_prediksi(
                    tahun=prediksi['tahun'],
                    bulan=prediksi['bulan'],
                    jenis_donasi=prediksi['jenis_donasi'],
                    prediksi_donasi=prediksi['prediksi'],
                    ekspektasi_donasi=prediksi['ekspektasi'],
                    mape=prediksi['mape'],
                    id_master=prediksi['id_master']
                )
                db.session.add(hasil_prediksi_obj)
                db.session.commit()

            return response.success('', 'Berhasil memproses data')
        else:
            # Jika value 2 maka proses prediksi jumlah data
            # Melakukan one-hot encoding pada kolom "jenis_donasi"
            dataset_encoded = pd.get_dummies(data, columns=['jenis_donasi'])

            # Memisahkan fitur dan target
            X = dataset_encoded.drop(['tahun', 'bulan', 'jumlah_data'], axis=1)
            y = dataset_encoded['jumlah_data']

            # Memisahkan data menjadi data training dan data testing
            train_size = int(len(dataset_encoded) * 0.8)
            X_train, X_test = X[:train_size], X[train_size:]
            y_train, y_test = y[:train_size], y[train_size:]

            # Membuat model random forest
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

            for _, row in hasil_prediksi.iterrows():
                db.session.add(Hasil_prediksi(
                    tahun=row.tahun,
                    bulan=row.bulan,
                    jenis_donasi=row.jenis_donasi,
                    prediksi_donasi=row.prediksi,
                    ekspektasi_donasi=row.ekspektasi,
                    mape=row.mape,
                    id_master=master.id
                ))
            db.session.commit()

            return response.success('', 'Berhasil memproses data')
    except Exception as e:
        print(e)
        return response.badRequest([], 'Internal server error: ' + str(e))