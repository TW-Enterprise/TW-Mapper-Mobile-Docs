---
title: Pengenalan & Fitur Unggulan
description: Gambaran umum TW-Mapper-Mobile, kolaborasi teknis WanDrone Palembang dan Throttle Warrior, serta matriks kompatibilitas hardware DJI.
---

**TW-Mapper-Mobile** adalah sistem perencanaan jalur terbang drone profesional, survei fotogrametri udara, dan pemetaan koridor presisi tinggi yang dirancang khusus untuk ekosistem drone DJI (mendukung **DJI Fly** `dji.go.v5` dan **DJI Pilot 2**).

Platform ini lahir dari kolaborasi teknis strategis antara:
- **Rwanda** — *WanDrone Palembang*
- **Aditiya Rachmat** — *Throttle Warrior*

Aplikasi ini menyatukan keandalan algoritma pemetaan GIS dengan integrasi perangkat keras tingkat rendah (*low-level Android hardware integration*), memungkinkan pilot drone merencanakan misi kompleks dan langsung mengeksekusinya di remote kontrol tanpa perlu laptop di lapangan.

---

## ⚡ Fitur Utama

![Tampilan Antarmuka Perencanaan Jalur Terbang TW-Mapper Mobile](/TW-Mapper-Mobile-Docs/images/manual/antarmuka_layar_utama_grid.png)

> [!NOTE]
> *Gambar: Layar kerja lanskap TW-Mapper Mobile pada Smart Controller DJI RC 2. Perencanaan misi fotogrametri otonom langsung di remote kontrol.*

### 1. Perencanaan Misi Fotogrametri Mutakhir
- **Grid Boustrophedon Cerdas**: Otomasi penyelarasan jalur terhadap sisi terpanjang poligon (*Efficient Longest-Edge Alignment*) untuk meminimalkan belokan drone dan menghemat baterai.
- **Mode Koridor (Linear Infrastructure)**: Pemetaan jalur jalan raya, transmisi listrik (SUTET), jalur pipa migas, dan aliran sungai dengan lebar koridor dinamis dan multi-line pass.
- **Double Grid (3D Facade)**: Pola silang ortogonal 90° untuk pemodelan 3D bangunan vertikal dan kontur topografi curam.
- **Kalkulasi Presisi Real-time**: Perhitungan Ground Sampling Distance (GSD), overlap depan/samping (frontlap & sidelap), estimasi jumlah foto, durasi terbang, dan konsumsi baterai.

### 2. Standar Fotogrametri WanDrone
- **Primary Wide Camera Locking**: Menghindari kesalahan optik dengan mengunci kalkulasi pada kamera wide utama (~24mm eq).
- **Dual-Resolution Guard**:
  - *Mode 12 MP (Standar/Cepat)*: Batas buffer foto **2.0 detik** (kecepatan terbang 8–12 m/s).
  - *Mode 48/50 MP (High-Res/RAW)*: Batas buffer foto **5.0 detik** guna menjamin penyimpanan file RAW DNG ke microSD tuntas tanpa risiko *missed frames* (foto bolong).
- **Dynamic Speed Clamping**: Kecepatan maksimum slider otomatis dipotong ($V_{\text{safe\_max}} = D_{\text{foto}} / T_{\min}$) disertai dialog edukasi pilot jika overlap terlalu rapat di ketinggian rendah.

### 3. Injeksi Misi Langsung (WPML KMZ)
- Menghasilkan file misi berstandar resmi DJI Waypoint Markup Language (WPML).
- **Mode RC**: Injeksi langsung melalui Storage Access Framework (SAF) DocumentsUI ke `Android/data/dji.go.v5/files/waypoint`.
- **Mode HP/TAB**: Injeksi instan tanpa root via **Shizuku UserService AIDL IPC**.
- **Safe Backup**: Pencadangan otomatis file misi asli sebelum ditimpa.

### 4. Hardware Interoperability & DUML Murni
- Menggunakan **14 Pure RF Recovery Frames** yang hanya menyasar modul SDR Receiver 9 dan Air Link Receiver 7.
- Bebas dari penulisan konfigurasi Flight Controller (FC) non-radio, sehingga GPS lock, kompas, Home Point, dan peta DJI Fly tetap stabil 100%.
- Kontrol parameter FC mandiri: Altitude Unlock 500m (`PARAM_HEIGHT`), LED Strobes (`PARAM_LED`), dan ATTI Mode (`PARAM_GPS` / `PARAM_VPS`).

---

## 🎮 Matriks Kompatibilitas Hardware

| Perangkat / Drone | Mode Operasi | Metode Komunikasi | Status |
| :--- | :--- | :--- | :--- |
| **DJI RC 2** (`RM330`) | Mode RC | Local TCP Proxy (`127.0.0.1:40009`) + SAF | **Didukung Penuh** |
| **DJI RC Pro** (`RM510`) | Mode RC | Local TCP Proxy (`127.0.0.1:40009`) + SAF | **Didukung Penuh** |
| **DJI RC-N1 / RC-N2 / RC-N3** | Mode HP/TAB | USB AOA Logiclink 8-byte + Shizuku | **Didukung Penuh** |
| **DJI Air 3 / Air 3S** | Drone | Dual Resolution 12 MP / 48 MP (50 MP) | **Didukung Penuh** |
| **DJI Mini 4 Pro / Mini 3 Pro** | Drone | Dual Resolution 12 MP / 48 MP | **Didukung Penuh** |
| **DJI Mavic 3 / 3 Pro / Classic** | Drone | Native 20 MP Hasselblad Wide | **Didukung Penuh** |
| **DJI Mavic 4 Pro** | Drone | Native 25 MP Wide | **Didukung Penuh** |

---

## 📱 Quick Navigation Helper

Untuk mengatasi ketiadaan tombol *Recent Apps* pada smart controller DJI saat aplikasi DJI Fly berjalan full-screen, TW-Mapper menyediakan **Quick Navigator Helper** di bilah notifikasi Android:
- Satu sentuhan untuk berpindah ke **TW-Mapper**.
- Satu sentuhan untuk membuka **DJI Fly**.
- Satu sentuhan untuk membuka **DocumentsUI** (File Manager internal remote).
