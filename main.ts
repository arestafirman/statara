// STATARA — entri best-national-statistics-site-20261126-0539 (Node 22,
// standard library only). Situsnya adalah folder app/ di sebelah file ini:
// file statis polos (ES modules + CSS, tanpa build step, tanpa network).
// Program ini menyerahkan situs itu: menyalin app/ dan screenshots/ ke
// /output lalu menulis /output/dossier.json — ringkasan yang dibaca judge
// (screenshot, file + byte first load, dan source) — memakai library
// make.fun yang di-vendor. vendor/makefun-frontend.ts dibiarkan apa adanya:
// scorer mengharuskan dossier.json byte-identik dengan yang ditulis
// salinannya sendiri.
//
// Jalankan lokal: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// (di luar container grader, MAKEFUN_OUTPUT_DIR menggantikan /output).

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// Batas scorer (reference/gate.json): hanya text_max_bytes membentuk byte;
// yang lain menolak entri yang akan ditolak scorer (lebih dari 4 screenshot
// atau satu di atas 256 KiB; lebih dari 993 file/direktori di app/ atau
// 16 MiB file app: app/ dihitung di samping batas 1000 entri /output
// sendiri, screenshots/ dan dossier.json-nya).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
