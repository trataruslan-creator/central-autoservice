@echo off
chcp 65001 >nul
echo.
echo 🚀 Подготовка сайта для развертывания на Hostland.ru
echo ======================================================
echo.

REM Проверка наличия Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js не установлен. Установите Node.js с https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js установлен
node --version
echo.

REM Установка зависимостей
echo 📦 Установка зависимостей...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Ошибка при установке зависимостей
    pause
    exit /b 1
)

echo ✅ Зависимости установлены
echo.

REM Сборка проекта
echo 🔨 Сборка проекта...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Ошибка при сборке проекта
    pause
    exit /b 1
)

echo ✅ Проект собран успешно
echo.

REM Проверка наличия файлов
echo 📁 Проверка файлов для загрузки...

if not exist "dist\index.html" (
    echo ❌ Файл dist\index.html не найден
    pause
    exit /b 1
)

if not exist "dist\assets" (
    echo ❌ Папка dist\assets не найдена
    pause
    exit /b 1
)

if not exist "dist\.htaccess" (
    echo ⚠️  Файл dist\.htaccess не найден (необязательно)
)

echo ✅ Все файлы на месте
echo.

REM Вывод информации
echo ======================================================
echo ✅ Сайт готов к загрузке на Hostland.ru!
echo.
echo 📂 Загрузите содержимое папки dist\ на хостинг:
echo    - Через файловый менеджер Hostland
echo    - Или через FTP (FileZilla)
echo.
echo 📋 Файлы для загрузки:
dir /b dist\
echo.
echo 📋 Содержимое папки assets\:
dir /b dist\assets\
echo.
echo 📖 Подробная инструкция: DEPLOY_HOSTLAND.md
echo 📖 Краткая инструкция: QUICK_START.md
echo ======================================================
pause
