# Remote1 App Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# 필요한 package files 복사
COPY package.json yarn.lock ./
COPY apps/remote1/package.json ./apps/remote1/

# 의존성 설치
RUN yarn install --frozen-lockfile

# remote1 앱 소스코드 복사
COPY apps/remote1/ ./apps/remote1/
COPY tsconfig.json ./

# remote1 앱 빌드
ENV NODE_ENV=production
WORKDIR /app/apps/remote1
RUN yarn build

# Nginx 단계
FROM nginx:alpine

# 기본 nginx 설정 제거
RUN rm /etc/nginx/conf.d/default.conf

# 커스텀 nginx 설정 복사 (remote1 전용)
COPY apps/remote1/nginx.conf /etc/nginx/conf.d/default.conf

# 빌드된 정적 파일들을 nginx에 복사
COPY --from=builder /app/apps/remote1/dist/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
