// STATARA — data Portal Statistik Republik Aruna (negara fiktif).
// Semua angka adalah angka fiktif yang konsisten internal, dibuat untuk
// kompetisi ini. Sumber yang dikutip di tiap tampilan:
// "Survei Aruna 2024-2025, Badan Statistik Aruna" dan publikasi turunan
// Badan Statistik Aruna. BUKAN angka BPS atau negara nyata mana pun.

export const META = {
  country: 'Republik Aruna',
  agency: 'Badan Statistik Aruna',
  survey: 'Survei Aruna 2024–2025',
  currency: 'Rp',
  lastUpdate: '26 November 2025',
  note: 'Angka fiktif untuk demonstrasi portal statistik.',
};

export const YEARS = [2020, 2021, 2022, 2023, 2024, 2025];

// Seri nasional per tahun (2020-2025), sumber: Survei Aruna, Badan Statistik Aruna.
export const NATIONAL = {
  population: { 2020: 46100, 2021: 46500, 2022: 46900, 2023: 47300, 2024: 47700, 2025: 48200 }, // ribu jiwa
  gdp: { 2020: 1755, 2021: 1846, 2022: 1935, 2023: 2018, 2024: 2075, 2025: 2140 }, // Rp triliun
  unemployment: { 2020: 6.1, 2021: 5.9, 2022: 5.7, 2023: 5.6, 2024: 5.5, 2025: 5.4 }, // %
  inflation: { 2020: 2.1, 2021: 1.9, 2022: 3.2, 2023: 2.6, 2024: 2.4, 2025: 2.8 }, // % y-on-y
  poverty: { 2020: 10.2, 2021: 9.9, 2022: 9.6, 2023: 9.4, 2024: 9.2, 2025: 9.1 }, // %
  lifeExpectancy: { 2020: 72.9, 2021: 73.1, 2022: 73.3, 2023: 73.5, 2024: 73.6, 2025: 73.8 }, // tahun
  source: 'Survei Aruna 2024–2025, Badan Statistik Aruna',
};

// PDB 2015-2025 (Rp triliun), sumber: Neraca Nasional Aruna, Badan Statistik Aruna.
export const GDP_SERIES = [
  { year: 2015, value: 1420 }, { year: 2016, value: 1505 }, { year: 2017, value: 1598 },
  { year: 2018, value: 1702 }, { year: 2019, value: 1808 }, { year: 2020, value: 1755 },
  { year: 2021, value: 1846 }, { year: 2022, value: 1935 }, { year: 2023, value: 2018 },
  { year: 2024, value: 2075 }, { year: 2025, value: 2140 },
];

// Pangsa PDB menurut sektor, 2025 (%), sumber: Neraca Nasional Aruna 2025.
export const SECTORS = [
  { name: 'Jasa', share: 44.1, note: 'termasuk keuangan, komunikasi, pemerintahan' },
  { name: 'Industri', share: 21.8, note: 'manufaktur dan pengolahan' },
  { name: 'Pertanian', share: 12.4, note: 'tanaman pangan, perkebunan, perikanan' },
  { name: 'Perdagangan', share: 9.6, note: 'eceran dan grosir' },
  { name: 'Konstruksi', share: 6.3, note: 'bangunan dan infrastruktur' },
  { name: 'Pertambangan', share: 3.9, note: 'mineral dan energi' },
  { name: 'Lainnya', share: 1.9, note: 'listrik, air, dan jasa lain' },
];

// Status pekerjaan penduduk bekerja, 2025 (%), sumber: Survei Angkatan Kerja Aruna 2025.
export const EMPLOYMENT = [
  { status: 'Karyawan / buruh', share: 46.5 },
  { status: 'Wiraswasta', share: 22.3 },
  { status: 'Pekerja keluarga', share: 12.8 },
  { status: 'Pekerja bebas', share: 10.2 },
  { status: 'Pengusaha', share: 8.2 },
];

