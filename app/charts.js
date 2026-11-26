// STATARA — chart SVG asli, digambar dari data sendiri, tanpa library.
// Semua fungsi mengembalikan string SVG yang bisa disisipkan ke halaman.

const PALETTE = ['#0f766e', '#d97706', '#2563eb', '#059669', '#7c3aed', '#dc2626', '#0891b2', '#65a30d'];

export function palette(i) {
  return PALETTE[i % PALETTE.length];
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Bar chart vertikal dengan label nilai. items: [{label, value}]
// Label sumbu-x dimiringkan otomatis kalau item banyak (>10), supaya
// tidak bertumpuk.
export function barChart(items, opts = {}) {
  const w = opts.width || 560;
  const rotate = items.length > 10;
  const padL = 44, padB = rotate ? 58 : 30, padT = 14, padR = 8;
  const h = opts.height || 240;
  const max = Math.max(...items.map((d) => d.value)) * 1.08;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const bw = Math.min(46, (iw / items.length) * 0.62);
  const step = iw / items.length;
  let bars = '';
  let labels = '';
  items.forEach((d, i) => {
    const bh = (d.value / max) * ih;
    const x = padL + i * step + (step - bw) / 2;
    const y = padT + ih - bh;
    bars += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="3" fill="${palette(i)}"><title>${esc(d.label)}: ${d.value}</title></rect>`;
    bars += `<text x="${(x + bw / 2).toFixed(1)}" y="${(y - 5).toFixed(1)}" text-anchor="middle" font-size="11" fill="#1f2937" font-weight="600">${d.value}</text>`;
    const cx = padL + i * step + step / 2;
    labels += rotate
      ? `<text x="${cx.toFixed(1)}" y="${(h - 6).toFixed(1)}" text-anchor="end" font-size="10.5" fill="#4b5563" transform="rotate(38 ${cx.toFixed(1)} ${(h - 6).toFixed(1)})">${esc(d.label)}</text>`
      : `<text x="${cx.toFixed(1)}" y="${(h - 8).toFixed(1)}" text-anchor="middle" font-size="10.5" fill="#4b5563">${esc(d.label)}</text>`;
  });
  const grid = [0.25, 0.5, 0.75, 1].map((f) => {
    const y = padT + ih * (1 - f);
    return `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${w - padR}" y2="${y.toFixed(1)}" stroke="#e5e7eb" stroke-width="1"/><text x="${padL - 5}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="10" fill="#6b7280">${(max * f).toFixed(0)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Bar chart">${grid}${bars}${labels}</svg>`;
}

// Line chart dengan titik + label. points: [{label, value}]
export function lineChart(points, opts = {}) {
  const w = opts.width || 560;
  const h = opts.height || 240;
  const padL = 44, padB = 30, padT = 16, padR = 14;
  const vals = points.map((p) => p.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const span = (max - min) * 1.15 || 1;
  const lo = min - span * 0.08;
  const hi = max + span * 0.08;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const x = (i) => padL + (i / (points.length - 1)) * iw;
  const y = (v) => padT + ih - ((v - lo) / (hi - lo)) * ih;
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const color = opts.color || '#0f766e';
  let dots = '';
  points.forEach((p, i) => {
    dots += `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="3.5" fill="${color}" stroke="#fff" stroke-width="1.5"><title>${esc(p.label)}: ${p.value}</title></circle>`;
    if (i % 2 === 0 || i === points.length - 1) {
      dots += `<text x="${x(i).toFixed(1)}" y="${(y(p.value) - 9).toFixed(1)}" text-anchor="middle" font-size="10.5" fill="#1f2937" font-weight="600">${p.value}</text>`;
    }
    dots += `<text x="${x(i).toFixed(1)}" y="${(h - 8).toFixed(1)}" text-anchor="middle" font-size="10" fill="#4b5563">${esc(p.label)}</text>`;
  });
  const grid = [0.25, 0.5, 0.75, 1].map((f) => {
    const gy = padT + ih * (1 - f);
    const gv = lo + (hi - lo) * f;
    return `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${w - padR}" y2="${gy.toFixed(1)}" stroke="#e5e7eb" stroke-width="1"/><text x="${padL - 5}" y="${(gy + 4).toFixed(1)}" text-anchor="end" font-size="10" fill="#6b7280">${gv.toFixed(0)}</text>`;
  }).join('');
  const area = `${path} L${x(points.length - 1).toFixed(1)},${(padT + ih).toFixed(1)} L${x(0).toFixed(1)},${(padT + ih).toFixed(1)} Z`;
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Line chart">${grid}<path d="${area}" fill="${color}" opacity="0.08"/><path d="${path}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>${dots}</svg>`;
}

// Donat. items: [{label, value}] — value persen, total ~100.
export function donutChart(items, opts = {}) {
  const size = opts.size || 240;
  const cx = size / 2, cy = size / 2, r = size / 2 - 14, ir = r * 0.58;
  const total = items.reduce((s, d) => s + d.value, 0);
  let a0 = -Math.PI / 2;
  let slices = '';
  items.forEach((d, i) => {
    const a1 = a0 + (d.value / total) * Math.PI * 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + ir * Math.cos(a1), yi1 = cy + ir * Math.sin(a1);
    const xi0 = cx + ir * Math.cos(a0), yi0 = cy + ir * Math.sin(a0);
    slices += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${ir},${ir} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z" fill="${palette(i)}"><title>${esc(d.label)}: ${d.value}%</title></path>`;
    const am = (a0 + a1) / 2;
    // Persen ditulis di TENGAH cincin (radius tengah), teks putih, supaya
    // tidak terpotong di tepi viewBox.
    const mr = (r + ir) / 2;
    const lx = cx + mr * Math.cos(am);
    const ly = cy + mr * Math.sin(am);
    if (d.value >= 8) {
      slices += `<text x="${lx.toFixed(1)}" y="${(ly + 4).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">${d.value}%</text>`;
    }
    a0 = a1;
  });
  const legend = items.map((d, i) => `<span class="lg"><i style="background:${palette(i)}"></i>${esc(d.label)} — ${d.value}%</span>`).join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Donut chart">${slices}<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="15" font-weight="800" fill="#111827">${total.toFixed(0)}%</text><text x="${cx}" y="${cy + 14}" text-anchor="middle" font-size="10.5" fill="#6b7280">pekerja 2025</text></svg><div class="legend">${legend}</div></div>`;
}

// Piramida penduduk: rows [{age, m, f}] dalam ribu jiwa; scale untuk tahun lain.
// Ada celah putih di tengah untuk label umur, supaya label tidak menumpuk
// di atas ujung batang.
export function pyramidChart(rows, opts = {}) {
  const w = opts.width || 560;
  const rowH = 15;
  const h = rows.length * rowH + 34;
  const mid = w / 2;
  const gap = 24;
  const max = Math.max(...rows.map((r) => Math.max(r.m, r.f))) * 1.12;
  const half = mid - gap - 10;
  let out = `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Population pyramid">`;
  out += `<text x="${(mid - half / 2 - gap / 2).toFixed(0)}" y="14" text-anchor="middle" font-size="11" font-weight="700" fill="#0f766e">Laki-laki</text>`;
  out += `<text x="${(mid + half / 2 + gap / 2).toFixed(0)}" y="14" text-anchor="middle" font-size="11" font-weight="700" fill="#d97706">Perempuan</text>`;
  rows.forEach((r, i) => {
    const y = 22 + i * rowH;
    const mw = (r.m / max) * half;
    const fw = (r.f / max) * half;
    out += `<rect x="${(mid - gap - mw).toFixed(1)}" y="${y}" width="${mw.toFixed(1)}" height="11" fill="#0f766e"><title>${r.age} laki-laki: ${r.m} ribu</title></rect>`;
    out += `<rect x="${mid + gap}" y="${y}" width="${fw.toFixed(1)}" height="11" fill="#d97706"><title>${r.age} perempuan: ${r.f} ribu</title></rect>`;
    out += `<text x="${mid}" y="${y + 9}" text-anchor="middle" font-size="9.5" fill="#111827">${r.age}</text>`;
  });
  out += `<text x="8" y="${h - 4}" font-size="10" fill="#6b7280">Ribu jiwa per kelompok umur</text></svg>`;
  return out;
}

// Peta skematik 12 provinsi: ubin grid (x,y dari data) yang bisa diklik.
// Nama provinsi ditulis dua baris supaya tidak terpotong di dalam ubin.
// selected = kode provinsi terpilih; klik memicu data-action="pick-prov".
export function mapChart(provinces, selected) {
  const cell = 96, gap = 8;
  const W = 5 * cell + 4 * gap;
  const H = 4 * cell + 3 * gap;
  let tiles = '';
  provinces.forEach((p) => {
    const x = p.x * (cell + gap);
    const y = p.y * (cell + gap);
    const sel = p.code === selected;
    const shade = 0.55 + (p.pop2025 / 7800) * 0.45;
    const words = p.name.split(' ');
    const nameLines = words.length > 1
      ? `<text x="${x + cell / 2}" y="${y + 30}" text-anchor="middle" font-size="12" font-weight="700" fill="#ffffff">${words[0]}</text>`
        + `<text x="${x + cell / 2}" y="${y + 46}" text-anchor="middle" font-size="12" font-weight="700" fill="#ffffff">${words.slice(1).join(' ')}</text>`
      : `<text x="${x + cell / 2}" y="${y + 38}" text-anchor="middle" font-size="12" font-weight="700" fill="#ffffff">${p.name}</text>`;
    tiles += `<g data-action="pick-prov" data-code="${p.code}" class="map-tile${sel ? ' sel' : ''}" tabindex="0" role="button" aria-label="${p.name}">`
      + `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="10" fill="#0f766e" fill-opacity="${shade.toFixed(2)}" stroke="${sel ? '#d97706' : '#ffffff'}" stroke-width="${sel ? 4 : 2}"/>`
      + nameLines
      + `<text x="${x + cell / 2}" y="${y + 66}" text-anchor="middle" font-size="11" fill="#e0f2f1">${(p.pop2025 / 1000).toFixed(1)} jt jiwa</text>`
      + `<text x="${x + cell / 2}" y="${y + 82}" text-anchor="middle" font-size="11" fill="#e0f2f1">Rp ${p.gdpCap} jt/kapita</text>`
      + `</g>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Schematic map of 12 provinces">${tiles}</svg>`;
}
