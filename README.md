# EDS LINE PLANNING | 반도체 라인기획 통합관리 플랫폼

> 프로젝트 버전 **v4.3 · 2026-11-17** · GitHub Pages 정적 프런트엔드 + Excel RAW 데이터 조회/검증 시연. 현 단계에는 **가상 데이터**가 포함됩니다. 실제 회사 인사·설비·보안 정보는 승인 전 업로드하지 마세요.

## 1. 이 프로젝트를 만든 이유

EDS 라인기획 업무에 필요한 라인 공간·도면·설비·생산·유틸리티 정보가 라인/담당자/시점에 따라 서로 다른 파일과 형식으로 관리되면, 신규 설비 수용성 검토나 공간 재배치 때 매번 정보를 다시 수집해야 합니다. **한 곳에서 찾고, 동일한 정의로 비교하며, 변경된 이유와 근거까지 추적**할 수 있도록 만드는 것이 출발점입니다.

사업 목적은 (1) 신입→마스터 전문가 육성, (2) 업무·데이터 표준화, (3) 교육·실무·성과/역량 연결, (4) AI·자동화 기반 조직 혁신입니다. **현재 배포된 대시보드는 이 목표를 향한 초기 단계**이며 교육·평가·AI 기능까지 구현됐다는 뜻은 아닙니다.

자세한 배경은 [md/01_PROJECT_PURPOSE.md](md/01_PROJECT_PURPOSE.md), 전체 개발 조건은 [md/00_START_HERE.md](md/00_START_HERE.md)를 보세요.

## 2. 현재 화면과 개발 범위

- **메인 홈**: `index.html` — 16개 메뉴 연결 및 샘플 KPI/분석 패널.
- **01. 라인 기본정보**: `line-info.html` — 5개 KPI, 3개 그래프, 46개 필드 Raw Data, 라인/층 필터, 엑셀 다운로드·검증·이력, 최대화↔원래대로.
- **02~16**: 메뉴와 연결/향후 구현 안내 화면이 있으며 상세 실무 기능은 미구현. `equipment.html`은 이전 설비현황 예시를 보존하기 위한 파일입니다.
- **공통 메뉴 디자인**: 두 페이지 모두 `nav.js`+`nav.css`를 사용합니다. **6개 그룹·16개 항목을 별도로 복제하지 마세요.** `md/reference/approved-sidebar.png`가 승인된 메뉴 참조 이미지입니다.
- **사내 권한 관리**: 최종 단계 예정. 홈페이지 내 정식 로그인·SSO·승인 시스템은 아직 미구현입니다.

## 3. 프로젝트 구성: 모든 파일·경로와 역할

아래는 **v4.3 제공 ZIP의 파일 구조 + 사용자가 기존 GitHub에 보유한 파일**을 구분한 표입니다. ZIP을 올려도 **기존 `data` 폴더는 삭제하거나 덮어쓰지 마세요.**

