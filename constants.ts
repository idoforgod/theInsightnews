
export const SECTIONS = [
  { id: 'ALL', label: '전체' },
  { id: '경제', label: '경제' },
  { id: '금융', label: '금융' },
  { id: '투자', label: '투자' },
  { id: '기술', label: '기술' },
];

// Derived list of topic strings (excluding 'ALL')
export const TOPICS = SECTIONS.filter(s => s.id !== 'ALL').map(s => s.id);

// Centralized Regex Patterns to ensure sync between Gemini Service and Article View
export const PARSER_PATTERNS = {
  // Catch [[INSIGHT: Title | Content]]
  INSIGHT: /^\[\[INSIGHT:\s*(.*?)\s*\|\s*(.*?)\]\]$/,
  
  // Split Focus Reading Section
  FOCUS_READING_SPLITTER: '[[FOCUS_READING_START]]',

  // Split content from analysis
  ANALYSIS_SPLITTER: '[[ANALYSIS_START]]',
  
  // Catch [[SCENARIO_SOURCE: Title | URL]] (Global flag for service stripping)
  SCENARIO_SOURCE_GLOBAL: /\[\[SCENARIO_SOURCE:\s*(.*?)\s*\|\s*(.*?)\]\]/g,
  
  // Catch (확률: 00%)
  PROBABILITY: /\(확률:\s*(\d+%)\)/,
};
