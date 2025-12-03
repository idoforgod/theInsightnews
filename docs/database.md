
# Database & Data Structure

## Storage Mechanism
*   **Type**: Browser LocalStorage
*   **Key**: `ai_news_chronicle_articles`
*   **Format**: JSON Array

## Schema: ArticleData

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` (UUID) | 기사 고유 식별자 |
| `headline` | `string` | 기사 제목 |
| `subheadline` | `string` | **위기 태그/이슈 주제**. `#태그` 형식으로 저장 (예: `#글로벌경제전망`) |
| `content` | `string` | 기사 본문. Markdown 형식 및 특수 태그 포함 |
| `topic` | `string` | 기사 섹션 (경제, 금융, 투자, 기술 등) |
| `imageUrl` | `string` | 기사 대표 이미지 URL (Base64 or HTTPS URL) |
| `date` | `string` | 표시용 날짜 문자열 (예: "2025년 3월 10일 월요일") |
| `timestamp` | `number` | 정렬용 Unix Timestamp (ms) |
| `sources` | `Source[]` | 일반 뉴스 출처 배열 |
| `scenarioSources` | `Source[]` | AI 분석/시나리오 근거 출처 배열 |
| `isGenerated` | `boolean` | AI 생성 여부 (True) / 수동 입력 (False) |

## Sub-Schema: Source
```typescript
interface Source {
  title: string;
  uri: string;
}
```

## Seed Data Strategy (Fallback)
*   **Location**: `services/storageService.ts`
*   **Logic**: If `localStorage` is empty on load, the app automatically initializes with **24 sample articles** (6 per section).
*   **Unified Tags**:
    *   Economic: `#글로벌경제전망`
    *   Finance: `#금융시장변화`
    *   Invest: `#2025투자전략`
    *   Tech: `#AI와미래기술`

## Special Content Tags (In `content` field)
데이터베이스의 `content` 필드는 단순 텍스트가 아닌, 렌더링 시 파싱되는 특수 태그를 포함합니다.

1.  **Insight Box**: `[[INSIGHT: 제목 | 내용]]`
2.  **Analysis Splitter**: `[[ANALYSIS_START]]`
3.  **Scenario Headers**: `### 1. 논리적 미래 (Logical) (확률: XX%)`
