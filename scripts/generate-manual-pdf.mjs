#!/usr/bin/env node
/**
 * TW-Mapper-Mobile — Manual Book PDF Generator
 * Mengompilasi seluruh panduan pengguna dan tutorial lapangan menjadi
 * satu dokumen PDF resmi berkualitas cetak A4 (Manual Book).
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';

marked.use(markedKatex({ throwOnError: false }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SITE_DIR = resolve(__dirname, '..');
const DOCS_DIR = join(SITE_DIR, 'src', 'content', 'docs');
const DIST_DIR = join(SITE_DIR, 'dist');
const OUT_PDF = join(DIST_DIR, 'TW-Mapper-Mobile-Manual-Book.pdf');

// Daftar bab dan urutan file dokumen
const CHAPTERS = [
  {
    chapterTitle: 'Bab 1: Panduan Pilot Pemula',
    chapterSummary: 'Konsep pemetaan tanpa laptop, panduan instalasi pada remote DJI RC 2 / RC Pro dan smartphone, serta pengenalan antarmuka kerja.',
    files: [
      'panduan-pilot/pengenalan.md',
      'panduan-pilot/instalasi-rc.md',
      'panduan-pilot/instalasi-hp.md',
      'panduan-pilot/antarmuka.md',
      'panduan-pilot/quick-navigator.md',
    ]
  },
  {
    chapterTitle: 'Bab 2: Tutorial Misi Lapangan',
    chapterSummary: 'Panduan operasional langkah demi langkah untuk pemetaan lahan poligon, koridor jalan, fasad 3D, inspeksi menara helix, multi-baterai, dan terrain follow.',
    files: [
      'tutorial-misi/pemetaan-lahan.md',
      'tutorial-misi/pemetaan-koridor.md',
      'tutorial-misi/pemetaan-3d-fasad.md',
      'tutorial-misi/inspeksi-menara.md',
      'tutorial-misi/multi-baterai.md',
      'tutorial-misi/follow-terrain.md',
    ]
  },
  {
    chapterTitle: 'Bab 3: Standar Fotogrametri & Kamera',
    chapterSummary: 'Standar WanDrone Palembang mengenai resolusi piksel (GSD), overlap kamera, pemilihan mode 12 MP vs 48 MP, batas kecepatan aman, dan GCP.',
    files: [
      'standar-fotogrametri/gsd-overlap.md',
      'standar-fotogrametri/mode-kamera.md',
      'standar-fotogrametri/speed-clamping.md',
      'standar-fotogrametri/akurasi-gcp.md',
    ]
  },
  {
    chapterTitle: 'Bab 4: Injeksi & Eksekusi di DJI Fly',
    chapterSummary: 'Tata cara menyuntikkan misi WPML KMZ langsung ke DJI Fly, daftar periksa pra-terbang, prosedur resume saat baterai habis, dan safe backup.',
    files: [
      'dji-fly/cara-injeksi.md',
      'dji-fly/checklist-terbang.md',
      'dji-fly/resume-misi.md',
      'dji-fly/pulihkan-backup.md',
    ]
  },
  {
    chapterTitle: 'Bab 5: Drone Tools & Kesiapan Lapangan',
    chapterSummary: 'Utilitas lapangan untuk menyimpan peta satelit offline, penguat sinyal radio mode FCC, pembuka ketinggian 500m, dan kontrol strobo LED.',
    files: [
      'tools-lapangan/peta-offline.md',
      'tools-lapangan/fcc-signal.md',
      'tools-lapangan/altitude-unlock.md',
      'tools-lapangan/kontrol-led.md',
    ]
  },
  {
    chapterTitle: 'Bab 6: Bantuan & Tanya Jawab (FAQ)',
    chapterSummary: 'Jawaban atas pertanyaan umum seputar operasional lapangan dan solusi penanganan cepat jika terjadi kendala teknis.',
    files: [
      'faq/tanya-jawab.md',
      'faq/troubleshooting.md',
    ]
  }
];

// Load Logo as base64
const logoPath = join(SITE_DIR, 'src', 'assets', 'logo.png');
let logoBase64 = '';
if (existsSync(logoPath)) {
  const buf = readFileSync(logoPath);
  logoBase64 = `data:image/png;base64,${buf.toString('base64')}`;
}

// Helper: Parse Markdown frontmatter & body
function parseDoc(relativePath) {
  const fullPath = join(DOCS_DIR, relativePath);
  if (!existsSync(fullPath)) {
    return { title: relativePath, content: '' };
  }
  const raw = readFileSync(fullPath, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  let title = relativePath;
  let description = '';
  let body = raw;
  if (match) {
    const fm = match[1];
    body = match[2];
    const tMatch = fm.match(/title:\s*"?([^"\n\r]+)"?/);
    if (tMatch) title = tMatch[1].trim();
    const dMatch = fm.match(/description:\s*"?([^"\n\r]+)"?/);
    if (dMatch) description = dMatch[1].trim();
  }

  // Convert GitHub alerts (> [!NOTE], > [!TIP], > [!WARNING], > [!CAUTION], > [!IMPORTANT])
  body = body.replace(/>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*\n((?:>.*\n?)*)/gi, (_, type, text) => {
    const cleanText = text.replace(/^>\s?/gm, '').trim();
    const badgeType = type.toUpperCase();
    return `\n<div class="alert alert-${badgeType.toLowerCase()}"><strong>${badgeType}:</strong> ${cleanText}</div>\n`;
  });

  // Strip Mermaid code blocks with a clean printable message box
  body = body.replace(/```mermaid[\s\S]*?```/g, () => {
    return `<div class="diagram-notice"><em>[Diagram Alur Operasional: Silakan rujuk versi digital online untuk animasi interaktif]</em></div>`;
  });

  return { title, description, body };
}

// Convert image src in HTML to file:// URLs for Puppeteer rendering
function resolveImagesInHtml(html) {
  return html.replace(/<img\s+([^>]*?)src=["'](.*?)["']([^>]*?)>/g, (match, before, src, after) => {
    let imageFile = src;
    if (src.startsWith('/TW-Mapper-Mobile-Docs/images/')) {
      imageFile = join(SITE_DIR, 'public', 'images', src.replace('/TW-Mapper-Mobile-Docs/images/', ''));
    } else if (src.startsWith('/TW-Mapper-Mobile/images/')) {
      imageFile = join(SITE_DIR, 'public', 'images', src.replace('/TW-Mapper-Mobile/images/', ''));
    } else if (src.startsWith('/images/')) {
      imageFile = join(SITE_DIR, 'public', 'images', src.replace('/images/', ''));
    }
    if (existsSync(imageFile)) {
      const fileUrl = 'file://' + resolve(imageFile).replace(/\\/g, '/');
      return `<img ${before}src="${fileUrl}"${after}>`;
    }
    return match;
  });
}

// Build complete HTML book document
function buildBookHtml() {
  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  let chaptersHtml = '';

  for (let cIdx = 0; cIdx < CHAPTERS.length; cIdx++) {
    const ch = CHAPTERS[cIdx];
    chaptersHtml += `
      <section class="chapter-cover">
        <div class="chapter-number">BAGIAN ${cIdx + 1}</div>
        <h1 class="chapter-title">${ch.chapterTitle}</h1>
        <p class="chapter-summary">${ch.chapterSummary}</p>
        <div class="chapter-rule"></div>
      </section>
    `;

    for (let fIdx = 0; fIdx < ch.files.length; fIdx++) {
      const doc = parseDoc(ch.files[fIdx]);
      const htmlBody = resolveImagesInHtml(marked.parse(doc.body));
      chaptersHtml += `
        <article class="doc-section">
          <div class="section-meta">
            <span class="section-badge">${cIdx + 1}.${fIdx + 1}</span>
            <span class="section-path">${ch.files[fIdx]}</span>
          </div>
          <h2 class="doc-title">${doc.title}</h2>
          ${doc.description ? `<p class="doc-lead">${doc.description}</p>` : ''}
          <div class="doc-body">
            ${htmlBody}
          </div>
        </article>
      `;
    }
  }

  const katexCssPath = join(SITE_DIR, 'node_modules', 'katex', 'dist', 'katex.min.css');
  const katexCss = existsSync(katexCssPath) ? readFileSync(katexCssPath, 'utf-8') : '';

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <title>Buku Panduan Pengguna — TW-Mapper Mobile</title>
  <style>
    ${katexCss}
    @page {
      size: A4;
      margin: 22mm 18mm 22mm 18mm;
      @bottom-left {
        content: "TW-Mapper Mobile — WanDrone × Throttle Warrior";
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 8pt;
        color: #64748b;
      }
      @bottom-right {
        content: counter(page);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 8pt;
        font-weight: bold;
        color: #0f172a;
      }
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Variable Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 10pt;
      line-height: 1.6;
      color: #1e293b;
      background: #ffffff;
      margin: 0;
      padding: 0;
    }

    /* Cover Page */
    .book-cover {
      page-break-before: auto;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100vh;
      min-height: 250mm;
      padding: 10mm 5mm;
      border: 3px double #0284c7;
      border-radius: 8px;
    }

    .cover-top {
      text-align: center;
      padding-top: 10mm;
    }

    .cover-badge {
      display: inline-block;
      padding: 4px 14px;
      border-radius: 9999px;
      background: #e0f2fe;
      color: #0369a1;
      font-size: 9pt;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 8mm;
    }

    .cover-logo {
      height: 70px;
      width: auto;
      margin-bottom: 6mm;
    }

    .cover-title {
      font-size: 28pt;
      font-weight: 850;
      color: #0f172a;
      letter-spacing: -0.03em;
      margin: 0 0 4mm 0;
      line-height: 1.1;
    }

    .cover-subtitle {
      font-size: 14pt;
      font-weight: 600;
      color: #0284c7;
      margin: 0 auto 8mm auto;
      max-width: 140mm;
      line-height: 1.4;
    }

    .cover-desc {
      font-size: 10pt;
      color: #475569;
      max-width: 130mm;
      margin: 0 auto;
      line-height: 1.6;
    }

    .cover-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5mm;
      margin: 15mm 5mm 0 5mm;
      background: #f8fafc;
      padding: 6mm 8mm;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      font-size: 8.5pt;
    }

    .cover-grid-item strong {
      display: block;
      color: #0f172a;
      margin-bottom: 2px;
      font-size: 9pt;
    }

    .cover-bottom {
      text-align: center;
      padding-bottom: 6mm;
      border-top: 1px solid #e2e8f0;
      padding-top: 6mm;
      font-size: 8.5pt;
      color: #64748b;
    }

    /* Table of Contents */
    .toc-page {
      page-break-before: always;
      page-break-after: always;
      padding: 5mm 0;
    }

    .toc-title {
      font-size: 18pt;
      font-weight: 750;
      color: #0f172a;
      border-bottom: 2px solid #0284c7;
      padding-bottom: 3mm;
      margin-bottom: 8mm;
    }

    .toc-chapter {
      margin-bottom: 6mm;
    }

    .toc-chapter-header {
      font-weight: 700;
      color: #0284c7;
      font-size: 11pt;
      margin-bottom: 2mm;
    }

    .toc-item {
      display: flex;
      justify-content: space-between;
      padding: 2px 0;
      border-bottom: 1px dotted #cbd5e1;
      font-size: 9pt;
      color: #334155;
    }

    /* Chapter Cover & Separators */
    .chapter-cover {
      page-break-before: always;
      page-break-after: avoid;
      padding: 20mm 0 10mm 0;
      margin-bottom: 10mm;
      border-bottom: 3px solid #0284c7;
    }

    .chapter-number {
      font-size: 11pt;
      font-weight: 750;
      color: #0284c7;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .chapter-title {
      font-size: 22pt;
      font-weight: 800;
      color: #0f172a;
      margin: 2mm 0 4mm 0;
      line-height: 1.2;
    }

    .chapter-summary {
      font-size: 10.5pt;
      color: #475569;
      line-height: 1.5;
      margin: 0;
    }

    /* Section & Document Content */
    .doc-section {
      page-break-before: always;
      margin-bottom: 15mm;
    }

    .section-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 3mm;
    }

    .section-badge {
      background: #0284c7;
      color: #ffffff;
      font-size: 8pt;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 4px;
    }

    .section-path {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 7.5pt;
      color: #64748b;
    }

    .doc-title {
      font-size: 17pt;
      font-weight: 750;
      color: #0f172a;
      margin: 0 0 3mm 0;
      letter-spacing: -0.02em;
    }

    .doc-lead {
      font-size: 9.5pt;
      color: #475569;
      background: #f8fafc;
      border-left: 3px solid #94a3b8;
      padding: 6px 12px;
      margin: 0 0 6mm 0;
    }

    .doc-body h1, .doc-body h2 {
      font-size: 13pt;
      font-weight: 700;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2mm;
      margin: 6mm 0 3mm 0;
      page-break-after: avoid;
    }

    .doc-body h3 {
      font-size: 11pt;
      font-weight: 650;
      color: #1e293b;
      margin: 5mm 0 2mm 0;
      page-break-after: avoid;
    }

    .doc-body p {
      margin: 0 0 3mm 0;
      text-align: justify;
    }

    .doc-body ul, .doc-body ol {
      margin: 0 0 4mm 0;
      padding-left: 6mm;
    }

    .doc-body li {
      margin-bottom: 1.5mm;
    }

    .doc-body table {
      width: 100%;
      border-collapse: collapse;
      margin: 4mm 0 6mm 0;
      font-size: 8.5pt;
    }

    .doc-body th, .doc-body td {
      border: 1px solid #cbd5e1;
      padding: 5px 8px;
      text-align: left;
    }

    .doc-body th {
      background: #f1f5f9;
      color: #0f172a;
      font-weight: 700;
    }

    .doc-body img {
      max-width: 90%;
      height: auto;
      display: block;
      margin: 4mm auto;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
    }

    .doc-body pre, .doc-body code {
      font-family: ui-monospace, Menlo, Consolas, monospace;
      font-size: 8pt;
    }

    .doc-body :not(pre) > code {
      background: #f1f5f9;
      color: #0369a1;
      padding: 1px 4px;
      border-radius: 3px;
      border: 1px solid #e2e8f0;
    }

    .doc-body pre {
      background: #0f172a;
      color: #f8fafc;
      padding: 8px 12px;
      border-radius: 6px;
      overflow-x: hidden;
      white-space: pre-wrap;
      margin: 4mm 0;
    }

    /* Alerts */
    .alert {
      padding: 6px 12px;
      border-radius: 5px;
      margin: 4mm 0;
      font-size: 8.5pt;
      line-height: 1.5;
    }

    .alert-note {
      background: #eff6ff;
      border-left: 3px solid #3b82f6;
      color: #1e3a8a;
    }

    .alert-tip {
      background: #f0fdf4;
      border-left: 3px solid #22c55e;
      color: #14532d;
    }

    .alert-warning {
      background: #fffbeb;
      border-left: 3px solid #f59e0b;
      color: #78350f;
    }

    .alert-caution {
      background: #fef2f2;
      border-left: 3px solid #ef4444;
      color: #7f1d1d;
    }

    .diagram-notice {
      background: #f8fafc;
      border: 1px dashed #94a3b8;
      border-radius: 4px;
      padding: 6px 10px;
      text-align: center;
      font-size: 8pt;
      color: #64748b;
      margin: 4mm 0;
    }
  </style>
