# GitHub Pages 배포 가이드 🐙

이 문서는 제주 여행일기 프로젝트를 GitHub Pages를 통해 배포하는 방법을 설명합니다.

## 🚀 GitHub Pages 배포의 장점

- **무료 호스팅**: 공개 저장소는 완전 무료
- **자동 배포**: GitHub Actions를 통한 자동 CI/CD
- **커스텀 도메인**: 무료 SSL 인증서 포함
- **GitHub 통합**: 이슈, PR과 완벽 연동

## 📋 배포 준비 단계

### 1. GitHub 저장소 생성

1. [GitHub.com](https://github.com)에서 새 저장소 생성
2. 저장소 이름: `trip-blog` (또는 원하는 이름)
3. Public으로 설정 (GitHub Pages 무료 사용을 위해)

### 2. 로컬 저장소와 GitHub 연결

```bash
# GitHub 원격 저장소 추가
git remote add origin https://github.com/your-username/trip-blog.git

# 또는 기존 origin 변경
git remote set-url origin https://github.com/your-username/trip-blog.git

# 첫 번째 커밋 및 푸시
git add .
git commit -m "Initial commit: 제주 여행일기 프로젝트"
git branch -M main
git push -u origin main
```

## 🔧 GitHub Pages 설정

### 1. GitHub Pages 활성화

1. GitHub 저장소에서 **Settings** 탭 클릭
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Source**에서 **GitHub Actions** 선택
4. 자동으로 워크플로우가 감지됩니다

### 2. 환경 변수 설정 (선택사항)

**Settings > Secrets and variables > Actions**에서 환경 변수 추가:

```
NEXT_PUBLIC_SITE_URL: https://your-username.github.io/trip-blog
NEXT_PUBLIC_SITE_NAME: 제주 여행일기
NEXT_PUBLIC_SITE_DESCRIPTION: 제주도 여행 정보와 문화를 공유하는 블로그
```

## 🚀 배포 실행

### 방법 1: Git Push를 통한 자동 배포

```bash
# 변경사항 커밋
git add .
git commit -m "Deploy to GitHub Pages"

# GitHub에 푸시 (자동 배포 트리거)
git push origin main
```

### 방법 2: GitHub 웹 인터페이스

1. GitHub 저장소에서 **Actions** 탭 클릭
2. **Deploy Next.js to GitHub Pages** 워크플로우 선택
3. **Run workflow** 버튼 클릭

## 📊 배포 모니터링

### 1. Actions 탭에서 배포 상태 확인

1. **Actions** 탭에서 워크플로우 실행 상태 확인
2. 각 단계별 로그 확인 가능
3. 실패 시 오류 메시지 확인

### 2. 배포된 사이트 확인

- 배포 URL: `https://your-username.github.io/trip-blog`
- **Settings > Pages**에서도 URL 확인 가능

## 🔧 고급 설정

### 1. 커스텀 도메인 설정

1. **Settings > Pages**에서 **Custom domain** 입력
2. DNS 설정에서 CNAME 레코드 추가:
   ```
   CNAME: your-domain.com -> your-username.github.io
   ```
3. **Enforce HTTPS** 체크박스 활성화

### 2. 브랜치 보호 규칙

**Settings > Branches**에서:
- main 브랜치 보호 설정
- PR 리뷰 필수 설정
- 상태 체크 통과 필수 설정

### 3. 환경별 배포

```yaml
# .github/workflows/deploy.yml 수정
on:
  push:
    branches: [ main, develop ]

jobs:
  deploy-staging:
    if: github.ref == 'refs/heads/develop'
    # 스테이징 환경 배포 설정
    
  deploy-production:
    if: github.ref == 'refs/heads/main'
    # 프로덕션 환경 배포 설정
```

## 🐛 문제 해결

### 일반적인 문제들

1. **404 오류**
   ```bash
   # basePath 설정 확인
   # next.config.js에서 basePath가 저장소 이름과 일치하는지 확인
   ```

2. **빌드 실패**
   ```bash
   # 로컬에서 빌드 테스트
   npm run build
   ```

3. **이미지 로딩 문제**
   ```bash
   # 이미지 경로를 상대 경로로 변경
   # /images/photo.jpg -> ./images/photo.jpg
   ```

4. **CSS/JS 파일 404**
   ```bash
   # assetPrefix 설정 확인
   # next.config.js의 assetPrefix 설정 확인
   ```

### 디버깅 방법

```bash
# 로컬에서 프로덕션 빌드 테스트
npm run build
npx serve out

# 또는 Python 서버 사용
cd out
python -m http.server 8000
```

## 📈 성능 최적화

### 1. GitHub Actions 캐시 활용

```yaml
- name: Cache dependencies
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

### 2. 빌드 시간 단축

```yaml
- name: Install dependencies
  run: npm ci --prefer-offline --no-audit
```

### 3. 이미지 최적화

```javascript
// next.config.js
module.exports = {
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
  }
}
```

## 🔐 보안 설정

### 1. Secrets 관리

- API 키는 **Secrets**에 저장
- 환경 변수는 **Variables**에 저장
- **Dependabot** 활성화로 보안 업데이트 자동화

### 2. 워크플로우 보안

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

## 📊 모니터링 및 분석

### 1. GitHub Insights

- **Traffic**: 방문자 통계
- **Clones**: 저장소 복제 통계
- **Referrers**: 유입 경로 분석

### 2. 외부 분석 도구 연동

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

## 🔄 지속적 배포 (CD)

### 자동 배포 트리거

- **Push to main**: 자동 프로덕션 배포
- **Pull Request**: 미리보기 배포 (선택사항)
- **Release**: 태그 기반 배포

### 롤백 전략

```bash
# 이전 커밋으로 롤백
git revert HEAD
git push origin main

# 또는 특정 커밋으로 롤백
git reset --hard <commit-hash>
git push --force origin main
```

## 📞 지원 및 문의

### GitHub 관련 문제

1. [GitHub Docs](https://docs.github.com/en/pages)
2. [GitHub Community](https://github.community/)
3. GitHub Support

### 프로젝트 관련 문제

1. 저장소 Issues 탭에서 문제 보고
2. 배포 로그 첨부
3. 브라우저 개발자 도구 오류 포함

---

## 🎯 배포 체크리스트

배포 전 확인사항:

- [ ] GitHub 저장소 생성 완료
- [ ] 로컬 저장소와 GitHub 연결 완료
- [ ] `.github/workflows/deploy.yml` 파일 확인
- [ ] `next.config.js` 설정 확인
- [ ] 로컬 빌드 테스트 완료
- [ ] GitHub Pages 설정 완료

배포 후 확인사항:

- [ ] GitHub Actions 워크플로우 성공
- [ ] GitHub Pages 사이트 정상 접속
- [ ] 모든 페이지 정상 작동
- [ ] 이미지 및 스타일 정상 로드
- [ ] 모바일 반응형 확인
- [ ] 커스텀 도메인 설정 (선택사항)

---

## 🚀 빠른 시작 가이드

```bash
# 1. 저장소 클론 및 설정
git clone https://github.com/your-username/trip-blog.git
cd trip-blog/my-app

# 2. 의존성 설치
npm install

# 3. 로컬 개발 서버 실행
npm run dev

# 4. 빌드 테스트
npm run build

# 5. GitHub에 푸시 (자동 배포)
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

**GitHub Pages로 쉽고 빠른 배포를 시작하세요! 🎉** 