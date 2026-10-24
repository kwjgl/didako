# Graph Report - didako  (2026-10-24)

## Corpus Check
- Corpus is ~21,606 words - fits in a single context window. You may not need a graph.

## Summary
- 168 nodes · 275 edges · 11 communities (9 shown, 2 thin omitted)
- Extraction: 86% EXTRACTED · 14% INFERRED · 0% AMBIGUOUS · INFERRED: 38 edges (avg confidence: 0.86)
- Token cost: 287,626 input · 0 output

## Community Hubs (Navigation)
- 데모 교재 데이터
- 앱 동작·설정 제어
- 기록 저장·자동저장
- 나눔 진행 단계
- 앱 문서·구성
- 읽기 화면·책갈피
- 앱 아이콘·브랜드
- 책장·표지 디자인
- 화면 내려놓기(어둡게)
- 설치형 앱(PWA) 설정
- 준비 중 화면

## God Nodes (most connected - your core abstractions)
1. `acts Action Dispatcher` - 26 edges
2. `route (Hash Router)` - 17 edges
3. `renderStep` - 14 edges
4. `renderAll` - 10 edges
5. `window.DIDAKO_DEMO` - 10 edges
6. `thisLesson / lessonOf` - 9 edges
7. `books[] {id,title,period,closed,kind,slot,pattern,range,h,lessons}` - 9 edges
8. `putKeep (Today's Keep Store)` - 8 edges
9. `recRows` - 8 edges
10. `Read screen (#read, 펼치기)` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Redirect to ./app/ preserving query and hash (e.g. ?join=)` --conceptually_related_to--> `Hash-based screen routing (#start, #week, #read, #share, #shelf, #record, #book-, #rec-)`  [INFERRED]
  index.html → app/README.md
- `openLines (말씀을 열며 prayer lines)` --conceptually_related_to--> `Read screen (#read, 펼치기)`  [INFERRED]
  app/demo-data.js → app/README.md
- `church {dept, room}` --conceptually_related_to--> `App shell (top bar, 5-tab bottom nav, settings, toasts, bottom sheet)`  [INFERRED]
  app/demo-data.js → app/README.md
- `question {id, t, sub, vs, sample, lead}` --conceptually_related_to--> `Leader / pastor role view (commentary + facilitation memo)`  [INFERRED]
  app/demo-data.js → app/README.md
- `lesson {no,name,ref,date,state(past/now/prep/upcoming),intro,body,keep,mine}` --conceptually_related_to--> `Shelf screen (#shelf, 책장)`  [EXTRACTED]
  app/demo-data.js → app/README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Hash routing renders screen views** — app_index_route, app_index_parsehash, app_index_weekview, app_index_readview, app_index_shareview, app_index_shelfview, app_index_recordview, app_index_startview [EXTRACTED 1.00]
- **Today's Keep shared across read, share, week, shelf and records** — app_index_putkeep, app_index_savekeepread, app_index_savekeepshare, app_index_keepcard, app_index_liveentry, app_index_lenof [INFERRED 0.85]
- **Sharing session step flow** — app_index_startshare, app_index_buildsteps, app_index_renderstep, app_index_go, app_index_armdim, app_index_exitshare [EXTRACTED 1.00]
- **Weekly study flow: read -> share -> record (via guides and localStorage)** — app_readme_read_screen, app_readme_share_screen, app_readme_record_screen, app_demo_data_guides, app_readme_share_done_flag [EXTRACTED 1.00]
- **DIDAKO_DEMO shared data model (books, lessons, records, thisWeek)** — app_demo_data_didako_demo, app_demo_data_books, app_demo_data_lesson, app_demo_data_records, app_demo_data_this_week [EXTRACTED 1.00]
- **Patterns borrowed from 코이데 (pray-for): design styles and network-first caching** — app_readme_pray_for, app_readme_design_styles_css, app_readme_network_first_cache, app_sw [INFERRED 0.85]

## Communities (11 total, 2 thin omitted)

### Community 0 - "데모 교재 데이터"
Cohesion: 0.11
Nodes (29): Book: 새가족반 기초 (fam, slot now, braid), Book: 창세기 (genesis, slot alt, dot), Book: 요한복음 (john, GBS, slot now, vine), Book: 마가복음 (mark, closed, slot done, wheat), Book: 시편 묵상 (psalms, closed, slot done, olive), books[] {id,title,period,closed,kind,slot,pattern,range,h,lessons}, window.DIDAKO_DEMO, guides {'book:no': {stages, triple}} (only john:3) (+21 more)

### Community 1 - "앱 동작·설정 제어"
Cohesion: 0.11
Nodes (28): acts Action Dispatcher, answerSheet, applySettings, Global Click Delegation Handler, closeMenu, deleteSheet, D Demo Settings State, design-styles.css (+20 more)

### Community 2 - "기록 저장·자동저장"
Cohesion: 0.11
Nodes (27): detailHtml (Record Detail), flushAll, Global Input/Autosave Handler, listHtml, listRows, liveEntry, ls localStorage Wrapper, monthNav (+19 more)

### Community 3 - "나눔 진행 단계"
Cohesion: 0.13
Nodes (21): BLESS_LINES (2 Cor 13:13 Benediction), braidPaths (Three-strand Braid SVG), buildSteps, deepHtml (Deep Meditation), go (Step Navigation), hideOpening, leadHtml (Leader Commentary), paintCord (+13 more)

### Community 4 - "앱 문서·구성"
Cohesion: 0.10
Nodes (17): church {dept, room}, rooms {mine {name, leader, coLeader, members, pending}, others}, App shell (top bar, 5-tab bottom nav, settings, toasts, bottom sheet), Stage 1 demo-only mode (visible app), design-styles.css (basic/new/classic/glass from pray-for), docs/design.md appendix 'continue working', docs/setup.md (open/export instructions), localStorage keys (didako-display, didako-demo, didako-reflect, didako-keep, didako-read-*, didako-share-*, didako-leadopen, didako-record-*) (+9 more)

### Community 5 - "읽기 화면·책갈피"
Cohesion: 0.14
Nodes (19): bookPage, DIDAKO_DEMO (demo-data.js), keepCard, lastPageHtml, lastWeekCard, lessonCard, lessonLi, noGuideView (+11 more)

### Community 6 - "앱 아이콘·브랜드"
Cohesion: 0.50
Nodes (8): Apple Touch Icon (180, square teal), Favicon 32px (circular), Didako App Icon SVG (master), PWA Icon 192 (circular), PWA Icon 512 (circular), Three-layer bookmark brand motif (white/light/muted strips with ring top, on teal #2B6A62), PWA Maskable Icon 512 (square), Theme color teal #2B6A62

### Community 7 - "책장·표지 디자인"
Cohesion: 0.40
Nodes (6): browseHtml, coverHtml, lenOf / keptCount (Ribbon Length), PATTERNS Cover Patterns, spineHtml, SVG Icon Sprite & Cover Patterns

### Community 8 - "화면 내려놓기(어둡게)"
Cohesion: 0.40
Nodes (5): armDim (Screen Dimming), closeSheet, exitShare, releaseWake, Putting the Screen Down (Dimming) Concept

## Knowledge Gaps
- **28 isolated node(s):** `Pre-paint Display Settings Script`, `PWA Manifest (manifest.webmanifest)`, `design-styles.css`, `lastWeekCard`, `startView (Welcome Screen)` (+23 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 31 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `acts Action Dispatcher` connect `앱 동작·설정 제어` to `화면 내려놓기(어둡게)`, `기록 저장·자동저장`, `나눔 진행 단계`, `읽기 화면·책갈피`?**
  _High betweenness centrality (0.175) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `renderStep` (e.g. with `deepHtml (Deep Meditation)` and `saveAns`) actually correct?**
  _`renderStep` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Pre-paint Display Settings Script`, `PWA Manifest (manifest.webmanifest)`, `design-styles.css` to the rest of the system?**
  _28 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `데모 교재 데이터` be split into smaller, more focused modules?**
  _Cohesion score 0.1103448275862069 - nodes in this community are weakly interconnected._
- **Why does `route (Hash Router)` connect `앱 동작·설정 제어` to `기록 저장·자동저장`, `읽기 화면·책갈피`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Should `앱 동작·설정 제어` be split into smaller, more focused modules?**
  _Cohesion score 0.11375661375661375 - nodes in this community are weakly interconnected._
- **Why does `renderStep` connect `나눔 진행 단계` to `화면 내려놓기(어둡게)`, `앱 동작·설정 제어`, `기록 저장·자동저장`, `읽기 화면·책갈피`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._