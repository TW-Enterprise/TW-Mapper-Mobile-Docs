---
title: Penguat Sinyal Radio (Mode FCC)
description: Mengoptimalkan daya pancar transmisi video remote control di area perkebunan rimbun menggunakan modul pemulihan radio murni (Pure RF Recovery).
---

Secara default di kawasan Indonesia dan Asia, remote drone DJI beroperasi di bawah standar regulasi daya pancar rendah (**Mode CE**). 

Saat drone diterbangkan di atas perkebunan kelapa sawit yang rimbun, lereng perbukitan, atau dekat tower transmisi berinterferensi tinggi, transmisi video live sering kali tersendat (*lag/stutter*) atau bahkan putus sinyal pada jarak 1 hingga 2 kilometer.

---

## 📡 Apa Itu Mode FCC pada TW-Mapper?

Di negara seperti Amerika Serikat dan Australia, drone diizinkan menggunakan standar transmisi berdaya penuh (**Mode FCC / AU**) yang memiliki daya jangkau sinyal hingga $2\times\text{ – }3\times$ lebih stabil menembus rimbunnya vegetasi pohon.

TW-Mapper Mobile menyediakan fitur pengaktifan profil radio FCC melalui menu **Drone Tools**:
- **14 Pure RF Recovery Frames**: Mengirimkan parameter kalibrasi radio murni yang hanya menyasar modul radio SDR tanpa mengutak-atik Flight Controller drone.
- **Bebas Masalah GPS**: Sensor GPS, kompas, dan peta satelit di DJI Fly tetap stabil 100% tanpa risiko freeze atau blank map.

---

## 🔘 Cara Mengaktifkan Mode FCC

![Menu Drone Tools dan Pengaktifan Mode FCC](/TW-Mapper-Mobile-Docs/images/manual/drone_tools_fcc_dan_altitude.png)

> [!NOTE]
> *Gambar 5.1: Panel modal Drone Tools di TW-Mapper. Menyediakan sakelar penguat sinyal transmisi radio FCC, Altitude Unlock batas 500m, dan kontrol lampu LED malam.*

1. Nyalakan drone dan sambungkan remote Anda hingga live view kamera muncul di layar.
2. Buka aplikasi **TW-Mapper Mobile**.
3. Ketuk ikon **Drone Tools (⚙️)** di bilah atas.
4. Pada kartu **Profil Transmisi Radio (Radio Power Profile)**, ketuk tombol **"Aktifkan FCC (Jangkauan Penuh)"**.
5. Tunggu 2 detik hingga indikator status berubah menjadi warna hijau bertuliskan **`FCC AKTIF`**.
6. Transmisi video Anda kini beroperasi pada daya pancar penuh yang sangat stabil saat terbang jauh di lapangan!

> [!NOTE]
> Jika sewaktu-waktu Anda ingin mengembalikan daya transmisi radio drone ke setelan default pabrik, cukup buka kembali menu Drone Tools dan pilih tombol **"Kembalikan ke Default Pabrik (CE)"**.
