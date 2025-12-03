import { ArticleData } from "../types";

const STORAGE_KEY = "ai_news_chronicle_articles";

const SAMPLE_ARTICLES: ArticleData[] = [
  // === 경제 (Economy) === Tag: #글로벌경제전망
  {
    id: "sample-eco-1",
    headline: "2025년 글로벌 금리 전망: 안정화 국면 진입",
    subheadline: "#글로벌경제전망",
    content: "2025년 세계 경제는 긴축의 터널을 지나 완만한 회복세로 접어들 전망이다. 미 연준(Fed)을 비롯한 주요국 중앙은행들은 물가 상승률이 목표치인 2%대에 안착함에 따라 단계적인 금리 인하를 시작했다.\n\n전문가들은 이번 금리 인하가 기업들의 투자 심리를 회복시키고 가계의 이자 부담을 줄여 소비 진작으로 이어질 것으로 분석하고 있다. 특히 신흥국 시장으로의 자금 유입이 다시 활발해지며 글로벌 교역량 또한 증가할 것으로 보인다.\n\n다만, 지정학적 리스크와 기후 변화로 인한 원자재 가격 변동성은 여전히 불안 요소로 남아있다. IMF는 보고서를 통해 '안정화 단계에 진입했지만, 각국 정부의 신중한 재정 정책이 동반되어야 할 시점'이라고 강조했다.",
    topic: "경제",
    date: "2025년 3월 10일 월요일",
    imageUrl: "https://picsum.photos/seed/economy1/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 100000
  },
  {
    id: "sample-eco-2",
    headline: "한국 수출, 반도체 슈퍼사이클로 역대 최고치 경신",
    subheadline: "#글로벌경제전망",
    content: "대한민국 수출 전선에 청신호가 켜졌다. 산업통상자원부는 지난달 수출액이 전년 동기 대비 15% 증가하며 역대 최고치를 경신했다고 발표했다. 이러한 실적의 일등 공신은 단연 반도체다.\n\n전 세계적인 AI 서비스 확산으로 인해 데이터센터 증설 경쟁이 치열해지면서, 고대역폭 메모리(HBM)를 포함한 프리미엄 반도체 주문이 폭주하고 있다. 삼성전자와 SK하이닉스는 생산 라인을 풀가동하고 있음에도 불구하고 공급이 수요를 따라가지 못하는 상황이다.\n\n정부는 이러한 흐름을 이어가기 위해 반도체 클러스터 조성에 박차를 가하고, 세제 혜택을 확대하는 등 전폭적인 지원을 아끼지 않겠다고 밝혔다.",
    topic: "경제",
    date: "2025년 3월 11일 화요일",
    imageUrl: "https://picsum.photos/seed/economy2/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 90000
  },
  {
    id: "sample-eco-3",
    headline: "청년 실업률 3%대 진입, 고용 시장 훈풍",
    subheadline: "#글로벌경제전망",
    content: "통계청이 발표한 최신 고용 동향에 따르면, 청년 실업률이 3.8%를 기록하며 팬데믹 이후 최저 수준으로 떨어졌다. 이는 디지털 전환 가속화에 따른 IT 전문 인력 수요 증가와 정부의 청년 창업 지원 정책이 맞물린 결과로 풀이된다.\n\n특히 플랫폼 경제 활성화로 인해 유연한 근무 형태의 일자리가 늘어나면서, 2030 세대의 경제 활동 참여율이 눈에 띄게 높아졌다. 대기업들의 신입 공채 재개 소식 또한 취업 준비생들에게 희망적인 신호로 작용하고 있다.\n\n노동부 관계자는 '양적 지표의 개선뿐만 아니라, 질 좋은 일자리 창출을 위해 직무 교육 프로그램을 더욱 강화할 계획'이라고 전했다.",
    topic: "경제",
    date: "2025년 3월 12일 수요일",
    imageUrl: "https://picsum.photos/seed/economy3/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 85000
  },
  {
    id: "sample-eco-4",
    headline: "국제 유가 70달러 선 붕괴, 물가 안정 기여할까",
    subheadline: "#글로벌경제전망",
    content: "서부 텍사스산 원유(WTI) 가격이 배럴당 68달러를 기록하며 70달러 지지선이 무너졌다. 글로벌 경기 둔화 우려로 인한 수요 감소와 산유국들의 감산 합의 균열이 주요 원인으로 분석된다.\n\n유가 하락은 국내 산업계, 특히 항공 및 해운 업계에 즉각적인 비용 절감 효과를 가져올 것으로 기대된다. 또한 수입 물가 하락으로 이어져 소비자 물가 안정화에도 긍정적인 영향을 미칠 전망이다.\n\n하지만 에너지 전문가들은 '중동 정세의 불확실성이 여전해 언제든 반등할 가능성이 있다'며 신중한 입장을 보였다.",
    topic: "경제",
    date: "2025년 3월 12일 수요일",
    imageUrl: "https://picsum.photos/seed/economy4/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 82000
  },
  {
    id: "sample-eco-5",
    headline: "대중국 무역수지 3개월 연속 흑자 전환",
    subheadline: "#글로벌경제전망",
    content: "한동안 적자의 늪에 빠졌던 대중국 무역수지가 3개월 연속 흑자를 기록하며 회복세에 접어들었다. 중국 내수 시장의 부진 속에서도 한국산 화장품과 고급 가전제품, 정밀 기계 부품의 수출이 호조를 보인 덕분이다.\n\n이는 한국 기업들이 '탈중국' 전략 대신, 중국 시장 내 프리미엄 전략을 강화한 것이 주효했다는 평가다. 중국 소비자들의 눈높이가 높아짐에 따라, 고품질의 한국 제품에 대한 수요가 다시 살아나고 있는 것이다.\n\n무역협회는 '중국 시장의 변화에 기민하게 대응한 결과이나, 장기적으로는 수출 시장 다변화 노력을 지속해야 한다'고 조언했다.",
    topic: "경제",
    date: "2025년 3월 13일 목요일",
    imageUrl: "https://picsum.photos/seed/economy5/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 78000
  },
  {
    id: "sample-eco-6",
    headline: "정부, 소상공인 에너지 비용 지원 확대 발표",
    subheadline: "#글로벌경제전망",
    content: "정부가 전기료와 가스비 인상으로 어려움을 겪는 소상공인들을 위해 긴급 에너지 비용 지원 대책을 내놓았다. 매출 규모에 따라 최대 200만 원까지 지원하며, 노후 냉난방기 교체 사업 예산도 대폭 증액하기로 했다.\n\n중소벤처기업부는 이번 조치로 약 50만 명의 영세 사업자가 혜택을 볼 것으로 추산하고 있다. 현장 접수와 더불어 모바일 앱을 통한 간편 신청 시스템을 도입해 접근성을 높였다.\n\n소상공인 연합회는 환영의 뜻을 밝히면서도, '일회성 지원을 넘어 에너지 효율화를 위한 근본적인 인프라 개선 대책이 필요하다'고 주문했다.",
    topic: "경제",
    date: "2025년 3월 14일 금요일",
    imageUrl: "https://picsum.photos/seed/economy6/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 75000
  },

  // === 금융 (Finance) === Tag: #금융시장변화
  {
    id: "sample-fin-1",
    headline: "시중은행, AI 기반 초개인화 자산관리 서비스 전면 도입",
    subheadline: "#금융시장변화",
    content: "국내 주요 시중은행들이 AI 알고리즘을 활용한 자산관리(WM) 서비스를 대중화하고 있다. 고액 자산가의 전유물로 여겨졌던 PB 서비스를 모바일 앱을 통해 누구나 이용할 수 있게 된 것이다.\n\n새로운 AI 서비스는 고객의 소비 패턴, 투자 성향, 라이프사이클을 종합적으로 분석하여 최적의 포트폴리오를 제안한다. 특히 투자 경험이 부족한 2030 세대에게 큰 호응을 얻고 있으며, 출시 3개월 만에 가입자 100만 명을 돌파하는 기염을 토했다.\n\n은행 관계자는 '이제 금융은 단순한 상품 판매를 넘어, 고객의 삶을 설계하는 파트너로서의 역할로 진화하고 있다'고 설명했다.",
    topic: "금융",
    date: "2025년 3월 12일 수요일",
    imageUrl: "https://picsum.photos/seed/finance1/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 80000
  },
  {
    id: "sample-fin-2",
    headline: "디지털 화폐(CBDC) 상용화 임박, '현금 없는 사회' 가속화",
    subheadline: "#금융시장변화",
    content: "한국은행이 추진해 온 중앙은행 디지털 화폐(CBDC) 프로젝트가 막바지 단계에 이르렀다. 최근 특정 지역에서 진행된 소매 결제 모의 실험이 시스템 오류 없이 성공적으로 완료됨에 따라, 정식 도입 논의가 급물살을 타고 있다.\n\nCBDC가 도입되면 결제 수수료가 획기적으로 낮아지고, 자금 흐름의 투명성이 확보되어 지하 경제 양성화에도 기여할 것으로 기대된다. 다만, 개인정보 침해 우려와 노년층의 디지털 소외 문제는 해결해야 할 과제로 지적된다.\n\n금융위원회는 'CBDC 도입은 화폐 개혁에 버금가는 변화인 만큼, 사회적 합의와 제도적 보완 장치 마련에 만전을 기하겠다'고 밝혔다.",
    topic: "금융",
    date: "2025년 3월 13일 목요일",
    imageUrl: "https://picsum.photos/seed/finance2/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 70000
  },
  {
    id: "sample-fin-3",
    headline: "핀테크 기업, 제4 인터넷 은행 도전장",
    subheadline: "#금융시장변화",
    content: "금융권의 메기 효과를 노리는 핀테크 유니콘 기업들이 '제4 인터넷 전문은행' 인가 획득을 위해 컨소시엄 구성에 나섰다. 기존 카카오뱅크, 토스뱅크와의 차별화를 위해 소상공인 특화 금융과 글로벌 송금 서비스를 핵심 경쟁력으로 내세우고 있다.\n\n금융 당국 또한 은행권의 과점 체제를 해소하고 혁신을 유도하기 위해 신규 진입을 적극 허용하겠다는 입장이다. 특히 빅데이터 기반의 신용평가 모델(CSS)을 고도화하여 중저신용자 대출을 확대할 수 있는지가 인가 심사의 핵심이 될 전망이다.\n\n업계에서는 내년 상반기 중 새로운 인터넷 은행이 출범할 것으로 내다보고 있다.",
    topic: "금융",
    date: "2025년 3월 13일 목요일",
    imageUrl: "https://picsum.photos/seed/finance3/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 68000
  },
  {
    id: "sample-fin-4",
    headline: "개인투자자 채권 매수세 역대 최고치 기록",
    subheadline: "#금융시장변화",
    content: "주식 시장의 변동성이 커지면서 안정적인 수익을 추구하는 '채권 개미'들이 급증하고 있다. 금융투자협회에 따르면 올해 개인 투자자의 장외 채권 순매수 규모는 이미 작년 전체 기록을 넘어섰다.\n\n과거 기관 투자자의 영역이었던 채권 시장이 모바일 트레이딩 시스템(MTS)을 통해 접근성이 좋아지면서 대중화된 것이다. 특히 연 4% 이상의 수익률을 보장하는 우량 회사채와 절세 혜택이 있는 국채에 자금이 몰리고 있다.\n\n증권사들은 소액으로도 채권에 투자할 수 있는 다양한 리테일 상품을 출시하며 고객 유치 경쟁을 벌이고 있다.",
    topic: "금융",
    date: "2025년 3월 14일 금요일",
    imageUrl: "https://picsum.photos/seed/finance4/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 65000
  },
  {
    id: "sample-fin-5",
    headline: "금융당국, 가상자산 거래소 규제 강화안 입법 예고",
    subheadline: "#금융시장변화",
    content: "금융위원회는 가상자산 이용자 보호를 위한 규제 강화 법안을 입법 예고했다. 이번 법안은 거래소의 예치금 관리 의무를 강화하고, 시세 조종 등 불공정 거래 행위에 대한 처벌 수위를 주식 시장 수준으로 높이는 것을 골자로 한다.\n\n최근 잇따른 해외 거래소 파산 사태로 인해 국내 투자자 보호의 필요성이 대두되었기 때문이다. 거래소들은 시스템 개편과 내부 통제 강화에 착수했으며, 일부 부실 코인에 대한 상장 폐지 절차도 진행 중이다.\n\n시장 전문가들은 '건전한 시장 질서 확립을 통해 가상자산이 제도권 금융 자산으로 인정받는 계기가 될 것'이라고 평가했다.",
    topic: "금융",
    date: "2025년 3월 15일 토요일",
    imageUrl: "https://picsum.photos/seed/finance5/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 62000
  },
  {
    id: "sample-fin-6",
    headline: "해외 여행객 급증에 환전 수수료 무료 경쟁 치열",
    subheadline: "#금융시장변화",
    content: "해외 여행 수요가 폭발하면서 은행과 핀테크사 간의 '환전 전쟁'이 점입가경이다. 주요 핀테크 앱들이 '환전 수수료 평생 무료'를 선언하자, 시중은행들도 앞다퉈 100% 우대율을 적용한 여행 특화 카드를 출시하고 있다.\n\n이제 소비자들은 달러, 엔화뿐만 아니라 전 세계 통화를 수수료 없이 실시간으로 충전하여 현지에서 결제할 수 있게 되었다. 이로 인해 사설 환전소나 공항 환전소를 찾는 발길은 뚝 끊겼다.\n\n금융권 관계자는 '환전 수수료 수익을 포기하더라도 플랫폼 트래픽을 확보하고 결제 데이터를 수집하려는 전략'이라고 분석했다.",
    topic: "금융",
    date: "2025년 3월 15일 토요일",
    imageUrl: "https://picsum.photos/seed/finance6/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 58000
  },

  // === 투자 (Investment) === Tag: #2025투자전략
  {
    id: "sample-inv-1",
    headline: "2025 유망 투자 섹터: 우주 항공과 바이오 헬스",
    subheadline: "#2025투자전략",
    content: "증권가 애널리스트들이 꼽은 2025년 최고의 유망 투자처는 '우주'와 '바이오'다. 스페이스X의 스타쉽 성공 이후 민간 우주 개발 기업들의 상장이 줄을 잇고 있으며, 위성 인터넷 및 우주 자원 채굴 관련 기업들의 주가가 연일 고공행진 중이다.\n\n한편, 전 세계적인 고령화 추세 속에 노화 제어 및 맞춤형 유전자 치료제 시장도 급성장하고 있다. 특히 AI 신약 개발 플랫폼을 보유한 바이오 벤처 기업들에 대한 벤처 캐피탈의 투자가 집중되고 있다.\n\n전문가들은 '단기적인 테마보다는 기술적 해자(Moat)를 보유한 1등 기업을 선별하여 장기 투자하는 전략이 유효하다'고 조언했다.",
    topic: "투자",
    date: "2025년 3월 14일 금요일",
    imageUrl: "https://picsum.photos/seed/invest1/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 60000
  },
  {
    id: "sample-inv-2",
    headline: "부동산 시장의 지각 변동, '스마트 에코 시티'가 뜬다",
    subheadline: "#2025투자전략",
    content: "부동산 시장의 트렌드가 '입지'에서 '삶의 질'로 이동하고 있다. 단순히 역세권을 선호하던 과거와 달리, 에너지 효율이 높고 AI 기반 홈 네트워크 시스템이 완비된 '스마트 에코 아파트'가 새로운 대세로 떠오르고 있다.\n\n태양광 패널 일체형 외장재와 지열 냉난방 시스템을 갖춘 단지들은 관리비 절감 효과가 탁월해 실수요자들의 선호도가 높다. 또한, 단지 내에서 로봇 배송, 원격 의료상담 등 첨단 서비스를 누릴 수 있는 커뮤니티 시설이 집값을 결정하는 주요 요인이 되고 있다.\n\n건설사들은 이러한 수요에 맞춰 IT 기업과의 협업을 강화하며 차별화된 주거 상품 개발에 열을 올리고 있다.",
    topic: "투자",
    date: "2025년 3월 15일 토요일",
    imageUrl: "https://picsum.photos/seed/invest2/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 50000
  },
  {
    id: "sample-inv-3",
    headline: "배터리 소재 기업, 북미 공장 증설로 주가 급등",
    subheadline: "#2025투자전략",
    content: "국내 주요 배터리 소재 기업들이 북미 시장 공략을 가속화하며 주식 시장의 주도주로 복귀했다. 미국 인플레이션 감축법(IRA) 혜택을 극대화하기 위해 현지 생산 공장 증설 계획을 잇달아 발표하자 투자 심리가 폭발한 것이다.\n\n특히 차세대 소재로 꼽히는 실리콘 음극재와 전고체 배터리용 고체 전해질 기술을 보유한 기업들이 주목받고 있다. 글로벌 완성차 업체들과의 장기 공급 계약 소식도 주가 상승의 기폭제가 되었다.\n\n증권가는 '전기차 시장의 일시적 수요 둔화(Chasm) 우려에도 불구하고, 소재 산업의 장기 성장성은 여전히 유효하다'고 평가했다.",
    topic: "투자",
    date: "2025년 3월 16일 일요일",
    imageUrl: "https://picsum.photos/seed/invest3/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 48000
  },
  {
    id: "sample-inv-4",
    headline: "엔터테인먼트 업계, 신인 그룹 데뷔 러시에 투자 심리 회복",
    subheadline: "#2025투자전략",
    content: "한동안 조정을 겪었던 엔터테인먼트주가 대형 기획사들의 신인 아이돌 그룹 데뷔 소식에 힘입어 반등하고 있다. K-POP의 글로벌 팬덤이 더욱 확장되면서 신인 그룹들의 앨범 초동 판매량이 신기록을 경신하는 등 수익화 시점이 빨라지고 있다.\n\n또한 공연 시장의 호황으로 월드 투어 규모가 커지면서 기획사들의 실적 개선 기대감이 높아졌다. 메타버스와 연계된 버추얼 아이돌 시장의 성장 가능성도 새로운 투자 포인트로 꼽힌다.\n\n투자자들은 '제2의 BTS'를 발굴하려는 기대감 속에 엔터주 비중을 확대하고 있는 모습이다.",
    topic: "투자",
    date: "2025년 3월 16일 일요일",
    imageUrl: "https://picsum.photos/seed/invest4/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 45000
  },
  {
    id: "sample-inv-5",
    headline: "원자력 발전 관련주, 글로벌 에너지 정책 변화에 수혜 기대",
    subheadline: "#2025투자전략",
    content: "유럽연합(EU)이 원자력을 '친환경 투자(Taxonomy)'에 포함시킨 데 이어, 주요국들이 탄소 중립 달성을 위해 원전 비중 확대를 선언하면서 국내 원전 관련주가 들썩이고 있다. 한국형 원전의 수출 경쟁력이 부각되면서 체코, 폴란드 등에서의 수주 기대감도 커지고 있다.\n\n특히 차세대 원전으로 불리는 소형모듈원자로(SMR) 기술 관련 기업들에 대한 관심이 뜨겁다. SMR은 대형 원전 대비 안전성이 높고 건설 비용이 저렴해 미래 에너지 시장의 핵심 기술로 평가받는다.\n\n자산운용사들은 원전 테마 ETF(상장지수펀드)를 잇달아 출시하며 자금 유입을 이끌고 있다.",
    topic: "투자",
    date: "2025년 3월 17일 월요일",
    imageUrl: "https://picsum.photos/seed/invest5/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 42000
  },
  {
    id: "sample-inv-6",
    headline: "리츠(REITs) 시장, 금리 인하 기대감에 반등 시도",
    subheadline: "#2025투자전략",
    content: "고금리 여파로 부진했던 리츠(REITs·부동산투자회사) 시장이 기지개를 켜고 있다. 금리 인하 사이클이 도래하면 리츠의 조달 비용이 감소하고 배당 매력이 부각될 것이라는 분석 때문이다.\n\n특히 서울 주요 오피스 빌딩의 공실률이 자연실업률 수준인 2%대를 유지하고 있어, 오피스 리츠의 안정적인 임대 수익이 기대된다. 최근에는 데이터센터, 물류센터 등 성장형 자산을 편입한 리츠 상품도 인기를 끌고 있다.\n\n전문가들은 '시세 차익보다는 안정적인 배당 수익을 노리는 중장기 투자자에게 적합한 시점'이라고 조언했다.",
    topic: "투자",
    date: "2025년 3월 17일 월요일",
    imageUrl: "https://picsum.photos/seed/invest6/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 38000
  },

  // === 기술 (Technology) === Tag: #AI와미래기술
  {
    id: "sample-tech-1",
    headline: "생성형 AI를 넘어 '에이전트 AI' 시대로",
    subheadline: "#AI와미래기술",
    content: "텍스트나 이미지를 만들어주던 생성형 AI가 이제는 사용자의 명령을 수행하고 복잡한 업무를 자동화하는 '에이전트(Agent) AI'로 진화하고 있다. 에이전트 AI는 단순한 질의응답을 넘어, 여행 계획 수립부터 예약, 결제까지 스스로 처리하는 능력을 보여준다.\n\n마이크로소프트와 구글 등 빅테크 기업들은 자사의 OS와 검색 엔진에 에이전트 기능을 통합하며 플랫폼 경쟁을 벌이고 있다. 이는 기업의 업무 생산성을 획기적으로 높이는 동시에, 개인 비서 서비스의 대중화를 앞당길 것으로 예상된다.\n\nAI 윤리 전문가는 '자율성이 부여된 AI에 대한 통제권과 책임 소재를 명확히 하는 법적 논의가 시급하다'고 지적했다.",
    topic: "기술",
    date: "2025년 3월 16일 일요일",
    imageUrl: "https://picsum.photos/seed/tech1/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 40000
  },
  {
    id: "sample-tech-2",
    headline: "꿈의 컴퓨터 '양자 컴퓨터', 상용화 가시권 진입",
    subheadline: "#AI와미래기술",
    content: "양자 역학의 원리를 이용한 양자 컴퓨터(Quantum Computer) 개발 경쟁이 국가 대항전 양상을 띠고 있다. 최근 미국 연구팀이 오류 수정 기능을 갖춘 큐비트 프로세서 개발에 성공하면서, 이론 단계에 머물렀던 양자 컴퓨팅의 상용화 가능성이 크게 높아졌다.\n\n양자 컴퓨터는 신약 개발, 신소재 발굴, 기상 예측 등 방대한 데이터 처리가 필요한 분야에서 혁명적인 변화를 가져올 것이다. 특히 암호 체계의 무력화 우려가 제기됨에 따라, 양자 내성 암호(PQC) 기술 개발도 동시에 진행되고 있다.\n\n과학기술정보통신부는 '양자 기술은 미래 산업의 게임 체인저'라며 국가 차원의 R&D 투자를 대폭 확대하겠다고 발표했다.",
    topic: "기술",
    date: "2025년 3월 16일 일요일",
    imageUrl: "https://picsum.photos/seed/tech2/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 30000
  },
  {
    id: "sample-tech-3",
    headline: "자율주행 레벨4 택시, 서울 도심 시범 운행 시작",
    subheadline: "#AI와미래기술",
    content: "운전석에 사람이 없는 완전 자율주행(레벨4) 택시가 서울 강남 한복판을 달리기 시작했다. 서울시는 국토부와 협력하여 심야 시간대 자율주행 택시 시범 운행 지구를 지정하고, 일반 시민을 대상으로 호출 서비스를 개시했다.\n\n라이다(LiDAR) 센서와 고정밀 지도를 탑재한 이 택시는 복잡한 도심 환경에서도 보행자와 신호를 정확히 인식하여 안전하게 주행했다. 이용자들은 '처음엔 불안했지만 운전 실력이 사람보다 낫다'며 긍정적인 반응을 보였다.\n\n업계는 이번 시범 운행이 자율주행 기술의 신뢰성을 입증하고 상용화 시기를 앞당기는 분기점이 될 것으로 보고 있다.",
    topic: "기술",
    date: "2025년 3월 17일 월요일",
    imageUrl: "https://picsum.photos/seed/tech3/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 28000
  },
  {
    id: "sample-tech-4",
    headline: "차세대 6G 통신 표준 선점 경쟁 가속화",
    subheadline: "#AI와미래기술",
    content: "5G가 상용화된 지 불과 몇 년 지나지 않았지만, 세계 각국은 이미 6세대 이동통신(6G) 기술 패권을 쥐기 위해 치열한 물밑 경쟁을 벌이고 있다. 6G는 5G보다 전송 속도가 최대 50배 빠르고 지연 시간은 10분의 1로 줄어들어, 홀로그램 통신과 에어 택시(UAM) 상용화의 필수 인프라로 꼽힌다.\n\n삼성전자는 최근 6G 주파수 대역에서의 무선 전송 실험에 성공하며 기술 리더십을 과시했다. 정부도 'K-네트워크 2030' 전략을 발표하고 6G 원천 기술 확보에 6천억 원을 투입하기로 했다.\n\n전문가들은 2028년경 6G 상용화가 시작되면 현실과 가상의 경계가 허물어지는 진정한 메타버스 시대가 열릴 것이라고 전망했다.",
    topic: "기술",
    date: "2025년 3월 18일 화요일",
    imageUrl: "https://picsum.photos/seed/tech4/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 25000
  },
  {
    id: "sample-tech-5",
    headline: "입는 로봇(Wearable Robot), 산업 현장 넘어 일상으로",
    subheadline: "#AI와미래기술",
    content: "무거운 짐을 손쉽게 들어 올리고, 보행이 불편한 노인의 걷기를 돕는 '웨어러블 로봇' 시장이 급성장하고 있다. 초기에는 산업 현장의 근로자 근골격계 질환 예방용으로 도입되었으나, 최근에는 경량화 기술이 발전하며 일상 보조용, 재활용, 레저용으로 용도가 확대되고 있다.\n\n국내 스타트업이 개발한 보행 보조 로봇은 CES 혁신상을 수상하며 기술력을 인정받았다. 대기업들도 로봇 사업을 신성장 동력으로 낙점하고 관련 제품 출시에 속도를 내고 있다.\n\n가격 경쟁력만 확보된다면 1가구 1로봇 시대도 머지않았다는 것이 업계의 중론이다.",
    topic: "기술",
    date: "2025년 3월 18일 화요일",
    imageUrl: "https://picsum.photos/seed/tech5/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 22000
  },
  {
    id: "sample-tech-6",
    headline: "사이버 보안 위협 고조, AI 보안 솔루션 시장 급성장",
    subheadline: "#AI와미래기술",
    content: "AI 기술이 발전함에 따라 해킹 수법도 더욱 교묘하고 지능화되고 있다. 딥페이크를 이용한 피싱이나 AI가 작성한 악성코드가 등장하면서 기존의 보안 시스템으로는 방어가 어려워진 상황이다.\n\n이에 맞서 보안 업계도 AI를 활용한 방어 체계 구축에 나섰다. AI 보안 솔루션은 네트워크 트래픽을 실시간으로 분석하여 이상 징후를 사전에 탐지하고, 알려지지 않은 신종 위협에도 스스로 대응하는 학습 능력을 갖추고 있다.\n\n기업들의 보안 투자가 늘어나면서 정보보안 관련 주식들도 강세를 보이고 있다.",
    topic: "기술",
    date: "2025년 3월 19일 수요일",
    imageUrl: "https://picsum.photos/seed/tech6/800/400",
    sources: [],
    isGenerated: false,
    timestamp: Date.now() - 20000
  }
];

export const getStoredArticles = (): ArticleData[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Initialize with sample data if empty
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_ARTICLES));
      return SAMPLE_ARTICLES;
    }
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to load articles", e);
    return [];
  }
};

export const saveArticle = (article: ArticleData): void => {
  const articles = getStoredArticles();
  
  // If article has an ID, check if it exists to update
  let existingIndex = -1;
  if (article.id) {
    existingIndex = articles.findIndex(a => a.id === article.id);
  }

  if (existingIndex > -1) {
    // Update existing
    articles[existingIndex] = {
      ...articles[existingIndex],
      ...article,
      timestamp: Date.now() // Update timestamp to bump to top or keep original? Usually edit bumps timestamp.
    };
  } else {
    // Create new
    const newArticle = {
      ...article,
      id: article.id || crypto.randomUUID(),
      timestamp: article.timestamp || Date.now(),
    };
    articles.unshift(newArticle);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
};

export const deleteArticle = (id: string): void => {
  const articles = getStoredArticles();
  const updated = articles.filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};