
import React, { useState, useEffect } from 'react';
import { ArticleView } from './components/ArticleView';
import { AdminPanel } from './components/AdminPanel';
import { NewsFeed } from './components/NewsFeed';
import { SidebarHeadlines } from './components/SidebarHeadlines';
import { generateNewspaperArticle } from './services/geminiService';
import { getStoredArticles } from './services/storageService';
import { ArticleData, GenerationState } from './types';
import { Newspaper, PenTool, ArrowLeft, RotateCcw, Search, BarChart3 } from 'lucide-react';
import { SECTIONS } from './constants';

type ViewMode = 'feed' | 'article';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('feed');
  const [showAdmin, setShowAdmin] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleData | null>(null);
  
  // Data State
  const [storedArticles, setStoredArticles] = useState<ArticleData[]>([]);
  const [currentArticle, setCurrentArticle] = useState<ArticleData | null>(null);
  
  // Filtering State
  const [selectedSection, setSelectedSection] = useState('ALL');
  const [filteredArticles, setFilteredArticles] = useState<ArticleData[]>([]);

  // Generation State
  const [searchTerm, setSearchTerm] = useState('');
  const [genState, setGenState] = useState<GenerationState>({
    isLoading: false,
    error: null,
    step: 'idle',
  });

  // UI State
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Time State
  const [currentTime, setCurrentTime] = useState<string>("");

  // Load articles on mount
  useEffect(() => {
    refreshArticles();
  }, []);

  // Clock Effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter logic
  useEffect(() => {
    if (selectedSection === 'ALL') {
      setFilteredArticles(storedArticles);
    } else {
      const filtered = storedArticles.filter(a => a.topic === selectedSection);
      setFilteredArticles(filtered);
    }
  }, [selectedSection, storedArticles]);

  const refreshArticles = () => {
    const articles = getStoredArticles();
    setStoredArticles(articles);
  };

  // Navigation Handler
  const handleSectionClick = (sectionId: string) => {
    setSelectedSection(sectionId);
    setView('feed');
    setCurrentArticle(null);
    setGenState({ isLoading: false, error: null, step: 'idle' });
    window.scrollTo(0, 0);
  };

  // Handle Search Input (Generation Trigger)
  const handleSearchInput = (term: string) => {
    setSearchTerm(term);
  };

  const handleGenerate = async (term: string) => {
    if (!term.trim()) return;

    setGenState({ isLoading: true, error: null, step: 'searching' });
    
    // Switch to article view to show loading state
    setView('article'); 
    setCurrentArticle(null); 

    try {
      setTimeout(() => setGenState(prev => ({ ...prev, step: 'writing' })), 1500);

      const data = await generateNewspaperArticle(term);
      data.isGenerated = true; 
      
      setCurrentArticle(data);
      setGenState({ isLoading: false, error: null, step: 'complete' });
    } catch (error: any) {
      setGenState({ 
        isLoading: false, 
        error: error.message || "알 수 없는 오류가 발생했습니다.", 
        step: 'idle' 
      });
      setView('feed');
    }
  };

  const handleArticleClick = (article: ArticleData) => {
    setCurrentArticle(article);
    setView('article');
    window.scrollTo(0, 0);
  };

  const handleEditArticle = (article: ArticleData, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingArticle(article);
    setShowAdmin(true);
  };

  const handleAdminClose = () => {
    setShowAdmin(false);
    setEditingArticle(null); // Reset editing state on close
  };

  const goHome = () => {
    handleSectionClick('ALL');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-[#e5e5e5] py-4 md:py-8 px-2 md:px-6 lg:px-8 font-serif text-ink">
      
      {/* Admin Modal */}
      {showAdmin && (
        <AdminPanel 
          onClose={handleAdminClose} 
          onSave={() => {
            refreshArticles();
            // If we were viewing the article that got edited, reload it
            if (currentArticle && editingArticle && currentArticle.id === editingArticle.id) {
                // We need to fetch the updated version.
                const updatedList = getStoredArticles();
                const updatedArticle = updatedList.find(a => a.id === editingArticle.id);
                if (updatedArticle) setCurrentArticle(updatedArticle);
            }
          }}
          articleToEdit={editingArticle}
        />
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto bg-[#f4f1ea] min-h-[90vh] p-4 md:p-8 lg:p-12 newspaper-shadow relative flex flex-col">
        
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between border-b-2 border-stone-900 pb-4 mb-4">
            <div className="flex items-center gap-4">
              {/* Date/Time & Location */}
              <div className="flex items-center gap-2 text-sm font-serif italic text-stone-600">
                <Newspaper className="w-5 h-5 text-stone-800" />
                <span>서울, 대한민국</span>
                <span className="mx-2 text-stone-400">|</span>
                <span>{currentTime}</span>
              </div>
            </div>
            
            <div className="text-right">
              <button 
                onClick={() => setShowAdmin(true)}
                className="text-stone-400 hover:text-stone-800 transition-colors flex items-center gap-1 text-xs font-sans uppercase tracking-widest"
              >
                <PenTool className="w-3 h-3" /> Editor Mode
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="text-center cursor-pointer" onClick={goHome}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-stone-900 mb-2 hover:opacity-90 transition-opacity">
              The Insight Chronicle
            </h1>
            {/* Slogan Center Aligned */}
            <div className="border-y border-stone-400 py-2 mt-4 flex justify-center">
              <span className="text-stone-600 italic font-serif text-sm md:text-lg -translate-x-[9px]">
                전문 미래학자(Professional Futurist) 최윤식 최현식. 지식과 미래 통찰의 융합
              </span>
            </div>
          </div>

          {/* Navigation / Menu Bar */}
          <nav className="mt-6 border-y-4 border-stone-900 py-3 sticky top-0 z-30 bg-[#f4f1ea]">
            <ul className="flex flex-wrap justify-center gap-4 md:gap-12 text-sm md:text-base font-sans font-bold uppercase tracking-widest">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => handleSectionClick(section.id)}
                    className={`transition-colors ${
                      selectedSection === section.id 
                        ? 'text-red-800 underline underline-offset-4 decoration-2' 
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* Search/Generate Input - MOVED OUTSIDE GRID FOR CENTER ALIGNMENT */}
        {(view === 'feed' || !currentArticle) && (
          <div className={`mb-12 mt-8 transition-all duration-500`}>
            <div className="max-w-2xl mx-auto relative z-10">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate(searchTerm)}
                  placeholder="관심있는 키워드를 입력하여 새로운 AI 기사를 생성하세요..."
                  className="w-full px-6 py-4 text-lg bg-white border-2 border-stone-800 placeholder-stone-400 text-stone-900 focus:outline-none focus:border-red-800 transition-colors shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] focus:shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] focus:translate-x-[2px] focus:translate-y-[2px]"
                />
                <button 
                  onClick={() => handleGenerate(searchTerm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-red-800 transition-colors"
                >
                  <Search className="w-6 h-6" />
                </button>
            </div>

            {/* Action Button Hint */}
            {searchTerm && (
              <div className="text-center mt-4 animate-in fade-in slide-in-from-top-2">
                  <button 
                    onClick={() => handleGenerate(searchTerm)}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-stone-900 text-[#f4f1ea] font-bold font-sans uppercase tracking-widest hover:bg-red-900 transition-colors text-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    AI 심층 취재 시작
                  </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Sidebar Toggle Button */}
        <div className="lg:hidden mb-4 flex justify-end">
          <button 
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            className="flex items-center gap-2 px-3 py-2 bg-stone-200 text-stone-700 font-bold uppercase text-xs rounded hover:bg-stone-300 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            {showMobileSidebar ? '위기 추적 닫기' : '위기 추적 열기'}
          </button>
        </div>

        {/* Content Grid: Left Main (75%) | Right Sidebar (25%) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Column */}
          <div className="lg:col-span-9">
            
            {/* Current Article / Loading View (Displayed at top) */}
            {view === 'article' && (
              <div className="mb-16 border-b-4 border-stone-900 pb-12">
                {/* Loading State */}
                {genState.isLoading && (
                  <div className="flex flex-col items-center justify-center py-20 space-y-6 bg-stone-100/50 border border-stone-200 rounded-lg">
                    <div className="w-20 h-20 border-4 border-stone-300 border-t-red-800 rounded-full animate-spin"></div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-stone-900 mb-2 animate-pulse">
                        {genState.step === 'searching' ? '자료를 수집하고 있습니다...' : '기사를 작성하고 있습니다...'}
                      </p>
                      <p className="text-stone-500 font-serif italic">
                        The Insight Chronicle AI Editor is working.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error State */}
                {genState.error && (
                  <div className="bg-red-50 border-l-4 border-red-700 p-6 my-8 mx-auto max-w-2xl">
                    <h3 className="text-lg font-bold text-red-800 mb-2">발행 오류</h3>
                    <p className="text-red-700">{genState.error}</p>
                    <button 
                      onClick={goHome}
                      className="mt-4 text-sm underline text-red-900 hover:text-red-700 font-bold"
                    >
                      닫기
                    </button>
                  </div>
                )}

                {/* Article Content */}
                {currentArticle && !genState.isLoading && (
                  <>
                    <div className="mb-6 flex justify-between items-center">
                      <button 
                        onClick={() => {
                          setCurrentArticle(null);
                          setView('feed');
                        }}
                        className="flex items-center gap-2 text-sm font-sans font-bold uppercase tracking-widest text-stone-500 hover:text-red-800 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" /> 기사 닫기
                      </button>
                      
                      <button
                        onClick={(e) => handleEditArticle(currentArticle, e)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 border border-stone-300 text-stone-600 hover:text-stone-900 hover:bg-white hover:border-stone-400 text-xs font-bold uppercase tracking-wider transition-all rounded"
                      >
                         <PenTool className="w-3 h-3" /> 기사 수정
                      </button>
                    </div>
                    <ArticleView article={currentArticle} />
                  </>
                )}
              </div>
            )}

            {/* Feed Section Header (Always Visible) */}
            <div className="mb-8">
              <div className="flex items-center justify-between border-b border-stone-400 pb-2">
                <h3 className="text-xl font-black font-sans uppercase tracking-widest text-stone-800">
                  {view === 'article' ? 'More News' : (selectedSection === 'ALL' ? 'Todays Headlines' : `${selectedSection} News`)}
                </h3>
                <span className="text-stone-500 text-xs font-sans uppercase tracking-widest">
                  {selectedSection === 'ALL' ? '전체 섹션' : `${selectedSection} 섹션`}
                </span>
              </div>
            </div>

            {/* News Grid (Always Visible) */}
            <div>
                <NewsFeed 
                  articles={filteredArticles} 
                  onArticleClick={handleArticleClick}
                  onEditArticle={handleEditArticle}
                />
            </div>
          </div>

          {/* Right Sidebar (25%) */}
          <aside className={`${showMobileSidebar ? 'block' : 'hidden'} lg:block lg:col-span-3 transition-all`}>
            <div className="sticky top-24">
               <SidebarHeadlines articles={storedArticles} onArticleClick={handleArticleClick} />
            </div>
          </aside>

        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t-4 border-stone-900 text-center font-sans text-stone-500 text-xs uppercase tracking-widest">
          <p>© 2025 The Insight Chronicle. All rights reserved.</p>
        </footer>

      </main>
    </div>
  );
};

export default App;
