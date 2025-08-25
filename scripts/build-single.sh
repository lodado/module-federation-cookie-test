#!/bin/bash

# 개별 앱 빌드 스크립트
# 사용법: ./scripts/build-single.sh <앱이름>
# 예시: ./scripts/build-single.sh shell

if [ $# -eq 0 ]; then
    echo "사용법: $0 <앱이름>"
    echo "가능한 앱: shell, remote1, remote2, auth-frontend, auth-server, nginx-proxy"
    exit 1
fi

APP_NAME=$1

case $APP_NAME in
    shell)
        echo "🔨 Shell 앱 빌드 중..."
        docker compose build shell
        ;;
    remote1)
        echo "🔨 Remote1 앱 빌드 중..."
        docker compose build remote1
        ;;
    remote2)
        echo "🔨 Remote2 앱 빌드 중..."
        docker compose build remote2
        ;;
    auth-frontend)
        echo "🔨 Auth Frontend 앱 빌드 중..."
        docker compose build auth-frontend
        ;;
    auth-server)
        echo "🔨 Auth Server 빌드 중..."
        docker compose build auth-server
        ;;
    nginx-proxy)
        echo "🔨 Nginx Proxy 빌드 중..."
        docker compose build nginx-proxy
        ;;
    *)
        echo "❌ 알 수 없는 앱: $APP_NAME"
        echo "가능한 앱: shell, remote1, remote2, auth-frontend, auth-server, nginx-proxy"
        exit 1
        ;;
esac

echo "✅ $APP_NAME 빌드 완료!"
