# 06. 코드/데이터/보안 아키텍처 — 현재 구현과 운영 전환의 경계

## 현재 정적 사이트 구성

```text
브라우저
  ├─ index.html + app.js + style.css ─── 홈 대시보드
  ├─ line-info.html ──────────────────── 01 KPI/그래프/RAW/Excel/이력
  └─ nav.js + nav.css ────────────────── 두 페이지 공통 좌측 16개 메뉴
        │
        ├─ 브라우저 localStorage ─────── 데모 버전(사용자별/브라우저별)
        ├─ GET data/line-info-state.json ── 파일이 있고 접근 가능할 때 공유 조회 시도
        └─ (시연용) GitHub Contents API ── 별도 권한/토큰 연결 시만 쓰기 시도
GitHub Pages ─── 정적 HTML·CSS·JS 제공 / 사용자의 개인별 쓰기 권한 검증 불가
GitHub Repository ─ 파일 코드, data/equipment.json, data/line-info-state.json
```

## 파일이 담당하는 책임

- `index.html`: 홈 대시보드 뼈대. 공통 메뉴 로딩 `nav.js`/`nav.css` 필수.
- `app.js`: 홈 영역 라우팅 및 샘플 시각화. 메뉴 배열의 복사본을 만들지 않고 `EDS_NAV.render` 호출.
- `style.css`: 홈 레이아웃 및 시각화.
- `line-info.html`: 01 상세 페이지 단일 파일에 화면/차트/Raw 렌더러/Excel 구현 포함(현행 코드 구조). 추후 모듈화 가능하나 회귀 검사 필수.
- `nav.js`: **공통 메뉴 단일 정의**; `nav.css`: 공통 사이드바 스타일.
- `data/line-info-state.json`: 운영자가 이전에 GitHub 저장소에 넣은 경우 공유 Raw/버전 스냅샷. 이번 배포본에는 미포함.
- `data/equipment.json`: 기존 설비 현황, 절대 덮어쓰지 말기.

## 정상적인 데이터 소유권

`코드 파일/테마`와 `업무 RAW 및 변경이력`은 별개로 유지. 새 릴리스 ZIP이 어떤 데이터 JSON도 삭제하거나 가짜 데이터로 대체하면 안 됩니다.

## Enterprise 권한 체계(마지막 단계)

사내 GitHub Enterprise에서는 `Read 조회`, `Write 수정 제출`, `승인자 PR 검토`, `Admin 설정` 등 팀 권한으로 설계 가능. 단 **GitHub 저장소 접근 권한**과 **홈페이지 인증/업로드 승인**은 별개의 계층입니다. Pages 공개 범위를 회사 Enterprise 설정으로 먼저 확인해야 하고, 브라우저에 PAT/비밀번호를 저장하거나 일반 직원에게 Repository Write를 무제한 제공하는 방법은 운영에 부적합할 수 있습니다.

권장 방향: 조직 소유 Private 저장소/사내 승인 정책, PR/Ruleset, Actions 검증, 검토 후 main 반영, Pages 배포. 사용자 정의 EDS 웹에서 직접 수정하는 기능은 별도 안전한 인증/서버 측 검증 또는 승인된 엔터프라이즈 연동이 필요할 수 있습니다.

## 금지 사항

- GitHub Token/PAT, 비밀번호, 사내 원본 CSV/JSON을 Git 저장소 소스코드에 적지 않기.
- `edseds` 브라우저 검사로 관리자/수정 권한을 보호한다고 오해시키지 않기.
- `fetch`로 데이터를 읽었다는 이유만으로 웹사이트가 비공개라고 판단하지 않기.
- 로컬 파일 테스트 결과를 사내 엔터프라이즈 접근성 테스트 성공으로 과장하지 않기.
