#!/bin/bash

# 개별 앱 재시작 스크립트 (빌드 + 재시작)
# 사용법: ./scripts/restart-single.sh <앱이름>
# 예시: ./scripts/restart-single.sh shell

if [ $# -eq 0 ]; then
    echo "사용법: $0 <앱이름>"
    echo "가능한 앱: shell, remote1, remote2, auth-frontend, auth-server, nginx-proxy"
    exit 1
fi

APP_NAME=$1

case $APP_NAME in
    shell|remote1|remote2|auth-frontend|auth-server|nginx-proxy)
        echo "🔄 $APP_NAME 컨테이너 중지 중..."
        docker compose stop $APP_NAME
        
        echo "🔨 $APP_NAME 빌드 중..."
        docker compose build $APP_NAME
        
        echo "🚀 $APP_NAME 시작 중..."
        docker compose up -d $APP_NAME
        
        echo "✅ $APP_NAME 재시작 완료!"
        echo "📋 로그 확인: docker compose logs -f $APP_NAME"
        ;;
    *)
        echo "❌ 알 수 없는 앱: $APP_NAME"
        echo "가능한 앱: shell, remote1, remote2, auth-frontend, auth-server, nginx-proxy"
        exit 1
        ;;
esac
