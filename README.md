# STATARA — Portal Statistik Republik Aruna

[![Make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/arestafirman/statara/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/arestafirman/statara/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

Portal statistik nasional **Republik Aruna** (negara fiktif) — dibangun untuk
kompetisi Make.fun "Best National Statistics Site". Bahasa Indonesia, label
Inggris di chart, semua angka fiktif yang konsisten internal dan dikutip
dengan sumber + tahun ("Survei Aruna 2024–2025, Badan Statistik Aruna").

## Angka utama 2025

| Indikator | Nilai | Sumber |
|---|---|---|
| Populasi | 48,2 juta jiwa | Sensus Aruna 2025 |
| PDB | Rp 2.140 triliun | Neraca Nasional Aruna 2025 |
| Pengangguran | 5,4% | Survei Angkatan Kerja Aruna 2025 |
| Inflasi | 2,8% (y-on-y) | Survei Harga Aruna 2025 |
| Kemiskinan | 9,1% | Survei Sosial Aruna 2025 |
| Harapan hidup | 73,8 tahun | Survei Kesehatan Aruna 2025 |

## Halaman (hash routes)

- `#/` Overview — 6 angka besar, 3 chart ringkas, rilis terbaru
- `#/populasi` — piramida penduduk SVG + tabel 12 provinsi (sort per kolom, pemilih tahun 2020–2025)
- `#/ekonomi` — line chart PDB 2015–2025 + bar chart sektor + tabel indikator
- `#/tenaga-kerja` — donat status pekerjaan + bar pengangguran per provinsi
- `#/harga` — line inflasi bulanan 2024–2025 + tabel IHK per kelompok
- `#/daerah` — peta skematik SVG 12 provinsi (klik → panel angka) + perbandingan antar-daerah
- `#/metodologi` — sumber tiap dataset + tahun + catatan metodologi

## Kontrol yang benar-benar jalan

Pemilih tahun (2020–2025) mengubah chart dan tabel; filter daerah lewat
klik peta; sort tabel per kolom; toggle bar/line di chart PDB, sektor, dan
inflasi; pencarian indikator dari header.

## Struktur source

- `app/index.html` — shell + nav
- `app/style.css` — tampilan (system font, tanpa font eksternal)
- `app/main.js` — router hash + state + event delegation
- `app/data.js` — semua angka, sumber, dan tahun
- `app/charts.js` — chart SVG asli: bar, line, donat, piramida, peta
- `app/pages.js` — 7 halaman
- `app/controls.js` — pemilih tahun, sort, toggle, pencarian
- `app/format.js` — format angka Rp / juta / persen
- `main.ts` — build: salin `app/` + `screenshots/` ke output, tulis `dossier.json`
- `serve.ts` — server statis lokal di port 8080

Situs berjalan offline penuh: tanpa network call, tanpa CDN, tanpa framework,
tanpa aset berhak cipta. Jalankan lokal dengan `node serve.ts`, lalu buka
`http://localhost:8080`.
