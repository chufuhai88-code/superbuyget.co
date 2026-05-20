@echo off
chcp 65001 >nul
cd /d "%~dp0"
title SuperBuyGet local preview
echo.
echo Serving folder: %cd%
echo Open in browser: http://127.0.0.1:8877/
echo Live site:       https://superbuyget.com/
echo.
echo (Port 8877 — if it fails, edit this file to another free port.)
echo.
python -m http.server 8877 --bind 127.0.0.1
pause
