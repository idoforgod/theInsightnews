import React, { useState, useEffect } from 'react';
import { ArticleData } from '../types';
import { Newspaper } from 'lucide-react';

interface SidebarHeadlinesProps {
  articles: ArticleData[];
  onArticleClick: (article: ArticleData) => void;
}

export const SidebarHeadlines: React.FC<SidebarHeadlinesProps> = ({ articles, onArticleClick }) => {
  // 1. Group articles by Issue Topic (using tags in subheadline)
  const groupedByIssue: Record<string, ArticleData[]> = {};

  articles.forEach(article => {
    let issueTopic = '일반 이슈';
    
    if (article.subheadline && article.subheadline.trim() !== '') {
        // If it looks like tags (#Tag1 #Tag2), use the whole string as the key for exact matching
        issueTopic = article.subheadline.trim();
    }
      
    if (!groupedByIssue[issueTopic]) {
      groupedByIssue[issueTopic] = [];
    }
    groupedByIssue[issueTopic].push(article);
  });

  // 2. Sort logic (latest first)
  Object.keys(groupedByIssue).forEach(key => {
    groupedByIssue[key].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  });

  const sortedTopics = Object.keys(groupedByIssue).sort((topicA, topicB) => {
    const latestA = groupedByIssue[topicA][0]?.timestamp || 0;
    const latestB = groupedByIssue[topicB][0]?.timestamp || 0;
    return latestB - latestA;
  });

  // 3. Limit to top 3 issues (Cards/Topics)
  const displayedTopics = sortedTopics.slice(0, 3);

  // State for expanded card
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  // Initialize expanded topic when data becomes available
  useEffect(() => {
    if (!expandedTopic && displayedTopics.length > 0) {
      setExpandedTopic(displayedTopics[0]);
    }
  }, [displayedTopics, expandedTopic]);

  // Helper to parse tags from the topic string
  const getHashtags = (topicString: string) => {
    if (topicString.includes('#')) {
        return topicString.split(' ').filter(t => t.startsWith('#'));
    }
    const words = topicString.split(' ').filter(w => w.length > 1).slice(0, 3);
    return words.map(w => `#${w.replace(/[^a-zA-Z0-9가-힣]/g, '')}`);
  };

  const getDisplayTitle = (topicString: string) => {
    if (topicString.startsWith('#')) {
        return topicString.replace(/#/g, ' ').trim();
    }
    return topicString;
  }

  return (
    // Removed bg-white, border, shadow to blend in
    <div className="font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between py-4 mb-2 border-b-2 border-stone-900">
        <div className="flex items-center gap-1">
          <h3 className="font-bold text-stone-900 text-lg uppercase tracking-wide">위기 추적-Timeline</h3>
        </div>
      </div>

      {/* List */}
      <div className="space-y-2">
        {displayedTopics.map((topic) => {
          const groupArticles = groupedByIssue[topic];
          const isExpanded = expandedTopic === topic;
          const mainSource = groupArticles[0].topic;
          const displayTitle = getDisplayTitle(topic);

          if (isExpanded) {
            // === EXPANDED VIEW (Transparent Background) ===
            return (
              <div key={topic} className="py-2 animate-in fade-in slide-in-from-left-2 duration-300">
                <div className="pb-4 border-b border-stone-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-[#f4f1ea] font-bold shadow-sm">
                        {mainSource.substring(0, 2)}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-stone-900 text-lg leading-tight truncate w-48">
                            {displayTitle}
                        </h4>
                        <span className="text-stone-500 text-xs font-bold uppercase tracking-wide">{mainSource} 섹션</span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Content */}
                  <div className="relative pl-2 space-y-6">
                    {/* Vertical Line */}
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-stone-300"></div>

                    {/* Limit increased to 10 articles */}
                    {groupArticles.slice(0, 10).map((article) => (
                      <div key={article.id} className="relative pl-8 group cursor-pointer" onClick={() => onArticleClick(article)}>
                        {/* Timeline Dot */}
                        <div className="absolute left-[7px] top-1.5 w-2.5 h-2.5 rounded-full bg-stone-400 border-2 border-[#f4f1ea] z-10 group-hover:bg-red-600 transition-colors"></div>
                        
                        {/* Time */}
                        <div className="text-[10px] text-stone-500 mb-1 font-bold uppercase tracking-wider">
                          {new Date(article.timestamp || 0).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                        </div>

                        {/* Content Row */}
                        <div className="flex gap-3 justify-between items-start">
                          <h5 className="text-stone-800 font-serif font-bold leading-snug text-sm group-hover:text-red-900 transition-colors line-clamp-2">
                            {article.headline}
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            );
          } else {
            // === COLLAPSED VIEW (Transparent Background) ===
            return (
              <div 
                key={topic} 
                onClick={() => setExpandedTopic(topic)}
                className="py-3 flex items-center justify-between cursor-pointer border-b border-stone-300 last:border-0 group"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                   {/* Icon Placeholder */}
                   <div className="w-8 h-8 rounded-full border border-stone-400 flex items-center justify-center bg-transparent flex-shrink-0 group-hover:border-stone-800 transition-colors">
                     <Newspaper className="w-4 h-4 text-stone-400 group-hover:text-stone-800" />
                   </div>
                   
                   <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-700 text-sm truncate group-hover:text-stone-900">
                        {displayTitle}
                      </span>
                    </div>
                    <span className="text-stone-400 text-[10px] uppercase tracking-wider">{mainSource}</span>
                   </div>
                </div>
              </div>
            );
          }
        })}

        {displayedTopics.length === 0 && (
          <div className="p-8 text-center text-stone-400 text-sm italic font-serif">
            현재 등록된 이슈가 없습니다.
          </div>
        )}
      </div>

    </div>
  );
};