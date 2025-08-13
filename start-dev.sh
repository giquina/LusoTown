#!/bin/bash

# LusoTown Development Startup Script

echo "🚀 Starting LusoTown Development Environment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json not found. Please run this script from the root directory."
  exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "web-app/node_modules" ]; then
  echo "📦 Installing dependencies..."
  cd web-app && npm install
  cd ..
fi

# Start the development server
echo "🔥 Starting development server..."
echo "📍 Visit http://localhost:3000 to view the application"
echo "📍 Press Ctrl+C to stop the server"

cd web-app && npm run dev