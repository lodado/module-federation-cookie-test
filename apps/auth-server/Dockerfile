FROM node:18-alpine

WORKDIR /app

# package.json 복사
COPY package.json ./

# 프로덕션 의존성만 설치
RUN npm install --production

# 빌드된 Next.js 결과물 복사 (.next 폴더)
COPY .next ./.next/
COPY pages ./pages/
COPY next.config.js ./

# 포트 3003 노출
EXPOSE 3003

# 프로덕션 서버 시작
CMD ["npm", "start"]
