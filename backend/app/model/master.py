from app import db
from datetime import datetime

class Master(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    judul = db.Column(db.String(255), nullable=False)
    nama_dataset = db.Column(db.String(255), nullable=False)
    hasil = db.Column(db.BigInteger, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return '<Master {}>'.format(self.name)