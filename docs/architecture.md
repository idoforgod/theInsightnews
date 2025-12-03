
# System Architecture

## 1. Architectural Pattern
This application follows a **Component-Based Architecture** using React, focusing on **Client-Side Rendering (CSR)**.

### A. Centralized Controller Pattern
*   **Controller**: `App.tsx` acts as the central controller and "Source of Truth" (SOT).
*   **Responsibility**:
    *   Manages Global State (`currentArticle`, `viewMode`, `userSettings`).
    *   Orchestrates Data Fetching (`geminiService`, `storageService`).
    *   Handles Routing (Virtual View Switching between `feed` and `article`).

### B. Data Flow (Unidirectional)
1.  **Top-Down (Props)**: Data flows from `App.tsx` down to presentation components (`NewsFeed`, `SidebarHeadlines`, `ArticleView`).
2.  **Bottom-Up (Callbacks)**: Events (`onArticleClick`, `onGenerate`, `onEdit`) bubble up from children to `App.tsx` to trigger state updates.

## 2. State Management Strategy
The app uses **Lifting State Up** rather than external state libraries (Redux/Zustand), given the scope.

### Core State Slices (`App.tsx`)
| State | Type | Description |
| :--- | :--- | :--- |
| `view` | `'feed' | 'article'` | Controls the main viewport visibility. |
| `currentArticle` | `ArticleData | null` | The active article being viewed. |
| `storedArticles` | `ArticleData[]` | The full list of articles loaded from LocalStorage. |
| `genState` | `Object` | Tracks AI generation status (`idle`, `searching`, `writing`, `complete`). |
| `editingArticle` | `ArticleData | null` | Tracks which article is currently being edited in the Admin Modal. |

## 3. Service Layer Architecture
Services are stateless modules that handle external side effects.

*   **`geminiService.ts`**:
    *   **Role**: AI Gateway.
    *   **Pattern**: Factory functions returning typed Promises. Includes parsing logic to convert raw AI text into structured `ArticleData`.
*   **`storageService.ts`**:
    *   **Role**: Persistence Layer (Repository Pattern).
    *   **Mechanism**: Abstraction over `localStorage`. Handles Serialization/Deserialization and Seed Data initialization.

## 4. Component Hierarchy
```mermaid
graph TD
    App[App.tsx (Controller)] --> Header[Header & Nav]
    App --> Search[Search Input & Trigger]
    App --> MainGrid[Main Content Grid]
    App --> Modal[AdminPanel Modal]
    
    MainGrid --> LeftCol[Left Column (75%)]
    MainGrid --> RightCol[Right Column (25%)]
    
    LeftCol --> ViewSwitch{View State}
    ViewSwitch -->|feed| NewsFeed[NewsFeed Component]
    ViewSwitch -->|article| ArticleView[ArticleView Component]
    
    RightCol --> Sidebar[SidebarHeadlines (Crisis Tracking)]
```

## 5. Security & Constraints
*   **API Key**: Currently exposed client-side (Prototype/Demo phase). *Production requires a Proxy Server.*
*   **Persistence**: LocalStorage is limited (~5MB). Old articles are not currently purged (Optimization point).

## 6. Transformation Layer (Logic Isolation Strategy)
**Critical Architectural Rule**: To prevent "Spaghetti Code," parsing and heavy data manipulation must be isolated.

1.  **Parsing Isolation**:
    *   Raw AI text (e.g., `[[INSIGHT...]]`) should ideally be parsed into structured JSON *before* reaching the View Layer.
    *   Current Implementation Note: `ArticleView` currently performs late-binding parsing. **Refactoring Goal**: Move regex parsing to a pure utility function (`utils/parser.ts`) or inside `geminiService` to deliver a fully structured object to the view.
2.  **Grouping/Sorting Isolation**:
    *   Heavy array operations (`filter`, `sort`, `group`) seen in `NewsFeed` and `SidebarHeadlines` should be memoized (`useMemo`) or extracted to selectors.
    *   **Rule**: UI Components should receive data that is "Ready to Render" as much as possible.
