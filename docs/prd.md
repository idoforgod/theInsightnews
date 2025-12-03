# Product Requirements Document (PRD)

## 1. 기능 요구사항 (Functional Requirements)

### A. 기사 생성 (AI Generation)
*   **Trigger**: 메인 페이지 중앙 상단 검색창에 키워드 입력.
*   **Process**:
    1.  **Google Search**: 키워드 관련 최신(최근 수 시간 내) 정보 수집.
    2.  **Context Analysis**: 국내/해외 이슈 판단 후 정보 비중 조절 (국내 주제 70:30 / 해외 주제 30:70).
    3.  **Content Writing**: 전문 기자 톤으로 기사 작성.
    4.  **Deep Analysis**: 'The Insight Engine'을 구동하여 3가지 시나리오(논리적, 확률적, 뜻밖의 미래) 도출.
*   **Output**: 텍스트 기사, AI 생성 이미지(Exclusive 배지), 인사이트 박스, 시나리오 분석 리포트.

### B. 뉴스 피드 (News Feed)
*   **구성**: 경제, 금융, 투자, 기술 4개 섹션 + 일반(General).
*   **정렬**: 각 섹션별 최신순 정렬.
*   **노출 제한**: 섹션당 상위 4개 기사 노출.
*   **레이아웃**:
    *   **Lead Article (1위)**: 이미지 포함, 대형 헤드라인, 5줄 요약. (좌측 배치)
    *   **Sub Articles (2~4위)**: 이미지 없음, 텍스트 리스트 형태. (우측 배치)

### C. 위기 추적 타임라인 (Sidebar Widget)
*   **데이터 소스**: 기사 데이터의 `subheadline` (#태그)를 기준으로 그룹화.
*   **노출 로직**: 최신 업데이트 순 상위 3개 이슈 그룹 표시.
*   **상세 보기**: 그룹 클릭 시 펼쳐지며, 타임라인(점+선) 형태로 해당 태그의 기사 리스트(최대 10개) 표시.
*   **디자인**: 썸네일 없음, 배경 투명(Paper 질감 유지).

### D. 기사 상세 뷰 (Article View)
*   **구성**: 헤더(Vol, 날짜, 위치), 본문, AI 분석 섹션, 사이드바.
*   **특수 기능**:
    *   **Insight Box**: `[[INSIGHT:...]]` 태그 감지 시 별도 디자인 박스 렌더링.
    *   **The Insight Engine**: `[[ANALYSIS_START]]` 이후 내용을 다크 테마의 분석 리포트로 변환.
    *   **Scenario Sources**: 시나리오 근거 자료를 별도 사이드바 영역에 표기.

### E. 관리자 모드 (Admin Panel)
*   **진입**: 헤더의 `Editor Mode` 버튼 또는 기사의 수정(연필) 버튼.
*   **기능**:
    *   기사 작성 및 수정 (CRUD).
    *   **AI 이미지 생성**: Gemini Nano Banana 모델을 호출하여 본문 기반 삽화 생성.
    *   **위기 태그 관리**: 단일 태그 입력 (`#` 자동 처리).
    *   **섹션 관리**: 드롭다운 선택 또는 직접 입력.

## 2. 비기능 요구사항 (Non-Functional Requirements)
*   **성능**: 로컬 스토리지를 활용한 즉각적인 데이터 로딩.
*   **디자인**: Tailwind CSS를 활용한 반응형 웹 (Mobile, Tablet, Desktop).
*   **AI 모델**: Google Gemini 2.5 Flash (Text), Gemini 2.5 Flash Image (Image).
