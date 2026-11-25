---
title: Mengenal Layar & Tombol Aplikasi
description: Panduan anatomi layar utama TW-Mapper Mobile, navigasi peta satelit, panel parameter misi, dan indikator penting di lapangan.
---

Antarmuka TW-Mapper Mobile dirancang khusus dengan orientasi layar lanskap (*landscape*) yang sangat nyaman dipandang dan disentuh pada remote berlayar (seperti DJI RC 2 / RC Pro) maupun layar HP yang terpasang di atas remote RC-N.

---

## 🗺️ Tata Letak Layar Utama

Layar kerja terbagi menjadi 3 area utama yang sangat intuitif:

![Tampilan Antarmuka Layar Utama TW-Mapper Mobile](/TW-Mapper-Mobile-Docs/images/manual/antarmuka_layar_utama_grid.png)

> [!NOTE]
> *Gambar 1.2: Anatomi layar utama TW-Mapper Mobile pada remote kontrol. (1) Bilah Alat Pemetaan di sisi kiri, (2) Kanvas Peta Satelit Interaktif dan Jalur Terbang Zig-zag, (3) Panel Parameter Misi Fotogrametri di sisi kanan, (4) Tombol Injeksi Misi KMZ, dan (5) Bilah Metrik Penerbangan di bagian bawah.*

