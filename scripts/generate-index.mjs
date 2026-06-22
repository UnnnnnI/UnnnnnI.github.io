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

for (const filePath of getMdFiles(contentDir)) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data } = parseFrontmatter(raw);
  if (!data.title || !data.date) continue;

  const href = '/' + path.relative(contentDir, filePath).replace(/\\/g, '/').replace(/\.md$/, '');

  // 태그 대신 부모 폴더명(챕터명) 사용
  const parts = path.relative(contentDir, filePath).replace(/\\/g, '/').split('/');
  const chapter = parts.length >= 2 ? parts[parts.length - 2] : '';

  const dateStr = String(data.date).slice(0, 10).replace(/-/g, '.');
  posts.push({ title: data.title, date: String(data.date).slice(0, 10), dateStr, chapter, href });
}

posts.sort((a, b) => b.date.localeCompare(a.date));
const recent = posts.slice(0, 5);

const postsHtml = recent.map(p => `  <a class="hp-post" href="${p.href}">
    <span class="hp-post-tag">${p.chapter}</span>
    <span class="hp-post-title">${p.title}</span>
    <span class="hp-post-date">${p.dateStr}</span>
  </a>`).join('\n');

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
a.hp-post{display:flex;align-items:baseline;gap:14px;padding:11px 0;border-bottom:1px solid rgba(128,128,128,.12);text-decoration:none!important;background:transparent!important;color:inherit!important}
a.hp-post:last-child{border-bottom:none}
.hp-post-tag{font-size:11px;opacity:.45;min-width:56px;flex-shrink:0}
.hp-post-title{font-size:14px;flex:1;line-height:1.4}
.hp-post-date{font-size:12px;opacity:.4;white-space:nowrap}
.hp-stats{display:flex;align-items:center;gap:6px;padding:1.5rem 0 0.5rem;font-size:13px;opacity:.5}
.hp-stats-num{font-size:18px;font-weight:500;opacity:1;color:var(--dark)}
</style>

<div class="hp">

<hr class="hp-divider" style="margin-bottom:0">
<span class="hp-label">최근 기록</span>

<div style="margin-bottom:2rem">
${postsHtml || '  <p style="opacity:.4;font-size:14px;">아직 기록이 없어요.</p>'}
</div>

<hr class="hp-divider">
<span class="hp-label">방문자</span>

<div class="hp-stats">
  <span class="hp-stats-num" id="hp-visit-num">—</span>
  <span>명이 다녀갔어요</span>
</div>

<script>
(function() {
  var key = 'unnnnni-github-io-v1';
  fetch('https://api.counterapi.dev/v1/' + key + '/visits/up')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var el = document.getElementById('hp-visit-num');
      if (el && d && d.count) el.textContent = d.count.toLocaleString();
    })
    .catch(function() {});
})();
</script>

</div>
`;

fs.writeFileSync(path.join(contentDir, 'index.md'), output, 'utf-8');
console.log('✓ index.md 자동 생성 완료 — 최근 글 ' + recent.length + '개');
