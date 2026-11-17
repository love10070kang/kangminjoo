# EDS LINE PLANNING — Instructions for OpenCode and future coding agents

You are working on a **user-approved Korean semiconductor EDS line-planning platform**, not a blank template. Preserve the existing UI and all working behaviors unless the user explicitly orders removal.

**First read the following files, in order, before modifying anything:**

1. `md/00_START_HERE.md`
2. `md/01_PROJECT_PURPOSE.md`
3. `md/02_MENU_AND_NAVIGATION.md`
4. `md/03_UI_DESIGN_SYSTEM.md`
5. `md/04_RAW_DATA_DICTIONARY.md`
6. `md/05_FUNCTIONAL_SCOPE.md`
7. `md/06_TECH_ARCHITECTURE.md`
8. `md/07_QA_ACCEPTANCE.md`
9. `md/08_ROADMAP_AND_GUARDRAILS.md`
10. `md/09_OPENCODE_HANDOFF.md`
11. `md/10_FUTURE_WIKI_EDUCATION.md`
12. `md/11_RELEASE_DECISIONS.md`
13. `md/12_QA_RESULT_v4_3.md`

**Non-negotiable:**

- All 16 module links and 6 grouping sections come from `nav.js`, used by `index.html` AND `line-info.html`. Their shared visual contract is `nav.css` and `md/reference/approved-sidebar.png`.
- There are EXACTLY 46 ordered RAW input columns. The source of truth is the `FIELDS` array in `line-info.html`; a reference copy appears in `md/04_RAW_DATA_DICTIONARY.md`.
- RAW has a two-row sticky header and 3 frozen identifier columns; frozen body rows must never overlay title headers when scrolling both axes or maximizing.
- KPI 5 cards, 3 charts, RAW table, top filters, Excel export/upload validation, version history, graph/table maximize↔restore must remain functional. **Do NOT recreate a minimize button**.
- Keep readable numerical labels, axis labels, units, and clear legends on charts; do not sacrifice readability merely to fit a display.
- Home dashboard layout and 01 screen should be responsive at 1437x770, 1600x900, 1920x1080. Different page content is normal; the LEFT NAV MUST be visually and semantically identical.
- `data/` contains existing user-owned operational files and is not included in the release ZIP. Never delete, overwrite with dummy values, or commit real company data without approval.
- Never claim company SSO, secure passwords, protected Pages, GitHub API write access, or AI analysis are production-ready. Browser password checks are demonstrations, not authentication.
- Before coding, state concrete change scope. After coding, test normal/maximized table, vertical and horizontal scroll and both pages' nav at multiple viewports.
- The user is a nondeveloper. Deliver whole ready-to-upload ZIP (not piecemeal patches), plus plain Korean beginner instructions. File name `EDS_LinePlanning_YYYY-MM-DD_vX.Y.zip`.
- Avoid unrequested UI sections, hide/remove already rejected '작업 흐름' panels unless specifically requested; no unapproved redesign of working features.
