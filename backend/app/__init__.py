from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_cors import CORS, cross_origin


app = Flask(__name__)
# cors = CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})

app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

## import model untuk ke database
from app.model import user, dataset, hasil_prediksi

from app import routes