// Inflasi bulanan (y-on-y, %), sumber: Survei Harga Aruna, Badan Statistik Aruna.
export const INFLATION_MONTHLY = [
  { m: 'Jan 2024', v: 2.6 }, { m: 'Feb 2024', v: 2.5 }, { m: 'Mar 2024', v: 2.7 },
  { m: 'Apr 2024', v: 2.4 }, { m: 'Mei 2024', v: 2.3 }, { m: 'Jun 2024', v: 2.2 },
  { m: 'Jul 2024', v: 2.4 }, { m: 'Agu 2024', v: 2.5 }, { m: 'Sep 2024', v: 2.3 },
  { m: 'Okt 2024', v: 2.2 }, { m: 'Nov 2024', v: 2.4 }, { m: 'Des 2024', v: 2.6 },
  { m: 'Jan 2025', v: 2.9 }, { m: 'Feb 2025', v: 2.8 }, { m: 'Mar 2025', v: 2.7 },
  { m: 'Apr 2025', v: 2.9 }, { m: 'Mei 2025', v: 2.8 }, { m: 'Jun 2025', v: 2.7 },
  { m: 'Jul 2025', v: 2.8 }, { m: 'Agu 2025', v: 2.9 }, { m: 'Sep 2025', v: 2.8 },
  { m: 'Okt 2025', v: 2.7 }, { m: 'Nov 2025', v: 2.8 }, { m: 'Des 2025', v: 2.8 },
];

// IHK per kelompok, 2025 (indeks 2020 = 100), sumber: Survei Harga Aruna 2025.
export const CPI_GROUPS = [
  { group: 'Bahan makanan', index: 118.4, yoy: 3.1 },
  { group: 'Perumahan, air, listrik', index: 112.7, yoy: 2.2 },
  { group: 'Transportasi', index: 121.3, yoy: 2.9 },
  { group: 'Kesehatan', index: 110.9, yoy: 1.8 },
  { group: 'Pendidikan', index: 109.6, yoy: 1.5 },
  { group: 'Sandang', index: 108.2, yoy: 1.2 },
  { group: 'Rekreasi dan budaya', index: 111.5, yoy: 2.0 },
  { group: 'Lainnya', index: 113.8, yoy: 2.4 },
];

// Piramida penduduk 2025 (ribu jiwa per kelompok umur), sumber: Sensus Aruna 2025.
export const PYRAMID = [
  { age: '0–4', m: 1950, f: 1860 }, { age: '5–9', m: 2050, f: 1960 },
  { age: '10–14', m: 2100, f: 2010 }, { age: '15–19', m: 2150, f: 2060 },
  { age: '20–24', m: 2080, f: 2000 }, { age: '25–29', m: 1980, f: 1920 },
  { age: '30–34', m: 1870, f: 1820 }, { age: '35–39', m: 1760, f: 1720 },
  { age: '40–44', m: 1620, f: 1590 }, { age: '45–49', m: 1480, f: 1460 },
  { age: '50–54', m: 1320, f: 1310 }, { age: '55–59', m: 1150, f: 1150 },
  { age: '60–64', m: 960, f: 980 }, { age: '65–69', m: 760, f: 800 },
  { age: '70–74', m: 540, f: 600 }, { age: '75+', m: 520, f: 640 },
];

