from app import db

class Hasil_prediksi(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    id_master = db.Column(db.BigInteger, db.ForeignKey('master.id'), nullable=False)
    tahun = db.Column(db.BigInteger)
    bulan = db.Column(db.BigInteger)
    jenis_donasi = db.Column(db.String(255))
    prediksi = db.Column(db.BigInteger, nullable=False)
    ekspektasi = db.Column(db.BigInteger, nullable=False)
    mape = db.Column(db.BigInteger, nullable=False)
    
    def __repr__(self):
        return '<Hasil_prediksi {}>'.format(self.name)