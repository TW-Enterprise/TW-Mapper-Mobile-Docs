---
title: Panduan Instalasi & Persyaratan
description: Petunjuk lengkap instalasi aplikasi pada Smart Controller DJI RC 2, RC Pro, dan Smartphone/Tablet Android via Shizuku.
---

Sejak versi **v0.8.0**, TW-Mapper-Mobile hadir dalam satu paket APK universal tunggal (`TW-Mapper-Mobile-v<VERSION>-build<BUILD>.apk`) yang secara otomatis mendeteksi apakah aplikasi sedang berjalan pada Smart Controller DJI atau perangkat seluler biasa.

---

## 📦 Persyaratan Sistem

- **Sistem Operasi**: Android 7.0 (API 24) hingga Android 14+ (API 34).
- **Arsitektur CPU**: `arm64-v8a` / `armeabi-v7a`.
- **Konektivitas**:
  - Wi-Fi atau Tethering Hotspot (untuk mengunduh citra peta satelit offline).
  - USB OTG / Direct Link untuk transfer DUML ke remote RC-N.

---

## 🕹️ Instalasi pada DJI RC 2 & RC Pro (Mode RC)

Pada smart controller DJI (seperti DJI RC 2 model `RM330` dan DJI RC Pro model `RM510`), instalasi dilakukan menggunakan berkas paket bantuan resmi **Helper Bundle**:

![Instalasi Helper Bundle dan Izin Folder SAF di DJI RC 2](/TW-Mapper-Mobile-Docs/images/manual/instalasi_rc2_package_installer.png)

> [!NOTE]
> *Gambar: Pemasangan 3 berkas APK dan konfigurasi perizinan folder dokumen sistem waypoint di DJI RC 2.*

### Langkah-langkah:
1. **Unduh Paket Rilis**:
   Unduh berkas `TW Mapper DJI RC 2 + HELPER.zip` dari halaman rilis resmi atau tautan unduhan Cloud Google Drive.
2. **Ekstrak Berkas ke MicroSD / Flashdisk USB**:
   Arsip tersebut berisi:
   - `01_PackageInstaller.apk`
   - `02_FileManager.apk`
   - `TW-Mapper-Mobile-v<VERSION>-build<BUILD>.apk`
3. **Instalasi Utilitas Sistem (Jika Belum Terpasang)**:
   - Pasang `01_PackageInstaller.apk` pada RC untuk membuka izin instalasi aplikasi luar.
   - Pasang `02_FileManager.apk` (DocumentsUI shortcut) agar folder sistem waypoint dapat dibuka.
4. **Instal APK TW-Mapper**:
   Buka file manager di RC, pilih `TW-Mapper-Mobile-v<VERSION>-build<BUILD>.apk`, lalu pilih **Install**.
5. **Konfigurasi Izin Awal**:
   Saat pertama kali membuka TW-Mapper di smart controller:
   - Berikan izin **Akses Lokasi** (*Location Permission*).
   - Berikan izin **Storage Access Framework (SAF)** saat diminta mengaitkan folder waypoint `Android/data/dji.go.v5/files/waypoint`.

---

## 📱 Instalasi pada Smartphone / Tablet (Mode HP / TAB)

Untuk pilot yang menggunakan remote **DJI RC-N1, RC-N2, atau RC-N3** dengan smartphone atau tablet Android:

### 1. Instalasi Aplikasi
- Unduh dan pasang `TW-Mapper-Mobile-v<VERSION>-build<BUILD>.apk` langsung di smartphone Anda.
- Buka aplikasi dan izinkan izin Lokasi serta Notifikasi.

### 2. Mengaktifkan Shizuku (Rekomendasi Terbaik)
Karena sistem Android 11+ membatasi akses aplikasi langsung ke direktori `Android/data/`, TW-Mapper mengintegrasikan protokol **Shizuku Direct Inject** (UserService AIDL IPC) yang berjalan tanpa memerlukan akses root.

![Aktivasi Shizuku dan Otorisasi TW-Mapper di HP](/TW-Mapper-Mobile-Docs/images/manual/instalasi_hp_shizuku_pairing.png)

> [!TIP]
> **Cara Menjalankan Shizuku**:
> 1. Pasang aplikasi **Shizuku** resmi dari Google Play Store atau GitHub.
> 2. Aktifkan **Opsi Pengembang (Developer Options)** dan **Wireless Debugging** pada pengaturan Android.
> 3. Lakukan proses pairing di aplikasi Shizuku, kemudian tekan **Start**.
> 4. Saat membuka menu Ekspor KMZ di TW-Mapper, tekan tombol **"Hubungkan Shizuku"** dan pilih **Izinkan Selalu**.
> 5. TW-Mapper kini dapat menulis misi KMZ langsung ke folder DJI Fly secara instan!

---

## 🔄 Pembaruan Aplikasi Otomatis (In-App Updater)

Aplikasi TW-Mapper dilengkapi sistem pengecekan pembaruan otomatis yang terhubung ke Firebase Realtime Database:
- Setiap kali aplikasi dibuka dengan koneksi internet, sistem membandingkan versi lokal dengan versi rilis server.
- Jika versi baru tersedia, dialog pembaruan akan muncul menampilkan **catatan rilis (changelog)** dan tombol unduh langsung.
- APK yang diunduh langsung dapat dipasang tanpa menghapus data misi yang sudah dibuat sebelumnya.
