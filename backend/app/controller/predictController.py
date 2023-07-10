from app.model.hasil_prediksi import Hasil_prediksi
from app.model.dataset import Dataset
from app.model.master import Master
from app import response, db
from flask import request, jsonify
from sqlalchemy import desc
import pickle
from typing import List
import pandas as pd


# Load trained model
model = pickle.load(open('app/model/random_forest_jumdonasi.pkl', 'rb'))
model2 = pickle.load(open('app/model/random_forest_jumdata.pkl', 'rb'))

# Define boilerplate result endpoint
response_boilerplate = {"status_code" : 200, "message" : "success", "data" : []}

# Define LabelEncoder index of "Jenis" column transformed
class_to_index = {
    'CILKUR': 0,
    'INFAK': 1,
    'INFAK TEMATIK': 2,
    'INFAK TERIKAT': 3,
    'KEMANUSIAAN': 4,
    'KURBAN': 5,
    'LAIN-LAIN': 6,
    'NON HALAL': 7,
    'WAKAF': 8,
    'ZAKAT': 9
    }
## Proses prediksi Jumlah Donasi
class ParamFeature:
    def __init__(self, tahun: any, bulan: any, jenis: any) -> None:
        self.tahun = tahun 
        self.bulan = bulan 
        self.jenis = jenis

    def logger(self, value: any, lower_bound: any, upper_boung: any) -> None:
        print(f"{value} value should in interval of {lower_bound} and {upper_boung}, if not satisfied model might predict from outlier condition")
    
    def fix_tahun(self, tahun: any) -> int:
        lower, upper = 2018, 2021
        if isinstance(tahun, str):
            tahun = int(tahun)
        if tahun not in range(lower, upper + 1):
            self.logger(tahun, lower, upper)
        return tahun

    def fix_bulan(self, bulan: any) -> int:
        lower, upper = 1, 12
        if isinstance(bulan, str):
            bulan = int(bulan)
        if bulan not in range(lower, upper + 1):
            self.logger(bulan, lower, upper)
        return bulan
    
    def fix_jenis(self, jenis: any) -> int:
        outlier_value = 0
        if jenis in class_to_index.keys():
            return class_to_index[jenis]
        else:
            return outlier_value
        
    def validate(self) -> List:
        tahun = self.fix_tahun(self.tahun)
        bulan = self.fix_bulan(self.bulan)
        jenis = self.fix_jenis(self.jenis)
        param_input = [tahun, bulan, jenis]
        return param_input

def perform_prediction(tahun: str, bulan: str, jenis: str) -> float:
    feature_raw = ParamFeature(tahun, bulan, jenis)
    feature = feature_raw.validate()
    result = model.predict([feature])
    result = result[0]
    return result

def perform_prediction2(tahun: str, bulan: str, jenis: str) -> float:
    feature_raw = ParamFeature(tahun, bulan, jenis)
    feature = feature_raw.validate()
    result = model2.predict([feature])
    result = result[0]
    return result

# get dataf format from database
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
        # print(data)
        # data sudah aman
        if not data:
            return response.badRequest([], 'Data tidak ditemukan')
        # get id master
        master = Master.query.order_by(Master.id.desc()).limit(1).first()

        param_tahun = request.json.get("tahun")
        param_bulan = request.json.get("bulan")
        param_jenis = request.json.get("jenis")
        # selection aman
        dataSelect = request.get_json()
        pilihan = dataSelect.get('pilihan')
        print(pilihan)
        # Jika value 1 maka proses prediksi jumlah donasi
        if pilihan == 'jumDonasi':
            result_score_donasi = perform_prediction(
            param_tahun, param_bulan, param_jenis
            )
            # # mengganti hasil menjadi true dikarenakan data sudah ada
            master.hasil = True
            db.session.add(master)
            db.session.commit()

            # simpan hasil prediksi jumDonasi ke database
            hasil_prediksi = Hasil_prediksi(tahun=param_tahun, bulan=param_bulan, jenis_donasi=param_jenis, jenis_prediksi=pilihan ,hasil_prediksi=result_score_donasi, id_master=master.id)
            db.session.add(hasil_prediksi)
            db.session.commit()
            response_boilerplate["data donasi"] = [result_score_donasi]
            return response_boilerplate
        else:
            result_score_data = perform_prediction2(
            param_tahun, param_bulan, param_jenis
            )
            
            master.hasil = True
            db.session.add(master)
            db.session.commit()
            
            # simpan hasil prediksi jumDatake database
            hasil_prediksi = Hasil_prediksi(tahun=param_tahun, bulan=param_bulan, jenis_donasi=param_jenis, jenis_prediksi=pilihan, hasil_prediksi=result_score_data, id_master=master.id)
            db.session.add(hasil_prediksi)
            db.session.commit()
            response_boilerplate["data jumdata"] = [result_score_data]
            return response_boilerplate
    except Exception as e:
        print(e)
        return response.badRequest([], 'Internal server error: ' + str(e))

# membuat chart yang akan digunakan pada frontend
def get_chart_data():
    data = pd.read_excel('D:/Documents/Folder-Kiki/Tugas Akhir/PrediksiDataDonatur/backend/dataset/prediksiJumDonasi.xlsx')
    
    chart_data = data[['Prediksi_Donasi', 'Ekspetasi_Donasi']]
    
    predictions = chart_data['Prediksi_Donasi'].tolist()
    expectations = chart_data['Ekspetasi_Donasi'].tolist()
    
    labels = [f'{pred} / {exp}' for pred, exp in zip(predictions, expectations)]
    
    return jsonify({'labels': labels, 'predictions': predictions, 'expectations': expectations})


def get_chart_data2():
    # baca file excel menggunakan pandas
    data = pd.read_excel('D:/Documents/Folder-Kiki/Tugas Akhir/PrediksiDataDonatur/backend/dataset/prediksiJumData.xlsx')
    
    # ambil kolom yang akan digunakan
    chart_data = data[['Prediksi_Donasi', 'Ekspetasi_Donasi']]
    
    # ubah data menjadi format yang dapat digunakan oleh chart.js
    predictions = chart_data['Prediksi_Donasi'].tolist()
    expectations = chart_data['Ekspetasi_Donasi'].tolist()
    
    # kirim data sebagai JSON
    return jsonify({'predictions': predictions, 'expectations': expectations})