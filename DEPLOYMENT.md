# 배포 가이드 📚

이 문서는 제주 여행일기 프로젝트를 다양한 플랫폼에 배포하는 방법을 설명합니다.

## 🚀 배포 전 체크리스트

배포하기 전에 다음 사항들을 확인하세요:

- [ ] 모든 기능이 정상적으로 작동하는지 테스트
- [ ] 환경 변수 설정 완료
- [ ] 빌드 오류가 없는지 확인
- [ ] 타입 체크 통과
- [ ] 린트 검사 통과
- [ ] 이미지 및 정적 파일 최적화

```bash
# 배포 전 검사 명령어
npm run type-check
npm run lint
npm run build
```

## 🌐 Vercel 배포 (권장)

Vercel은 Next.js 프로젝트에 최적화된 배포 플랫폼입니다.

### 1. Vercel CLI 사용

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리에서 실행
vercel

# 프로덕션 배포
vercel --prod
```

### 2. GitHub 연동 배포

1. [Vercel 웹사이트](https://vercel.com)에 가입
2. GitHub 계정 연동
3. 저장소 import
4. 환경 변수 설정
5. 자동 배포 완료

### 3. 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수들을 설정하세요:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=제주 여행일기
NEXT_PUBLIC_SITE_DESCRIPTION=제주도 여행 정보와 문화를 공유하는 블로그
```

## 🔷 Netlify 배포

### 1. 정적 내보내기 설정

`next.config.js` 파일을 수정:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### 2. 배포 명령어

```bash
# 빌드 및 내보내기
npm run export

# Netlify CLI 사용 (선택사항)
npm install -g netlify-cli
netlify deploy --prod --dir=out
```

### 3. Netlify 웹 인터페이스

1. [Netlify](https://netlify.com)에 가입
2. GitHub 저장소 연결
3. 빌드 설정:
   - Build command: `npm run export`
   - Publish directory: `out`
4. 환경 변수 설정
5. 배포 완료

## 📄 GitHub Pages 배포

### 1. GitHub Actions 워크플로우 생성

`.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run export
      
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

### 2. 저장소 설정

1. GitHub 저장소 Settings > Pages
2. Source: GitHub Actions 선택
3. 워크플로우 실행 확인

## 🐳 Docker 배포

### 1. Dockerfile 생성

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### 2. Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 3. 배포 명령어

```bash
# 이미지 빌드
docker build -t jeju-travel-blog .

# 컨테이너 실행
docker run -p 3000:3000 jeju-travel-blog

# Docker Compose 사용
docker-compose up -d
```

## ☁️ AWS 배포

### 1. AWS Amplify

```bash
# Amplify CLI 설치
npm install -g @aws-amplify/cli

# 프로젝트 초기화
amplify init

# 호스팅 추가
amplify add hosting

# 배포
amplify publish
```

### 2. AWS S3 + CloudFront

```bash
# 정적 파일 빌드
npm run export

# AWS CLI로 S3에 업로드
aws s3 sync out/ s3://your-bucket-name --delete

# CloudFront 캐시 무효화
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## 🔧 배포 최적화 팁

### 1. 성능 최적화

- 이미지 최적화 (WebP, AVIF 형식 사용)
- 코드 분할 및 지연 로딩
- 번들 크기 분석 및 최적화
- CDN 사용

### 2. SEO 최적화

- 메타 태그 설정
- 구조화된 데이터 추가
- 사이트맵 생성
- robots.txt 설정

### 3. 보안 설정

- HTTPS 강제 사용
- 보안 헤더 설정
- 환경 변수 보호
- CORS 설정

## 🔍 배포 후 확인사항

배포 완료 후 다음 사항들을 확인하세요:

- [ ] 모든 페이지가 정상적으로 로드되는지
- [ ] 이미지가 올바르게 표시되는지
- [ ] 링크가 정상적으로 작동하는지
- [ ] 모바일에서도 정상적으로 작동하는지
- [ ] SEO 메타 태그가 올바르게 설정되었는지
- [ ] 성능 점수 확인 (Lighthouse)

## 🆘 문제 해결

### 일반적인 문제들

1. **빌드 오류**
   ```bash
   npm run type-check
   npm run lint
   ```

2. **이미지 로딩 문제**
   - `next.config.js`에서 이미지 도메인 설정 확인
   - 정적 내보내기 시 `unoptimized: true` 설정

3. **환경 변수 문제**
   - 클라이언트 사이드 변수는 `NEXT_PUBLIC_` 접두사 필요
   - 배포 플랫폼에서 환경 변수 설정 확인

4. **라우팅 문제**
   - 정적 내보내기 시 동적 라우팅 제한 확인
   - `trailingSlash: true` 설정 고려

## 📞 지원

배포 과정에서 문제가 발생하면:

1. 프로젝트 이슈 페이지에 문제 보고
2. 배포 플랫폼 공식 문서 참조
3. 커뮤니티 포럼에서 도움 요청

---

**성공적인 배포를 위해 단계별로 차근차근 진행하세요! 🚀** 