</head>
<body>

  <!-- Cover Page -->
  <div class="book-cover">
    <div class="cover-top">
      <div class="cover-badge">Buku Panduan Operasional Lapangan (Manual Book)</div>
      ${logoBase64 ? `<img src="${logoBase64}" class="cover-logo" alt="Logo">` : ''}
      <h1 class="cover-title">TW-MAPPER MOBILE</h1>
      <div class="cover-subtitle">Sistem Perencanaan Jalur Terbang & Fotogrametri Drone DJI Tanpa Membawa Laptop ke Lapangan</div>
      <p class="cover-desc">
        Panduan lengkap survei fotogrametri udara, pemetaan koridor infrastruktur linear,
        dan rekonstruksi model fasad 3D langsung di remote kontrol untuk aplikasi DJI Fly & DJI Pilot 2.
      </p>
    </div>

    <div class="cover-grid">
      <div class="cover-grid-item">
        <strong>Penyelaras & Pengembang:</strong>
        • Rwanda — WanDrone Palembang<br>
        • Aditiya Rachmat — Throttle Warrior
      </div>
      <div class="cover-grid-item">
        <strong>Dukungan Remote Kontrol:</strong>
        • DJI RC 2 (RM330) & RC Pro (RM510)<br>
        • DJI RC-N1 / RC-N2 / RC-N3 (HP Android)
      </div>
      <div class="cover-grid-item">
        <strong>Dukungan Drone DJI:</strong>
        Mini 4/5 Pro, Air 3/3S, Mavic 3/4 Pro
      </div>
      <div class="cover-grid-item">
        <strong>Edisi & Tanggal Terbit:</strong>
        Universal Edition • ${today}
      </div>
    </div>

    <div class="cover-bottom">
      Dokumentasi Resmi Proyek TW-Mapper-Mobile • Tersedia online di: https://rwandaz.github.io/TW-Mapper-Mobile/
    </div>
  </div>

  <!-- Table of Contents -->
  <div class="toc-page">
    <h2 class="toc-title">DAFTAR ISI MANUAL BOOK</h2>
    ${CHAPTERS.map((ch, idx) => `
      <div class="toc-chapter">
        <div class="toc-chapter-header">BAGIAN ${idx + 1}: ${ch.chapterTitle}</div>
        ${ch.files.map((f, fIdx) => {
          const doc = parseDoc(f);
          return `<div class="toc-item"><span>${idx + 1}.${fIdx + 1} ${doc.title}</span></div>`;
        }).join('')}
      </div>
    `).join('')}
  </div>

  <!-- Chapters Content -->
  ${chaptersHtml}

