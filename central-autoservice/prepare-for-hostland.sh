#!/bin/bash

# Скрипт для подготовки сайта к загрузке на Hostland.ru

echo "🚀 Подготовка сайта для развертывания на Hostland.ru"
echo "======================================================"
echo ""

# Проверка наличия Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен. Установите Node.js с https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js установлен: $(node --version)"

# Установка зависимостей
echo ""
echo "📦 Установка зависимостей..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Ошибка при установке зависимостей"
    exit 1
fi

echo "✅ Зависимости установлены"

# Сборка проекта
echo ""
echo "🔨 Сборка проекта..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Ошибка при сборке проекта"
    exit 1
fi

echo "✅ Проект собран успешно"

# Проверка наличия файлов
echo ""
echo "📁 Проверка файлов для загрузки..."

if [ ! -f "dist/index.html" ]; then
    echo "❌ Файл dist/index.html не найден"
    exit 1
fi

if [ ! -d "dist/assets" ]; then
    echo "❌ Папка dist/assets не найдена"
    exit 1
fi

if [ ! -f "dist/.htaccess" ]; then
    echo "⚠️  Файл dist/.htaccess не найден (необязательно)"
fi

echo "✅ Все файлы на месте"

# Вывод информации
echo ""
echo "======================================================"
echo "✅ Сайт готов к загрузке на Hostland.ru!"
echo ""
echo "📂 Загрузите содержимое папки dist/ на хостинг:"
echo "   - Через файловый менеджер Hostland"
echo "   - Или через FTP (FileZilla)"
echo ""
echo "📋 Файлы для загрузки:"
ls -lh dist/
echo ""
echo "📋 Содержимое папки assets/:"
ls -lh dist/assets/
echo ""
echo "📖 Подробная инструкция: DEPLOY_HOSTLAND.md"
echo "📖 Краткая инструкция: QUICK_START.md"
echo "======================================================"
