# Fruch - Deteksi Kematangan & Manfaat Buah
Selamat datang di Fruch, sebuah aplikasi web yang dirancang untuk membantu pengguna mendeteksi kematangan buah melalui analisis gambar dan menyediakan informasi manfaat dari buah tersebut. Aplikasi ini dibangun menggunakan Next.js, Prisma, dan model klasifikasi gambar dari Teachable Machine.

## Fitur Utama
 1. Autentikasi Pengguna: Sistem registrasi dan login pengguna menggunakan JWT (JSON Web Tokens).
 2. Klasifikasi Gambar Buah: Pengguna dapat mengunggah gambar buah, dan aplikasi akan memprediksi jenis buah serta (di masa depan) tingkat kematangannya menggunakan model Teachable Machine.
 3. Informasi Manfaat Buah: Setelah buah terdeteksi, aplikasi akan menampilkan informasi manfaat buah tersebut yang diambil dari database.
 4. Penyimpanan Hasil Scan: Pengguna yang login dapat menyimpan riwayat hasil pemindaian buah mereka.
 5. Riwayat Scan: Pengguna dapat melihat kembali riwayat pemindaian buah yang pernah mereka lakukan.

## Prasyarat
Sebelum Anda memulai, pastikan Anda telah menginstal perangkat lunak berikut di sistem Anda:

1. Node.js (Versi LTS direkomendasikan, misalnya v18.x atau v20.x)
2. npm (biasanya terinstal bersama Node.js) atau Yarn
3. Git (untuk mengkloning repositori)
4. Akses ke database PostgreSQL (Proyek ini dikonfigurasi untuk NeonDB, tetapi bisa disesuaikan).

## Instalasi & Pengaturan
Ikuti langkah-langkah berikut untuk menjalankan proyek ini secara lokal:

### 1. Di dalam direktori root proyek, jalankan:

```npm install```


Ini akan menginstal semua paket yang tercantum dalam package.json, termasuk Next.js, React, Prisma Client, bcryptjs, jsonwebtoken, dll.

### 2. Pengaturan Variabel Lingkungan (.env.local):

Buat file baru bernama ```.env.local``` di direktori root proyek Anda.

Salin konten dari file .env.example (jika ada) atau tambahkan variabel berikut:

```DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
JWT_SECRET="jwt_token"
JWT_EXPIRES_IN="1h"
```

### 3. Pengaturan Database Prisma:

Pastikan DATABASE_URL di ```.env.local``` sudah benar.

Jalankan migrasi Prisma untuk membuat tabel-tabel di database Anda sesuai dengan skema (prisma/schema.prisma):

```npx prisma migrate dev```

Saat pertama kali, Anda mungkin akan diminta untuk memberi nama migrasi.

(Opsional, biasanya otomatis setelah migrasi) Generate Prisma Client:

```npx prisma generate```

Jalankan kueri ini di NeonDB, untuk menginsert Nama Buah dan Manfaatnya

```-- Aktifkan ekstensi uuid-ossp jika belum (cukup sekali per database)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Memasukkan data untuk buah Apel
INSERT INTO "Buah" (id, "namaBuah", manfaat, "createdAt", "updatedAt")
VALUES (
    uuid_generate_v4(), -- Fungsi ini sekarang seharusnya tersedia setelah ekstensi diaktifkan
    'Apel',
    E'Meningkatkan kesehatan pencernaan karena kaya serat.\nMembantu menjaga berat badan ideal.\nBaik untuk kesehatan jantung karena mengandung antioksidan.\nMeningkatkan sistem kekebalan tubuh.\nMenjaga kesehatan kulit dan mencegah penuaan dini.\nMengurangi risiko diabetes tipe 2.\nBaik untuk kesehatan otak dan fungsi kognitif.',
    NOW(),
    NOW()
)
ON CONFLICT ("namaBuah") DO NOTHING;

-- Memasukkan data untuk buah Pisang
INSERT INTO "Buah" (id, "namaBuah", manfaat, "createdAt", "updatedAt")
VALUES (
    uuid_generate_v4(), -- Fungsi ini sekarang seharusnya tersedia setelah ekstensi diaktifkan
    'Pisang',
    E'Sumber energi yang baik karena mengandung karbohidrat dan gula alami.\nKaya akan potasium yang baik untuk kesehatan jantung dan tekanan darah.\nMembantu melancarkan pencernaan karena kandungan seratnya.\nMeningkatkan mood dan mengurangi stres karena mengandung triptofan.\nBaik untuk kesehatan tulang karena kandungan mangan.\nMembantu mengatasi anemia karena mengandung zat besi.\nSumber vitamin B6 yang penting untuk fungsi otak dan sistem saraf.',
    NOW(),
    NOW()
)
ON CONFLICT ("namaBuah") DO NOTHING;
```

## 4. Menjalankan Aplikasi
Setelah semua pengaturan selesai, Anda dapat menjalankan server development Next.js:

```npm run dev```


## 5. API Endpoints Utama
```POST /api/auth/register: Registrasi pengguna baru.```

```POST /api/auth/login: Login pengguna dan mendapatkan JWT.```

```GET /api/buah/[namaBuah]: Mendapatkan detail buah berdasarkan namanya.```

```POST /api/buah: Menyimpan hasil scan buah pengguna (membutuhkan autentikasi JWT).```

```GET /api/buah: Mengambil riwayat scan buah pengguna (membutuhkan autentikasi JWT).```

Dependensi Utama yang Diinstal
    next: Framework React untuk aplikasi full-stack.

    react, react-dom: Library inti React.

    @prisma/client, prisma: ORM untuk interaksi database.

    bcryptjs: Untuk hashing password.

    jsonwebtoken: Untuk membuat dan memverifikasi JWT.

    @teachablemachine/image: Untuk memuat dan menggunakan model klasifikasi gambar.