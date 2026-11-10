---
title: Mengembalikan Misi Lama (Safe Backup)
description: Cara memulihkan berkas rute waypoint bawaan DJI Fly yang pernah Anda timpa menggunakan fitur riwayat pencadangan otomatis TW-Mapper.
---

Ketika Anda menyuntikkan misi baru dari TW-Mapper ke slot misi DJI Fly yang sudah ada, Anda mungkin khawatir: *"Bagaimana jika suatu saat saya butuh kembali rute lama bawaan yang pernah saya simpan sebelumnya?"*

TW-Mapper Mobile memiliki fitur **Safe Backup Otomatis**. Setiap kali Anda menimpa sebuah misi, file asli yang lama disimpan secara otomatis di brankas cadangan aplikasi.

---

## 🛡️ Bagaimana Safe Backup Bekerja?

Sebelum TW-Mapper menulis file rute baru:
1. File rute asli di folder DJI Fly diduplikasi dan diberi label stempel waktu otomatis:
   `backup_misi_YYYYMMDD_HHMMSS.kmz`.
2. File cadangan ini disimpan secara permanen di memori lokal aplikasi TW-Mapper.
3. Bahkan jika remote Anda mendadak mati karena kehabisan baterai saat proses injeksi berlangsung, file asli Anda tidak akan pernah korup atau hilang.

---

## ↺ Cara Memulihkan Misi Lama ke DJI Fly

Jika Anda ingin mengembalikan salah satu rute lama:

![Manajemen Riwayat Safe-Backup dan Pemulihan Misi](/TW-Mapper-Mobile-Docs/images/manual/injeksi_manajemen_backup_pulihkan.png)

> [!NOTE]
> *Gambar 4.4: Brankas Safe-Backup otomatis di TW-Mapper. (1) Daftar berkas cadangan otomatis beserta stempel waktu dan slot misi, dan (2) Tombol "Pulihkan ke DJI Fly" untuk mengembalikan rute lama dalam sekali sentuh.*

1. Buka aplikasi **TW-Mapper Mobile**.
2. Masuk ke menu **Pengaturan** (ikon gerigi ⚙️ di pojok kanan atas) > pilih tab **Riwayat Cadangan Misi (Backup History)**.
3. Anda akan melihat daftar riwayat pencadangan lengkap dengan tanggal, jam, dan nama misi aslinya.
4. Ketuk tombol **"Pulihkan ke DJI Fly"** di sebelah rute yang Anda inginkan.
5. Selesai! Buka DJI Fly, dan rute asli lama Anda sudah kembali ke posisi semula seperti sebelum ditimpa.
