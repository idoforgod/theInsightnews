export interface Source {
  title: string;
  uri: string;
}

export interface ArticleData {
  id?: string;
  headline: string;
  subheadline: string;
  content: string; // Markdown or plain text
  sources: Source[];
  scenarioSources?: Source[]; // Specific sources for the AI analysis/scenarios
  imageUrl: string;
  date: string;
  topic: string;
  timestamp?: number; // For sorting
  isGenerated?: boolean; // To distinguish between manual and AI
}

export interface GenerationState {
  isLoading: boolean;
  error: string | null;
  step: 'idle' | 'searching' | 'writing' | 'complete';
}