// STATARA — format angka (id-ID): rupiah, juta, persen, tahun.

const nf1 = new Intl.NumberFormat('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nf0 = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 });

export function fmtNum(v, decimals = 1) {
  return decimals === 0 ? nf0.format(v) : nf1.format(v);
}

// Ribu jiwa -> "48,2 jt"
export function fmtPopThousands(v) {
  return fmtNum(v / 1000, 1) + ' jt';
}

// Rp triliun -> "Rp 2.140 T"
export function fmtRpT(v) {
  return 'Rp ' + nf0.format(v) + ' T';
}

// Rp juta per kapita -> "Rp 78,4 jt"
export function fmtRpJt(v) {
  return 'Rp ' + fmtNum(v, 1) + ' jt';
}

export function fmtPct(v) {
  return fmtNum(v, 1) + '%';
}

export function fmtYears(v) {
  return fmtNum(v, 1) + ' thn';
}

// Format nilai KPI sesuai kodenya ('jt' | 'rpT' | 'pct' | 'thn').
export function fmtKpi(value, code) {
  if (code === 'jt') return fmtPopThousands(value);
  if (code === 'rpT') return fmtRpT(value);
  if (code === 'pct') return fmtPct(value);
  if (code === 'thn') return fmtYears(value);
  return String(value);
}
