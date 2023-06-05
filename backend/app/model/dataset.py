from app import db

class Dataset(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    no = db.Column(db.BigInteger, nullable=False)
    tanggal = db.Column(db.DateTime, nullable=False)
    jenis_donasi = db.Column(db.String(255), nullable=False)
    jumlah_donasi = db.Column(db.BigInteger, nullable=False)
    
    def __repr__(self):
        return '<Dataset {}>'.format(self.name)