```text
저장소 최상위 (/)
├── index.html                       # 홈 통합 대시보드 HTML. 메뉴 16개 연결
├── line-info.html                   # 01 라인 기본정보: KPI/차트/RAW/검증/버전 UI와 로직
├── equipment.html                   # ⚠ 기존 저장소의 설비현황 페이지(안전상 이번 ZIP에 미포함)
├── app.js                           # 홈 화면 KPI·메뉴 라우팅·샘플 콘텐츠 로직
├── style.css                        # 홈 화면 레이아웃·KPI·패널 기본 스타일
├── nav.js                           # 홈/01의 6그룹·16메뉴 단일 정의 및 메뉴 동작 ★
├── nav.css                          # 홈/01 공통 좌측 메뉴 스타일 ★
├── layout-concept.jpg               # 기존 레이아웃/설비 배치 콘셉트 이미지
├── EDS_RAW_Template_v1_1.xlsx       # 01 라인 기본정보용 46개 필드 Excel 표준 양식
├── README.md                        # 현재 문서: 모든 경로/배포/주의사항 요약
├── AGENTS.md                        # OpenCode에 자동 전달할 프로젝트 작업 지침 ★
├── 초보자_업로드_설명서.html           # 비개발자용 단계별 업로드 안내
├── .nojekyll                        # GitHub Pages Jekyll 처리 생략용 마커
├── md/                              # OpenCode용 프로젝트 상세 설계·제약·검증 문서 ★
│   ├── 00_START_HERE.md             # AI 개발 시작 지점, 읽을 순서, 금지사항
│   ├── 01_PROJECT_PURPOSE.md        # 구축 취지, 4대 목적, 사용자, 업무 범위
│   ├── 02_MENU_AND_NAVIGATION.md    # 6개 그룹·16개 메뉴, 화면 간 일관성
│   ├── 03_UI_DESIGN_SYSTEM.md       # 승인 디자인, 1화면 반응형, 차트·RAW 최대화
│   ├── 04_RAW_DATA_DICTIONARY.md    # 46개 RAW 항목/타입/단위/행 식별 기준
│   ├── 05_FUNCTIONAL_SCOPE.md       # 구현됨 vs 시연용 vs 앞으로 개발할 기능
│   ├── 06_TECH_ARCHITECTURE.md      # GitHub Pages/Repository/API/데이터/보안
│   ├── 07_QA_ACCEPTANCE.md          # 브라우저·고정 행·가로/세로 스크롤 검사
│   ├── 08_ROADMAP_AND_GUARDRAILS.md # 개발 순서, 수정 시 반드시 지킬 조건
│   ├── 09_OPENCODE_HANDOFF.md       # OpenCode에 복사해 사용하는 시작 프롬프트
│   ├── 10_FUTURE_WIKI_EDUCATION.md # 장기 전문가/교육·역량 기획(현재 미구현)
│   ├── 11_RELEASE_DECISIONS.md     # 합의된 변경 결정·재발 방지 이력
│   ├── 12_QA_RESULT_v4_3.md       # v4.3 브라우저 확인 결과 및 미검증 항목
│   └── reference/
│       └── approved-sidebar.png     # 승인된 메뉴 시안 중 왼쪽 영역 발췌
├── data/                            # ⚠ 기존 GitHub 저장소에 보존해야 할 폴더
│   ├── equipment.json               # ⚠ 기존 설비 현황 데이터(이번 ZIP에 미포함)
│   └── line-info-state.json         # ⚠ 기존 공유 Raw 스냅샷/이력(이번 ZIP에 미포함)
├── .github/                          # ⚠ 기존 CI/Pages Actions 작업(있으면 유지)
└── .git/                             # ⚠ Git 저장소 메타데이터(로컬 클론에만 존재)
```

### 역할과 수정할 때 주의할 점

| 파일/경로 | 수정 이유 | 건드리면 안 되는 조건 |
|---|---|---|
| `index.html` | 홈 대시보드 HTML 구조 | 16개 메뉴와 `nav.js` 로딩 유지 |
| `app.js` | 홈 화면 샘플 KPI, 그래프, 라우팅 | `nav.js`를 호출하여 동일 메뉴 표시. 기존 기능 삭제 금지 |
| `style.css` | 홈 화면 크기/스타일 | 과도한 글자 축소 및 화면 넘침 방지 |
| `line-info.html` | 01 상세 화면+주요 기능 | 46개 RAW 필드·엑셀/이력·수치/단위·최대화 유지 |
| `nav.js` | **공통 메뉴 정의의 유일한 출처** | 6개 그룹, 16개 이름·번호·목적지 유지 |
| `nav.css` | **공통 좌측 메뉴 스타일의 유일한 출처** | 승인된 시안 유지. 홈과 01에서 다르게 보이면 오류 |
| `equipment.html` | 기존 설비 현황 페이지 | 이번 배포 ZIP에서 제외. 기존 운영본 보존 |
| `EDS_RAW_Template_v1_1.xlsx` | 직원 배포 표준 양식 | 열 이름/순서 임의 변경 금지 |
| `data/equipment.json` | 운영 설비 자료 | 이번 ZIP에 없음. 삭제·가짜 데이터로 교체 금지 |
| `data/line-info-state.json` | 공유 버전·Raw 정보 | 이번 ZIP에 없음. 삭제·과거 버전 손실 금지 |
| `md/` · `AGENTS.md` | OpenCode에 프로젝트 조건 전달 | 완료/미구현 상태를 혼동하지 않기 |