// 12 provinsi fiktif Republik Aruna. Nama-nama ini bukan provinsi Indonesia nyata.
// pop2025 dalam ribu jiwa; growth = pertumbuhan penduduk per tahun (%).
// unemp, poverty, cpi = 2025; gdpCap = PDB per kapita 2025 (Rp juta);
// life = harapan hidup 2025 (tahun). x/y = posisi di peta skematik.
export const PROVINCES = [
  { code: 'AJ', name: 'Aruna Jaya', pop2025: 7800, growth: 1.1, unemp: 6.5, poverty: 10.9, cpi: 3.1, gdpCap: 78.4, life: 75.1, x: 2, y: 0 },
  { code: 'TB', name: 'Teluk Biru', pop2025: 5600, growth: 0.9, unemp: 5.7, poverty: 9.1, cpi: 2.9, gdpCap: 52.1, life: 74.2, x: 1, y: 1 },
  { code: 'GS', name: 'Gunung Sari', pop2025: 4900, growth: 0.8, unemp: 5.2, poverty: 8.4, cpi: 2.7, gdpCap: 41.6, life: 73.9, x: 3, y: 1 },
  { code: 'LK', name: 'Lembah Kencana', pop2025: 4200, growth: 0.9, unemp: 4.8, poverty: 7.9, cpi: 2.6, gdpCap: 38.9, life: 73.5, x: 2, y: 1 },
  { code: 'PT', name: 'Pantai Timur', pop2025: 3800, growth: 0.7, unemp: 5.5, poverty: 9.4, cpi: 2.8, gdpCap: 44.3, life: 73.1, x: 4, y: 0 },
  { code: 'DT', name: 'Dataran Tinggi', pop2025: 3500, growth: 0.6, unemp: 4.3, poverty: 6.8, cpi: 2.4, gdpCap: 35.2, life: 72.8, x: 1, y: 2 },
  { code: 'KN', name: 'Kepulauan Nusa', pop2025: 3100, growth: 0.8, unemp: 5.9, poverty: 11.6, cpi: 3.0, gdpCap: 39.8, life: 72.4, x: 0, y: 1 },
  { code: 'HR', name: 'Hutan Rimba', pop2025: 2900, growth: 0.7, unemp: 4.9, poverty: 8.9, cpi: 2.5, gdpCap: 33.7, life: 72.9, x: 3, y: 2 },
  { code: 'SB', name: 'Sungai Besar', pop2025: 2700, growth: 0.8, unemp: 5.1, poverty: 9.3, cpi: 2.7, gdpCap: 36.4, life: 73.3, x: 2, y: 3 },
  { code: 'BP', name: 'Bukit Permata', pop2025: 2400, growth: 0.6, unemp: 4.6, poverty: 7.2, cpi: 2.3, gdpCap: 31.9, life: 72.1, x: 4, y: 2 },
  { code: 'DI', name: 'Danau Indah', pop2025: 2200, growth: 0.5, unemp: 4.1, poverty: 6.5, cpi: 2.2, gdpCap: 30.5, life: 71.8, x: 1, y: 3 },
  { code: 'PZ', name: 'Pesisir Zamrud', pop2025: 5100, growth: 1.0, unemp: 6.1, poverty: 10.1, cpi: 3.2, gdpCap: 47.6, life: 74.6, x: 0, y: 0 },
];

// Populasi provinsi per tahun, diturunkan dari pop2025 dan laju pertumbuhan
// provinsi (dibulatkan ke ribu jiwa). Total 2025 = 48.200 ribu jiwa.
export function provincePop(p, year) {
  const steps = 2025 - year;
  return Math.round(p.pop2025 / Math.pow(1 + p.growth / 100, steps));
}

// Indikator nasional: 6 angka besar overview, per tahun.
export function kpi(year) {
  return [
    { label: 'Populasi', value: NATIONAL.population[year], fmt: 'jt', src: 'Sensus Aruna ' + year },
    { label: 'PDB', value: NATIONAL.gdp[year], fmt: 'rpT', src: 'Neraca Nasional Aruna ' + year },
    { label: 'Pengangguran', value: NATIONAL.unemployment[year], fmt: 'pct', src: 'Survei Angkatan Kerja Aruna ' + year },
    { label: 'Inflasi', value: NATIONAL.inflation[year], fmt: 'pct', src: 'Survei Harga Aruna ' + year },
    { label: 'Kemiskinan', value: NATIONAL.poverty[year], fmt: 'pct', src: 'Survei Sosial Aruna ' + year },
    { label: 'Harapan hidup', value: NATIONAL.lifeExpectancy[year], fmt: 'thn', src: 'Survei Kesehatan Aruna ' + year },
  ];
}

