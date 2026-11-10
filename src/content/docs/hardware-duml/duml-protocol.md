---
title: Protokol DUML Murni & 14 Pure RF Frames
description: Anatomi paket DUML, 14 frame pemulihan radio murni (Pure RF Recovery), dan eliminasi penulisan FC untuk mencegah freeze sensor fusion dan peta blank di DJI Fly.
---

**DUML (DJI Universal Markup Language)** adalah protokol biner berkecepatan tinggi yang digunakan oleh seluruh modul internal drone DJI (Flight Controller, Gimbal, Kamera, Modul Radio SDR, Baterai, dan ESC) untuk saling bertukar pesan dan instruksi.

---

## 📦 Anatomi Struktur Paket DUML

Setiap frame DUML tersusun atas struktur biner yang sangat presisi dengan proteksi integritas ganda (CRC8 pada header dan CRC16 pada keseluruhan paket):

```
+------+-----+----------+------+--------+----------+---------+-------+--------+-------+---------+-------+
| 0x55 | Len | Len High | CRC8 | Sender | Receiver | Seq Num | Flags | CmdSet | CmdId | Payload | CRC16 |
+------+-----+----------+------+--------+----------+---------+-------+--------+-------+---------+-------+
  0      1       2         3       4         5        6..7       8       9       10      11..     Last 2
```

- **Byte 0**: Magic Byte `0x55`.
- **Byte 1–2**: Panjang paket (`len`), dengan bit atas di-OR dengan `0x04` sebagai penanda versi protokol.
- **Byte 3**: Checksum CRC8 (`poly=119`, `xor=140`) atas 3 byte pertama.
- **Byte 4**: ID Pengirim (*Sender ID*).
- **Byte 5**: ID Penerima (*Receiver ID*, misal: `9` untuk Radio SDR, `7` untuk Air Link, `3` untuk Flight Controller).
- **Byte 6–7**: Nomor Urut Paket (*Sequence Number*, 16-bit).
- **Byte 8**: Flags (tipe paket: Request, Ack, Push).
- **Byte 9**: Command Set (`cmd_set`).
- **Byte 10**: Command ID (`cmd_id`).
- **Byte 11..**: Payload data.
- **2 Byte Terakhir**: Checksum CRC16 (`poly=13970`, `init=33800`) atas seluruh paket sebelum CRC.

---

## 📡 14 Pure RF Radio-Recovery Frames

Untuk memulihkan daya pancar transmisi video/kontrol dan memperluas jangkauan operasional drone di area blank spot atau interferensi frekuensi tinggi:

![Pengiriman 14 Pure RF Recovery Frames via Drone Tools](/TW-Mapper-Mobile-Docs/images/manual/drone_tools_fcc_dan_altitude.png)

> [!NOTE]
> *Gambar: Implementasi pengiriman 14 paket frame DUML murni ke modul SDR Receiver 9 dan Air Link Receiver 7.*

TW-Mapper-Mobile menggunakan **14 frame pemulihan murni RF (Pure 14 RF Radio-Recovery)**:
1. Hanya menyasar modul **SDR Receiver 9** dan **Air Link Receiver 7**.
2. Mengirimkan penegasan parameter regional frekuensi tinggi (`0x07, 0x30, 9` dan `0x07, 0x18, 7`).
3. Mengaplikasikan tabel kalibrasi daya pancar Tx RF (`0x09, 0x27, 9`).

---

## 🚫 Eliminasi Total Penulisan Konfigurasi FC

Banyak utilitas pihak ketiga lawas mengirimkan penulisan acak ke register Flight Controller (`cmd_set=0x03`, `cmd_id=175/0xAF` atau `249/0xF9`) secara terus menerus dalam loop radio keepalive.

> [!WARNING]
> **Efek Samping Buruk Penulisan FC Berulang**:
> - Sensor fusion EKF (*Extended Kalman Filter*) mengalami reset internal mendadak.
> - Kunci satelit GPS terputus (*loss of GPS lock*).
> - Posisi Home Point bergeser secara tidak terduga.
> - Peta di aplikasi DJI Fly mengalami *freeze* atau menjadi *blank map* abu-abu.

### Standar Rekayasa TW-Mapper:
TW-Mapper **100% mengeliminasi penulisan konfigurasi FC dari loop radio keepalive**. Loop radio hanya berkomunikasi secara eksklusif dengan modul SDR (Receiver 9). Hasilnya:
- GPS tetap mengunci 25–32 satelit secara stabil.
- Kompas dan sensor optik VPS bekerja sempurna.
- Rendering peta satelit dan posisi drone di DJI Fly tetap mulus tanpa pernah mengalami freeze.
