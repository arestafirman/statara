// STATARA — kontrol interaktif: pemilih tahun, sort tabel, filter, pencarian.
// Semua kontrol memakai atribut data-action dan ditangani main.js lewat
// event delegation, supaya satu render ulang memperbarui chart + tabel.

import { YEARS, INDICATORS } from './data.js';

// Pemilih tahun 2020-2025. data-action="set-year" dibaca main.js.
export function yearSelect(current) {
  const opts = YEARS.map((y) => `<option value="${y}"${y === current ? ' selected' : ''}>${y}</option>`).join('');
  return `<label class="ctl">Tahun <select data-action="set-year" aria-label="Pilih tahun">${opts}</select></label>`;
}

// Tombol toggle bar/line. chart = id chart ('gdp' | 'inflasi').
export function chartToggle(chart, current) {
  return `<span class="toggle" role="group" aria-label="Jenis chart">`
    + `<button data-action="set-chart" data-chart="${chart}" data-mode="line" class="${current === 'line' ? 'on' : ''}">Garis</button>`
    + `<button data-action="set-chart" data-chart="${chart}" data-mode="bar" class="${current === 'bar' ? 'on' : ''}">Batang</button>`
    + `</span>`;
}

// Header tabel yang bisa di-sort. key = kunci kolom, label = teks header.
export function sortTh(label, key, sort) {
  const arrow = sort.key === key ? (sort.dir === 'asc' ? ' ▲' : ' ▼') : '';
  return `<th data-action="sort" data-key="${key}" tabindex="0" aria-sort="${sort.key === key ? sort.dir : 'none'}">${label}${arrow}</th>`;
}

// Urutkan baris tabel menurut sort {key, dir}. rows = array objek.
export function sortRows(rows, sort) {
  if (!sort.key) return rows;
  const dir = sort.dir === 'asc' ? 1 : -1;
  return [...rows].sort((a, b) => {
    const av = a[sort.key], bv = b[sort.key];
    if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
    return String(av).localeCompare(String(bv), 'id') * dir;
  });
}

// Kotak pencarian indikator (di header). Hasil muncul di bawahnya.
export function searchBox(query) {
  return `<div class="search"><input type="search" data-action="search" placeholder="Cari indikator: PDB, inflasi, kemiskinan…" value="${query || ''}" aria-label="Cari indikator">`
    + (query ? searchResults(query) : '') + `</div>`;
}

export function searchResults(query) {
  const q = query.trim().toLowerCase();
  const hits = INDICATORS.filter((d) => (d.name + ' ' + d.desc).toLowerCase().includes(q)).slice(0, 6);
  if (!hits.length) return `<div class="search-res"><p>Tidak ada indikator yang cocok dengan “${query}”.</p></div>`;
  return `<div class="search-res">${hits.map((d) => `<a href="${d.page}"><b>${d.name}</b><span>${d.desc}</span></a>`).join('')}</div>`;
}
