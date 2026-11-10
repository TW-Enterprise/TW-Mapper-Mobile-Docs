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
- **Ikon Undo / Batalkan (↩️)**: Menghapus titik terakhir jika Anda salah menyentuh layar.
- **Ikon Tempat Sampah (🗑️)**: Membersihkan seluruh area kerja jika ingin membuat misi baru dari nol.
- **Ikon Ganti Lapisan Peta (🗺️)**: Beralih antara tampilan citra satelit Google, peta jalan hybrid, atau OpenStreetMap.

### 2. Panel Pengaturan Misi (Sisi Kanan Layar)
- **Pemilih Model Drone**: Pilih jenis drone yang Anda gunakan saat ini (Mini 4 Pro, Air 3, Mavic 3, dll.). Nilai sensor dan kamera akan langsung menyesuaikan otomatis.
- **Slider Ketinggian ($H$)**: Mengatur seberapa tinggi drone akan terbang di atas permukaan tanah.
- **Label GSD Real-time**: Menampilkan ukuran detail pixel di tanah (misal: `1.8 cm/pixel`). Makin rendah terbang, angka cm/pixel makin kecil dan foto makin tajam.
- **Slider Overlap Depan & Samping**: Mengatur persentase tumpang tindih foto agar perangkat lunak pengolah peta (seperti Agisoft atau Pix4D) mudah menyambung foto.
- **Slider Kecepatan Terbang**: Mengatur kecepatan laju drone. Perhatikan: slider ini memiliki batas aman otomatis (*speed clamping*) agar kamera tidak melewatkan foto.

### 3. Bilah Status Atas
- **Drone Tools**: Menu cepat untuk penguat sinyal radio FCC, pembuka batas ketinggian 500m, dan kontrol lampu malam drone.
- **Tombol Injeksi Misi KMZ (Tombol Biru Besar)**: Menghasilkan berkas rute resmi dan langsung menyimpannya ke dalam aplikasi DJI Fly.
