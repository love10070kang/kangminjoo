# 09. OpenCode에 프로젝트를 인수인계할 때 사용할 프롬프트

## 그대로 복사해서 사용

> 나는 반도체 EDS 라인기획 실무자이며 코딩 초보자입니다. 현재 GitHub Pages에서 운영 중인 EDS LINE PLANNING 플랫폼의 실제 코드를 보냅니다. 새로 만들지 말고 **기존 소스를 분석하여 승인받은 화면과 기능을 보존하면서 수정**해주세요.
>
> 먼저 저장소 루트 `AGENTS.md` 및 `md/00_START_HERE.md`부터 `md/09_OPENCODE_HANDOFF.md`까지 모든 `.md` 파일을 읽고 프로젝트 취지, 실무 배경, 6개 그룹 16개 메뉴, 반응형 KPI/차트/RAW, 46개 입력항목, 버전이력, 기존 데이터 보존 기준을 요약해주세요.
>
> 공통 메뉴는 반드시 `nav.js` + `nav.css` 한 곳만 수정하도록 하고 홈(`index.html`)과 01(`line-info.html`)에 동일하게 적용해주세요. 승인 메뉴 시안은 `md/reference/approved-sidebar.png`입니다. 현재 코드에 있는 모든 16개 메뉴가 링크로 연결되어야 합니다.
>
> 01 라인 기본정보의 KPI 5개, 그래프 3개, 46열 Raw Data, Excel 양식/최신 RAW 다운로드, 수정본 업로드 검증, 변경이력, 화면 한 페이지 맞춤을 유지하세요. **최소화 버튼을 만들지 마세요.** 최대화하면 그래프 숫자/축이 실제 공간에 맞게 커지고 Raw는 뷰포트 가로세로를 사용해야 합니다. 원래대로 복원할 수 있어야 합니다.
>
> RAW의 `라인 ID·라인명·층` 3열이 고정되고 2줄 헤더가 고정되도록 해주세요. 가로/세로 동시 스크롤과 최대화 시 **본문 행이 헤더 위에 겹치는 현상은 버그**입니다.
>
> 현재 데이터는 시연용이며, 기존 저장소의 `data/equipment.json`/`data/line-info-state.json`, `equipment.html`, `.github` 등은 **삭제하거나 덮어쓰면 안 됩니다.** 실제 회사 정보나 GitHub 토큰은 코드에 넣지 마세요. SSO/직원별 권한/AI 등 미구현 항목을 완료했다고 말하지 마세요.
>
> 디자인은 1437×770, 1600×900, 1920×1080에서 UI가 찌그러지지 않게 해주세요. 숫자·단위·축·레이블을 읽을 수 있게 유지하세요. 기존 레이아웃에서 요청하지 않은 영역을 추가하거나 디자인을 전면 교체하지 마세요.
>
> 작업 전에 수정 파일 목록·위험 요소·검증 계획을 한국어로 알려주세요. 실제 브라우저 테스트를 수행한 후 변경점/테스트 결과와 전체 ZIP(`EDS_LinePlanning_YYYY-MM-DD_vX.Y.zip`)을 만들어주세요. 저는 GitHub 홈페이지의 `Add file → Upload files`로 교체하는 방법을 선호합니다.

## 주요 참고 경로

- 전체 파일 구조: `README.md`
- 제품 목적: `md/01_PROJECT_PURPOSE.md`
- 메뉴 정의: `md/02_MENU_AND_NAVIGATION.md`
- 화면 규칙: `md/03_UI_DESIGN_SYSTEM.md`
- RAW 46열: `md/04_RAW_DATA_DICTIONARY.md`
- 현재 구현/미구현 구분: `md/05_FUNCTIONAL_SCOPE.md`
- 데이터·GitHub/보안: `md/06_TECH_ARCHITECTURE.md`
- 완료 검증: `md/07_QA_ACCEPTANCE.md`
- 단계: `md/08_ROADMAP_AND_GUARDRAILS.md`

## 알아야 할 메모

- ChatGPT와 OpenCode가 비슷한 결과를 내기 위해서는 **이 문서와 함께 HTML/CSS/JS/이미지/엑셀 원본을 모두 제공**해야 함. 문서만 주면 현재 구현 기능의 세부 동작을 복제할 수 없습니다.
- 승인받은 화면 이미지의 픽셀 단위 100% 동일성을 약속하지 말 것. 실제 웹에서는 viewport/배율에 맞게 적응형 구현.
