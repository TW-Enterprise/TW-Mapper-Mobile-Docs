---
title: Build Lokal & Firebase Sync
description: Prosedur kompilasi lokal ke direktori release/, pembuatan helper bundle, dan sinkronisasi metadata update ke Firebase Realtime Database.
---

Jika pengembang memerlukan kompilasi lokal tanpa menunggu pipeline CI/CD GitHub Actions (misalnya untuk pengujian langsung pada smart remote fisik):

---

## 🏗️ 1. Standar Kompilasi Lokal

![Bundel Helper Pemasangan Aplikasi pada Remote DJI RC 2](/TW-Mapper-Mobile-Docs/images/manual/instalasi_rc2_package_installer.png)

> [!NOTE]
> *Gambar: Struktur bundel utilitas sistem dan berkas APK universal pada paket helper rilis lokal.*

Kompilasi lokal dilakukan langsung ke dalam folder `release/` (`TW-Mapper-Mobile/release/`) mengikuti protokol:

1. **Universal APK**:
   ```bash
   flutter build apk --release -t lib/main.dart
   # Salin hasil build ke: release/TW-Mapper-Mobile-v<VERSION>-build<BUILD>.apk
   ```
2. **Helper Bundle (`TW Mapper DJI RC 2 + HELPER.zip`)**:
   Arsip ZIP dibangun dengan menyatukan:
   - `01_PackageInstaller.apk` (dari `release/DJI RC 2 + HELPER/`)
   - `02_FileManager.apk` (dari `release/DJI RC 2 + HELPER/`)
   - APK universal yang baru dikompilasi.
3. **Skrip Otomasi Satu Perintah**:
   Pengembang dapat menjalankan skrip otomasi yang telah disediakan:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\tool\build_local.ps1
   ```

---

## ☁️ 2. Distribusi Cloud Google Drive

Setelah berkas binary selesai dikompilasi:
- Unggah berkas APK dan Helper ZIP ke target folder ID Google Drive:
  `19h8g59qfvFNaRrlV_q36L050TT9aDb26`
- **Aturan Ketat**: Jangan mengunggah file `.json` atau berkas zip update ke Google Drive. Google Drive hanya menampung berkas biner `.apk` dan `.zip`.
- Berikan izin akses publik agar dapat diunduh langsung:
  ```bash
  gdrive mutate share <FILE_ID> --type anyone --role reader
  ```
- Format URL unduhan langsung:
  `https://drive.google.com/uc?export=download&id=<APK_ID>&confirm=t`

---

## 🔥 3. Sinkronisasi ke Firebase Realtime Database

Untuk memastikan seluruh perangkat yang sudah terpasang TW-Mapper menerima notifikasi pembaruan in-app secara instan:

- **Proyek Firebase**: `tw-mapper-update`
- **Database Instance**: `tw-mapper-update-default-rtdb` (Region: `asia-southeast1`)
- **Node Path**: `/app_update`

Perbarui file `release/app_update_node.json` dengan versi baru, kode build, URL unduhan APK langsung, dan changelog, lalu deploy langsung ke Firebase:

```bash
npx -y firebase-tools@latest database:set /app_update release/app_update_node.json --instance tw-mapper-update-default-rtdb --project tw-mapper-update --force
```

Aplikasi TW-Mapper di lapangan akan langsung mendeteksi rilis baru ini saat terhubung ke internet dan menampilkan tombol instalasi satu sentuhan.
