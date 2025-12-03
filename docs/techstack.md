
# Technology Stack

## Frontend Framework
*   **React 19**: `react@^19.2.0`, `react-dom@^19.2.0`.
*   **API**: Uses `createRoot` for rendering.

## Language
*   **TypeScript**: Statically typed (`.tsx`, `.ts`).
    *   Interfaces: Defined in `types.ts` (e.g., `ArticleData`, `Source`).

## Styling
*   **Tailwind CSS**: Utility-first CSS framework.
    *   **CDN Load**: `https://cdn.tailwindcss.com`.
    *   **Plugins**: None currently used, standard utility classes.
    *   **Configuration**: Extended theme in `index.html` (colors: `paper`, `ink`, fonts: `serif`, `sans`).

## Icons
*   **Lucide React**: `lucide-react@^0.554.0`.
    *   Standard icon set for consistency and clean SVG rendering.

## AI Integration
*   **Google GenAI SDK**: `@google/genai@^1.30.0`.
    *   **Text Model**: `gemini-2.5-flash` (Fast, Tool-enabled).
    *   **Image Model**: `gemini-2.5-flash-image` (Generative Media).
    *   **Prompt/Parsing Logic**:
        *   Frontend strictly relies on Regex parsing for `[[INSIGHT:...]]` and `[[SCENARIO_SOURCE:...]]`.
        *   Model output must be strictly formatted to avoid rendering errors.

## Persistence
*   **LocalStorage**: Browser-native Key-Value storage.
    *   Key: `ai_news_chronicle_articles`.
    *   Data: JSON serialized array.

## Build/Environment
*   **Importmap**: Browser native ES module resolution.
    *   Dependencies loaded via `https://aistudiocdn.com` or similar CDNs.
*   **No Bundler**: Designed to run without Webpack/Vite in the current prototype context, but "Vibe Ready" for migration (see `setup.md`).

## Core Logic Assets (Parser Strategy)
The application relies on specific **Regex Patterns** acting as a contract between the AI output and the Frontend Renderer. These are part of the core technology stack.

| Pattern Name | Regex | Usage Component |
| :--- | :--- | :--- |
| **Insight Box** | `/^\[\[INSIGHT:\s*(.*?)\s*\|\s*(.*?)\]\]$/` | `ArticleView.tsx` |
| **Analysis Split** | `[[ANALYSIS_START]]` (String Split) | `ArticleView.tsx` |
| **Scenario Source** | `/\[\[SCENARIO_SOURCE:\s*(.*?)\s*\|\s*(.*?)\]\]/g` | `geminiService.ts` |
| **Probability** | `/\(확률:\s*(\d+%)\)/` | `ArticleView.tsx` |

**Rule**: These patterns are **immutable constants**. Changing them requires a synchronized update in both `prompt_engineering.md` (AI Instructions) and the parsing code.
