@echo off
title Servidor Admin APUNTES (Firefox / Chrome)
cd /d "%~dp0"

echo Iniciando servidor local para admin.html en http://localhost:8090/admin.html ...

start "" powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0servidor_admin.ps1" -Port 8090
timeout /t 2 /nobreak >nul

where firefox >nul 2>nul
if %errorlevel%==0 (
    start firefox "http://localhost:8090/admin.html"
) else if exist "%ProgramFiles%\Mozilla Firefox\firefox.exe" (
    start "" "%ProgramFiles%\Mozilla Firefox\firefox.exe" "http://localhost:8090/admin.html"
) else if exist "%ProgramFiles(x86)%\Mozilla Firefox\firefox.exe" (
    start "" "%ProgramFiles(x86)%\Mozilla Firefox\firefox.exe" "http://localhost:8090/admin.html"
) else (
    start "" "http://localhost:8090/admin.html"
)
