---
title: Standar WPML DJI & Anatomi File KMZ
description: Struktur teknis berkas misi Waypoint Markup Language (WPML) DJI, format arsip KMZ, dan kompatibilitas eksekusi dengan DJI Fly dan DJI Pilot 2.
---

Sejak peluncuran seri DJI Mavic 3, Matrice 30 Enterprise, dan DJI Fly v1.9+, DJI memperkenalkan standar baru untuk format misi waypoint bernama **Waypoint Markup Language (WPML)**.

WPML menggantikan format lama berbasis KML sederhana dengan struktur berorientasi tindakan (*action-based payload*) yang mampu mengendalikan kecepatan terbang, sudut yaw drone, pitch gimbal, trigger shutter kamera, dan transisi kurva antar-titik secara presisi.

---

## 📦 Struktur Berkas KMZ WPML

File misi yang diekspor oleh TW-Mapper-Mobile adalah arsip zip berekstensi `.kmz` yang mematuhi skema resmi DJI:

```
nama_misi.kmz
└── wpmz/
    ├── template.kml       # Definisi templat misi untuk diedit di UI DJI Fly
    ├── waylines.wpml      # Lintasan eksekusi terbang aktual yang dibaca autopilot
    └── res/               # Resource tambahan (ikon, thumbnail preview, dll.)
```

![Struktur Berkas KMZ WPML dan Verifikasi Manifest Misi](/TW-Mapper-Mobile-Docs/images/manual/laporan_misi_ringkasan_penerbangan.png)

> [!NOTE]
> *Gambar: Ringkasan manifes berkas misi WPML KMZ di TW-Mapper Mobile, memuat koordinat waypoint, jarak, jumlah foto, dan aksi shutter kamera otomatis.*

### 1. `template.kml`
Berisi metadata perancangan misi tingkat tinggi:
- Koordinat poligon batas pemetaan.
- Parameter overlap, ketinggian, dan kecepatan yang dapat dibuka kembali di antarmuka DJI Fly untuk penyesuaian lapangan.

### 2. `waylines.wpml`
Merupakan file instruksi eksekusi instan untuk *Flight Controller*:
- Daftar koordinat waypoint latitude, longitude, dan ellipsoidal height (WGS84).
- Target kecepatan terbang pada setiap segmen ($V$).
- Konfigurasi trigger kamera: `shootPhotoAction` yang dipicu secara otomatis berbasis jarak tempuh (*distance interval*).
- Tindakan selesai (*finishAction*): Kembali ke Home Point (`goHome`) atau melayang di titik akhir (`hover`).

---

## 🛠️ Kompatibilitas Antar Aplikasi DJI

| Aplikasi Target | Ekstensi | Lokasi Direktori Sistem Android |
| :--- | :--- | :--- |
| **DJI Fly** (`dji.go.v5`) | `.kmz` | `Android/data/dji.go.v5/files/waypoint` |
| **DJI Pilot 2** | `.kmz` | `DJI/com.dji.industry.pilot/waypoint` |

Karena file yang dihasilkan oleh TW-Mapper-Mobile merupakan berkas standar resmi WPML murni, berkas `.kmz` ini **100% kompatibel dan aman dijalankan** oleh firmware autopilot drone DJI tanpa risiko kesalahan parsing atau penolakan misi (*mission rejected error*).
