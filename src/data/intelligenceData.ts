export interface MarketStat {
  label: string;
  value: string;
  unit: string;
  icon: string; // Lucide React icon name as a string
  color: string; // Tailwind CSS color class
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface MarketAlert {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: 'critical' | 'warning' | 'info';
}

export interface MarketNews {
  id: string;
  title: string;
  description: string;
  date: Date;
  source: string;
  url: string;
}

export interface AIReport {
  id: string;
  title: string;
  date: Date;
  parameters: any; // Store the parameters used to generate the report
  content: string; // The generated report content
}

// Sample Data for Market Intelligence Dashboard
export const sampleMarketStats: MarketStat[] = [
  {
    label: 'Total VC Market',
    value: '$337.4B',
    unit: 'USD',
    icon: 'DollarSign',
    color: 'blue'
  },
  {
    label: 'MENA Investment',
    value: '$2.3B',
    unit: 'USD',
    icon: 'MapPin',
    color: 'purple'
  },
  {
    label: 'Growth Rate',
    value: '+17.56%',
    unit: '',
    icon: 'TrendingUp',
    color: 'green'
  },
  {
    label: 'Active Ventures',
    value: '12,500+',
    unit: '',
    icon: 'Building2',
    color: 'yellow'
  },
  {
    label: 'Success Rate',
    value: '23%',
    unit: '',
    icon: 'Target',
    color: 'red'
  }
];

export const sampleMacroIntelligence: any = {
  economicStability: {
    index: 'Stable',
    gdpGrowth: '3.8%',
    inflation: '2.1%',
    currencyStability: 'High'
  },
  politicalRisk: {
    barometer: 'Low-Moderate',
    governmentStability: 'High',
    policyContinuity: 'Good'
  },
  regulatoryLandscape: {
    tracker: 'Evolving',
    recentChanges: 'New fintech licenses, relaxed foreign ownership laws',
    upcomingShifts: 'Data privacy regulations, AI governance frameworks'
  },
  marketAccessibility: {
    score: 'High',
    easeOfEntry: 'Improving',
    operationalComplexity: 'Moderate'
  },
  infrastructureReadiness: {
    gauge: 'Advanced',
    digital: 'Excellent',
    financial: 'Strong',
    physical: 'Good'
  },
  macroTrendIndicators: {
    demographicShifts: 'Youth bulge, growing middle class',
    technologicalAdoption: 'Rapid digital adoption, AI integration',
    socialChanges: 'Increasing female workforce participation, urbanization'
  }
};

export const sampleMicroIntelligence: any = {
  marketFundamentals: {
    marketSize: {
      fintech: { tam: '$31B', sam: '$15B', som: '$5B', growth: '23% CAGR' },
      ecommerce: { tam: '$28B', sam: '$14B', som: '$7B', growth: '18% CAGR' },
      healthtech: { tam: '$2.8B', sam: '$1.2B', som: '$0.5B', growth: '30% CAGR' }
    },
    marketBehavior: {
      fintech: 'High mobile adoption, increasing digital payments',
      ecommerce: 'Strong mobile commerce, social commerce growth',
      healthtech: 'Growing telemedicine, digital health records adoption'
    },
    competitiveIntensity: {
      fintech: 'Moderate, increasing competition from local and international players',
      ecommerce: 'High, dominated by regional and global giants',
      healthtech: 'Low-Moderate, emerging market with significant opportunities'
    }
  },
  growthForecast: {
    growthTrend: [
      { year: 2022, value: 100 },
      { year: 2023, value: 120 },
      { year: 2024, value: 150 },
      { year: 2025, value: 180 },
      { year: 2026, value: 220 }
    ],
    marketLifecycle: {
      fintech: 'Growth',
      ecommerce: 'Mature-Growth',
      healthtech: 'Emerging'
    },
    forecastConfidence: 'High'
  },
  strategicIntelligence: {
    opportunityMatrix: [
      'B2B SaaS in underserved sectors (High Impact, Low Competition)',
      'Climate Tech solutions (High Impact, Moderate Competition)',
      'EdTech for vocational training (Moderate Impact, Low Competition)'
    ],
    challengeAssessment: [
      'Regulatory hurdles in new markets (High Severity, Moderate Probability)',
      'Talent acquisition and retention (Moderate Severity, High Probability)',
      'Access to early-stage funding (Moderate Severity, Moderate Probability)'
    ],
    marketTiming: 'Optimal entry window for Healthtech and Climate Tech'
  }
};

export const sampleAIMarketSummary: any = {
  executiveOverview: 'The MENA venture market continues its robust growth, driven by strong digital adoption and supportive government initiatives. Fintech and E-commerce remain dominant, while Healthtech shows significant emerging potential.',
  keyInsights: [
    'Digital payments are rapidly expanding, with mobile penetration driving adoption.',
    'Government policies are increasingly favorable, attracting more foreign direct investment.',
    'Talent remains a key challenge, but educational reforms are addressing skill gaps.',
    'Secondary market trading is gaining traction, offering new liquidity options.'
  ],
  marketSentiment: 'Positive',
  confidenceScore: '85%',
  dataFreshness: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
};

export const sampleMarketAlerts: MarketAlert[] = [
  {
    id: 'alert1',
    title: 'New Regulatory Sandbox Launched in UAE',
    description: 'The Dubai Financial Services Authority (DFSA) has announced the launch of a new regulatory sandbox for fintech innovations, aiming to foster a more agile regulatory environment.',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    type: 'critical'
  },
  {
    id: 'alert2',
    title: 'Saudi Arabia Announces Vision 2030 Investment Boost',
    description: 'The Public Investment Fund (PIF) is set to increase its allocation to local startups as part of the Vision 2030 diversification efforts, creating new opportunities for venture capital.',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    type: 'info'
  },
  {
    id: 'alert3',
    title: 'Global Supply Chain Disruptions Impacting E-commerce',
    description: 'Ongoing global supply chain issues are causing delays and increased costs for e-commerce businesses in the MENA region, requiring strategic adjustments.',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    type: 'warning'
  }
];

export const sampleMarketNews: MarketNews[] = [
  {
    id: 'news1',
    title: 'MENA Fintech Funding Reaches Record High in Q1',
    description: 'The Middle East and North Africa region witnessed unprecedented fintech funding in the first quarter, signaling strong investor confidence.',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    source: 'TechCrunch',
    url: '#'
  },
  {
    id: 'news2',
    title: 'Egypt\'s Startup Ecosystem Attracts International Investors',
    description: 'A growing number of international venture capital firms are turning their attention to Egypt\'s burgeoning startup scene, particularly in the healthtech and edtech sectors.',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    source: 'Forbes Middle East',
    url: '#'
  },
  {
    id: 'news3',
    title: 'AI Adoption Accelerates Across GCC Industries',
    description: 'Artificial intelligence is being rapidly integrated into various industries across the Gulf Cooperation Council, driving efficiency and innovation.',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    source: 'Arabian Business',
    url: '#'
  }
];

// Sample Data for AI Report Development
export const sampleAIReports: AIReport[] = [
  {
    id: 'report1',
    title: 'Fintech Market Analysis: UAE Q2 2025',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    parameters: {
      industry: 'Fintech',
      market: 'UAE',
      topic: 'Market Trends',
      purpose: 'Investment Opportunity Identification'
    },
    content: `## Fintech Market Analysis: UAE Q2 2025

### Executive Summary
The UAE fintech market continues its rapid expansion in Q2 2025, driven by supportive regulatory frameworks, increasing digital adoption, and a vibrant startup ecosystem. Key growth areas include digital payments, Sharia-compliant fintech, and regtech solutions. Investor interest remains high, with significant capital inflows into early-stage and growth-stage companies.

### Key Insights
*   **Digital Payments Dominance:** Mobile payment solutions and e-wallets are experiencing exponential growth, fueled by consumer preference for contactless transactions and government initiatives promoting a cashless economy.
*   **Regulatory Innovation:** The Central Bank of UAE and financial free zones (ADGM, DIFC) are actively fostering innovation through regulatory sandboxes and progressive licensing regimes, attracting both local and international fintech players.
*   **Emergence of Niche Segments:** Specialized fintech solutions catering to SMEs, Islamic finance, and sustainable finance are gaining traction, indicating a maturing market with diverse needs.
*   **Talent Landscape:** While demand for skilled fintech professionals is high, the UAE is actively investing in talent development programs and attracting global expertise to bridge the gap.

### Market Trends
1.  **Embedded Finance:** Non-financial companies are increasingly integrating financial services directly into their platforms, creating seamless user experiences.
2.  **AI and Blockchain Integration:** AI-driven analytics for fraud detection and personalized financial advice, alongside blockchain for secure transactions and smart contracts, are becoming standard.
3.  **Sustainable Finance:** Growing demand for green financial products and ESG-compliant investment opportunities.

### Competitive Landscape
The market is characterized by a mix of established banks, agile fintech startups, and international players. Collaboration between traditional institutions and fintechs is a growing trend, often through accelerators and corporate venture arms.

### Conclusion
The UAE's strategic vision, coupled with its robust digital infrastructure and proactive regulatory stance, positions it as a leading fintech hub in the MENA region. Opportunities abound for innovative solutions addressing evolving consumer and business needs.
`
  },
  {
    id: 'report2',
    title: 'Healthtech Investment Landscape: MENA H1 2025',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    parameters: {
      industry: 'Healthtech',
      market: 'MENA',
      topic: 'Investment Trends',
      purpose: 'Market Entry Strategy'
    },
    content: `## Healthtech Investment Landscape: MENA H1 2025

### Executive Summary
The MENA healthtech sector is experiencing a significant surge in investment during H1 2025, driven by increased demand for digital health solutions, government-led healthcare transformation initiatives, and a growing awareness of preventative care. Telemedicine, AI diagnostics, and health management platforms are attracting substantial capital.

### Key Insights
*   **Telemedicine Boom:** The pandemic accelerated telemedicine adoption, and this trend continues with sustained user engagement and expanding service offerings. Investors are keen on platforms that offer comprehensive virtual care.
*   **Government Support:** Healthcare is a strategic priority across MENA, with governments actively investing in digital infrastructure and regulatory frameworks to support healthtech innovation.
*   **AI in Diagnostics:** Artificial intelligence is revolutionizing diagnostics, enabling faster and more accurate disease detection. Solutions leveraging AI for medical imaging analysis and predictive analytics are highly sought after.
*   **Preventative Health Focus:** A shift towards preventative health and chronic disease management is creating opportunities for digital platforms that empower individuals to manage their health proactively.

### Market Trends
1.  **Personalized Healthcare:** Data-driven personalized treatment plans and wellness programs.
2.  **Remote Patient Monitoring:** Wearable tech and IoT devices for continuous health tracking.
3.  **Digital Mental Health:** Growing recognition and investment in mental health support platforms.

### Competitive Landscape
The healthtech market is fragmented but rapidly consolidating. Local startups are innovating to address regional specificities, while international players are entering through partnerships and acquisitions.

### Conclusion
MENA's healthtech market presents a fertile ground for investors, with strong tailwinds from both demand-side and supply-side factors. Companies offering scalable, impactful, and regulatory-compliant solutions are well-positioned for success.
`
  }
];