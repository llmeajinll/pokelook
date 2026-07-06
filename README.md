# PokeLook

포켓몬 카드 시세를 검색하고 확인할 수 있는 웹 애플리케이션입니다.

## Features

- 포켓몬 카드 검색 및 페이지네이션
- 카드 상세 페이지 (30일 시세 추이 차트, Raw/PSA 등급별 가격)
- 좋아요(장바구니) — 담은 카드를 모달로 확인
- 다크/라이트 모드 (새로고침해도 유지)
- 달러/원화 시세 전환 (1달러 = 1,536원)
- 모바일 대응 반응형 레이아웃

## Tech Stack

- React 19 + Vite
- React Router
- TanStack Query
- Tailwind CSS v4
- class-variance-authority
- axios

## Getting Started

```bash
npm install
```

`.env` 파일에 TCG Price Lookup API 키를 설정해야 합니다.

```
VITE_TCG_API_KEY=your_api_key_here
```

```bash
npm run dev
```

## Scripts

- `npm run dev` — 개발 서버 실행
- `npm run build` — 프로덕션 빌드
- `npm run lint` — ESLint 검사
- `npm run preview` — 빌드 결과 미리보기
