---
title: Double Grid 3D & Pemetaan Fasad
description: Pola grid silang ortogonal 90° untuk pemodelan rekonstruksi 3D obyek, arsitektur gedung, dan kontur topografi kompleks.
---

Jika ortofoto 2D umumnya hanya membutuhkan pemotretan tegak lurus ke bawah (*nadir* 90°) dengan pola satu arah, pemodelan rekonstruksi 3D (seperti *Digital Surface Model*, mesh segitiga 3D, dan *point cloud*) membutuhkan data fotogrametri dari berbagai sudut yang saling bersilangan.

---

## 🏗️ Pola Silang Ortogonal 90°

Mode **Double Grid** di TW-Mapper-Mobile menghasilkan dua set jalur penerbangan yang saling bersilangan 90° secara otomatis dalam satu kesatuan rencana misi:

```mermaid
graph TD
    subgraph Double Grid Ortogonal 90°
        A1[Jalur Pass 1: Arah 0° - 180°] -.-> B1[Foto Nadir & Oblique Sisi Utara-Selatan]
        A2[Jalur Pass 2: Arah 90° - 270°] -.-> B2[Foto Nadir & Oblique Sisi Timur-Barat]
    end
    B1 --> C[Rekonstruksi Mesh 3D Tanpa Blind Spot]
    B2 --> C
```

![Misi 3D Double Grid Bersilangan 90 Derajat](/TW-Mapper-Mobile-Docs/images/manual/misi_3d_double_grid_persilangan.png)

> [!NOTE]
> *Gambar: Pola jalur silang 90 derajat Double Grid pada TW-Mapper Mobile untuk merekonstruksi model 3D bangunan arsitektur tanpa area buta.*

### Keuntungan Pola Double Grid:
1. **Eliminasi Oklusi & Bayangan (Shadow Blindspots)**: Bangunan tinggi, kanopi pepohonan lebat, dan tebing curam sering kali menutupi permukaan tanah di bawahnya jika hanya dipotret dari satu arah.
2. **Kerapatan Point Cloud Ekstrem**: Setiap titik koordinat di permukaan terrekam oleh minimal 8 hingga 15 foto dari sudut yang berbeda, menghasilkan resolusi tekstur vertikal yang sangat tajam.
3. **Akurasi Ketinggian (Z-Axis Accuracy)**: Memperbaiki akurasi koordinat vertikal elevasi hingga 40% dibandingkan pemotretan single grid biasa.

---

## 📐 Sudut Pitch Gimbal (Oblique vs Nadir)

Dalam dialog konfigurasi Double Grid, pilot dapat menentukan sudut kemiringan gimbal:

- **Nadir (-90°)**: Kamera menghadap lurus ke bawah. Pilihan terbaik untuk area dengan perbedaan elevasi tanah ekstrem atau tambang terbuka (*open pit mine*).
- **Oblique (-60° s/d -70°)**: Kamera dimiringkan sedikit ke depan. Pilihan wajib untuk pemodelan fasad bangunan arsitektur gedung perkotaan, jembatan, monumen, dan tower BTS, sehingga dinding vertikal terpotret dengan detail maksimal.

---

## ⚡ Optimalisasi Baterai & Misi Terpadu

Misi Double Grid membutuhkan waktu terbang sekitar $1.8\times$ hingga $2.0\times$ lebih lama daripada Single Grid. TW-Mapper mempermudah eksekusi lapangan dengan:
- **Kalkulasi Kebutuhan Baterai**: Menampilkan estimasi jumlah pergantian baterai (*swap battery indicator*).
- **Waypoint Pause & Resume**: File WPML yang dihasilkan mendukung fungsi jeda resmi DJI Fly. Pilot dapat mendaratkan drone saat baterai tersisa 25%, mengganti baterai baru, dan DJI Fly akan otomatis melanjutkan misi dari waypoint persis saat drone mendarat.
