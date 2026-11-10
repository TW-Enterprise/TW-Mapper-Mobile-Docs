---
title: Solusi Masalah Lapangan (Troubleshooting)
description: Panduan penanganan cepat kendala teknis di lapangan, seperti Shizuku terputus, izin folder DocumentsUI, dan kartu memori lambat.
---

Jika Anda menemui kendala saat bertugas di lapangan, gunakan panduan cepat berikut untuk menyelesaikannya:

---

## ⚠️ Kendala 1: "Shizuku is not running" saat HP Dinyalakan Ulang

### Penyebab:
Di perangkat Android, layanan Wireless Debugging Shizuku otomatis berhenti jika smartphone Anda dimatikan atau di-restart.

### Solusi Cepat:
1. Sambungkan HP ke Wi-Fi atau nyalakan hotspot tethering sebentar.
2. Buka aplikasi **Shizuku**, lalu tekan tombol **Start (Mulai)**.
3. Shizuku akan langsung aktif kembali dalam 5 detik tanpa perlu melakukan proses pairing ulang.

---

## ⚠️ Kendala 2: Tombol "Gunakan Folder Ini" Berwarna Abu-Abu di Android DocumentsUI

### Penyebab:
Pada beberapa versi firmware remote controller, Android membatasi pemilihan langsung di folder root `Android/data/`.

### Solusi:
Pastikan Anda masuk lebih dalam hingga subfolder waypoint:
```
Android > data > dji.go.v5 > files > waypoint
```
Tombol biru **"Gunakan folder ini"** di bagian bawah layar akan otomatis menyala dan dapat ditekan begitu Anda berada di dalam folder `waypoint`.

![Konfirmasi Izin Folder Waypoint pada DocumentsUI](/TW-Mapper-Mobile-Docs/images/manual/instalasi_rc2_package_installer.png)

> [!TIP]
> *Pastikan Anda telah memasang utilitas 02_FileManager.apk dari paket Helper Bundle agar pintasan DocumentsUI terbuka sempurna di remote DJI RC 2.*

---

## ⚠️ Kendala 3: Drone Terbang tapi Foto Tidak Tersimpan ke MicroSD

### Penyebab:
1. Kartu memori MicroSD terlalu lambat (rating di bawah Class 10 / U3).
2. Format kartu memori penuh atau mengalami *filesystem fragmentation*.

### Solusi:
1. Selalu gunakan kartu MicroSD berkecepatan tinggi dengan logo **V30 / A2 / Extreme Pro**.
2. Lakukan format kartu memori langsung dari menu aplikasi DJI Fly (*Format SD Card*) sebelum memulai misi pemetaan pertama hari itu.
