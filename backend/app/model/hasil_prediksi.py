from app import db

class Hasil_prediksi(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    tanggal = db.Column(db.DateTime, nullable=False)
    prediksi_donasi = db.Column(db.BigInteger, nullable=False)
    ekspektasi_donasi = db.Column(db.BigInteger, nullable=False)
    mape = db.Column(db.BigInteger, nullable=False)
    
    def __repr__(self):
        return '<Hasil_prediksi {}>'.format(self.name)