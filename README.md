# KTRAVEL - Smart Digital Travel Guide

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

한국 여행을 위한 스마트 디지털 가이드입니다. 4개 언어(영어, 한국어, 중국어, 일본어)를 지원하며, 공항, 교통, 관광지 등 16개 카테고리의 여행 정보를 제공합니다.

## 🌟 주요 기능

- **다국어 지원**: 영어, 한국어, 중국어, 일본어
- **16개 카테고리**: 인천공항, 예약, 관광지, 교통, 지역정보, USIM, 긴급연락처, 번역, 환전, 음식, WiFi, 쇼핑, 날씨, 문화, 주변 식당, 주변 호텔
- **광고 시스템**: 상단 캐러셀, 하단 파트너 광고, 콘텐츠 내 광고
- **데이터베이스 기반**: MySQL을 사용한 영구 데이터 저장
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원

## 🚀 빠른 시작

### 필수 요구사항

- Node.js 18+ 
- pnpm
- MySQL 데이터베이스

### 설치

```bash
# 의존성 설치
pnpm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어 DATABASE_URL 등 설정

# 데이터베이스 스키마 생성
pnpm db:push

# 데이터 마이그레이션
node migrate-data.mjs

# 개발 서버 시작
pnpm dev
```

## 📦 기술 스택

### Frontend
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Tailwind CSS 4** - 스타일링
- **shadcn/ui** - UI 컴포넌트
- **Wouter** - 라우팅
- **tRPC** - End-to-end 타입 안전 API

### Backend
- **Node.js** - 런타임
- **Express** - 웹 프레임워크
- **tRPC** - API 레이어
- **Drizzle ORM** - 데이터베이스 ORM
- **MySQL** - 데이터베이스

## 📁 프로젝트 구조

```
ktravel-multilang/
├── client/                 # 프론트엔드
│   ├── public/            # 정적 파일
│   └── src/
│       ├── components/    # React 컴포넌트
│       ├── contexts/      # React 컨텍스트
│       ├── pages/         # 페이지 컴포넌트
│       ├── lib/           # 유틸리티
│       └── types/         # TypeScript 타입
├── server/                # 백엔드
│   ├── _core/            # 서버 코어
│   ├── db.ts             # 데이터베이스 쿼리
│   └── routers.ts        # tRPC 라우터
├── drizzle/              # 데이터베이스 스키마
│   └── schema.ts
├── shared/               # 공유 코드
└── migrate-data.mjs      # 데이터 마이그레이션
```

## 🗄️ 데이터베이스 스키마

### categories
- `id` (varchar) - 카테고리 ID
- `icon` (varchar) - 이모지 아이콘
- `order` (int) - 정렬 순서

### translations
- `id` (int) - 자동 증가 ID
- `categoryId` (varchar) - 카테고리 참조
- `language` (enum) - 언어 코드
- `title` (varchar) - 제목
- `subtitle` (text) - 부제목
- `overview` (text) - 개요
- `sections` (json) - 섹션 내용

### advertisements
- `id` (int) - 자동 증가 ID
- `type` (enum) - 광고 타입
- `position` (int) - 위치
- `imageUrl` (text) - 이미지 URL
- `linkUrl` (text) - 링크 URL
- `language` (enum) - 언어 코드
- `text` (text) - 광고 텍스트
- `categoryId` (varchar) - 카테고리 참조 (선택)
- `active` (int) - 활성화 상태

## 🌐 Vercel 배포

자세한 배포 가이드는 [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)를 참조하세요.

### 간단 배포

1. GitHub에 프로젝트 업로드
2. Vercel에서 프로젝트 Import
3. 환경 변수 설정
4. 배포 완료!

### 커스텀 도메인 연결

1. Vercel 프로젝트 설정 → Domains
2. 도메인 추가 (예: ktravel.page)
3. DNS 레코드 설정
4. SSL 자동 발급 대기

## 📝 환경 변수

```env
# 데이터베이스
DATABASE_URL=mysql://user:password@host:port/database

# 인증
JWT_SECRET=your-secret-key-min-32-chars
OAUTH_SERVER_URL=https://api.manus.im

# 앱 설정
VITE_APP_TITLE=KTRAVEL
VITE_APP_LOGO=🇰🇷
```

## 🔧 개발 스크립트

```bash
# 개발 서버 시작
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 시작
pnpm start

# 데이터베이스 스키마 푸시
pnpm db:push

# 데이터베이스 스튜디오
pnpm db:studio
```

## 📚 문서

- [데이터베이스 설정 가이드](./DATABASE_SETUP.md)
- [Vercel 배포 가이드](./VERCEL_DEPLOYMENT_GUIDE.md)

## 🤝 기여

이슈와 풀 리퀘스트를 환영합니다!

## 📄 라이선스

© 2025 KTRAVEL. All rights reserved.

## 🔗 링크

- **웹사이트**: https://ktravel.page
- **문의**: https://help.manus.im

---

Made with ❤️ using Manus AI
