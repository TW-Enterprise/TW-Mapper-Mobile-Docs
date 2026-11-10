---
title: Panduan Instalasi di HP & Tablet Android
description: Panduan praktis instalasi di smartphone/tablet Android dan cara menyalakan Shizuku tanpa komputer agar injeksi misi ke DJI Fly berjalan otomatis.
---

Jika Anda menerbangkan drone menggunakan remote kontrol tanpa layar (**DJI RC-N1, RC-N2, atau RC-N3**) yang dipasangkan ke HP atau tablet Android:

Aplikasi TW-Mapper dapat langsung dipasang di HP Android Anda. Untuk mengirim file misi ke aplikasi DJI Fly secara otomatis (tanpa ribet membuka folder manual di Android 11, 12, 13, atau 14), kami menggunakan bantuan aplikasi pendukung resmi bernama **Shizuku**.

---

## 📱 Langkah 1: Pasang APK TW-Mapper di HP

1. Unduh berkas `TW-Mapper-Mobile-v<VERSION>-build<BUILD>.apk` ke HP Anda.
2. Buka file manager di HP, ketuk file APK tersebut, lalu pilih **Install**.
3. Buka aplikasi TW-Mapper dan berikan izin **Lokasi** dan **Notifikasi** saat diminta.

---

## ⚡ Langkah 2: Mengaktifkan Shizuku Tanpa Komputer

Karena sistem Android modern mengunci folder aplikasi demi privasi, **Shizuku** memungkinkan TW-Mapper menulis file rute ke DJI Fly dalam 1 detik tanpa perlu membongkar atau me-*root* HP Anda.

![Panduan Aktivasi Shizuku dan Otorisasi TW-Mapper di HP Android](/TW-Mapper-Mobile-Docs/images/manual/instalasi_hp_shizuku_pairing.png)

> [!NOTE]
> *Gambar 1.5: Pengaturan injeksi rute Mode HP/Tablet. (1) Status Shizuku aktif melalui Wireless Debugging, (2) Kotak centang "Ingat pilihan saya" saat otorisasi pertama kali, dan (3) Tombol konfirmasi izin transfer berkas KMZ.*

### Cara Menyalakan Shizuku (Hanya Butuh Wi-Fi / Hotspot):
1. **Pasang Shizuku**: Unduh aplikasi **Shizuku** dari Google Play Store (gratis dan resmi).
2. **Aktifkan Opsi Pengembang HP**:
   - Buka *Pengaturan HP* > *Tentang Ponsel* (*About Phone*).
   - Ketuk menu **Nomor Bentukan (Build Number)** sebanyak 7 kali berturut-turut hingga muncul tulisan *"Anda telah menjadi pengembang"*.
3. **Hubungkan HP ke Wi-Fi / Tethering**:
   - Sambungkan HP ke jaringan Wi-Fi rumah atau hotspot tethering HP teman.
4. **Aktifkan Wireless Debugging**:
   - Di Pengaturan HP, masuk ke *Sistem* > *Opsi Pengembang* (*Developer Options*).
   - Cari dan aktifkan opsi **Proses Debug Nirkabel (Wireless Debugging)**.
5. **Pairing di Aplikasi Shizuku**:
   - Buka aplikasi Shizuku, pilih menu **Pairing (Penyandingan)**.
   - Masukkan 6 angka kode pairing yang muncul pada bilah notifikasi.
   - Tekan tombol **Start (Mulai)** di aplikasi Shizuku hingga muncul status hijau: *"Shizuku is running"*.

---

## 🔗 Langkah 3: Menghubungkan TW-Mapper dengan Shizuku

1. Buka aplikasi **TW-Mapper-Mobile**.
2. Rancang misi atau buka menu **Injeksi Misi**.
3. Tekan tombol **"Gunakan Shizuku Direct Inject"**.
4. Akan muncul jendela konfirmasi kecil di layar HP Anda; centang dan pilih **"Izinkan Selalu"** (*Allow always*).

Selesai! Sekarang HP Anda memiliki kemampuan transfer misi sekelas remote enterprise. Begitu Anda menekan tombol injeksi, rute langsung tersimpan ke DJI Fly dalam sekejap mata.
