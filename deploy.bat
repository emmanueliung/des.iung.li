@echo off
echo ========================================================
echo   Deploiement de des.iung.li vers le VPS Infomaniak
echo   Serveur: ubuntu@84.234.19.22
echo ========================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0deploy.ps1"
echo.
pause
