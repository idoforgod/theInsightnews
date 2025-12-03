
import { GoogleGenAI } from "@google/genai";
import { ArticleData, Source } from "../types";
import { PARSER_PATTERNS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImageForArticle = async (headline: string, content: string): Promise<string> => {
  const modelId = "gemini-2.5-flash-image"; // Nano Banana series for image generation

  // Truncate content to avoid token limits and focus on the essence
  const contentSummary = content.length > 500 ? content.substring(0, 500) + "..." : content;

  const prompt = `
    Create a high-quality, realistic, and professional digital illustration suitable for a top-tier newspaper article.
    
    Article Headline: "${headline}"
    Article Context: "${contentSummary}"
    
    Style: Editorial illustration, sophisticated, journalistic, detailed, slight matte finish. 
    Avoid text in the image.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        imageConfig: {
          aspectRatio: "16:9", // Standard news image ratio
        }
      },
    });

    // Iterate through parts to find the image
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64String = part.inlineData.data;
          return `data:image/png;base64,${base64String}`;
        }
      }
    }
    
    throw new Error("No image data found in the response.");

  } catch (error: any) {
    console.error("Gemini Image Gen Error:", error);
    throw new Error(error.message || "이미지를 생성하는 중 오류가 발생했습니다.");
  }
};

export const generateNewspaperArticle = async (topic: string): Promise<ArticleData> => {
  const modelId = "gemini-2.5-flash"; // Using flash for speed and search capability
  
  // Get real-time timestamp for the prompt
  const now = new Date();
  const currentTimeString = now.toLocaleString('ko-KR', {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit',
    weekday: 'long'
  });

  const systemInstruction = `
    당신은 "The Insight Chronicle"의 수석 기자이자 속보 전담 에디터입니다. 
    당신의 임무는 사용자가 입력한 키워드와 관련하여 **현재 시각 기준 가장 최신의 사건과 정보**를 찾아 독자에게 전달하는 것입니다.
    
    핵심 지침:
    1. **정보 출처 및 비중 조절 (필수)**:
       입력된 키워드의 성격(국내 이슈 vs 해외 이슈)을 판단하여 정보의 출처 비중을 다음과 같이 조절하십시오.
       - **한국(국내) 관련 주제일 경우**: 한국 신문기사 및 국내 정보를 **70%**, 해외 시각이나 관련 국제 정보를 **30%** 비중으로 융복합하여 작성하십시오.
       - **해외(국제) 관련 주제일 경우**: 해외 신문기사 및 국제 정보를 **70%**, 한국 내 반응이나 한국에 미치는 영향을 **30%** 비중으로 융복합하여 작성하십시오.
       - 이 비율을 통해 독자에게 심층적이면서도 균형 잡힌 글로벌 시각을 제공하십시오.

    2. **최신성 우선**: 구글 검색 도구를 적극 활용하여, 입력된 시간(현재 시각)과 가장 가까운 뉴스, 속보, 데이터를 우선적으로 수집하십시오.
    
    3. **융복합 분석**: 단순한 사실 나열을 넘어, 최신 사건이 가지는 의미와 향후 전망을 신속하게 분석하여 기사에 녹여내십시오.
    
    4. **저널리즘 톤**: 신뢰감 있고 전문적인 신문 기사 어조를 유지하십시오.

    5. **자율적 심층 해설 (Insight Box)**:
       기사 작성 중 **전문 용어, 낯선 경제/기술 개념, 역사적 배경 설명**이 필요하다고 판단되면, 당신의 지식 베이스를 활용하여 추가 설명을 제공하십시오.
       - 설명은 본문과 구별되도록 반드시 **[[INSIGHT: 용어 또는 제목 | 설명 내용]]** 형식을 사용하여 문단 사이에 삽입하십시오.
       - 예시: 본문 내용... [[INSIGHT: 양자 얽힘(Quantum Entanglement) | 두 입자가 거리에 상관없이 서로의 상태에 영향을 미치는 양자역학적 현상으로...]] 본문 계속...
       - 기사 하나당 1~3개 정도의 인사이트 박스를 적절히 배치하십시오.

    6. **Focus Reading (포커스 리딩 - 핵심 정밀 검증) (필수)**:
       기사 본문 작성이 끝난 직후, **\`[[FOCUS_READING_START]]\`** 구분자를 넣고, 다음 4단계 모델에 맞춰 기사의 핵심을 정밀하게 요약 및 검증하십시오.
       이 섹션은 바쁜 의사결정권자를 위한 '전략 브리핑' 스타일로 작성하십시오.
       
       **[Focus Reading 4단계 모델]**
       1. **Purpose Locking (목적 고정)**: 이 기사를 읽어야 하는 이유와 한 줄 핵심 결론 (Conclusion)을 명시하십시오.
       2. **Structural Mapping (구조 매핑)**: 결론을 지지하는 가장 강력한 핵심 근거 3가지를 추출하십시오.
       3. **Precision Extraction (정밀 추출 - Fact vs Claim)**: 기사 내 핵심 정보가 '검증된 사실(Fact)'인지 '주장/예측(Claim)'인지 구분하여 나열하십시오. (수치나 날짜가 있다면 반드시 포함)
       4. **Decision Integration (의사결정 통합)**: 이 정보가 독자(투자자/전문가)의 어떤 리스크 관리나 전략 수립에 연결되는지 1~2문장으로 제언하십시오.

    7. **AI 심층 추론 및 미래 시나리오 (필수 - 근거 기반)**:
       Focus Reading 섹션 작성 후, 반드시 **\`[[ANALYSIS_START]]\`** 라는 구분자를 넣고, 그 뒤에 AI의 추론 능력을 활용한 심층 분석 보고서를 작성하십시오.
       **주의: 시나리오는 절대 막연한 상상으로 지어내지 말고, 반드시 검색된 신문 기사, 전문가의 논평, 실제 데이터 및 통계 등 확실한 근거를 기반으로 추론해야 합니다.**
       
       A. **Deep Insight (핵심 통찰)**: 이 사건이 가지는 본질적인 의미와 보이지 않는 이면을 꿰뚫는 분석 (1문단).
       B. **Future Scenarios (미래 시나리오)**:
          각 시나리오의 제목 옆에 반드시 **(확률: XX%)** 형식을 사용하여 실현 가능성을 백분율로 표기하십시오.
          - **1. 논리적 미래 (Logical Scenario) (확률: XX%)**: 현재의 인과 관계와 주류 전문가들의 전망을 종합할 때 도달하게 될 가장 타당하고 예측 가능한 미래.
          - **2. 확률적 미래 (Probabilistic Scenario) (확률: XX%)**: 데이터와 통계를 기반으로 볼 때, 발생 확률이 높은 긍정적 혹은 부정적 변수와 그 결과.
          - **3. 뜻밖의 미래 (Unexpected Scenario) (확률: XX%)**: 소수의 전문가가 경고하는 리스크나, 역사적으로 간과되었던 변수가 작용할 경우 발생할 수 있는 '블랙 스완'.
          
       C. **Analysis References (분석 참고자료)**:
          시나리오 도출에 직접적으로 사용된 근거(기사, 전문가 리포트, 논평 등)를 문서의 맨 마지막에 별도로 나열하십시오.
          반드시 다음 형식을 사용해야 시스템이 인식하여 분리할 수 있습니다:
          **[[SCENARIO_SOURCE: 자료 제목 | URL]]**
          **[[SCENARIO_SOURCE: 전문가 이름/기관 - 제목 | URL]]**

    8. **형식 준수**: 
       # [헤드라인 (최신 이슈 반영)]
       ## [부제 (핵심 요약)]
       [본문 - 최신 정보를 중심으로 서술, 최소 4문단. 문단 사이에 [[INSIGHT:...]] 포맷 활용]

       [[FOCUS_READING_START]]
       # FOCUS READING
       ## 1. Purpose Locking
       [내용]
       ## 2. Structural Mapping
       [내용]
       ## 3. Precision Extraction
       [내용]
       ## 4. Decision Integration
       [내용]
       
       [[ANALYSIS_START]]
       # The Insight Engine Analysis
       ## Deep Insight
       [내용]
       ## Future Scenarios
       ### 1. 논리적 미래 (Logical) (확률: 00%)
       [내용]
       ### 2. 확률적 미래 (Probabilistic) (확률: 00%)
       [내용]
       ### 3. 뜻밖의 미래 (Unexpected) (확률: 00%)
       [내용]
       
       [[SCENARIO_SOURCE: ... | ...]]
       [[SCENARIO_SOURCE: ... | ...]]
  `;

  const prompt = `
    현재 시각: ${currentTimeString}
    검색 키워드: "${topic}"
    
    위 키워드가 한국 관련 내용인지 해외 관련 내용인지 판단하고, 시스템 지침에 명시된 **70:30 정보 배합 비율**을 반드시 준수하여 구글 검색 및 기사 작성을 수행하십시오.
    **지금 이 순간 가장 이슈가 되고 있는 최신 정보**를 찾으십시오.
    오래된 정보보다는 **최근 몇 시간 이내, 혹은 오늘 발생한 뉴스**에 집중하십시오.
    
    기사 본문 작성 -> **[[FOCUS_READING_START]]** 태그 후 포커스 리딩 작성 -> **[[ANALYSIS_START]]** 태그 후 심층 분석 작성을 순서대로 수행하십시오.
    
    **시나리오 작성 시 (확률: XX%)를 반드시 표기하고, 상상력이 아닌 전문가 분석과 데이터를 근거로 작성하십시오.**
    **마지막에 [[SCENARIO_SOURCE: ... | ...]] 태그를 사용하여 시나리오의 근거가 된 자료 출처를 명시하십시오.**
    
    검색된 최신 내용을 바탕으로 "The Insight Chronicle"의 1면 톱기사를 작성하십시오.
    기사는 한국어로 작성해 주십시오.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      },
    });

    const text = response.text || "";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    // Parse Standard Sources (from Grounding)
    const sources: Source[] = groundingChunks
      .filter((chunk) => chunk.web?.uri && chunk.web?.title)
      .map((chunk) => ({
        title: chunk.web!.title!,
        uri: chunk.web!.uri!,
      }));

    // Parse Scenario Sources (from Text Tags) and remove them from content
    const scenarioSources: Source[] = [];
    // Using Centralized Regex Pattern for Stripping Sources
    let processedText = text.replace(PARSER_PATTERNS.SCENARIO_SOURCE_GLOBAL, (match, title, uri) => {
      scenarioSources.push({ title: title.trim(), uri: uri.trim() });
      return ""; // Remove the tag from the text
    });

    // Clean up any trailing newlines left by removing sources
    processedText = processedText.trim();

    // Simple parsing logic for the structured output request
    const lines = processedText.split('\n');
    let headline = "속보: AI가 기사를 생성하는 중 오류 발생";
    let subheadline = "데이터를 처리하는 데 문제가 있었습니다.";
    let content = processedText;

    // Attempt to extract H1 and H2 if format is followed
    const h1Index = lines.findIndex(l => l.startsWith('# '));
    if (h1Index !== -1) {
      headline = lines[h1Index].replace('# ', '').trim();
      
      // Remove H1 from lines to process rest
      const remainingLines = lines.slice(h1Index + 1);
      const h2Index = remainingLines.findIndex(l => l.startsWith('## '));
      
      if (h2Index !== -1) {
        subheadline = remainingLines[h2Index].replace('## ', '').trim();
        content = remainingLines.slice(h2Index + 1).join('\n').trim();
      } else {
        content = remainingLines.join('\n').trim();
        subheadline = ""; // No subheadline found
      }
    }

    return {
      headline,
      subheadline,
      content,
      // Dedup standard sources
      sources: Array.from(new Set(sources.map(s => JSON.stringify(s)))).map(s => JSON.parse(s)), 
      // Dedup scenario sources
      scenarioSources: Array.from(new Set(scenarioSources.map(s => JSON.stringify(s)))).map(s => JSON.parse(s)),
      imageUrl: `https://picsum.photos/seed/${encodeURIComponent(topic + now.getTime())}/800/400`, 
      date: currentTimeString, 
      topic
    };

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "기사를 생성하는 중 오류가 발생했습니다.");
  }
};
