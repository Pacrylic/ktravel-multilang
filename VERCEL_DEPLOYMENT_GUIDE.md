# KTRAVEL Vercel 배포 가이드

## 준비사항

1. **Vercel 계정** - vercel.com에서 무료 가입
2. **GitHub 계정** - 프로젝트를 GitHub에 업로드
3. **MySQL 데이터베이스** - Planetscale 또는 다른 MySQL 호스팅
4. **도메인** - ktravel.page (이미 소유 중)

---

## 1단계: 프로젝트를 GitHub에 업로드

### 1.1 GitHub 저장소 생성
1. GitHub.com 접속
2. 우측 상단 "+" → "New repository" 클릭
3. Repository 이름: `ktravel-multilang`
4. Public 또는 Private 선택
5. "Create repository" 클릭

### 1.2 프로젝트 업로드
```bash
# 다운로드받은 압축 파일 압축 해제
tar -xzf ktravel-multilang-with-database-*.tar.gz
cd ktravel-multilang

# Git 초기화
git init
git add .
git commit -m "Initial commit with database integration"

# GitHub 저장소 연결 (YOUR_USERNAME을 본인 계정으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/ktravel-multilang.git
git branch -M main
git push -u origin main
```

---

## 2단계: MySQL 데이터베이스 설정 (Planetscale 사용)

### 2.1 Planetscale 계정 생성
1. planetscale.com 접속 및 무료 가입
2. "New database" 클릭
3. Database 이름: `ktravel-db`
4. Region: `AWS ap-northeast-2` (서울) 선택
5. "Create database" 클릭

### 2.2 데이터베이스 연결 정보 확인
1. 생성된 데이터베이스 클릭
2. "Connect" 버튼 클릭
3. "Create password" 클릭
4. **Connection string 복사** (나중에 사용)
   - 형식: `mysql://username:password@host/database?sslaccept=strict`

---

## 3단계: Vercel에 배포

### 3.1 Vercel 프로젝트 생성
1. vercel.com 로그인
2. "Add New..." → "Project" 클릭
3. GitHub 계정 연동
4. `ktravel-multilang` 저장소 선택
5. "Import" 클릭

### 3.2 프로젝트 설정
**Framework Preset:** Vite
**Root Directory:** `./` (기본값)
**Build Command:** `pnpm build`
**Output Directory:** `dist`

### 3.3 환경 변수 설정
"Environment Variables" 섹션에서 다음 변수들을 추가:

```
DATABASE_URL = mysql://your-planetscale-connection-string
JWT_SECRET = your-random-secret-key-here-min-32-chars
OAUTH_SERVER_URL = https://api.manus.im
VITE_APP_TITLE = KTRAVEL
VITE_APP_LOGO = 🇰🇷
```

**JWT_SECRET 생성 방법:**
```bash
# 터미널에서 실행
openssl rand -base64 32
```

### 3.4 배포 시작
1. "Deploy" 버튼 클릭
2. 배포 완료 대기 (약 2-3분)
3. 배포 완료 후 Vercel URL 확인 (예: `ktravel-multilang.vercel.app`)

---

## 4단계: 데이터베이스 마이그레이션

### 4.1 로컬에서 마이그레이션 실행

```bash
# .env 파일 생성
echo "DATABASE_URL=your-planetscale-connection-string" > .env

# 의존성 설치
pnpm install

# 데이터베이스 스키마 생성
pnpm db:push

# 데이터 마이그레이션
node migrate-data.mjs
```

### 4.2 마이그레이션 확인
Planetscale 대시보드에서 테이블 생성 확인:
- categories (16개 레코드)
- translations (64개 레코드)
- advertisements (20개 레코드)

---

## 5단계: 커스텀 도메인 연결 (ktravel.page)

### 5.1 Vercel에서 도메인 추가
1. Vercel 프로젝트 대시보드
2. "Settings" → "Domains" 클릭
3. "Add" 버튼 클릭
4. `ktravel.page` 입력
5. "Add" 클릭

### 5.2 DNS 설정
Vercel이 제공하는 DNS 레코드를 도메인 등록 업체에 추가:

**A 레코드:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 자동
```

**CNAME 레코드 (www 서브도메인용):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 자동
```

### 5.3 도메인 등록 업체별 설정 방법

#### Cloudflare
1. Cloudflare 대시보드 → DNS 탭
2. "Add record" 클릭
3. 위의 A 레코드 및 CNAME 레코드 추가
4. Proxy status: "DNS only" (회색 구름)

#### GoDaddy
1. 도메인 관리 → DNS 관리
2. "Add" 버튼으로 레코드 추가

#### Namecheap
1. Domain List → Manage → Advanced DNS
2. "Add New Record" 클릭

### 5.4 SSL 인증서 (자동)
- Vercel이 자동으로 Let's Encrypt SSL 인증서 발급
- 약 10-30분 소요
- 완료 후 `https://ktravel.page` 접속 가능

---

## 6단계: 배포 확인

### 6.1 웹사이트 접속
```
https://ktravel.page
```

### 6.2 기능 테스트
- ✅ 언어 전환 (EN/KO/ZH/JA)
- ✅ 카테고리 16개 표시
- ✅ 상단 캐러셀 광고
- ✅ 하단 파트너 광고
- ✅ 카테고리 상세 페이지

---

## 자동 배포 설정

GitHub에 코드를 푸시하면 Vercel이 자동으로 재배포합니다:

```bash
git add .
git commit -m "Update content"
git push origin main
```

---

## 문제 해결

### 배포 실패 시
1. Vercel 대시보드 → 프로젝트 → "Deployments" → 실패한 배포 클릭
2. 로그 확인
3. 환경 변수가 올바르게 설정되었는지 확인

### 데이터베이스 연결 실패 시
1. DATABASE_URL이 올바른지 확인
2. Planetscale에서 "Allow all IPs" 설정 확인
3. SSL 모드 확인 (`?sslaccept=strict`)

### 도메인 연결 안 될 시
1. DNS 전파 대기 (최대 24-48시간)
2. DNS 전파 확인: https://dnschecker.org
3. Vercel 대시보드에서 도메인 상태 확인

---

## 비용

- **Vercel:** 무료 (Hobby 플랜)
- **Planetscale:** 무료 (5GB 스토리지, 10억 row reads/월)
- **도메인:** ktravel.page 연간 갱신 비용만 발생

---

## 추가 최적화

### 1. 이미지 최적화
Vercel Image Optimization 사용:
```tsx
import Image from 'next/image'
<Image src="/image.jpg" width={800} height={400} />
```

### 2. 캐싱 설정
`vercel.json` 파일 생성:
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "s-maxage=3600, stale-while-revalidate" }
      ]
    }
  ]
}
```

### 3. 성능 모니터링
Vercel Analytics 활성화:
1. 프로젝트 설정 → Analytics
2. "Enable Analytics" 클릭

---

## 지원

문제가 발생하면:
- Vercel 문서: https://vercel.com/docs
- Planetscale 문서: https://planetscale.com/docs
- GitHub Issues: 프로젝트 저장소에 이슈 등록
