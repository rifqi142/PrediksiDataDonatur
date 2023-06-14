from app import response, db
from flask import request
from app.model.master import Master

def get_data():
    try:
        master = Master.query.all()
        data = formatArray(master)
        
        if not master:
            return response.badRequest([], 'Data tidak ditemukan')
        
        return response.success(data, 'Berhasil mengambil data')
    except Exception as e:
        print(e)
        return response.badRequest([], 'Internal server error')

def formatArray(datas):
    array = []
    
    for i in datas:
        array.append(singleObject(i))
    
    return array

def singleObject(data):
    data = {
        'id': data.id,
        'judul': data.judul,
        'nama_dataset': data.nama_dataset,
        'hasil': data.hasil,
    }
    
    return data