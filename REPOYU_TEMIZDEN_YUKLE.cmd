@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"
where git >nul 2>&1 || (echo Git bulunamadi.& pause& exit /b 1)
if exist .git rmdir /s /q .git
git init
git branch -M main
git config user.name "Arsan Gaz"
git config user.email "ozelgazlar@arsangaz.com"
git add .
git commit -m "Arsan Gaz ERP temiz v2.2.2"
git remote add origin https://github.com/arsangaz01/arsan-gaz-erp.git
git push -u origin main --force
if errorlevel 1 goto hata
git tag -f v2.2.2
git push origin v2.2.2 --force
if errorlevel 1 goto hata
echo TAMAMLANDI. GitHub Actions baslatildi.
pause
exit /b 0
:hata
echo Yukleme tamamlanamadi. GitHub oturumunu kontrol edin.
pause
exit /b 1
