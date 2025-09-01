#!/bin/bash

echo "🚀 Module Federation 개발 서버 시작 중..."
echo "📱 Shell 앱만 포그라운드에서 실행됩니다."
echo "🔧 다른 앱들은 백그라운드에서 실행됩니다."

# 다른 앱들을 백그라운드에서 시작
echo "🔄 Remote1 앱 시작 중 (포트 3001)..."
cd apps/remote1 && npm run dev > /dev/null 2>&1 &
REMOTE1_PID=$!

echo "🔄 Remote2 앱 시작 중 (포트 3002)..."
cd ../remote2 && npm run dev > /dev/null 2>&1 &
REMOTE2_PID=$!

echo "🔄 Auth Frontend 앱 시작 중 (포트 3004)..."
cd ../auth-frontend && npm run dev > /dev/null 2>&1 &
AUTH_FRONTEND_PID=$!

# 잠시 대기하여 다른 앱들이 시작될 시간을 줌
echo "⏳ 다른 앱들이 시작될 때까지 잠시 대기 중..."
sleep 5

echo "✅ 모든 앱이 시작되었습니다!"
echo "🌐 Shell 앱: http://localhost:3000"
echo "🔗 Remote1: http://localhost:3001"
echo "🔗 Remote2: http://localhost:3002"
echo "🔗 Auth Frontend: http://localhost:3004"
echo ""
echo "💡 Shell 앱만 포그라운드에서 실행됩니다. Ctrl+C로 종료하면 모든 앱이 함께 종료됩니다."
echo ""

# Shell 앱을 포그라운드에서 시작
cd ../shell
npm run dev

# Shell 앱이 종료되면 다른 앱들도 종료
echo ""
echo "🛑 Shell 앱이 종료되었습니다. 다른 앱들도 종료 중..."
kill $REMOTE1_PID $REMOTE2_PID $AUTH_FRONTEND_PID 2>/dev/null
echo "✅ 모든 앱이 종료되었습니다."
