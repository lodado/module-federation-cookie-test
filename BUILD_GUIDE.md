# 🐳 개별 Docker 빌드 가이드

이제 각 마이크로프론트엔드 앱을 개별적으로 빌드하고 배포할 수 있습니다!

## 🏗️ 새로운 구조

각 앱이 별도의 Docker 컨테이너로 실행되며, nginx-proxy가 모든 앱을 라우팅합니다.

### 서비스 구조

```
├── shell (포트 3000) - 메인 호스트 앱
├── remote1 (포트 3001) - 마이크로앱 1
├── remote2 (포트 3002) - 마이크로앱 2
├── auth-frontend (포트 3004) - 인증 프론트엔드
├── auth-server (포트 3003) - 인증 API 서버
└── nginx-proxy (포트 80) - 메인 프록시
```

## 🚀 빠른 시작

### 전체 빌드 & 실행

```bash
# 모든 서비스 빌드 후 실행
./scripts/rebuild-all.sh
```

### 개별 앱 빌드

```bash
# 특정 앱만 빌드
./scripts/build-single.sh shell
./scripts/build-single.sh remote1
./scripts/build-single.sh remote2
./scripts/build-single.sh auth-frontend
./scripts/build-single.sh auth-server
```

### 개별 앱 재시작 (빌드 + 재시작)

```bash
# 특정 앱만 재빌드하고 재시작
./scripts/restart-single.sh shell
./scripts/restart-single.sh remote1
```

### 개발용 빠른 빌드 (캐시 활용)

```bash
# 개발 중 빠른 빌드
./scripts/dev-build.sh shell
```

## 🌐 접속 주소

모든 앱은 nginx-proxy를 통해 접근합니다:

- **Shell (메인)**: http://localhost
- **Remote1**: http://localhost/remote1/
- **Remote2**: http://localhost/remote2/
- **Auth Frontend**: http://localhost/auth/
- **Auth API**: http://localhost/api/

## 📊 모니터링

### 서비스 상태 확인

```bash
docker-compose ps
```

### 로그 확인

```bash
# 모든 서비스 로그
docker-compose logs -f

# 특정 서비스 로그
docker-compose logs -f shell
docker-compose logs -f remote1
```

## ⚡ 개발 워크플로우

### 1. Shell 앱만 수정한 경우

```bash
./scripts/restart-single.sh shell
```

### 2. Remote1 앱만 수정한 경우

```bash
./scripts/restart-single.sh remote1
```

### 3. nginx 설정 변경 시

```bash
./scripts/restart-single.sh nginx-proxy
```

## 🔧 트러블슈팅

### 캐시 문제 시 완전 재빌드

```bash
# 이미지 강제 재빌드 (캐시 무시)
docker-compose build --no-cache shell
docker-compose up -d shell
```

### 모든 컨테이너 정리 후 재시작

```bash
docker-compose down
docker system prune -f
./scripts/rebuild-all.sh
```

## 📁 파일 구조

```
apps/
├── shell/
│   ├── Dockerfile          # Shell 앱 전용 Docker 이미지
│   └── nginx.conf          # Shell 앱 nginx 설정
├── remote1/
│   ├── Dockerfile          # Remote1 앱 전용 Docker 이미지
│   └── nginx.conf          # Remote1 앱 nginx 설정
├── remote2/
│   ├── Dockerfile          # Remote2 앱 전용 Docker 이미지
│   └── nginx.conf          # Remote2 앱 nginx 설정
├── auth-frontend/
│   ├── Dockerfile          # Auth Frontend 앱 전용 Docker 이미지
│   └── nginx.conf          # Auth Frontend 앱 nginx 설정
└── auth-server/
    └── Dockerfile          # Auth Server 전용 Docker 이미지

scripts/
├── build-single.sh         # 개별 앱 빌드
├── restart-single.sh       # 개별 앱 재시작
├── rebuild-all.sh          # 전체 재빌드
└── dev-build.sh           # 개발용 빠른 빌드

docker-compose.yml          # 모든 서비스 정의
Dockerfile.nginx           # 프록시 전용 nginx
nginx-proxy.conf           # 프록시 nginx 설정
```

## ✨ 장점

1. **빠른 개발**: 한 앱만 수정 시 해당 앱만 재빌드
2. **독립적 배포**: 각 앱을 독립적으로 배포 가능
3. **캐시 효율성**: 변경되지 않은 앱은 캐시 사용
4. **확장성**: 새로운 마이크로앱 쉽게 추가 가능
5. **모니터링**: 각 앱별 독립적인 로그 및 상태 관리
