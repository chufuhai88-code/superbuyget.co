@echo off
chcp 65001 >nul
cd /d "%~dp0"
title SuperBuyGet local preview :8767
echo.
echo Serving folder: %cd%
echo Live domain: https://superbuyget.com/
echo.
echo (Uses port 8767 so it won't clash with other local preview servers.)
echo.
npx --yes serve . -l tcp://127.0.0.1:8767 --no-port-switching
pause
