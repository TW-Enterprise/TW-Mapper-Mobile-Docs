---
title: Panduan Instalasi di DJI RC 2 / RC Pro
description: Panduan langkah demi langkah memasang aplikasi TW-Mapper Mobile di remote kontrol berlayar DJI RC 2 dan DJI RC Pro menggunakan paket Helper Bundle.
---

Jika Anda memiliki remote berlayar bawaan seperti **DJI RC 2** (bawaan Air 3 atau Mini 4 Pro) atau **DJI RC Pro** (bawaan Mavic 3), Anda dapat memasang TW-Mapper langsung di dalam remote tersebut.

---

## 📥 Persiapan File Instalasi

1. Unduh paket zip rilis resmi: **`TW Mapper DJI RC 2 + HELPER.zip`**.
2. Ekstrak file zip tersebut di komputer atau laptop. Anda akan melihat 3 berkas file:
   - `01_PackageInstaller.apk` (Utilitas pemasang aplikasi)
   - `02_FileManager.apk` (Pintasan DocumentsUI)
   - `TW-Mapper-Mobile-v<VERSION>-build<BUILD>.apk` (Aplikasi utama TW-Mapper)
3. Salin ketiga berkas APK tersebut ke dalam kartu **MicroSD** atau **Flashdisk USB-C**.

---

## 🛠️ Langkah Pemasangan di Remote

![Panduan Instalasi APK dan Izin Folder SAF di DJI RC 2](/TW-Mapper-Mobile-Docs/images/manual/instalasi_rc2_package_installer.png)

> [!NOTE]
> *Gambar 1.3: Alur pemasangan paket helper di remote DJI RC 2. (1) Urutan pemasangan 3 berkas APK dari kartu MicroSD, (2) Lokasi folder target penyimpanan misi DJI Fly, dan (3) Tombol konfirmasi izin folder "Gunakan folder ini".*

### Langkah 1: Pasang Kartu MicroSD ke Remote
Masukkan MicroSD ke slot kartu memori pada bagian bawah DJI RC 2 / RC Pro Anda.

### Langkah 2: Buka File Manager Bawaan Remote
1. Nyalakan remote kontrol Anda.
2. Geser layar dari atas ke bawah untuk membuka menu Pengaturan (*Settings*).
3. Masuk ke menu **Storage** (Penyimpanan) > pilih kartu **SD Card** Anda.

### Langkah 3: Pasang Utilitas Pendukung (Hanya Sekali di Awal)
- Jika remote belum bisa memasang aplikasi luar, ketuk file **`01_PackageInstaller.apk`** lalu pilih **Install**.
- Ketuk file **`02_FileManager.apk`** lalu pilih **Install**. Aplikasi ini berfungsi sebagai jembatan agar remote dapat membuka folder penyimpanan misi sistem.

### Langkah 4: Pasang Aplikasi TW-Mapper Mobile
1. Ketuk file **`TW-Mapper-Mobile-v<VERSION>-build<BUILD>.apk`**.
2. Pilih **Install** dan tunggu hingga proses selesai.
3. Ikon aplikasi **TW-Mapper** kini akan muncul di daftar aplikasi remote Anda!

---

## 🔑 Pemberian Izin Folder Pertama Kali (Penting!)

Saat Anda pertama kali membuka TW-Mapper dan menekan tombol *Injeksi Misi KMZ*:
1. Layar sistem Android remote akan membuka antarmuka dokumen (*DocumentsUI*).
2. Masuk ke folder:
   ```
   Android > data > dji.go.v5 > files > waypoint
   ```
3. Tekan tombol biru di bawah layar: **"Gunakan folder ini"** (*Use this folder*).
4. Pilih **"Izinkan"** (*Allow*).

> [!TIP]
> Pemberian izin ini **hanya dilakukan satu kali saja**. Untuk seluruh misi berikutnya, TW-Mapper akan langsung menyuntikkan jalur penerbangan secara otomatis tanpa perlu membuka folder lagi!
