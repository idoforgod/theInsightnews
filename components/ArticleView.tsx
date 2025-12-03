
import React from 'react';
import { ArticleData } from '../types';
import { ExternalLink, Lightbulb, BrainCircuit, TrendingUp, Activity, Sparkles, FileText, CheckCircle2, Target, Scale, Zap } from 'lucide-react';
import { PARSER_PATTERNS } from '../constants';

interface ArticleViewProps {
  article: ArticleData;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ article }) => {
  // 1. Split Body from the rest (Focus Reading + Analysis)
  const [mainBody, restContent] = article.content.split(PARSER_PATTERNS.FOCUS_READING_SPLITTER);
  
  // 2. Split Focus Reading from Analysis (if Focus Reading exists)
  // If no Focus Reading tag was found, 'restContent' might be undefined or contain just Analysis if format broke.
  // Fallback: Check if mainBody contains Analysis split if Focus split failed.
  let focusReadingSection = '';
  let analysisSection = '';

  if (restContent) {
    const parts = restContent.split(PARSER_PATTERNS.ANALYSIS_SPLITTER);
    focusReadingSection = parts[0];
    analysisSection = parts[1] || '';
  } else {
    // If Focus Reading tag missing, try to split Body by Analysis tag directly
    const fallbackParts = mainBody.split(PARSER_PATTERNS.ANALYSIS_SPLITTER);
    if (fallbackParts.length > 1) {
        // Warning: Direct mutation of mainBody var in logic, but here we just re-assign locals
        // mainBody needs to be sliced in render, but for now let's assume standard flow works.
        // Actually, let's just use the parts.
        // If mainBody has the splitter, it means the first split failed.
    }
    // Note: For simplicity and stability, we assume the AI follows the strict structure.
    // If it fails, Focus Reading might be merged or missing, which is a graceful degradation.
  }

  // Helper to process text content into paragraphs and Insight boxes
  const renderTextWithInsights = (text: string) => {
    const lines = text.split('\n').filter(p => p.trim() !== '');
    
    return lines.map((line, i) => {
      const trimmedLine = line.trim();
      
      // Check for INSIGHT format: [[INSIGHT: Title | Content]]
      const insightMatch = trimmedLine.match(PARSER_PATTERNS.INSIGHT);

      if (insightMatch) {
        const [, title, content] = insightMatch;
        return (
          <div key={i} className="my-8 p-6 bg-stone-200/60 border-y-2 border-stone-800 relative">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-stone-800 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-sans font-bold text-stone-900 text-sm uppercase tracking-widest mb-2">
                  {title}
                </h4>
                <p className="font-serif text-stone-700 text-base italic leading-relaxed">
                  {content}
                </p>
              </div>
            </div>
          </div>
        );
      }

      // Handle Markdown Headers within body
      if (trimmedLine.startsWith('### ')) {
        return <h3 key={i} className="text-xl font-bold font-sans text-stone-800 mt-6 mb-3 uppercase tracking-wide">{trimmedLine.replace('### ', '')}</h3>;
      }
      if (trimmedLine.startsWith('## ')) {
        return <h2 key={i} className="text-2xl font-bold font-serif text-stone-900 mt-8 mb-4 border-b border-stone-300 pb-2">{trimmedLine.replace('## ', '')}</h2>;
      }

      // Normal Paragraph
      return (
        <p key={i} className="mb-4 text-justify leading-relaxed text-stone-900 text-lg font-serif">
          {i === 0 && !line.startsWith('[[') && !line.startsWith('#') ? (
            // Drop cap for the first letter of the first paragraph (if not a special box)
            <span className="float-left text-6xl font-bold mr-3 mt-[-10px] leading-none font-serif text-red-900">
              {line.charAt(0)}
            </span>
          ) : null}
          {i === 0 && !line.startsWith('[[') && !line.startsWith('#') ? line.slice(1) : line}
        </p>
      );
    });
  };

  // Render Focus Reading Section
  const renderFocusReading = (text: string) => {
    if (!text) return null;
    const cleanText = text.trim();

    return (
      <div className="mt-12 mb-12 border-2 border-stone-800 bg-white shadow-[4px_4px_0px_0px_rgba(28,25,23,0.1)] font-sans">
         {/* Header */}
         <div className="bg-stone-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-400" />
                <h3 className="font-bold uppercase tracking-widest text-sm">Focus Reading Protocol</h3>
            </div>
            <span className="text-[10px] font-mono text-stone-400">4-STEP VERIFICATION</span>
         </div>

         <div className="p-6 md:p-8 space-y-8">
            {cleanText.split('\n').map((line, i) => {
                const trimmed = line.trim();
                
                // Headers
                if (trimmed.includes('Purpose Locking')) {
                    return (
                        <div key={i} className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center text-stone-900 font-bold shrink-0">1</div>
                            <div>
                                <h4 className="font-bold text-stone-900 uppercase tracking-wide mb-1 text-sm">Purpose Locking (목적 고정)</h4>
                            </div>
                        </div>
                    );
                }
                if (trimmed.includes('Structural Mapping')) {
                    return (
                        <div key={i} className="flex gap-4 pt-4 border-t border-stone-100">
                            <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center text-stone-900 font-bold shrink-0">2</div>
                            <div>
                                <h4 className="font-bold text-stone-900 uppercase tracking-wide mb-1 text-sm">Structural Mapping (구조 매핑)</h4>
                            </div>
                        </div>
                    );
                }
                if (trimmed.includes('Precision Extraction')) {
                    return (
                        <div key={i} className="flex gap-4 pt-4 border-t border-stone-100">
                            <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center text-stone-900 font-bold shrink-0">3</div>
                            <div>
                                <h4 className="font-bold text-stone-900 uppercase tracking-wide mb-1 text-sm">Precision Extraction (정밀 추출)</h4>
                            </div>
                        </div>
                    );
                }
                if (trimmed.includes('Decision Integration')) {
                    return (
                        <div key={i} className="flex gap-4 pt-4 border-t border-stone-100">
                            <div className="w-8 h-8 rounded-full bg-stone-900 border border-stone-900 flex items-center justify-center text-white font-bold shrink-0">4</div>
                            <div className="w-full">
                                <h4 className="font-bold text-stone-900 uppercase tracking-wide mb-2 text-sm">Decision Integration (의사결정)</h4>
                            </div>
                        </div>
                    );
                }

                if (trimmed.startsWith('#') || trimmed === '') return null;

                // Content Lines
                // If previous line was header, this is content. 
                // We simplify by just styling all non-header lines as content.
                // Indent content based on context (hard to do perfectly without context awareness in map, but we use padding)
                
                return (
                    <div key={i} className="pl-12 text-stone-700 leading-relaxed text-sm md:text-base">
                        {trimmed.startsWith('-') || trimmed.startsWith('•') ? (
                            <div className="flex gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                                <span>{trimmed.replace(/^[-•]\s*/, '')}</span>
                            </div>
                        ) : (
                           trimmed
                        )}
                    </div>
                )
            })}
         </div>
      </div>
    );
  };

  // Render the Analysis/Scenario Section
  const renderAnalysis = (analysisText: string) => {
    if (!analysisText) return null;

    const cleanText = analysisText.trim();
    
    return (
      <div className="mt-16 bg-slate-900 text-slate-200 rounded-sm shadow-xl relative overflow-hidden font-sans">
        {/* Background Pattern - Subtle Grid */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        {/* Top Accent Line */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-slate-400 to-blue-500"></div>

        <div className="p-8 md:p-12 relative z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-10 border-b border-slate-700 pb-6">
            <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 shadow-inner">
                <BrainCircuit className="w-8 h-8 text-sky-400" strokeWidth={1.5} />
            </div>
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wider leading-none mb-2">
                THE INSIGHT ENGINE™
                </h2>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-[0.25em]">
                AI-Driven Strategic Analysis & Future Forecasting
                </p>
            </div>
            </div>

            <div className="space-y-6">
            {cleanText.split('\n').map((line, i) => {
                const trimmed = line.trim();
                
                // Extract probability if present: (확률: 85%)
                const probMatch = trimmed.match(PARSER_PATTERNS.PROBABILITY);
                const probString = probMatch ? probMatch[1] : null;
                const cleanHeader = trimmed.replace(/#+\s*/, '').replace(PARSER_PATTERNS.PROBABILITY, '').trim();

                // Scenario 1: Logical (Blue/Sky Theme)
                if (trimmed.includes('논리적 미래') || trimmed.includes('Logical')) {
                    return (
                    <div key={i} className="mt-10 mb-4 flex items-center gap-3">
                        <div className="w-1 h-6 bg-sky-500 rounded-full"></div>
                        <h3 className="text-xl font-bold text-sky-100 uppercase tracking-wide">{cleanHeader}</h3>
                        {probString && (
                            <span className="ml-auto bg-sky-900/30 text-sky-300 border border-sky-700/50 text-xs px-3 py-1 rounded-full font-mono">
                                Probability: {probString}
                            </span>
                        )}
                    </div>
                    );
                }
                // Scenario 2: Probabilistic (Teal/Emerald Theme)
                if (trimmed.includes('확률적 미래') || trimmed.includes('Probabilistic')) {
                    return (
                    <div key={i} className="mt-10 mb-4 flex items-center gap-3">
                        <div className="w-1 h-6 bg-teal-500 rounded-full"></div>
                        <h3 className="text-xl font-bold text-teal-100 uppercase tracking-wide">{cleanHeader}</h3>
                         {probString && (
                            <span className="ml-auto bg-teal-900/30 text-teal-300 border border-teal-700/50 text-xs px-3 py-1 rounded-full font-mono">
                                Probability: {probString}
                            </span>
                        )}
                    </div>
                    );
                }
                // Scenario 3: Unexpected (Indigo/Violet Theme - Intellectual Mystery)
                if (trimmed.includes('뜻밖의 미래') || trimmed.includes('Unexpected')) {
                    return (
                    <div key={i} className="mt-10 mb-4 flex items-center gap-3">
                        <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
                        <h3 className="text-xl font-bold text-indigo-100 uppercase tracking-wide">{cleanHeader}</h3>
                         {probString && (
                            <span className="ml-auto bg-indigo-900/30 text-indigo-300 border border-indigo-700/50 text-xs px-3 py-1 rounded-full font-mono">
                                Probability: {probString}
                            </span>
                        )}
                    </div>
                    );
                }

                // Deep Insight Header
                if (trimmed.includes('Deep Insight') || (trimmed.startsWith('## ') && !trimmed.includes('Future'))) {
                    return (
                        <div key={i} className="mb-4 flex items-center gap-2 text-slate-200">
                            <Sparkles className="w-5 h-5 text-amber-400" />
                            <h3 className="text-lg font-bold uppercase tracking-widest">{cleanHeader}</h3>
                        </div>
                    );
                }
                
                // Section Main Headers
                if (trimmed.startsWith('# ')) {
                    return null; // Skip H1 inside box
                }
                if (trimmed.startsWith('## Future Scenarios')) {
                     return (
                        <div key={i} className="mt-12 mb-6 border-b border-slate-700 pb-2 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-slate-400" />
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">
                                Scenario Modeling
                            </h2>
                        </div>
                     )
                }

                // Body Text
                if (trimmed === '') return <div key={i} className="h-2"></div>;

                return (
                    <p key={i} className="text-slate-300 leading-relaxed text-base pl-4 border-l border-slate-800">
                        {trimmed}
                    </p>
                );
            })}
            </div>
            
            {/* Footer Decoration */}
            <div className="mt-12 flex justify-between items-end opacity-30">
                <div className="text-[10px] font-mono text-slate-400">
                    GENERATED BY GEMINI 2.5 FLASH<br/>
                    LATENCY OPTIMIZED
                </div>
                <BrainCircuit className="w-24 h-24 text-slate-700 -mb-16 -mr-16" strokeWidth={0.5} />
            </div>
        </div>
      </div>
    );
  };

  return (
    <article className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header Section */}
      <header className="border-b-4 border-stone-900 mb-6 pb-4 text-center">
        <div className="flex justify-between items-center border-b border-stone-400 pb-2 mb-4 text-sm font-sans uppercase tracking-widest text-stone-600">
          <span>Vol. 01</span>
          <span>{article.date}</span>
          <span>서울, 대한민국</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black font-serif text-stone-900 mb-4 leading-tight tracking-tight">
          {article.headline}
        </h1>
        {article.subheadline && (
          <h2 className="text-xl md:text-2xl font-serif italic text-stone-700 mb-2 px-4 md:px-12">
            {article.subheadline}
          </h2>
        )}
      </header>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Image & Main Text */}
        <div className="lg:col-span-8">
          <figure className="mb-6 grayscale hover:grayscale-0 transition-all duration-500">
            <img 
              src={article.imageUrl} 
              alt={article.topic} 
              className="w-full h-auto object-cover border border-stone-900 shadow-sm"
              style={{ maxHeight: '400px' }}
            />
            <figcaption className="text-xs text-stone-500 mt-2 font-sans text-right">
              AI Generated Visualization for "{article.topic}"
            </figcaption>
          </figure>

          {/* Main Article Body */}
          <div className="prose prose-stone max-w-none font-serif columns-1 md:columns-1 gap-8 border-b border-stone-300 pb-8 mb-8">
            {renderTextWithInsights(mainBody)}
          </div>
          
          {/* Focus Reading Section (New) */}
          {focusReadingSection && renderFocusReading(focusReadingSection)}

          {/* AI Analysis Section (The Insight Engine) */}
          {analysisSection && renderAnalysis(analysisSection)}

        </div>

        {/* Right Column: Sidebar Info & Sources */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          {/* Weather/Stock ticker style filler (static for aesthetics) */}
          <div className="border-2 border-stone-800 p-4 bg-stone-200/50">
            <h3 className="font-bold font-sans uppercase tracking-widest text-sm mb-2 border-b border-stone-800 pb-1">
              AI Analysis Status
            </h3>
            <p className="font-serif text-sm italic text-stone-700 mb-2">
              본 기사는 구글 검색 엔진의 실시간 데이터를 Gemini 2.5 모델이 분석하여 융복합한 결과입니다.
            </p>
            {article.isGenerated && (
              <div className="flex items-center gap-2 text-xs font-bold text-red-800 uppercase">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                Live Generated
              </div>
            )}
          </div>

          {/* General Sources List */}
          <div className="border-t-2 border-stone-800 pt-4">
            <h3 className="font-bold font-sans uppercase tracking-widest text-lg mb-4 flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              참고 문헌 (General)
            </h3>
            <ul className="space-y-3">
              {article.sources.length > 0 ? article.sources.map((source, idx) => (
                <li key={idx} className="text-sm border-b border-stone-300 pb-2 last:border-0">
                  <a 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <span className="font-bold text-stone-800 group-hover:text-red-800 transition-colors block truncate">
                      {source.title}
                    </span>
                    <span className="text-stone-500 text-xs truncate block font-sans mt-1">
                      {new URL(source.uri).hostname}
                    </span>
                  </a>
                </li>
              )) : (
                <li className="text-stone-500 text-sm italic">
                  별도의 외부 출처가 명시되지 않았습니다.
                </li>
              )}
            </ul>
          </div>

          {/* Scenario/Analysis Sources List (New Section) */}
          {article.scenarioSources && article.scenarioSources.length > 0 && (
            <div className="border-t-2 border-stone-800 pt-4 bg-stone-100 p-4 -mx-4 md:mx-0">
              <h3 className="font-bold font-sans uppercase tracking-widest text-sm mb-4 flex items-center gap-2 text-stone-900">
                <FileText className="w-4 h-4" />
                시나리오/분석 근거
              </h3>
              <p className="text-xs text-stone-500 mb-3">
                AI가 미래 시나리오를 도출하는 과정에서 직접적으로 인용한 전문가 논평 및 데이터입니다.
              </p>
              <ul className="space-y-3">
                {article.scenarioSources.map((source, idx) => (
                  <li key={idx} className="text-sm border-b border-stone-200 pb-2 last:border-0">
                    <a 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <span className="font-bold text-stone-700 group-hover:text-blue-800 transition-colors block leading-tight mb-1">
                        {source.title}
                      </span>
                      {source.uri && (
                        <span className="text-stone-400 text-[10px] truncate block font-sans">
                          {source.uri.length > 40 ? source.uri.substring(0, 40) + '...' : source.uri}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {/* Footer */}
      <footer className="mt-8 pt-4 border-t-4 border-stone-900 text-center font-sans text-stone-500 text-xs">
        <p>© 2025 The Insight Chronicle. Generated by Gemini.</p>
      </footer>
    </article>
  );
};
