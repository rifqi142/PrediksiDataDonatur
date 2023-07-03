import io, csv, os, uuid
import datetime as dt
from app.model.dataset import Dataset
from app.model.master import Master
from app.model.hasil_prediksi import Hasil_prediksi
from app import response, db
from flask import request
from sqlalchemy import desc

# input data ke database
def add_data():
    try:
        uid = uuid.uuid4()
        ## get data master
        judul = request.form['judul']
        nama_dataset = "dataset-" + str(uid) + ".csv"
        hasil = False;
        master = Master(judul=judul, nama_dataset=nama_dataset, hasil=hasil)
        db.session.add(master)
        db.session.commit()
        
        get_nama = Master.query.filter_by(nama_dataset=nama_dataset).first()
        
        ## multi part form data and file
        file = request.files['file']
        load_data = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
        csv_data = csv.reader(load_data)
        next(csv_data)
        for row in csv_data:
            val = Dataset(tahun=row[0],bulan=row[1],jenis_donasi=row[2],jumlah_donasi=row[3], jumlah_data=row[4], id_master=get_nama.id)
            db.session.add(val)
            db.session.commit()
        return response.success('', 'Berhasil menambahkan data')
    except Exception as e:
        print(e)
        return response.badRequest([], 'Internal server error: ' + str(e))

# untuk mendapatkan dataset yang sudah di upload
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

## get data by id untuk history pages
def get_data_id(id):
    try:
        dataset = Dataset.query.filter_by(id_master=id).all()
        data = formatArray(dataset)
        
        if not data:
            return response.badRequest([], 'Data tidak ditemukan')
        
        return response.success(data, 'Berhasil mengambil data')
    except Exception as e:
        print(e)

# untuk mendapatkan hasil prediksi dari database
def formatArrayHasil(data):
    array = []
    
    for i in data:
        array.append(singleTransformHasil(i))
    
    return array

def singleTransformHasil(data):
    data = {
        'tahun': data.tahun,
        'bulan': data.bulan,
        'jenis_donasi': data.jenis_donasi,
        'jenis_prediksi': data.jenis_prediksi,
        'hasil_prediksi': data.hasil_prediksi,
        'id_master': data.id_master,
    }
    return data
# get data hasil prediksi by id untuk history pages
def get_hasil_id(id):
    try:
        hasil = Hasil_prediksi.query.filter_by(id_master=id).all()
        data = formatArrayHasil(hasil)
        
        if not data:
            return response.badRequest([], 'Data tidak ditemukan')
        
        return response.success(data, 'Berhasil mengambil data')
    except Exception as e:
        print(e)

        
# get data by id untuk input pages
def get_last_data():
    try:
        dataset = Dataset.query.order_by(desc(Dataset.id)).limit(1).all()
        
        if not dataset:
            return response.badRequest([], 'Data tidak ditemukan')
        
        datalast = Dataset.query.filter_by(id_master=dataset[0].id_master).all()
        data = formatArray(datalast)
        return response.success(data, 'Berhasil mengambil data')
    except Exception as e:
        print(e)
        return response.badRequest([], 'Internal server error: ' + str(e))


def delete_data(id):
    try:
        master = Master.query.filter_by(id=id).first()

        if master is None:
            return response.badRequest([], 'Data tidak ada')

        datasets = Dataset.query.filter_by(id_master=master.id).all()
        for dataset in datasets:
            db.session.delete(dataset)

        hasils = Hasil_prediksi.query.filter_by(id_master=master.id).all()
        for hasil in hasils:
            db.session.delete(hasil)

        db.session.delete(master)
        db.session.commit()

        return response.success('', 'Berhasil menghapus data')
    except Exception as e:
        print(e)
        return response.badRequest([], 'Internal server error: ' + str(e))


