# Module Federation 쿠키 공유 테스트 프로젝트

## 🎯 프로젝트 목적

이 프로젝트는 **Webpack Module Federation**을 사용한 마이크로프론트엔드 아키텍처에서 **쿠키(Cookie)가 여러 마이크로앱 간에 어떻게 공유되는지**를 테스트하고 검증하기 위한 데모 프로젝트입니다.

## 🏗️ 아키텍처 개요

```
┌─────────────────────────────────────────────────────────────┐
│                        Shell App (포트 3000)                 │
│                    메인 컨테이너 애플리케이션                    │
│  ┌─────────────────────┐  ┌─────────────────────┐           │
│  │    Remote1 앱       │  │    Remote2 앱       │           │
│  │   (포트 3001)       │  │   (포트 3002)       │           │
│  │  쿠키 값 표시       │  │  쿠키 값 표시       │           │
│  └─────────────────────┘  └─────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ 쿠키 공유
                              │
┌─────────────────────────────────────────────────────────────┐
│              Auth Frontend (포트 3004)                       │
│                로그인 및 쿠키 설정                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ API 호출
                              │
┌─────────────────────────────────────────────────────────────┐
│              Auth Server (포트 3003)                         │
│              Next.js API 서버                               │
│              인증 처리 및 쿠키 설정                          │
└─────────────────────────────────────────────────────────────┘
```

## 📦 구성 요소

### 1. **Shell 앱** (포트 3000)

- **역할**: Module Federation의 메인 컨테이너 역할
- **기능**: Remote1, Remote2 마이크로앱을 동적으로 로드하여 화면에 표시
- **기술**: React + TypeScript + Webpack Module Federation
- **특징**:
  - `ModuleFederationPlugin`으로 remote 앱들을 consumer로 설정
  - React.lazy와 Suspense를 활용한 동적 컴포넌트 로딩

### 2. **Remote1 & Remote2** (포트 3001, 3002)

- **역할**: 독립적으로 개발/배포 가능한 마이크로프론트엔드
- **기능**:
  - 현재 브라우저에 저장된 쿠키 값들을 실시간으로 표시
  - 1초마다 자동으로 쿠키 상태 새로고침
  - 쿠키 원본 문자열과 파싱된 쿠키들을 구분하여 표시
- **기술**: React + TypeScript + Webpack Module Federation
- **특징**:
  - `ModuleFederationPlugin`으로 `./CookieValue` 컴포넌트를 expose
  - 각각 다른 포트에서 실행되어 독립성 확인

### 3. **Auth Frontend** (포트 3004)

- **역할**: 사용자 인증 및 쿠키 설정 담당
- **기능**:
  - 사용자 이름 입력 및 로그인 처리
  - Auth Server API 호출하여 인증 쿠키 설정
  - 직접 쿠키 설정 기능 (API 우회)
  - 쿠키 삭제 및 새로고침 기능
  - 현재 설정된 쿠키 상태 표시
- **기술**: React + TypeScript + Webpack

### 4. **Auth Server** (포트 3003)

- **역할**: 인증 API 서버
- **기능**:
  - `/api/login` 엔드포인트 제공
  - 사용자 인증 처리 및 JWT 스타일 토큰 생성
  - 여러 종류의 쿠키 설정 (auth-token, user, loginTime, sessionId)
  - CORS 헤더 설정으로 크로스 오리진 요청 허용
- **기술**: Next.js + TypeScript
- **특징**:
  - `SameSite=Lax` 정책으로 안전한 쿠키 설정
  - URL 인코딩을 통한 특수문자 문제 해결

### 5. **Nginx** (프로덕션 환경)

- **역할**: 정적 파일 서빙 및 리버스 프록시
- **기능**:
  - Shell, Remote1, Remote2, Auth Frontend 정적 파일 서빙
  - Auth Server API에 대한 프록시 설정
  - Module Federation의 `remoteEntry.js` 캐시 정책 관리
- **특징**:
  - `remoteEntry.js`는 캐시하지 않아 최신 버전 보장
  - 일반 JS 파일들은 캐싱으로 성능 최적화

## 🚀 실행 방법

### 개발 환경 실행

```bash
# 의존성 설치
yarn install

# 모든 앱 동시 실행 (turbo 사용)
yarn dev
```

개별 앱 실행:

```bash
# 각 앱을 별도 터미널에서 실행
cd apps/shell && yarn dev        # 포트 3000
cd apps/remote1 && yarn dev      # 포트 3001
cd apps/remote2 && yarn dev      # 포트 3002
cd apps/auth-server && yarn dev  # 포트 3003
cd apps/auth-frontend && yarn dev # 포트 3004
```

