---
title: Mode Kamera 12 MP vs 48 MP & Lensa Utama
description: Panduan memilih mode resolusi kamera 12 MP atau 48 MP/50 MP, serta alasan teknis mengapa TW-Mapper mengunci kamera wide utama ~24mm.
---

Drone modern DJI (seperti **DJI Air 3**, **Air 3S**, **Mini 4 Pro**, atau **Mavic 3 Pro**) dibekali sensor resolusi tinggi quad-bayer serta pilihan banyak lensa (Wide, Medium Tele 70mm, Tele 166mm).

Agar pilot tidak salah memilih setting kamera yang dapat merusak kualitas peta, TW-Mapper Mobile menerapkan standar teknis **WanDrone Palembang**:

---

## 🔒 1. Selalu Gunakan Kamera Utama (Wide ~24mm eq)

TW-Mapper **secara mutlak mengunci perhitungan pada kamera wide utama (~24mm eq)**:
- **Sudut Pandang Terluas**: Menangkap area lahan terbesar dalam sekali bidikan, sehingga jumlah foto yang dibutuhkan lebih sedikit dan pemetaan selesai lebih cepat.
- **Bebas Distorsi Kompresi**: Lensa tele (70mm atau 166mm) memampatkan perspektif ruang, sehingga sering kali gagal saat dihitung triangulasi fotogrametri (*bundle adjustment failure*).
- **Lensa Paling Terang**: Memiliki bukaan diafragma fisik terbesar (f/1.7 hingga f/2.8) yang menangkap cahaya melimpah bahkan saat cuaca mendung atau berawan tebal.

---

## ⚖️ 2. Memilih Mode 12 MP atau 48 MP (50 MP)?

Di aplikasi TW-Mapper, Anda dapat memilih antara dua mode resolusi:

![Perbandingan Karakteristik Kamera Mode 12 MP vs 48 MP](/TW-Mapper-Mobile-Docs/images/manual/kamera_pemilihan_resolusi_sensor.png)

> [!NOTE]
> *Gambar 3.3: Panduan pemilihan sensor kamera. (1) Mode 12 MP standar cepat dan hemat baterai, (2) Mode 48 MP/50 MP khusus pengukuran kadaster beresolusi ekstrem, dan (3) Penguncian lensa wide utama 24mm untuk presisi fotogrametri.*

| Fitur / Karakteristik | Mode 12 MP (Standar / Cepat) | Mode 48 MP / 50 MP (High-Res / RAW) |
| :--- | :--- | :--- |
| **Ukuran File Foto** | Ringan ($\approx 5\text{ – }10\text{ MB}$ format JPG) | Berat ($\approx 70\text{ – }100\text{ MB}$ format RAW DNG) |
| **Kecepatan Tulis MicroSD** | Cepat (Jeda aman $2.0\text{ detik}$) | Lambat (Jeda aman $5.0\text{ detik}$) |
| **Kecepatan Terbang Drone** | **Kencang ($8\text{ – }12\text{ m/s}$)** | **Pelan ($2\text{ – }4\text{ m/s}$)** |
| **Efisiensi Baterai** | **Sangat Hemat** (Area besar cepat tuntas) | Boros baterai karena drone harus melaju pelan |
| **Kebutuhan Pengolahan PC** | Ringan, render peta cepat | Butuh PC spek tinggi (RAM 64GB+, GPU kuat) |
| **Rekomendasi Pekerjaan** | • Perkebunan kelapa sawit luas<br>• Monitoring proyek mingguan<br>• Pemetaan topografi umum | • Pengukuran patok batas tanah resmi (BPN)<br>• Inspeksi baut jembatan / retak dinding<br>• Rekonstruksi 3D arsitektur bernilai tinggi |

---

## 💡 Rekomendasi Lapangan WanDrone

> [!TIP]
> Untuk **90% pekerjaan pemetaan harian Anda**, gunakanlah **Mode 12 MP**:
> Foto 12 MP dari sensor DJI modern sudah sangat tajam dan kaya warna. Drone Anda dapat terbang dengan kecepatan maksimal ($10\text{ – }12\text{ m/s}$), baterai bertahan jauh lebih lama, dan proses pembuatan peta di komputer kantor selesai $3\times$ lebih cepat tanpa risiko memori PC penuh (*out-of-memory*).
