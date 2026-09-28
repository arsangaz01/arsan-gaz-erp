@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"
set /p VER=Yeni surum numarasi: 
powershell -NoProfile -Command "$p=Get-Content package.json -Raw|ConvertFrom-Json;$p.version='%VER%';$j=$p|ConvertTo-Json -Depth 20;[IO.File]::WriteAllText((Resolve-Path 'package.json'),$j+[Environment]::NewLine,[Text.UTF8Encoding]::new($false))"
git add .
git commit -m "v%VER%"
git tag v%VER%
git push origin main
git push origin v%VER%
pause
