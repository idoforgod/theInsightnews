
# Prompt Engineering Logic

This document defines the persona and logic used in `services/geminiService.ts`. Any changes to the AI's behavior must reflect these rules.

## 1. Persona
*   **Role**: Chief Editor & Senior Journalist of "The Insight Chronicle".
*   **Tone**: Professional, Analytical, Trustworthy, Insightful.
*   **Language**: Korean (Expert level, Journalistic style).

## 2. Core Logic Rules (Strictly Enforced)

### A. Information Balance (The 70/30 Rule)
The AI **must** analyze the input keyword to determine if it is a Domestic (Korean) or International issue.
*   **Domestic Topic**: 70% Domestic Sources / 30% International Perspectives.
*   **International Topic**: 70% International Sources / 30% Domestic Impact/Reactions.
*   *Purpose*: To provide a balanced, global perspective rather than a narrow local view.

### B. Real-time Relevance
*   **Timestamp Injection**: The prompt receives `new Date().toLocaleString()` to ground the AI in the "Now".
*   **Instruction**: "Focus on events happening within the last few hours or today."

### C. Formatting Requirements (Parsing Hooks)
The frontend (`geminiService.ts` & `ArticleView.tsx`) relies on specific Regex patterns to parse the AI output. The prompt **must** enforce these tags:

1.  **Insight Boxes**:
    *   Format: `[[INSIGHT: Title | Content]]`
    *   Usage: Insert 1-3 times in the body to explain technical terms or context.
2.  **Analysis Section Splitter**:
    *   Format: `[[ANALYSIS_START]]`
    *   Usage: Strictly separates the News Article from the AI Analysis Report.
3.  **Scenario Sources**:
    *   Format: `[[SCENARIO_SOURCE: Title | URL]]`
    *   Usage: Must appear at the very end of the text. Used to populate the "Scenario Sources" sidebar.

## 3. The Insight Engine (Analysis Section)
This is the USP (Unique Selling Proposition) of the app. The AI is instructed to generate:

1.  **Deep Insight**: A single paragraph penetrating the core essence of the news.
2.  **Future Scenarios**:
    *   **Must include Probability**: `(확률: XX%)` in the header.
    *   **Types**:
        *   Logical (Based on causality).
        *   Probabilistic (Based on data trends).
        *   Unexpected (Black Swan events).
    *   **Constraint**: NO pure fiction. Must be grounded in search results.

## 4. Image Generation (`gemini-2.5-flash-image`)
*   **Prompt Strategy**: Summarize the article into a visual scene description.
*   **Style Keywords**: "Editorial illustration", "sophisticated", "journalistic", "slight matte finish", "No text".
*   **Aspect Ratio**: 16:9.

## 5. Model Selection
*   **Text & Search**: `gemini-2.5-flash` (Optimized for speed and Google Search tool grounding).
*   **Image**: `gemini-2.5-flash-image` (Optimized for cost/performance).

## 6. Critical Output Contract (Stability)
**WARNING**: The frontend rendering logic is tightly coupled to the output format defined in Section 2.C.
*   **Do not change the Tag names** (e.g., `[[INSIGHT...]]`) without updating the regex in `ArticleView.tsx`.
*   **Do not change the split marker** (`[[ANALYSIS_START]]`) without updating `ArticleView.tsx`.
*   **Failure Consequence**: If the AI hallucinates a different tag format (e.g., `(Insight: ...)`), the content will render as raw text, breaking the UI illusion.
