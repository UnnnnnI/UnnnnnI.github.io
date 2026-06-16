---
title: 연결을 위한 정리
cssclasses:
  - homepage
---

<style>
.hp{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.hp a{color:inherit!important;background:transparent!important}
.hp a *{color:inherit!important}
.hp-divider{border:none;border-top:1px solid rgba(128,128,128,.15);margin:0}
.hp-label{font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;opacity:.45;padding:2rem 0 1rem;margin:0;display:block}
.hp-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:2.5rem}
a.hp-card{background:rgba(0,0,0,.04)!important;border:1px solid rgba(0,0,0,.07)!important;border-radius:12px;padding:1.4rem 1.2rem;text-decoration:none!important;display:block;color:inherit!important}
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
  <a class="hp-card" href="/기술">
    <i class="ti ti-cpu hp-card-icon"></i>
    <p class="hp-card-title">기술</p>
    <p class="hp-card-desc">공학 문제를 푸는 방법들</p>
  </a>
  <a class="hp-card" href="/글쓰기">
    <i class="ti ti-pencil hp-card-icon"></i>
    <p class="hp-card-title">글쓰기</p>
    <p class="hp-card-desc">생각 정리</p>
  </a>
  <a class="hp-card" href="/서재">
    <i class="ti ti-books hp-card-icon"></i>
    <p class="hp-card-title">서재</p>
    <p class="hp-card-desc">읽은 책 기록</p>
  </a>
</div>

<hr class="hp-divider">
<span class="hp-label">최근 기록</span>

<div style="margin-bottom:2.5rem">
  <a class="hp-post" href="/기술/소성가공/소재 변형 이론 - 변형률 텐서">
    <span class="hp-post-tag">기술</span>
    <span class="hp-post-title">소재 변형 이론 - 변형률 텐서</span>
    <span class="hp-post-date">2023.06.25</span>
  </a>
  <a class="hp-post" href="/기술/소성가공/소재 변형 이론 - 응력, 변형률, 응력-변형률 곡선">
    <span class="hp-post-tag"></span>
    <span class="hp-post-title">소재 변형 이론 - 응력, 변형률, 응력-변형률 곡선</span>
    <span class="hp-post-date">2023.06.24</span>
  </a>
</div>

<hr class="hp-divider">
<span class="hp-label">서재</span>

<div class="hp-year-block">
  <p class="hp-year">2023</p>
  <a class="hp-book" href="/서재/돈에 지배당하지 않기 위한 부자의 그릇, 아즈미 마사토">
    <span class="hp-book-title">부자의 그릇 (돈에 지배당하지 않기 위한 그릇)</span>
    <span class="hp-book-author">아즈미 마사토</span>
  </a>
</div>

</div>
