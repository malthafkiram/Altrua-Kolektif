# Altrua Kolektif 🌐

[![Node.js Version](https://img.shields.io/badge/node->=%2018.0.0-emerald)](https://nodejs.org)
[![Express.js Version](https://img.shields.io/badge/express-v4.x-blue)](https://expressjs.com)
[![Sequelize ORM](https://img.shields.io/badge/sequelize-v6.x-blueviolet)](https://sequelize.org)
[![Database](https://img.shields.io/badge/database-PostgreSQL-336791)](https://www.postgresql.org)

**Altrua Kolektif** (Altrua Ledger Transparency) adalah platform penggalangan dana (*crowdfunding*) berbasis web modern yang dirancang untuk mengatasi masalah kepercayaan dalam donasi publik melalui transparansi anggaran terpadu (*real-time budget tracking*). 

Sistem membagi ekosistem secara ketat menggunakan **Role-based Access Control (RBAC)** antara **Penyelenggara (`company`)** sebagai pengelola kampanye dan **Donatur (`donate`)** sebagai penyalur dana kontribusi.

---

## 🎯 Fitur Utama (Core Features)

* **Autentikasi & Otorisasi Kuat:** Registrasi dan login menggunakan managemen Session berbasis server (`express-session`) yang diamankan dengan enkripsi satu arah *asynchronous hashing* (`bcryptjs`) pada level database lifecycle hooks.
* **CRUD Manajemen Kampanye Fisik:** Penyelenggara dapat melakukan operasi CRUD penuh pada kampanye mereka, lengkap dengan penanganan unggahan berkas gambar fisik menggunakan middleware `Multer (DiskStorage)`.
* **Metriks Finansial & Virtual Audit:**  **Virtual Getter (`remainingFunds`):** Menghitung sisa kebutuhan anggaran secara dinamis di level model tanpa membebani memori memproses controller.
    * **Static Method (`totalDonationCount`):** Mengkalkulasi total frekuensi transaksi kontribusi yang masuk untuk kampanye spesifik.
* **Milestones Transparansi (RAB):** Fitur bagi Penyelenggara untuk merinci tahapan pengeluaran dana (Rencana Anggaran Biaya) secara berurutan (*step-by-step*).
* **Live Donation Ledger Feed:** Papan pelacak kontribusi transaksional yang menghubungkan data relasional secara instan begitu donatur menyalurkan bantuan.

---

## 🏗️ Arsitektur Database (ERD & Relations)

Aplikasi ini mengimplementasikan kompleksitas skema relasi database PostgreSQL melalui Sequelize ORM yang mencakup 3 jenis asosiasi utama:

1.  **One-to-One:** `User` hasOne `Profile` *(Penyimpanan data detail tambahan pengguna)*.
2.  **One-to-Many:** `User` hasMany `Campaign` *(Satu organisasi dapat memiliki banyak kampanye)*.
3.  **Many-to-Many (BelongsToMany):** `User` belongsToMany `Campaign` melalui tabel *Junction* `UserDonations` *(Mencatat riwayat transaksi donatur beserta pesan dukungan)*.

---

## 🚀 Tech Stack

* **Backend Framework:** Node.js, Express.js
* **Database & ORM:** PostgreSQL, Sequelize ORM & CLI
* **Template Engine:** EJS (Embedded JavaScript) dengan arsitektur UI *Glassmorphism Dark-Mode* (Bootstrap 5 & Custom Inline CSS)
* **File Upload Engine:** Multer Middleware
* **Security & Session:** Bcrypt.js, Express-Session

---

## 🛠️ Langkah Instalasi (Local Setup)

Ikuti langkah berikut untuk menjalankan proyek Altrua Kolektif di lingkungan lokal Anda:

### 1. Kloning Repositori
```bash
git clone [https://github.com/username-kamu/altrua-kolektif.git](https://github.com/username-kamu/altrua-kolektif.git)
cd altrua-kolektif
```

### 2. Instalasi Dependency
```bash
npm install
```

### 3. Konfigurasi Database
Buat sebuah file bernama config/config.json (atau sesuaikan yang ada) dan pastikan kredensial PostgreSQL Anda sudah benar:
```bash
{
  "development": {
    "username": "postgres",
    "password": "YOUR_POSTGRES_PASSWORD",
    "database": "altrua_kolektif_dev",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

### 4. Jalankan Migrasi dan Seeder
```bash
# Membuat database
npx sequelize-cli db:create

# Menjalankan semua file migrasi struktur tabel
npx sequelize-cli db:migrate

# Memasukkan data seeder awal (Users & Campaigns)
npx sequelize-cli db:seed:all
```

### 5. Jalankan Aplikasi
```bash
# Menggunakan nodemon untuk development roda transisi cepat
npm run dev

# Atau menggunakan perintah node biasa
node app.js
```

Buka browser Anda dan akses http://localhost:3000