</body>
</html>
  `;
}

async function main() {
  console.log('==> Mengompilasi Manual Book HTML...');
  const html = buildBookHtml();
  mkdirSync(DIST_DIR, { recursive: true });
  const tmpHtml = join(DIST_DIR, 'manual_book_temp.html');
  writeFileSync(tmpHtml, html, 'utf8');
  console.log(`✓ HTML buku manual berhasil dibuat: ${tmpHtml}`);

  console.log('==> Menjalankan Puppeteer untuk mengekspor PDF...');
  const systemChrome = existsSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : (existsSync('/usr/bin/google-chrome')
      ? '/usr/bin/google-chrome'
      : (existsSync('/usr/bin/chromium-browser')
        ? '/usr/bin/chromium-browser'
        : undefined));

  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || systemChrome,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.emulateMediaType('print');

  await page.pdf({
    path: OUT_PDF,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `
      <div style="width: 100%; font-size: 8pt; color: #64748b; display: flex; justify-content: space-between; padding: 0 18mm; font-family: -apple-system, sans-serif;">
        <span>TW-Mapper Mobile — Buku Panduan Pengguna Lapangan</span>
        <span>Halaman <span class="pageNumber"></span> dari <span class="totalPages"></span></span>
      </div>
    `,
    margin: {
      top: '18mm',
      bottom: '18mm',
      left: '14mm',
      right: '14mm'
    }
  });

  await browser.close();
  console.log(`🎉 Sukses! PDF Manual Book berhasil diekspor ke:`);
  console.log(`   ${OUT_PDF}`);
}

main().catch((err) => {
  console.error('Gagal mengekspor PDF:', err);
  process.exit(1);
});