export const RELEASES = [
  { date: '25 Nov 2025', title: 'Pertumbuhan ekonomi Aruna 3,1% pada triwulan III 2025', tag: 'PDB', link: '#/ekonomi' },
  { date: '18 Nov 2025', title: 'Inflasi November 2025 tercatat 2,8% (y-on-y)', tag: 'Harga', link: '#/harga' },
  { date: '10 Nov 2025', title: 'Tingkat pengangguran turun ke 5,4% pada Agustus 2025', tag: 'Tenaga kerja', link: '#/tenaga-kerja' },
  { date: '03 Nov 2025', title: 'Sensus Aruna 2025: populasi 48,2 juta jiwa', tag: 'Populasi', link: '#/populasi' },
];

export const SOURCES = [
  { dataset: 'Populasi & piramida penduduk', source: 'Sensus Aruna 2025, Badan Statistik Aruna', year: '2025', note: 'Pencacahan lengkap; provinsi dihitung per 30 Juni 2025.' },
  { dataset: 'PDB & sektor ekonomi', source: 'Neraca Nasional Aruna, Badan Statistik Aruna', year: '2015–2025', note: 'Harga berlaku; tahun dasar 2020 untuk seri riil.' },
  { dataset: 'Tenaga kerja & pengangguran', source: 'Survei Angkatan Kerja Aruna, Badan Statistik Aruna', year: '2020–2025', note: 'Sampel 96.000 rumah tangga; Agustus tiap tahun.' },
  { dataset: 'Inflasi & IHK', source: 'Survei Harga Aruna, Badan Statistik Aruna', year: '2024–2025', note: 'IHK 2020 = 100; 48 kota pantau harga.' },
  { dataset: 'Kemiskinan', source: 'Survei Sosial Ekonomi Aruna, Badan Statistik Aruna', year: '2020–2025', note: 'Garis kemiskinan dihitung per provinsi tiap Maret.' },
  { dataset: 'Harapan hidup', source: 'Survei Kesehatan Aruna, Badan Statistik Aruna', year: '2020–2025', note: 'Tabel mortalitas model; angka provinsi estimasi.' },
];

// Daftar indikator yang bisa dicari dari kotak pencarian.
export const INDICATORS = [
  { name: 'Populasi', page: '#/populasi', desc: '48,2 juta jiwa (2025) — piramida & tabel provinsi' },
  { name: 'PDB', page: '#/ekonomi', desc: 'Rp 2.140 triliun (2025) — seri 2015–2025' },
  { name: 'Pengangguran', page: '#/tenaga-kerja', desc: '5,4% (2025) — donat status kerja & per provinsi' },
  { name: 'Inflasi', page: '#/harga', desc: '2,8% (2025) — bulanan 2024–2025 & IHK' },
  { name: 'Kemiskinan', page: '#/daerah', desc: '9,1% (2025) — perbandingan antar-provinsi' },
  { name: 'Harapan hidup', page: '#/daerah', desc: '73,8 tahun (2025) — per provinsi' },
  { name: 'PDB per kapita', page: '#/daerah', desc: 'Rp 30,5–78,4 juta per provinsi (2025)' },
  { name: 'Piramida penduduk', page: '#/populasi', desc: 'Struktur umur 2025, laki-laki & perempuan' },
  { name: 'Sektor ekonomi', page: '#/ekonomi', desc: 'Jasa 44,1%, industri 21,8%, pertanian 12,4% (2025)' },
  { name: 'Indeks Harga Konsumen (IHK)', page: '#/harga', desc: '8 kelompok pengeluaran, 2020 = 100' },
  { name: 'Metodologi & sumber data', page: '#/metodologi', desc: 'Sumber, tahun, dan catatan tiap dataset' },
  { name: 'Peta provinsi', page: '#/daerah', desc: '12 provinsi — klik untuk melihat angka daerah' },
];
