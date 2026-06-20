import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '..', 'content');

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { data: {} };
  const data = {};
  let currentKey = null;
  let inArray = false;
  match[1].split(/\r?\n/).forEach(line => {
    const arrayItem = line.match(/^\s+-\s+(.+)/);
    const kvMatch = line.match(/^([^:]+):\s*(.*)/);
    if (arrayItem && inArray && currentKey) {
      if (!Array.isArray(data[currentKey])) data[currentKey] = [];
      data[currentKey].push(arrayItem[1].trim().replace(/^["']|["']$/g, ''));
    } else if (kvMatch) {
      currentKey = kvMatch[1].trim();
      const val = kvMatch[2].trim().replace(/^["']|["']$/g, '');
      if (val === '') { inArray = true; data[currentKey] = []; }
      else { inArray = false; data[currentKey] = val; }
    }
  });
  return { data };
}

function getFirstTag(tags) {
  if (!tags) return '';
  if (Array.isArray(tags)) return tags[0] || '';
  if (typeof tags === 'string') return tags.trim();
  return '';
}

const SKIP_DIRS = new Set(['private', 'templates', '.obsidian', '.trash', 'node_modules']);

function getMdFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && !SKIP_DIRS.has(entry.name)) {
      getMdFiles(path.join(dir, entry.name), files);
    } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md') {
      files.push(path.join(dir, entry.name));
    }
  }
  return files;
}

const posts = [];
const books = [];

for (const filePath of getMdFiles(contentDir)) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data } = parseFrontmatter(raw);
  if (!data.title) continue;
  const href = '/' + path.relative(contentDir, filePath).replace(/\\/g, '/').replace(/\.md$/, '');
  if (data.book === 'true' || data.book === true) {
    books.push({ title: data.title, author: data.author || '', year: String(data.year || '2025'), href });
  } else if (data.date) {
    const tag = getFirstTag(data.tags);
    const dateStr = String(data.date).slice(0, 10).replace(/-/g, '.');
    posts.push({ title: data.title, date: String(data.date).slice(0, 10), dateStr, tag, href });
  }
}

posts.sort((a, b) => b.date.localeCompare(a.date));
const recent = posts.slice(0, 5);

const booksByYear = {};
for (const b of books) {
  if (!booksByYear[b.year]) booksByYear[b.year] = [];
  booksByYear[b.year].push(b);
}
const sortedYears = Object.keys(booksByYear).sort((a, b) => Number(b) - Number(a));

const postsHtml = recent.map(p => `  <a class="hp-post" href="${p.href}">
    <span class="hp-post-tag">${p.tag}</span>
    <span class="hp-post-title">${p.title}</span>
    <span class="hp-post-date">${p.dateStr}</span>
  </a>`).join('\n');

const booksHtml = sortedYears.map(year => {
  const items = booksByYear[year].map(b => `  <a class="hp-book" href="${b.href}">
    <span class="hp-book-title">${b.title}</span>
    <span class="hp-book-author">${b.author}</span>
  </a>`).join('\n');
  return `<div class="hp-year-block">\n  <p class="hp-year">${year}</p>\n${items}\n</div>`;
}).join('\n\n') || '<p style="opacity:0.4;font-size:14px;">아직 등록된 책이 없어요.</p>';

const output = `---
title: 연결을 위한 정리
cssclass: homepage
cssclasses:
  - homepage
---

<style>
.hp{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.hp a{color:inherit!important;background:transparent!important}
.hp a *{color:inherit!important}
.hp-divider{border:none;border-top:1px solid rgba(128,128,128,.15);margin:0}
.hp-label{font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;opacity:.45;padding:2rem 0 1rem;margin:0;display:block}
.hp-cards{display:flex;gap:10px;margin-bottom:2.5rem}
a.hp-card{background:rgba(0,0,0,.04)!important;border:1px solid rgba(0,0,0,.07)!important;border-radius:12px;padding:1.4rem 1.2rem;text-decoration:none!important;display:block;color:inherit!important;width:200px}
a.hp-card:hover{background:rgba(0,0,0,.08)!important}
.hp-card-icon{font-size:20px;margin-bottom:.9rem;display:block}
.hp-card-title{font-size:14px;font-weight:500;margin:0 0 4px}
.hp-card-desc{font-size:12px;margin:0;line-height:1.5;opacity:.55}
a.hp-post{display:flex;align-items:baseline;gap:14px;padding:11px 0;border-bottom:1px solid rgba(128,128,128,.12);text-decoration:none!important;background:transparent!important;color:inherit!important}
a.hp-post:last-child{border-bottom:none}
.hp-post-tag{font-size:11px;opacity:.45;min-width:40px;flex-shrink:0}
.hp-post-title{font-size:14px;flex:1;line-height:1.4}
.hp-post-date{font-size:12px;opacity:.4;white-space:nowrap}
.hp-year{font-size:13px;font-weight:500;opacity:.45;margin:0 0 8px;letter-spacing:.04em}
a.hp-book{display:flex;align-items:baseline;gap:10px;padding:9px 0;border-bottom:1px solid rgba(128,128,128,.12);text-decoration:none!important;background:transparent!important;color:inherit!important}
a.hp-book:last-child{border-bottom:none}
.hp-book-title{font-size:14px;flex:1}
.hp-book-author{font-size:12px;opacity:.4;white-space:nowrap}
.hp-year-block{margin-bottom:1.5rem}
</style>

<div class="hp">

<hr class="hp-divider" style="margin-bottom:0">
<span class="hp-label">탐색</span>

<div class="hp-cards">
  <a class="hp-card" href="/tags/기술">
    <i class="ti ti-cpu hp-card-icon"></i>
    <p class="hp-card-title">기술</p>
    <p class="hp-card-desc">공학 문제를 푸는 방법들</p>
  </a>
</div>

<hr class="hp-divider">
<span class="hp-label">최근 기록</span>

<div style="margin-bottom:2.5rem">
${postsHtml || '  <p style="opacity:.4;font-size:14px;">아직 기록이 없어요.</p>'}
</div>

<hr class="hp-divider">
<span class="hp-label">서재</span>

${booksHtml}

</div>
`;

fs.writeFileSync(path.join(contentDir, 'index.md'), output, 'utf-8');
console.log('✓ index.md 자동 생성 완료 — 최근 글 ' + recent.length + '개, 책 ' + books.length + '권');
