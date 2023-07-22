
# 💰 Prediksi Data Donatur

Website ini dibangun untuk salah satu syarat lulus Strata1 Universitas Budi Luhur, website ini digunakan untuk memprediksi data donatur berdasarkan data time series pada Lembaga Dompet Dhuafa Republika dengan rentang data waktu 3 tahun terakhir. Website ini menggunakan Algoritme Random Forest.


## 👨‍💻 Authors 

- [1911500682 - Muhammad Rifqi Setiawan](https://github.com/rifqi142)


## ⚙️ Installation

1. Ekstrak File PrediksiDataDonatur.zip ke dalam folder anda

2. Setelah itu membuka phpmyadmin untuk memasukan atau import database db_ta_prediction.sql

3. Setelah itu buka vscode atau text editor anda, lalu buka folder PrediksiDataDonatur

4. Setelah itu buka terminal pada vscode lalu masuk ke dalam folder frontend
```
cd frontend
```

5.  Setelah masuk kedalam folder frontend lakukan instalasi node_modules dengan Cara

```
npm install
```

6. Setelah node_modules berhasil di install, langkah selanjutnya adalah running sisi client dengan cara

```
npm start
```

6. Setelah itu membuka terminal baru untuk masuk ke dalam directory backend

```
cd backend
```

7. Setelah masuk kedalam directory backend lalu install requirement.txt dengan Cara

```
pip install -r requirements.txt
```

8. Setelah melakukan instalasi, lalu jalankan server dengan cara
```
flask run
```

Lalu buka http://localhost:3000 untuk melihat tampilan website.


9. Setelah masuk ke tampilan awal, user bisa login dengan menggunakan email: rifqi@gmail.com dan password rifqi


## 🔧 Features

- Input Data with .csv file
- Predict Data Donation
- See the comparison graph between testing and training data
- History Data


## 🛠 Tech Stack

**Client:** React, Bootstrap, Javascript

**Server:** Flask, Python

