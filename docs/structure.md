
# File & Directory Structure

```
/
├── index.html              # Entry HTML (Tailwind CDN, Font Links, Importmap)
├── index.tsx               # React Entry Point
├── App.tsx                 # Main Application Layout & Router Logic
├── constants.ts            # Centralized Constants & Regex Patterns (SOT)
├── metadata.json           # App Metadata
├── types.ts                # TypeScript Interfaces (ArticleData, Source, etc.)
│
├── components/             # UI Components
│   ├── AdminPanel.tsx      # Modal for creating/editing articles
│   ├── ArticleView.tsx     # Detailed article reader with AI Analysis
│   ├── NewsFeed.tsx        # Sectioned news list (Lead + List layout)
│   ├── SearchBar.tsx       # (Deprecated/Placeholder)
│   └── SidebarHeadlines.tsx# Crisis Tracking Timeline Widget
│
├── services/               # Logic & API Services
│   ├── geminiService.ts    # Google GenAI Integration (Text & Image)
│   └── storageService.ts   # LocalStorage CRUD & Seed Data
│
└── docs/                   # Documentation (Current Folder)
    ├── architecture.md     # [NEW] System Architecture
    ├── project.md
    ├── prd.md
    ├── techstack.md
    ├── database.md
    ├── structure.md
    ├── ui.md
    ├── userflow.md
    ├── rules.md
    ├── prompt_engineering.md
    └── setup.md
```
