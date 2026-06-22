---
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
  <a class="hp-post" href="/소성가공/소재 변형 이론 - 변형률 텐서">
    <span class="hp-post-tag">소성가공</span>
    <span class="hp-post-title">소재 변형 이론 - 변형률 텐서</span>
    <span class="hp-post-date">2023.06.25</span>
  </a>
  <a class="hp-post" href="/소성가공/소재 변형 이론 - 응력, 변형률, 응력-변형률 곡선">
    <span class="hp-post-tag">소성가공</span>
    <span class="hp-post-title">소재 변형 이론 - 응력, 변형률, 응력-변형률 곡선</span>
    <span class="hp-post-date">2023.06.24</span>
  </a>
  <a class="hp-post" href="/최적설계/최적 설계 개요">
    <span class="hp-post-tag">최적설계</span>
    <span class="hp-post-title">최적 설계 개요</span>
    <span class="hp-post-date">2023.05.10</span>
  </a>
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
