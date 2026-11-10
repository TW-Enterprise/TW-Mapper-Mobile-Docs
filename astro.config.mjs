import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const base = process.env.DOCS_BASE ?? '/TW-Mapper-Mobile-Docs';
const siteUrl = process.env.DOCS_SITE ?? 'https://tw-enterprise.github.io';

export default defineConfig({
  site: siteUrl,
  base,
  integrations: [
    starlight({
      title: 'TW-Mapper Mobile',
      description: 'Panduan Pengguna TW-Mapper Mobile — Perencanaan Fotogrametri Drone DJI Langsung di Remote Kontrol Tanpa Laptop',
      logo: {
        src: './src/assets/logo.png',
        alt: 'TW-Mapper Mobile Logo',
      },
      favicon: '/favicon.png',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/TW-Enterprise/TW-Mapper-Mobile' },
      ],
      customCss: [
        './src/styles/custom.css',
      ],
      sidebar: [
        {
          label: 'Panduan Pilot Pemula',
          items: [
            { label: 'Pengenalan & Solusi Tanpa Laptop', slug: 'panduan-pilot/pengenalan' },
            { label: 'Instalasi di DJI RC 2 / RC Pro', slug: 'panduan-pilot/instalasi-rc' },
            { label: 'Instalasi di HP & Tablet Android', slug: 'panduan-pilot/instalasi-hp' },
            { label: 'Mengenal Layar & Tombol Aplikasi', slug: 'panduan-pilot/antarmuka' },
            { label: 'Quick Navigator (Pindah Aplikasi 1-Detik)', slug: 'panduan-pilot/quick-navigator' },
          ],
        },
        {
          label: 'Tutorial Misi Lapangan',
          items: [
            { label: 'Misi Lahan & Kebun (Grid Poligon)', slug: 'tutorial-misi/pemetaan-lahan' },
            { label: 'Misi Koridor (Jalan, Pipa, Sungai)', slug: 'tutorial-misi/pemetaan-koridor' },
            { label: 'Misi 3D & Fasad (Double Grid)', slug: 'tutorial-misi/pemetaan-3d-fasad' },
            { label: 'Inspeksi Menara (Orbit 3D Helix)', slug: 'tutorial-misi/inspeksi-menara' },
            { label: 'Strategi Lahan Luas & Multi-Baterai', slug: 'tutorial-misi/multi-baterai' },
            { label: 'Mengikuti Kontur Bukit (Terrain Follow)', slug: 'tutorial-misi/follow-terrain' },
          ],
        },
        {
          label: 'Standar Fotogrametri & Kamera',
          items: [
            { label: 'GSD, Overlap & Ketinggian Terbang', slug: 'standar-fotogrametri/gsd-overlap' },
            { label: 'Mode Kamera 12 MP vs 48 MP', slug: 'standar-fotogrametri/mode-kamera' },
            { label: 'Batas Kecepatan Aman (Anti Foto Bolong)', slug: 'standar-fotogrametri/speed-clamping' },
            { label: 'Akurasi GPS & Penggunaan GCP', slug: 'standar-fotogrametri/akurasi-gcp' },
          ],
        },
        {
          label: 'Injeksi & Eksekusi di DJI Fly',
          items: [
            { label: 'Cara Injeksi Misi ke DJI Fly', slug: 'dji-fly/cara-injeksi' },
            { label: 'Checklist Sebelum Terbang di DJI Fly', slug: 'dji-fly/checklist-terbang' },
            { label: 'Melanjutkan Misi Saat Baterai Habis', slug: 'dji-fly/resume-misi' },
            { label: 'Mengembalikan Misi Lama (Safe Backup)', slug: 'dji-fly/pulihkan-backup' },
          ],
        },
        {
          label: 'Drone Tools & Kesiapan Lapangan',
          items: [
            { label: 'Unduh Peta Satelit Offline', slug: 'tools-lapangan/peta-offline' },
            { label: 'Penguat Sinyal Radio (Mode FCC)', slug: 'tools-lapangan/fcc-signal' },
            { label: 'Buka Batas Tinggi 500m (Altitude)', slug: 'tools-lapangan/altitude-unlock' },
            { label: 'Kontrol Lampu Strobo LED', slug: 'tools-lapangan/kontrol-led' },
          ],
        },
        {
          label: 'Bantuan & Tanya Jawab (FAQ)',
          items: [
            { label: 'Pertanyaan yang Sering Diajukan (FAQ)', slug: 'faq/tanya-jawab' },
            { label: 'Solusi Masalah Lapangan', slug: 'faq/troubleshooting' },
          ],
        },
        {
          label: 'Referensi Pengembang (Developer)',
          collapsed: true,
          items: [
            { label: 'Arsitektur Kode Sumber', slug: 'developer/architecture' },
            { label: 'Kebijakan Rilis & CI/CD', slug: 'developer/release-policy' },
            { label: 'Build Lokal & Firebase Sync', slug: 'developer/local-build' },
            { label: 'Protokol DUML Murni', slug: 'hardware-duml/duml-protocol' },
            { label: 'Arsitektur Dual Transport', slug: 'hardware-duml/dual-transport' },
            { label: 'Kontrol Parameter FC', slug: 'hardware-duml/parameter-control' },
          ],
        },
      ],
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
    }),
  ],
});
