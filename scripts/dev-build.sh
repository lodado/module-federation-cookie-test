#!/bin/bash

# 개발 환경용 빠른 빌드 스크립트
# 캐시를 활용하여 빠르게 빌드
# 사용법: ./scripts/dev-build.sh <앱이름>

if [ $# -eq 0 ]; then
    echo "사용법: $0 <앱이름>"
    echo "가능한 앱: shell, remote1, remote2, auth-frontend, auth-server"
    exit 1
fi

APP_NAME=$1

case $APP_NAME in
    shell|remote1|remote2|auth-frontend|auth-server)
        echo "🚀 개발용 빠른 빌드 시작..."
        echo "📦 $APP_NAME 빌드 중 (캐시 사용)..."
        
        # 캐시를 활용한 빌드
        docker compose build --parallel $APP_NAME
        
        # nginx-proxy도 함께 재빌드 (프록시 설정 변경 시)
        echo "🔄 Nginx 프록시 재시작..."
        docker compose restart nginx-proxy
        
        echo "✅ 개발용 빌드 완료!"
        echo "🌐 접속 주소:"
        echo "  - Shell (Main): http://localhost"
        echo "  - Remote1: http://localhost/remote1/"
        echo "  - Remote2: http://localhost/remote2/"
        echo "  - Auth Frontend: http://localhost/auth/"
        echo "  - Auth API: http://localhost/api/"
        ;;
    *)
        echo "❌ 알 수 없는 앱: $APP_NAME"
        echo "가능한 앱: shell, remote1, remote2, auth-frontend, auth-server"
        exit 1
        ;;
esac
