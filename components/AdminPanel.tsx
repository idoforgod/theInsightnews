
import React, { useState, useEffect } from 'react';
import { ArticleData } from '../types';
import { Save, X, Tag, Sparkles, Image as ImageIcon } from 'lucide-react';
import { saveArticle } from '../services/storageService';
import { generateImageForArticle } from '../services/geminiService';
import { TOPICS } from '../constants';

interface AdminPanelProps {
  onClose: () => void;
  onSave: () => void;
  articleToEdit?: ArticleData | null;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onSave, articleToEdit }) => {
  const [formData, setFormData] = useState({
    headline: '',
    content: '',
    topic: '경제',
    customTopic: '',
    imageUrl: '',
    useCustomTopic: false
  });

  // State for Single Hashtag
  const [tag, setTag] = useState('');
  
  // State for Image Generation
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);

  // Initialize form if editing
  useEffect(() => {
    if (articleToEdit) {
      const isCustom = !TOPICS.includes(articleToEdit.topic);
      
      setFormData({
        headline: articleToEdit.headline,
        content: articleToEdit.content,
        topic: isCustom ? '경제' : articleToEdit.topic, // Default fallback if custom
        customTopic: isCustom ? articleToEdit.topic : '',
        useCustomTopic: isCustom,
        imageUrl: articleToEdit.imageUrl,
      });

      // Parse first hashtag from subheadline
      // Assumes subheadline format: "#Tag1 #Tag2" or just "#Tag1"
      if (articleToEdit.subheadline) {
        // Take the first part, remove #, and trim
        const firstTag = articleToEdit.subheadline
          .trim()
          .split(' ')[0]
          .replace(/^#/, '');
        setTag(firstTag);
      }
    }
  }, [articleToEdit]);

  const handleGenerateImage = async () => {
    if (!formData.headline || !formData.content) {
      alert("이미지를 생성하려면 헤드라인과 기사 본문을 먼저 입력해주세요.");
      return;
    }

    setIsGeneratingImg(true);
    try {
      const generatedImageUrl = await generateImageForArticle(formData.headline, formData.content);
      setFormData(prev => ({ ...prev, imageUrl: generatedImageUrl }));
    } catch (error: any) {
      alert("이미지 생성 실패: " + error.message);
    } finally {
      setIsGeneratingImg(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalTopic = formData.useCustomTopic ? formData.customTopic : formData.topic;
    
    // Convert single tag to string format for subheadline: "#Tag"
    const formattedSubheadline = tag.trim() ? `#${tag.trim().replace(/^#/, '')}` : "";

    const article: ArticleData = {
      id: articleToEdit?.id, // Preserve ID if editing
      headline: formData.headline,
      subheadline: formattedSubheadline,
      content: formData.content,
      topic: finalTopic || "일반",
      imageUrl: formData.imageUrl || `https://picsum.photos/seed/${encodeURIComponent(finalTopic)}/800/400`,
      date: articleToEdit?.date || new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }),
      sources: articleToEdit?.sources || [],
      scenarioSources: articleToEdit?.scenarioSources || [],
      isGenerated: articleToEdit ? articleToEdit.isGenerated : false,
      timestamp: articleToEdit?.timestamp // Preserve timestamp
    };

    saveArticle(article);
    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-stone-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#f4f1ea] w-full max-w-2xl shadow-2xl border-4 border-stone-800 relative animate-in fade-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-stone-200 text-stone-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 border-b-2 border-stone-300">
          <h2 className="text-3xl font-black font-serif text-stone-900">
            {articleToEdit ? '기사 수정' : '편집국장 데스크'}
          </h2>
          <p className="text-stone-600 italic">
            {articleToEdit ? '기존 기사의 내용을 수정합니다.' : '새로운 기사를 발행합니다.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest text-stone-500 mb-2">헤드라인</label>
              <input
                required
                type="text"
                value={formData.headline}
                onChange={e => setFormData({...formData, headline: e.target.value})}
                className="w-full px-4 py-2 bg-white border border-stone-400 focus:border-red-800 focus:outline-none font-serif font-bold"
                placeholder="기사의 제목을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest text-stone-500 mb-2">섹션 (주제)</label>
              <div className="space-y-2">
                <select
                  value={formData.useCustomTopic ? "custom" : formData.topic}
                  onChange={(e) => {
                    if (e.target.value === "custom") {
                      setFormData({ ...formData, useCustomTopic: true });
                    } else {
                      setFormData({ ...formData, useCustomTopic: false, topic: e.target.value });
                    }
                  }}
                  className="w-full px-4 py-2 bg-white border border-stone-400 focus:border-red-800 focus:outline-none font-serif"
                >
                  {TOPICS.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                  <option value="custom">직접 입력</option>
                </select>
                
                {formData.useCustomTopic && (
                  <input
                    type="text"
                    required
                    value={formData.customTopic}
                    onChange={e => setFormData({...formData, customTopic: e.target.value})}
                    className="w-full px-4 py-2 bg-white border border-stone-400 focus:border-red-800 focus:outline-none font-serif"
                    placeholder="새로운 주제 입력"
                  />
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-widest text-stone-500 mb-2">기사 본문</label>
            <textarea
              required
              rows={10}
              value={formData.content}
              onChange={e => setFormData({...formData, content: e.target.value})}
              className="w-full px-4 py-4 bg-white border border-stone-400 focus:border-red-800 focus:outline-none font-serif text-lg leading-relaxed"
              placeholder="기사 내용을 입력하세요. (단락은 줄바꿈으로 구분됩니다)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-stone-500 mb-2">
                  위기 태그 (1개)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-stone-400 font-bold">#</span>
                  </div>
                  <input
                    type="text"
                    value={tag}
                    onChange={e => setTag(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 bg-white border border-stone-400 focus:border-red-800 focus:outline-none font-serif placeholder-stone-300"
                    placeholder="대표 키워드 하나 (예: 금리인하)"
                  />
                </div>
             </div>

             <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-stone-500 mb-2">이미지 설정</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                    className="flex-1 px-4 py-2 bg-white border border-stone-400 focus:border-red-800 focus:outline-none font-sans text-sm"
                    placeholder="이미지 URL 입력 (선택)"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateImage}
                    disabled={isGeneratingImg}
                    className="px-3 py-2 bg-stone-200 text-stone-800 font-bold uppercase text-xs hover:bg-stone-300 transition-colors flex items-center gap-1 whitespace-nowrap disabled:opacity-50"
                    title="본문 내용을 바탕으로 AI 이미지를 생성합니다."
                  >
                    {isGeneratingImg ? (
                      <div className="w-4 h-4 border-2 border-stone-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-red-800" />
                    )}
                    AI 생성
                  </button>
                </div>
                {formData.imageUrl && (
                  <div className="mt-2 h-20 w-full overflow-hidden border border-stone-300 bg-stone-100">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover opacity-70" />
                  </div>
                )}
             </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-stone-900 text-[#f4f1ea] px-8 py-3 font-bold tracking-widest hover:bg-red-900 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {articleToEdit ? '수정 완료' : '발행하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
