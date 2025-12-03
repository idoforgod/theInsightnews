
# Project Setup & Migration Guide

This project currently runs in a browser-native ES Module environment (using CDN imports via `importmap`). To develop this in an external IDE (VS Code, Cursor, Windsurf) effectively, you have two options.

---

## Option 1: Quick Start (Vite Migration) - **RECOMMENDED**
To use modern tooling, hot reloading, and secure environment variable handling, migrate to Vite.

### 1. Initialize Vite Project
```bash
npm create vite@latest insight-chronicle -- --template react-ts
cd insight-chronicle
npm install
```

### 2. Install Dependencies
Install the specific libraries used in this project:
```bash
npm install lucide-react @google/genai tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Move Files
1.  Copy the `src` folder content (conceptually the root folder in the current structure) to the Vite `src` folder.
2.  Update `index.html` in the Vite project to include the Google Fonts links from the original `index.html`.
3.  Configure `tailwind.config.js` with the custom colors/fonts from the original `index.html`.

### 4. API Key Configuration
Create a `.env` file in the root:
```env
VITE_API_KEY=your_google_gemini_api_key_here
```
*Update Code*: In `services/geminiService.ts`, change `process.env.API_KEY` to `import.meta.env.VITE_API_KEY`.

### 5. Run
```bash
npm run dev
```

---

## Option 2: Static Server (As-Is)
If you want to run the code exactly as provided without a build step.

### 1. Prerequisites
*   VS Code
*   "Live Server" Extension for VS Code

### 2. Setup
1.  Create a folder `insight-chronicle`.
2.  Place all files (`index.html`, `index.tsx`, `App.tsx`, `constants.ts`, etc.) inside, preserving the directory structure.
3.  **Critical Fix**: The current code uses `process.env.API_KEY`. Browsers do not have `process`.
    *   You must manually replace `process.env.API_KEY` in `services/geminiService.ts` with your actual API key string: `apiKey: "AIzaSy..."`.
    *   *Warning*: Do not commit your API key to GitHub.

### 3. Run
1.  Open `index.html` in VS Code.
2.  Right-click -> "Open with Live Server".

---

## Directory Structure Verification
Ensure your local folder looks like this:

```
/
├── index.html
├── index.tsx
├── App.tsx
├── constants.ts
├── types.ts
├── metadata.json
├── services/
│   ├── geminiService.ts
│   └── storageService.ts
├── components/
│   ├── AdminPanel.tsx
│   ├── ArticleView.tsx
│   ├── NewsFeed.tsx
│   └── SidebarHeadlines.tsx
└── docs/
    └── ... (md files)
```
