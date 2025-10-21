# FSD (Feature-Sliced Design) 아키텍처 가이드

이 프로젝트는 FSD 아키텍처를 따릅니다. 각 레이어의 역할은 다음과 같습니다:

## 레이어 구조 (하위 → 상위)

```
app/          → 애플리케이션 초기화 (providers, routes)
pages/        → 페이지 조합 (여러 feature/entity를 조합)
features/     → 비즈니스 기능 (사용자 시나리오)
entities/     → 비즈니스 엔티티 (도메인 모델)
shared/       → 공유 코드 (api, ui 컴포넌트, utils)
```

## 의존성 규칙

- **하위 레이어만 import 가능**: `pages`는 `features`, `entities`, `shared`를 import할 수 있지만, 그 반대는 불가
- **같은 레이어 간 import 금지**: `features/A`는 `features/B`를 import할 수 없음

## 레이어별 역할

### `shared/`
- 재사용 가능한 코드 (UI 컴포넌트, API 클라이언트, utils)
- 비즈니스 로직 없음
- 예: `Button`, `firebase`, `hooks`

### `entities/`
- 비즈니스 엔티티 (체크리스트, 유저 등)
- CRUD 로직 포함 가능
- 예: `entities/check-list/`

### `features/`
- 사용자 행동 중심 기능
- 예: `features/add-check-list/`, `features/toggle-check-item/`

### `pages/`
- 라우트별 페이지
- feature/entity 조합
- 예: `pages/home/`

### `app/`
- 앱 초기화 및 설정
- providers, router 설정

## 새 기능 추가 시

1. **공유 UI가 필요하면** → `shared/ui/`에 추가
2. **API/DB 작업이 필요하면** → `shared/api/`에 추가
3. **비즈니스 엔티티가 필요하면** → `entities/엔티티명/` 생성
4. **사용자 기능이 필요하면** → `features/기능명/` 생성
5. **새 페이지가 필요하면** → `pages/페이지명/` 생성

