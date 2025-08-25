#!/bin/bash

# 모든 앱 재빌드 스크립트
# 사용법: ./scripts/rebuild-all.sh

echo "🔄 모든 컨테이너 중지 중..."
docker compose down

echo "🔨 모든 이미지 빌드 중..."
docker compose build

echo "🚀 모든 서비스 시작 중..."
docker compose up -d

echo "✅ 모든 서비스 재시작 완료!"
echo ""
echo "📋 서비스 상태 확인:"
docker compose ps

echo ""
echo "📋 로그 확인 방법:"
echo "  - 모든 로그: docker compose logs -f"
echo "  - 특정 서비스: docker compose logs -f <서비스명>"
