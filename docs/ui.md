
# UI Design System & Layout Specifications

## 1. Color Palette (Hex Codes)
*   **Background (Body)**: `#e5e5e5` (Light Grey)
*   **Paper (Container)**: `#f4f1ea` (Cream/Newsprint)
*   **Ink (Primary Text)**: `#1a1a1a` (Stone-900)
*   **Muted Text**: `#57534e` (Stone-600)
*   **Accent Red**: `#991b1b` (Red-800) - Links, Badges, Drop caps.
*   **Analysis Section**: `#0f172a` (Slate-900) - Dark theme.
    *   Logical Scenario: Sky-500
    *   Probabilistic Scenario: Teal-500
    *   Unexpected Scenario: Indigo-500

## 2. Typography
*   **Serif (Main)**: `Noto Serif KR`, `Playfair Display`
    *   Usage: Headlines, Body Text, Slogans, Date/Time.
*   **Sans-Serif (UI)**: `ui-sans-serif`
    *   Usage: Navigation, Buttons, Badges, Captions, Analysis Headers.

## 3. Layout Specifications (Pixel Perfect)

### A. Global Grid (`App.tsx`)
*   **Grid System**: 12 Columns (`grid-cols-12`)
*   **Gap**: `gap-10` (40px)
*   **Main Content**: `col-span-9` (75%)
*   **Sidebar**: `col-span-3` (25%)
*   **Padding**: Desktop `p-12` (48px)

### B. Header
*   **Top Info**: "서울, 대한민국 | [Time]" (Italic Serif). Location comes first.
*   **Title**: `text-8xl` (Mobile `5xl`), Font Black, Tracking Tighter.
*   **Slogan**:
    *   Text: "전문 미래학자(Professional Futurist) 최윤식 최현식. 지식과 미래 통찰의 융합"
    *   Offset: ` -translate-x-[9px]` (Left shift 9px) - **Critical styling**.
*   **Navigation**: Sticky top, `border-y-4` (4px thick borders).

### C. Search Bar
*   **Position**: Outside main grid, Centered (`max-w-2xl`).
*   **Shadow**: Hard Shadow `4px 4px 0px 0px rgba(28,25,23,1)`.
*   **Transition**: `focus:translate-x-[2px] focus:translate-y-[2px]` on active.

### D. News Feed Layout (`NewsFeed.tsx`)
*   **Section Grid**: 3 Columns (`grid-cols-3`).
*   **Lead Article (Left)**:
    *   Width: `col-span-2`.
    *   Image: `aspect-video`, Grayscale (Hover: Color).
    *   Text: H3 Headline, 5-line clamp summary.
*   **Sub Articles (Right)**:
    *   Width: `col-span-1`.
    *   Divider: Left Border (`border-l`).
    *   Style: No Image, List format, 3-line clamp summary.

### E. Sidebar Timeline (`SidebarHeadlines.tsx`)
*   **Style**: Transparent background (No border/shadow).
*   **Items**:
    *   Vertical Line: `left-[11px]`, width `2px`.
    *   Dot: `10px x 10px`, `left-[7px]`.
    *   Max Items: 10 articles per group.

## 4. Interaction States (Dynamic UX)
*   **Images**:
    *   Default: `grayscale` (Black & White).
    *   Hover: `grayscale-0` (Full Color) with `transition-all duration-500 ease-out`.
*   **Buttons (General)**:
    *   Hover: Text color change (to Red-800 or Stone-900).
    *   Edit Button: Hidden (`opacity-0`) by default, visible (`opacity-100`) on Card Hover.
*   **Navigation**:
    *   Active: `text-red-800 underline underline-offset-4 decoration-2`.
    *   Hover: `text-stone-900`.
*   **Loading State**:
    *   Spinner: `animate-spin` (Red/Stone border).
    *   Text: `animate-pulse`.

## 5. Visual Effects
*   **Newspaper Shadow**: `box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);`
*   **Animations**: `animate-in fade-in slide-in-from-bottom` used for smooth loading.
