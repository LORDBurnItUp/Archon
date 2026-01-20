#!/bin/bash
# Archon Frontend Startup Script

echo "🎨 Starting Archon Frontend..."
echo "📍 Location: $(pwd)/archon-ui-main"
echo "🔗 UI will run on: http://localhost:3737"
echo ""

cd "$(dirname "$0")/archon-ui-main" || exit 1

echo "Starting development server..."
npm run dev
