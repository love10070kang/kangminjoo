# 00. OpenCode 시작 지침 · 작업의 기준점

## 이 문서부터 읽는 이유

EDS 플랫폼은 단발성 예시 홈페이지가 아니라, 반도체 라인기획 업무를 표준화하고 교육/실무를 연결하려는 장기 프로젝트입니다. 화면 디자인과 데이터 기준은 사용자와 수차례 검토하며 확정했습니다. OpenCode가 화면을 '더 예쁘게' 만든다는 이유로 기존 기능이나 메뉴를 지우지 않도록 맥락을 보존합니다.

## 개발 대상

- 저장소: 기존 GitHub Pages 프로젝트. 현 배포 패키지는 브라우저에서 열 수 있는 정적 HTML/CSS/JavaScript.
- 실제 사이트의 상태를 임의로 추정하지 말고 **먼저 저장소 파일을 읽으세요**. `data/`의 기존 업무 자료는 **사용자 소유**.
- 최우선 페이지: `01. 라인 기본정보`. 홈 화면 `index.html`도 유지.
- 앞으로 `02~16`은 단계별로 확장. 상세 영역을 임의로 채워서 '구현 완료' 표시하지 말 것.

## 첫 작업 체크

1. `README.md`에서 전체 경로 확인, `AGENTS.md` 읽기.
2. `nav.js`의 6그룹·16메뉴, `nav.css`의 승인 좌측 메뉴 확인.
3. `line-info.html`의 `FIELDS` 46개, 그래프, RAW 테이블, Excel/버전 처리 파악.
4. `index.html`/`app.js`/`style.css`를 파악해 홈 화면 기능 보존.
5. 요청받은 변경을 기존 규칙과 비교하고 **변경 범위·유지할 기능·테스트 계획**을 먼저 짧게 한국어로 설명.
6. 수정 후 여러 화면 크기와 가로/세로 스크롤까지 검증. ZIP 전체 제공.

## 불변 조건 10가지

1. 홈과 01 메뉴는 완전히 같은 좌측 6그룹/16메뉴, 같은 시각 디자인.
2. 메뉴 디자인 기준은 `md/reference/approved-sidebar.png`; 어두운 네이비, 파란 그룹 헤더, 흰 아이콘, 활성 메뉴 하늘색 강조.
3. 승인된 01 화면의 필터 → KPI 5개 → 그래프 3개 → RAW 표 구조 보존.
4. 그래프 수치·축·단위·색 범례 누락 금지. 작은 화면에서는 정교한 적응형 재배치.
5. 버튼은 최대화↔원래대로만. 최소화 불필요하며 이미 삭제됨.
6. RAW 46개 필드·열 순서 유지. 식별 열 3개 고정, 두 줄 헤더 고정, 겹침 없어야 함.
7. 웹 직접 수정/삭제, AI, SSO 같은 **예정 기능**을 구현됐다고 속이지 않기.
8. 데이터 JSON, 버전이력, `equipment.html`, 기존 사용자 데이터 보존.
9. 회사 데이터/인증 비밀을 공개 페이지·코드/채팅에 노출하지 않기.
10. 사용자는 비개발자: 복잡한 CLI 대신 파일 교체 ZIP 및 GitHub 웹 업로드 설명 선호.

## 다음 문서

- 목적과 사람: [01_PROJECT_PURPOSE](01_PROJECT_PURPOSE.md)
- 모든 메뉴: [02_MENU_AND_NAVIGATION](02_MENU_AND_NAVIGATION.md)
- 화면 기준: [03_UI_DESIGN_SYSTEM](03_UI_DESIGN_SYSTEM.md)
- 데이터 46개: [04_RAW_DATA_DICTIONARY](04_RAW_DATA_DICTIONARY.md)
- 기능 현황: [05_FUNCTIONAL_SCOPE](05_FUNCTIONAL_SCOPE.md)
- 기술·보안: [06_TECH_ARCHITECTURE](06_TECH_ARCHITECTURE.md)
- QA: [07_QA_ACCEPTANCE](07_QA_ACCEPTANCE.md)
- 단계: [08_ROADMAP_AND_GUARDRAILS](08_ROADMAP_AND_GUARDRAILS.md)
- OpenCode용 요청: [09_OPENCODE_HANDOFF](09_OPENCODE_HANDOFF.md)