### 프로덕션 환경 실행 (Docker)

```bash
# Docker Compose로 실행
docker-compose up --build

# 브라우저에서 http://localhost 접속
```

## 🧪 테스트 시나리오

### 1. 기본 쿠키 공유 테스트

1. Shell 앱 (<http://localhost:3000>) 접속
2. Auth Frontend 링크를 클릭하여 인증 페이지로 이동
3. 사용자 이름 입력 후 "Login" 버튼 클릭
4. Shell 앱으로 돌아가서 Remote1, Remote2에서 쿠키가 표시되는지 확인

### 2. 실시간 쿠키 동기화 테스트

1. Auth Frontend에서 쿠키 설정
2. Shell 앱의 Remote1, Remote2에서 1초마다 자동 업데이트되는지 확인
3. "직접 쿠키 설정" 버튼으로 쿠키 변경 후 동기화 확인

### 3. 쿠키 삭제 테스트

1. "쿠키 삭제" 버튼으로 모든 쿠키 제거
2. Remote1, Remote2에서 쿠키가 사라지는지 확인

## 🔧 기술 스택

- **Frontend**: React 18, TypeScript
- **Module Federation**: Webpack 5
- **Backend**: Next.js (API Routes)
- **Build Tool**: Turbo (Monorepo)
- **Package Manager**: Yarn Workspaces
- **Container**: Docker, Docker Compose
- **Reverse Proxy**: Nginx

## 📚 주요 학습 포인트

### 1. Module Federation 설정

- `ModuleFederationPlugin`을 통한 마이크로프론트엔드 구성
- Remote와 Consumer 간의 연결 설정
- React 싱글톤 공유 설정

### 2. 쿠키 공유 매커니즘

- 동일 도메인에서 여러 포트 간 쿠키 공유
- `SameSite` 정책의 영향
- 브라우저 보안 정책과 CORS 설정

### 3. 마이크로프론트엔드 아키텍처

- 독립적인 개발/배포 파이프라인
- 런타임 통합과 공유 상태 관리
- 성능과 보안 고려사항

## 🎯 활용 사례

이 프로젝트는 다음과 같은 상황에서 참고할 수 있습니다:

- **대규모 웹 애플리케이션**의 마이크로프론트엔드 도입 검토
- **팀 간 독립적 개발**이 필요한 조직
- **Module Federation**을 활용한 점진적 마이그레이션
- **쿠키 기반 인증**을 사용하는 멀티 앱 환경
- **SSO(Single Sign-On)** 구현 사전 연구

## ⚠️ 보안 경고

### CORS 설정 주의사항

**현재 nginx.conf의 CORS 설정은 개발/테스트 목적으로만 사용해야 합니다!**

#### 🔴 위험한 설정 (수정됨)

```nginx
# 이전 위험한 설정 - 절대 사용 금지!
add_header Access-Control-Allow-Origin *;
add_header Access-Control-Allow-Credentials true;
```

위 설정은 다음과 같은 심각한 보안 문제를 야기합니다:

- **모든 웹사이트**에서 인증 쿠키에 접근 가능
- **CSRF 공격**에 매우 취약
- **브라우저에서 오류** 발생 (CORS 정책 위반)

#### ✅ 안전한 설정 (현재 적용됨)

```nginx
# 개발 환경 - 특정 localhost 오리진만 허용
add_header Access-Control-Allow-Origin "http://localhost:3000";
add_header Access-Control-Allow-Credentials true;

# 프로덕션 환경에서는 실제 도메인 사용 필요
# add_header Access-Control-Allow-Origin "https://yourdomain.com";
```

#### 🛡️ 프로덕션 배포 전 필수 점검사항

1. **nginx.conf**에서 모든 `Access-Control-Allow-Origin` 값을 실제 도메인으로 변경
2. 와일드카드(`*`) 사용 절대 금지
3. HTTPS 프로토콜 사용 강제
4. `Secure` 플래그가 포함된 쿠키 설정 확인

## 📝 참고사항

- 개발 환경에서는 localhost의 다른 포트 간에도 쿠키가 공유됩니다
- 프로덕션 환경에서는 동일 도메인 하위 경로로 배포되어 쿠키 공유가 보장됩니다
- `HttpOnly=false`로 설정하여 JavaScript에서 쿠키 접근이 가능합니다
- 실제 프로덕션에서는 보안을 위해 `HttpOnly=true` 사용을 권장합니다

---

**🔗 관련 링크**

- [Webpack Module Federation 공식 문서](https://webpack.js.org/concepts/module-federation/)
- [마이크로프론트엔드 패턴 가이드](https://micro-frontends.org/)
- [쿠키 정책 및 SameSite 속성](https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies)
