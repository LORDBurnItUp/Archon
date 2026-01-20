#!/bin/bash
# Archon Backend Startup Script

echo "🚀 Starting Archon Backend Server..."
echo "📍 Location: $(pwd)/python"
echo "🔗 Server will run on: http://localhost:8181"
echo ""

cd "$(dirname "$0")/python" || exit 1

echo "Starting server..."
uv run python -m src.server.main
