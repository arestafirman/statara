// STATARA — router hash + render. 7 halaman, semua ter-link dari nav.
// State (tahun, sort, mode chart, provinsi terpilih, query cari) hidup di
// sini; perubahan kontrol me-render ulang halaman yang sedang dibuka.
//
//   #/                Overview
//   #/populasi        Piramida + tabel provinsi
//   #/ekonomi         PDB 2015-2025 + sektor
//   #/tenaga-kerja    Donat status kerja + pengangguran provinsi
//   #/harga           Inflasi bulanan + IHK
//   #/daerah          Peta skematik + perbandingan daerah
//   #/metodologi      Sumber tiap dataset
//
// window.__shotReady false saat render, true sesudahnya, supaya skrip
// screenshot tahu kapan halaman siap ditangkap.

import * as pages from './pages.js';
import { searchResults } from './controls.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('.topbar nav a')];

const state = {
  year: 2025,
  sort: { key: '', dir: 'desc' },
  chartMode: { gdp: 'line', sector: 'bar', inflasi: 'line' },
  region: 'AJ',
  query: '',
};

const ROUTES = {
  '': pages.overview,
  'populasi': pages.populasi,
  'ekonomi': pages.ekonomi,
  'tenaga-kerja': pages.tenagaKerja,
  'harga': pages.harga,
  'daerah': pages.daerah,
  'metodologi': pages.metodologi,
};

function route() {
  const hash = location.hash.replace(/^#\/?/, '').split('?')[0];
  return ROUTES[hash] ? hash : null;
}

function render() {
  window.__shotReady = false;
  const key = route();
  const fn = key === null ? pages.notFound : ROUTES[key];
  app.innerHTML = fn(state);
  document.title = key === '' || key === null
    ? 'STATARA — Portal Statistik Republik Aruna'
    : `${document.querySelector('h1')?.textContent || 'STATARA'} | STATARA`;
  navLinks.forEach((a) => {
    const href = a.getAttribute('href') || '';
    const k = href.replace(/^#\/?/, '');
    a.classList.toggle('active', k === (key ?? ''));
  });
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

// Satu delegasi untuk semua kontrol: pemilih tahun, sort, toggle chart,
// klik provinsi di peta, dan pencarian indikator.
document.addEventListener('change', (e) => {
  const t = e.target;
  if (t.matches('[data-action="set-year"]')) {
    state.year = Number(t.value);
    render();
  }
});

document.addEventListener('input', (e) => {
  const t = e.target;
  if (t.matches('[data-action="search"]')) {
    state.query = t.value;
    // Hasil cari tampil di bawah kotak pencarian header (kotak ini statis,
    // di luar #app, jadi tidak ikut di-render ulang).
    const host = t.closest('.search');
    host.querySelector('.search-res')?.remove();
    if (state.query.trim()) {
      const div = document.createElement('div');
      div.innerHTML = searchResults(state.query);
      host.appendChild(div.firstElementChild);
    }
  }
});

document.addEventListener('click', (e) => {
  const tile = e.target.closest('[data-action="pick-prov"]');
  if (tile) { state.region = tile.dataset.code; render(); return; }
  const btn = e.target.closest('[data-action="set-chart"]');
  if (btn) { state.chartMode[btn.dataset.chart] = btn.dataset.mode; render(); return; }
  const th = e.target.closest('[data-action="sort"]');
  if (th) {
    const key = th.dataset.key;
    if (state.sort.key === key) state.sort.dir = state.sort.dir === 'asc' ? 'desc' : 'asc';
    else state.sort = { key, dir: 'desc' };
    render();
  }
});

document.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-action="sort"], [data-action="pick-prov"]')) {
    e.preventDefault();
    e.target.click();
  }
});

window.addEventListener('hashchange', () => {
  state.sort = { key: '', dir: 'desc' };
  state.query = '';
  const box = document.querySelector('[data-action="search"]');
  if (box) box.value = '';
  document.querySelector('.search-res')?.remove();
  render();
});
render();
