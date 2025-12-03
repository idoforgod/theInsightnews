
# User Flows

## 1. AI 기사 생성 (Generate Flow)
1.  **Start**: 사용자가 메인 페이지에 접속.
2.  **Input**: 검색창에 키워드 입력 (예: "미국 금리 인하").
3.  **Action**: 엔터 키 또는 돋보기 버튼 클릭.
4.  **Feedback**: "AI 심층 취재 시작" 버튼 애니메이션 -> 로딩 화면 (자료 수집 중 -> 기사 작성 중).
5.  **Result**: 기사 상세 뷰(`ArticleView`)로 자동 전환.
6.  **Read**:
    *   본문 읽기 (인사이트 박스 확인).
    *   하단 'The Insight Engine' 분석 리포트 확인.
    *   우측 사이드바에서 출처 확인.

## 2. 뉴스 소비 (Feed Consumption Flow)
1.  **View**: 메인 페이지 뉴스 피드 탐색.
2.  **Filter**: 상단 네비게이션(경제, 금융, 투자, 기술) 클릭하여 섹션 필터링.
3.  **Sidebar**: 우측 '위기 추적-Timeline'에서 관심 이슈(#태그) 클릭하여 타임라인 확장.
4.  **Read**: 기사 클릭 시 상세 뷰로 이동.
5.  **Return**: '기사 닫기' 버튼 클릭 시 피드로 복귀.

## 3. 관리자/에디터 (Admin Flow)
1.  **Access**: 헤더의 `Editor Mode` 또는 기사 카드의 `수정(연필)` 아이콘 클릭.
2.  **Modal**: 관리자 패널 모달 오픈.
3.  **Edit/Write**:
    *   헤드라인, 본문 입력.
    *   **Image**: "AI 생성" 버튼 클릭 -> Gemini Nano Banana가 본문 분석 후 이미지 자동 삽입 (Loading Spinner 표시).
    *   **Tag**: 위기 태그(단일) 입력.
4.  **Save**: '발행하기/수정 완료' 클릭.
5.  **Update**: 로컬 스토리지 업데이트 및 화면 새로고침(Refresh).
