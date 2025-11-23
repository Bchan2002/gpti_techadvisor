#!/bin/bash

echo "🚀 Iniciando Tech Advisor Backend..."

# Ejecutar seed (creará admin y computadores si no existen)
echo "📦 Verificando base de datos..."
npm run seed

# Iniciar el servidor
echo "🌐 Iniciando servidor..."
npm start