> `data/`는 *실제 GitHub 화면에 보이는 저장소 경로*이며 이번 배포 ZIP에는 넣지 않았습니다. 사용자가 업로드할 때 기존 값을 유지해야 합니다. 위 목록의 `.git`은 GitHub 웹페이지에서 보이지 않는 로컬 Git 폴더입니다.

## 4. GitHub 웹 업로드(프로그램 설치 불필요)

1. 현재 저장소에서 **Code → Download ZIP**으로 안전 백업.
2. 새 `EDS_LinePlanning_2026-11-17_v4.3.zip` 파일을 Windows에서 **모두 압축 풀기**.
3. GitHub 저장소에서 **Add file → Upload files**. 압축 해제한 **최상위 폴더의 내용**을 업로드합니다. ZIP 파일 자체를 올리는 것이 아닙니다.
4. `nav.js`, `nav.css`, `AGENTS.md`, `README.md`, HTML/CSS/JS를 확인하고 `md/` 문서 경로도 그대로 들어갔는지 확인합니다. 폴더 업로드가 지원되지 않는 브라우저라면 폴더 경로에 맞게 파일을 올리세요.
5. **기존 `data/`와 `.github/` 삭제나 뜻하지 않은 변경이 없는지** 확인한 다음 **Commit changes**.
6. GitHub Pages 배포 완료 후 `/` 홈과 `/line-info.html`을 각각 열고 **Ctrl+F5**. 좌측 메뉴·RAW 헤더·최대화 동작 검사.

회사 GitHub Enterprise에서는 저장소/Pages 접근 권한·업로드 메뉴가 다를 수 있습니다. 원본 운영 데이터의 삭제 또는 공개 저장소 업로드를 금지합니다. 자세한 안내는 [초보자_업로드_설명서.html](초보자_업로드_설명서.html).

## 5. 데이터·보안: 반드시 알고 운영하기

- 현재 데이터는 **시연용 가상 데이터**입니다. 운영 DB 인증/승인 구현이 완성되지 않았습니다.
- `data/line-info-state.json`이 접근 가능하면 최신 공유 JSON을 **읽으려 시도**합니다. 파일이 없으면 기본 시연 데이터 또는 브라우저 localStorage를 표시합니다.
- 업로드·버전 기능은 **로컬 브라우저에서 동작**할 수 있습니다. 모두가 같은 값을 보려면 승인된 GitHub 쓰기 연동이 필요합니다.
- UI의 시연 비밀번호 `edseds`는 보안 장치가 아닙니다. 실데이터 접근·쓰기 권한에 사용하지 마세요.
- 브라우저 JavaScript에 GitHub PAT/회사 계정 비밀번호를 하드코딩하거나 Git 저장소에 저장하면 안 됩니다.
- 회사 GitHub Enterprise의 SSO, 접근 제어, 브랜치 규칙, 보호된 Pages는 보안 담당자 승인 후 **최종 단계**에 도입합니다.

## 6. OpenCode에 인수인계하기

`AGENTS.md`와 `md/` 폴더 전체를 **코드와 함께 제공**합니다. OpenCode에 다음과 같이 말하면 됩니다.

> 저장소 루트의 `AGENTS.md`를 먼저 읽고 `md/00_START_HERE.md`부터 모든 요구사항 문서를 읽어줘. 현재 HTML/CSS/JS/46개 RAW 열을 분석하고, 기존 기능은 삭제하지 말고 요청한 변경만 설계해줘. 수정 전 테스트 항목과 변경 예정 파일을 먼저 알려줘.

전체 요구사항과 요청 프롬프트는 [md/09_OPENCODE_HANDOFF.md](md/09_OPENCODE_HANDOFF.md)에 있습니다.

## 7. v4.3 실제 테스트 기록

[md/12_QA_RESULT_v4_3.md](md/12_QA_RESULT_v4_3.md)에서 해상도별 브라우저 검사, Raw 고정행/최대화, Excel 검증, 미검증 항목을 확인할 수 있습니다.
