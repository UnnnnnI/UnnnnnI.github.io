[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
# 블로그 자동 배포 스크립트
# 사용법: .\publish.ps1
 
Write-Host "index.md 자동 생성 중..." -ForegroundColor Cyan
node scripts/generate-index.mjs
 
Write-Host "GitHub에 동기화 중..." -ForegroundColor Cyan
npx quartz sync --no-pull
 
Write-Host "완료! 잠시 후 https://UnnnnnI.github.io 에서 확인하세요." -ForegroundColor Green
 