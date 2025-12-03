
# Coding Rules & Conventions

## 1. General Philosophy
*   **Functional Programming**: Use functional components and hooks. Avoid class components.
*   **Immutability**: Treat state as immutable. Use `...spread` operators for updates.
*   **Strict Typing**: No `any`. Define interfaces for all props and data structures in `types.ts`.
*   **Clean Code**: Keep components small. Extract logic into hooks or services if it grows too large.

## 2. Naming Conventions
*   **Components**: PascalCase (e.g., `ArticleView.tsx`, `NewsFeed.tsx`).
*   **Functions/Variables**: camelCase (e.g., `generateArticle`, `handleSearch`).
*   **Constants**: UPPER_SNAKE_CASE for true constants (e.g., `STORAGE_KEY`).
*   **Interfaces**: PascalCase (e.g., `ArticleData`, `Source`). Do not use `I` prefix (e.g., `IArticle` is forbidden).
*   **Files**: Match the primary export name.

## 3. React Best Practices
*   **Hooks**:
    *   Ensure dependency arrays in `useEffect` and `useCallback` are exhaustive.
*   **Rendering**:
    *   Use short-circuit evaluation `condition && <Component />` for conditional rendering.
    *   Always use `key` prop in lists (use unique IDs, fall back to index only if static).
*   **Props**:
    *   Destructure props in the function signature: `const Component = ({ prop1, prop2 }: Props) => ...`

## 4. Styling (Tailwind CSS)
*   **Utility-First**: Use Tailwind utility classes for all styling.
*   **Custom Config**: Use project constants:
    *   `bg-paper`, `text-ink`.
    *   `font-serif` (Playfair/Noto), `font-sans` (UI).
    *   `shadow-newspaper`.
*   **Responsiveness**: Mobile-First approach. Base classes for mobile, `md:`/`lg:` for overrides.

## 5. Security Guidelines (Critical)
*   **API Key Safety**:
    *   In this frontend-only demo, `process.env.API_KEY` is used.
    *   **Rule**: When moving to production, NEVER commit real API keys to Git. Use `.env` files and strictly exclude them via `.gitignore`.
    *   **Migration**: Eventually move Gemini calls to a backend proxy to hide the key.
*   **Content Sanitization**:
    *   The `ArticleView` manually parses text to render HTML elements. Avoid `dangerouslySetInnerHTML` unless strictly necessary and sanitized.

## 6. Error Handling Strategy
*   **Service Level**: All API calls (Gemini/Storage) must throw descriptive `Error` objects, not just strings.
*   **UI Level**:
    *   `App.tsx` must catch errors from generation and display a user-friendly "Issue Alert" box (Red border styling).
    *   **Fallback**: If AI fails, reset the view state to safe defaults (Home).

## 7. Accessibility (a11y)
*   **Semantic HTML**: Use `<article>`, `<aside>`, `<header>`, `<footer>`, `<nav>` tags appropriately.
*   **Images**: All `<img>` tags must have descriptive `alt` text. For AI images, use "AI Generated visualization for [Topic]".
*   **Interactive Elements**: Buttons must have `aria-label` if they contain only icons (e.g., the Edit Pencil button).

## 8. AI & API Handling
*   **Service Layer**: All API calls must go through `services/geminiService.ts`.
*   **Environment**: The code currently runs in a simulated browser environment. `process.env` is polyfilled or manually replaced in setup.

## 9. Component Purity & Logic Separation (Anti-Spaghetti Rule)
*   **No Heavy Logic in Render**: Avoid complex `filter`, `sort`, or `reduce` operations directly inside the component return or body.
    *   **Bad**: `const sorted = props.items.filter(...).sort(...); return ...` inside the render function on every cycle.
    *   **Good**: Use `useMemo(() => props.items.filter(...), [props.items])`.
*   **Regex Isolation**:
    *   Do not define complex Regex literals inside `ArticleView`. Move them to a `const` outside the component or a helper file.
    *   Parsing logic that transforms text to JSX arrays should be isolated in small helper functions (e.g., `renderTextWithInsights`).
