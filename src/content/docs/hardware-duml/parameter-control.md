---
title: Kontrol Parameter FC Mandiri
description: Modifikasi parameter Flight Controller terisolasi via DUML untuk batas ketinggian 500m, strobo LED malam, dan mode ATTI (nonaktifkan GPS untuk latihan/indoor).
---

Selain modul radio RF, TW-Mapper-Mobile menyediakan fitur kontrol parameter Flight Controller (FC) yang dijalankan secara terisolasi dan aman (*on-demand atomic execution*) melalui perintah DUML `cmd_set=3` (Parameter FC).

Setiap modifikasi selalu didahului dengan proses validasi firmware (`cmd_id=247`), penulisan atomik (`cmd_id=249`), dan pembacaan ulang (*read verification*, `cmd_id=248`) untuk menjamin perubahan berhasil diterapkan.

---

## 🏔️ 1. Altitude Unlock 500m (`PARAM_HEIGHT`)

Secara default di beberapa kawasan tertentu, firmware membatasi ketinggian penerbangan maksimum pada 120 meter di atas titik lepas landas. Batasan ini sering menghambat survei fotogrametri pada daerah berbukit atau lereng gunung.

![Modifikasi Register Ketinggian PARAM_HEIGHT pada Drone Tools](/TW-Mapper-Mobile-Docs/images/manual/drone_tools_altitude_unlock.png)

> [!NOTE]
> *Gambar: Jendela kendali pembuka batas ketinggian 500 meter yang menuliskan nilai heksadesimal ke register FC secara langsung.*

- **Receiver ID**: `3` (Flight Controller).
- **Parameter Hash**: `PARAM_HEIGHT` = `0x0371238A` (Bytes: `8a 23 71 03`).
- **Nilai Unlock (500m)**:
  Payload: `{ 0x8a, 0x23, 0x71, 0x03, 0xf4, 0x01 }` (`uint16 LE 0x01F4 = 500`).
- **Nilai Restore (120m)**:
  Payload: `{ 0x8a, 0x23, 0x71, 0x03, 0x78, 0x00 }` (`uint16 LE 0x0078 = 120`).

---

## 💡 2. Kontrol Lampu Navigasi LED (`PARAM_LED`)

Untuk operasi penerbangan malam hari, inspeksi visual di area gelap, atau sebaliknya mematikan lampu strobo depan agar tidak memantul pada kaca jendela saat pemetaan fasad:

![Kontrol Lampu Strobo LED via Register PARAM_LED](/TW-Mapper-Mobile-Docs/images/manual/drone_tools_kontrol_led_strobo.png)

> [!NOTE]
> *Gambar: Pengaturan lampu strobo depan lengan drone via Drone Tools.*

- **Receiver ID**: `3` (Flight Controller).
- **Parameter Hash**: `PARAM_LED` = `0xEDCE59A2` (Bytes: `a2 59 ce ed`).
- **Nilai Nyala (ON)**: `239`
- **Nilai Padam (OFF)**: `0`

---

## 🕹️ 3. Mode ATTI / Nonaktifkan GPS (`PARAM_GPS` & `PARAM_VPS`)

Mode ATTI (*Attitude Mode*) menonaktifkan penstabilan posisi berbasis GPS dan sensor optik bawah (VPS). Mode ini sangat penting untuk:
1. Pelatihan ketangkasan pilot drone komersial dalam mengendalikan drone saat hembusan angin kencang tanpa bantuan komputer.
2. Pengujian terbang indoor di dalam gudang atau hanggar tertutup di mana sinyal GPS terpantul (*multipath error*).

- **Parameter GPS**: `g_config.gps_cfg.gps_enable_0` (Hash: `0xC5429582`).
- **Parameter VPS**: `g_config.mvo_cfg.mvo_func_en_0` (Hash: `0x97BE0658`).
- **Nilai ATTI ON (GPS Mati)**: Tulis nilai `0` ke kedua parameter.
- **Nilai Restore (GPS Normal)**: Tulis nilai `1` ke kedua parameter.

> [!CAUTION]
> **Prosedur Keamanan Darat (Safety Ground Check)**:
> TW-Mapper memeriksa status drone sebelum mengizinkan pengalihan ke mode ATTI. Mode ATTI hanya dapat diaktifkan saat drone berada di darat dengan motor baling-baling dalam keadaan mati (*motors disarmed*) untuk menjamin keselamatan penerbangan.
