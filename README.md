# 제주 여행일기 🏝️

제주도의 아름다운 여행 정보와 문화를 공유하는 현대적인 블로그 플랫폼입니다.

## 🌊 프로젝트 소개

제주여행일기는 제주도 여행을 계획하고 있는 사람들과 제주도를 사랑하는 사람들을 위한 종합 여행 정보 플랫폼입니다. 현지인의 시선으로 바라본 진짜 제주의 모습을 담아내고, 여행자들이 필요로 하는 실용적인 정보를 제공합니다.

## ✨ 주요 기능

- **여행소식**: 제주도 최신 여행 정보와 소식
- **문화행사**: 제주 전통문화와 현대 예술 행사 정보
- **블로그 카드 형식**: 현대적이고 직관적인 카드 레이아웃
- **상세 페이지**: 완전한 블로그 포스트와 이벤트 상세 정보
- **검색 및 필터**: 카테고리별, 월별 필터링 기능
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- **댓글 시스템**: 사용자 참여형 댓글 및 리뷰 기능

## 🛠️ 기술 스택

- **Frontend**: Next.js 13+ (App Router), TypeScript, React
- **Styling**: Tailwind CSS, shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel (권장)

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0 이상
- npm 또는 yarn

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone <repository-url>
   cd trip-blog/my-app
   ```

2. **의존성 설치**
   ```bash
   npm install
   # 또는
   yarn install
   ```

3. **환경 변수 설정**
   ```bash
   cp env.example .env.local
   # .env.local 파일을 편집하여 필요한 환경 변수 설정
   ```

4. **개발 서버 실행**
   ```bash
   npm run dev
   # 또는
   yarn dev
   ```

5. **브라우저에서 확인**
   ```
   http://localhost:3000
   ```

## 📁 프로젝트 구조

```
my-app/
├── app/                          # Next.js App Router
│   ├── cultural-events/          # 문화행사 페이지
│   │   ├── [id]/                # 문화행사 상세 페이지
│   │   └── page.tsx             # 문화행사 목록 페이지
│   ├── travel-news/             # 여행소식 페이지
│   │   ├── [id]/                # 여행소식 상세 페이지
│   │   └── page.tsx             # 여행소식 목록 페이지
│   ├── blog/                    # 블로그 페이지
│   ├── globals.css              # 전역 스타일
│   ├── layout.tsx               # 루트 레이아웃
│   └── page.tsx                 # 홈페이지
├── components/                   # 재사용 가능한 컴포넌트
│   └── ui/                      # shadcn/ui 컴포넌트
├── lib/                         # 유틸리티 함수
├── types/                       # TypeScript 타입 정의
├── public/                      # 정적 파일
└── package.json                 # 프로젝트 설정
```

## 🎨 디자인 시스템

- **색상**: Orange/Blue 그라데이션 테마
- **타이포그래피**: 한글 최적화 폰트
- **컴포넌트**: shadcn/ui 기반 일관된 디자인
- **애니메이션**: 부드러운 호버 효과와 트랜지션

## 📱 페이지 구성

### 홈페이지 (`/`)
- 히어로 섹션
- 주요 여행소식 및 문화행사 미리보기
- 네비게이션 메뉴

### 여행소식 (`/travel-news`)
- 블로그 카드 형식의 소식 목록
- 검색 및 카테고리 필터
- 상세 페이지 (`/travel-news/[id]`)

### 문화행사 (`/cultural-events`)
- 행사 카드 형식의 목록
- 카테고리별, 월별 필터링
- 행사 상세 페이지 (`/cultural-events/[id]`)

### 블로그 (`/blog`)
- 개인 여행기 및 팁 공유

## 🚀 배포하기

### Vercel 배포 (권장)

1. **Vercel 계정 생성** 및 GitHub 연동
2. **프로젝트 import**
   ```bash
   # Vercel CLI 설치
   npm i -g vercel
   
   # 배포
   vercel
   ```

3. **환경 변수 설정**
   - Vercel 대시보드에서 환경 변수 추가
   - `.env.local`의 내용을 Vercel 환경 변수로 복사

### 기타 플랫폼

- **Netlify**: `npm run build` 후 `out` 폴더 배포
- **GitHub Pages**: Static export 설정 후 배포
- **자체 서버**: Docker 또는 PM2 사용

## 🔧 개발 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 검사
npm run lint

# 타입 체크
npm run type-check
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이나 제안사항이 있으시면 언제든지 연락해주세요.

---

**제주 여행일기**로 제주도의 아름다운 순간들을 함께 나누어요! 🌺