```
┌────────────────────────────────────────────────────────────────────────┐
│ [📡 Indikator GPS / Baterai]                  [⚙️ Drone Tools] [ℹ️ Info]│
│                                                                        │
│                      PETA SATELIT INTERAKTIF                           │
│              (Google Satellite / Hybrid / OpenStreetMap)               │
│                                                                        │
│  [📍 Tambah Titik]                                                     │
│  [🗑️ Hapus Titik]                  ┌─────────────────────────────────┐ │
│  [🔄 Reset Area]                   │ PANEL PENGATURAN MISI           │ │
│                                    │ • Model Drone: DJI Air 3        │ │
│                                    │ • Tinggi (H): 80 m              │ │
│                                    │ • GSD: 2.1 cm/px                │ │
│                                    │ • Overlap: 80% / 70%            │ │
│                                    │ • Kecepatan: 6.5 m/s            │ │
│                                    │ ─────────────────────────────── │ │
│                                    │ [ 🚀 INJEKSI MISI KMZ ]         │ │
│                                    └─────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🔘 Fungsi Tombol-Tombol Penting

### 1. Panel Alat Peta (Sisi Kiri Layar)
- **Ikon Poligon / Titik (📍)**: Mode untuk menambahkan batas patok lahan. Cukup ketuk layar peta di sudut-sudut kebun Anda, maka garis poligon otomatis tersambung.
- **Tombol Penggaris Real-Time (`📏 Ukur: ON / OFF`)**: Mengaktifkan atau mematikan penggaris jarak dan arah derajat kompas *real-time* antar titik sudut (gaya AlpineQuest) saat menggambar atau menggeser batas AOI. Sangat berguna ketika tim lapangan harus memplot area dadakan berdasarkan instruksi jarak dan arah dari titik Takeoff `[H]` (misal: *"150 meter serong kanan, lalu patah 100 meter ke tenggara"*).
- **Ikon Undo / Batalkan (↩️)**: Menghapus titik terakhir jika Anda salah menyentuh layar.
- **Ikon Tempat Sampah (🗑️)**: Membersihkan seluruh area kerja jika ingin membuat misi baru dari nol.
- **Ikon Ganti Lapisan Peta (🗺️)**: Beralih antara tampilan **Google Hybrid (Satelit + Label)**, **Google Satelit Murni**, **Esri Citra Satelit (World Imagery)**, dan **Esri Peta Jalan (Street Map)** yang seluruhnya terintegrasi penuh dengan cache peta offline.

### 2. Panel Pengaturan Misi (Sisi Kanan Layar)
- **Pemilih Model Drone**: Pilih jenis drone yang Anda gunakan saat ini (Mini 4 Pro, Air 3, Mavic 3, dll.). Nilai sensor dan kamera akan langsung menyesuaikan otomatis.
- **Slider Ketinggian ($H$)**: Mengatur seberapa tinggi drone akan terbang di atas permukaan tanah.
- **Label GSD Real-time**: Menampilkan ukuran detail pixel di tanah (misal: `1.8 cm/pixel`). Makin rendah terbang, angka cm/pixel makin kecil dan foto makin tajam.
- **Slider Overlap Depan & Samping**: Mengatur persentase tumpang tindih foto agar perangkat lunak pengolah peta (seperti Agisoft atau Pix4D) mudah menyambung foto.
- **Slider Kecepatan Terbang**: Mengatur kecepatan laju drone. Perhatikan: slider ini memiliki batas aman otomatis (*speed clamping*) agar kamera tidak melewatkan foto.

### 3. Bilah Status Atas & Pengaturan Aplikasi
- **Home Menu (`Mulai Cepat`) & Menu Fitur**: Keduanya menggunakan wadah panel datar (**Flat Solid**) seragam di bawah bilah atas dengan header judul yang jelas serta tombol tutup `✕` di pojok kanan atas, membungkus kartu-kartu aksi 2 kolom secara rapi dan konsisten.
- **Tombol Baru (`+ Baru`)**: Membuka panel pembuatan misi baru dalam wadah **Flat Solid** yang seragam dengan panduan **STEP 1–4** (*Nama Misi & Mulai*, *Pilih Mode Pemetaan*, *Pilih Cara Menandai Titik*, serta *Kamera, Ketinggian & Kecepatan*). Kolom ketik **Nama Misi**, **Tinggi**, dan **Kecepatan** bersifat adaptif terhadap kemunculan papan ketik (*keyboard*) agar selalu berada di atas keyboard saat mengetik di layar lanskap remote maupun ponsel.
- **Drone Tools**: Menu cepat untuk penguat sinyal radio FCC, pembuka batas ketinggian 500m, dan kontrol lampu malam drone.
- **Pengaturan Aplikasi (⚙️)**: Menampilkan menu pengaturan yang tersusun dalam kisi 2x2 seimbang dan efisien:
  - **Bahasa Antarmuka**: Beralih instan antara Bahasa Indonesia dan English untuk semua teks layar dan pesan bantuan lapangan.
  - **Mode Perangkat**: Mode Smart Controller (DJI RC 2 / RC Pro) atau Mode HP / Tablet (RC-N series).
  - **Edisi DJI Fly**: Memilih integrasi jalur rute untuk DJI Fly Mod atau Original.
  - **Bilah Pintas Cepat (Quick Navigation)**: Mengaktifkan notifikasi baris status Android untuk beralih instan antara TW-Mapper dan DJI Fly di remote.
- **Tombol Injeksi Misi KMZ (Tombol Biru Besar)**: Menghasilkan berkas rute resmi dan langsung menyimpannya ke dalam aplikasi DJI Fly.

---

## 🎯 Standar Desain Tombol & Ergonomi Lapangan

Untuk memastikan kenyamanan jempol dan jari pilot saat beroperasi di bawah terik matahari atau menggunakan sarung tangan lapangan, TW-Mapper Mobile menerapkan standar geometri antarmuka yang konsisten:

1. **Tombol Kotak Bersudut Membulat (*Rounded Rectangle* 5–8 dp)**:
   - Seluruh tombol aksi utama, tombol navigasi blok (`‹` dan `›`), pemilih mode misi (*Grid*, *Koridor*, *Orbit 3D*), metode penggambaran (*Bidik*, *Sentuh*, *GPS RC*, *GPS Foto*, *Auto Walk*), pengalih perspektif *2D* / *3D*, kontrol interaksi 3D (*Putar* dan *Geser*), tombol *Takeoff H*, tombol *Edit/Gambar Misi*, tombol *Tambah Titik/Blok*, serta seluruh tombol dialog pengaturan dan pratinjau diseragamkan dengan sudut membulat modern. Geometri ini memberikan area sentuh (*tap target*) yang maksimal dan mencegah salah pencet di lapangan.
2. **Elemen Bulat Alami (*Natural Circular Elements*)**:
   - Elemen yang memiliki fungsi semantik berorientasi derajat dan koordinat tetap berbentuk lingkaran murni (`circle`):
     - **Kompas Azimut 360°**: Tetap bulat presisi agar penunjukan arah mata angin utara dan heading drone terlihat natural.
     - **Titik Patok GIS (1, 2, 3...)**: Titik sudut poligon lahan tetap lingkaran dengan pusat tepat di koordinat GPS.
     - **Pin Terminal Rute (A & B)**: Penanda titik awal dan akhir rute penerbangan.
     - **Indikator Titik Jepret Kamera (*Shutter Dots*)**: Lingkaran titik jepret foto di sepanjang jalur terbang.
     - **Lampu Status Sambungan Drone**: Lingkaran LED status hijau/merah telemetri.
