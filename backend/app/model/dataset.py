from app import db

class Dataset(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    id_master = db.Column(db.BigInteger, db.ForeignKey('master.id'), nullable=False)
    no = db.Column(db.String(255))
    tanggal = db.Column(db.DateTime)
    jenis_donasi = db.Column(db.String(255))
    jumlah_donasi = db.Column(db.BigInteger)
    
    def __repr__(self):
        return '<Dataset {}>'.format(self.name)