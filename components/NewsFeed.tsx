
import React from 'react';
import { ArticleData } from '../types';
import { PenTool } from 'lucide-react';
import { TOPICS } from '../constants';

interface NewsFeedProps {
  articles: ArticleData[];
  onArticleClick: (article: ArticleData) => void;
  onEditArticle: (article: ArticleData, e: React.MouseEvent) => void;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ articles, onArticleClick, onEditArticle }) => {
  if (articles.length === 0) {
    return (
      <div className="text-center py-20 border-y border-stone-300 my-8 bg-stone-50/50">
        <p className="text-stone-400 text-lg italic font-serif">
          해당 섹션에 발행된 기사가 없습니다.
        </p>
      </div>
    );
  }

  // Group articles by topic
  const groupedArticles: Record<string, ArticleData[]> = {};
  const otherArticles: ArticleData[] = [];

  articles.forEach(article => {
    const topic = article.topic;
    if (TOPICS.includes(topic)) {
      if (!groupedArticles[topic]) {
        groupedArticles[topic] = [];
      }
      groupedArticles[topic].push(article);
    } else {
      otherArticles.push(article);
    }
  });

  // Sort by timestamp (latest first) and Limit to 4 articles per section
  Object.keys(groupedArticles).forEach(topic => {
    groupedArticles[topic].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    groupedArticles[topic] = groupedArticles[topic].slice(0, 4);
  });

  // Sort and limit 'Other' articles as well
  otherArticles.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  const displayedOtherArticles = otherArticles.slice(0, 4);


  // Render a section block
  const renderSection = (title: string, sectionArticles: ArticleData[]) => {
    if (!sectionArticles || sectionArticles.length === 0) return null;

    const leadArticle = sectionArticles[0];
    const subArticles = sectionArticles.slice(1, 4);

    return (
      <div key={title} className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-black font-sans uppercase tracking-widest border-b-4 border-stone-900 pb-1 inline-block text-stone-900">
            {title}
            </h2>
            <div className="flex-1 h-px bg-stone-300 mt-2"></div>
        </div>
        
        {/* 
           New Layout:
           Left Column (2/3 width): Lead Article (Image + Text)
           Right Column (1/3 width): Vertical Stack of 3 sub-articles (Text only)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* === LEAD ARTICLE (Left Column) === */}
          <div 
            className="lg:col-span-2 group cursor-pointer relative flex flex-col"
            onClick={() => onArticleClick(leadArticle)}
          >
             {/* Edit Button */}
             <button
                onClick={(e) => onEditArticle(leadArticle, e)}
                className="absolute top-2 right-2 z-20 p-2 bg-stone-200 text-stone-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-stone-800 hover:text-white"
                title="기사 수정"
              >
                <PenTool className="w-4 h-4" />
              </button>

             <div className="relative overflow-hidden border border-stone-800 mb-4 shadow-[4px_4px_0px_0px_rgba(28,25,23,0.1)]">
                <img 
                  src={leadArticle.imageUrl} 
                  alt={leadArticle.headline}
                  className="w-full aspect-video object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out"
                />
                {leadArticle.isGenerated && (
                  <span className="absolute top-0 left-0 bg-red-700 text-white text-xs px-3 py-1 font-sans font-bold tracking-wider uppercase">
                    Exclusive
                  </span>
                )}
              </div>

              <div>
                 <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-sans font-bold uppercase tracking-widest text-red-800">
                       {leadArticle.topic}
                    </span>
                 </div>
                 <h3 className="text-3xl md:text-4xl font-serif font-black text-stone-900 leading-tight mb-4 group-hover:underline underline-offset-4 decoration-stone-400">
                    {leadArticle.headline}
                 </h3>
                 <p className="text-stone-600 font-serif text-lg leading-relaxed text-justify line-clamp-5 md:line-clamp-none">
                    {leadArticle.content.replace(/[#*\[\]]/g, '').substring(0, 300)}...
                 </p>
              </div>
          </div>

          {/* === SUB ARTICLES LIST (Right Column) === */}
          <div className="lg:col-span-1 flex flex-col border-t lg:border-t-0 lg:border-l border-stone-300 lg:pl-8 pt-8 lg:pt-0">
             {subArticles.map((article, idx) => (
               <div 
                  key={article.id || idx}
                  onClick={() => onArticleClick(article)}
                  className={`group cursor-pointer relative flex-1 flex flex-col justify-center py-4 first:pt-0 last:pb-0 ${idx !== subArticles.length - 1 ? 'border-b border-stone-300' : ''}`}
               >
                  {/* Edit Button */}
                  <button
                    onClick={(e) => onEditArticle(article, e)}
                    className="absolute top-0 right-0 z-20 p-1.5 bg-stone-200 text-stone-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-stone-800 hover:text-white"
                    title="기사 수정"
                  >
                    <PenTool className="w-3 h-3" />
                  </button>

                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-stone-400">
                       {article.topic} | {article.date.split('년')[0]}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-serif font-bold text-stone-900 leading-snug mb-2 group-hover:text-red-900 transition-colors">
                    {article.headline}
                  </h4>
                  
                  <p className="text-stone-500 font-serif text-sm leading-relaxed line-clamp-3">
                    {article.content.replace(/[#*\[\]]/g, '').substring(0, 100)}...
                  </p>
               </div>
             ))}
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="py-8">
      {/* Defined Sections from Constants */}
      {TOPICS.map((section) => 
        renderSection(section, groupedArticles[section])
      )}

      {/* Other/General Section */}
      {displayedOtherArticles.length > 0 && renderSection("General News", displayedOtherArticles)}
    </div>
  );
};
