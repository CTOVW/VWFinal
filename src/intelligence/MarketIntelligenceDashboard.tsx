import React, { useState, useEffect } from 'react';
import {
  DollarSign, MapPin, TrendingUp, Building2, Target,
  Filter, Globe, Activity, PieChart, LineChart, Info,
  BarChart3, Zap, Users, Scale, Landmark, ShieldCheck,
  CheckCircle, Lightbulb, AlertTriangle, Newspaper, Brain
} from 'lucide-react';
import {
  sampleMarketStats,
  sampleMacroIntelligence,
  sampleMicroIntelligence,
  sampleAIMarketSummary,
  sampleMarketAlerts,
  sampleMarketNews
} from '../data/intelligenceData';

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  linkedinProfile: string;
  country: string;
  language: string;
  currentOccupation: string;
  yearsExperience: string;
  entrepreneurialExperience: string;
  industryExpertise: string;
  marketExpertise: string;
  keySkills: string;
  company: string;
  companyLinkedin: string;
  companyType: string;
  industryFocus: string;
  origin: string;
  companySize: string;
  portfolioSize: string;
  headquarters: string;
  operatingMarkets: string;
  targetClients: string;
  keyCapabilities: string;
}

interface PreferencesData {
  riskTolerance: string;
  investmentHorizon: string;
  primaryMotivation: string;
  preferredIndustries: string[];
  geographicFocus: string[];
  collaborationStyle: string;
  decisionMakingStyle: string;
  learningPreference: string;
  communicationStyle: string;
  workingStyle: string;
}

interface MarketIntelligenceDashboardProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  preferences: PreferencesData;
}

function MarketIntelligenceDashboard({
  isAICompanionOpen,
  aiCompanionWidth,
  toggleAICompanion,
  selectedRole,
  profileData,
  preferences
}: MarketIntelligenceDashboardProps) {
  const [geographicGranularity, setGeographicGranularity] = useState(profileData.country || 'Global');
  const [industryDepth, setIndustryDepth] = useState(preferences.preferredIndustries.length > 0 ? preferences.preferredIndustries[0] : 'Broad Sector');
  const [topicFocus, setTopicFocus] = useState('Regulatory');
  const [dataSource, setDataSource] = useState('Platform Data');
  const [updateFrequency, setUpdateFrequency] = useState('Daily');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      DollarSign, MapPin, TrendingUp, Building2, Target,
      Globe, Activity, PieChart, LineChart, Info, BarChart3,
      Zap, Users, Scale, Landmark, ShieldCheck, CheckCircle,
      Lightbulb, AlertTriangle, Newspaper
    };
    return icons[iconName] || Info;
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Market Intelligence Dashboard</h1>
          <p className="text-white/80">Curated market insights, trend analysis, and ecosystem intelligence</p>
        </div>

        {/* Filter Panel */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
          <h3 className="text-white font-semibold mb-4">Customize Your View</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">Geographic Granularity</label>
              <select
                value={geographicGranularity}
                onChange={(e) => setGeographicGranularity(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Global" className="bg-slate-800">Global</option>
                <option value="MENA" className="bg-slate-800">MENA Region</option>
                <option value="UAE" className="bg-slate-800">UAE</option>
                <option value="SA" className="bg-slate-800">Saudi Arabia</option>
                <option value="EG" className="bg-slate-800">Egypt</option>
              </select>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Industry Depth</label>
              <select
                value={industryDepth}
                onChange={(e) => setIndustryDepth(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Broad Sector" className="bg-slate-800">Broad Sector</option>
                <option value="Fintech" className="bg-slate-800">Fintech</option>
                <option value="Healthtech" className="bg-slate-800">Healthtech</option>
                <option value="E-commerce" className="bg-slate-800">E-commerce</option>
              </select>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Topic Focus</label>
              <select
                value={topicFocus}
                onChange={(e) => setTopicFocus(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Regulatory" className="bg-slate-800">Regulatory</option>
                <option value="Technology" className="bg-slate-800">Technology</option>
                <option value="Market Dynamics" className="bg-slate-800">Market Dynamics</option>
              </select>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Data Source</label>
              <select
                value={dataSource}
                onChange={(e) => setDataSource(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Platform Data" className="bg-slate-800">Platform Data</option>
                <option value="Government" className="bg-slate-800">Government</option>
                <option value="Private Research" className="bg-slate-800">Private Research</option>
              </select>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Update Frequency</label>
              <select
                value={updateFrequency}
                onChange={(e) => setUpdateFrequency(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Daily" className="bg-slate-800">Daily</option>
                <option value="Weekly" className="bg-slate-800">Weekly</option>
                <option value="Monthly" className="bg-slate-800">Monthly</option>
              </select>
            </div>
          </div>
        </div>

        {/* General Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {sampleMarketStats.map((stat, index) => {
            const IconComponent = getIconComponent(stat.icon);
            return (
              <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                <div className={`bg-${stat.color}-500/20 p-3 rounded-lg w-fit mx-auto mb-4`}>
                  <IconComponent className={`h-6 w-6 text-${stat.color}-300`} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Macro Intelligence */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Macro Intelligence</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <Scale className="h-5 w-5 text-blue-300" />
                <span>Economic Environment</span>
              </h3>
              <p className="text-white/80 text-sm">Stability Index: <span className="font-medium">{sampleMacroIntelligence.economicStability.index}</span></p>
              <p className="text-white/80 text-sm">GDP Growth: <span className="font-medium">{sampleMacroIntelligence.economicStability.gdpGrowth}</span></p>
              <p className="text-white/80 text-sm">Inflation: <span className="font-medium">{sampleMacroIntelligence.economicStability.inflation}</span></p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <Landmark className="h-5 w-5 text-purple-300" />
                <span>Political Risk Barometer</span>
              </h3>
              <p className="text-white/80 text-sm">Risk Level: <span className="font-medium">{sampleMacroIntelligence.politicalRisk.barometer}</span></p>
              <p className="text-white/80 text-sm">Government Stability: <span className="font-medium">{sampleMacroIntelligence.politicalRisk.governmentStability}</span></p>
              <p className="text-white/80 text-sm">Policy Continuity: <span className="font-medium">{sampleMacroIntelligence.politicalRisk.policyContinuity}</span></p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-green-300" />
                <span>Regulatory Landscape Tracker</span>
              </h3>
              <p className="text-white/80 text-sm">Status: <span className="font-medium">{sampleMacroIntelligence.regulatoryLandscape.tracker}</span></p>
              <p className="text-white/80 text-sm">Recent Changes: <span className="font-medium">{sampleMacroIntelligence.regulatoryLandscape.recentChanges}</span></p>
              <p className="text-white/80 text-sm">Upcoming Shifts: <span className="font-medium">{sampleMacroIntelligence.regulatoryLandscape.upcomingShifts}</span></p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <Globe className="h-5 w-5 text-yellow-300" />
                <span>Market Accessibility Score</span>
              </h3>
              <p className="text-white/80 text-sm">Score: <span className="font-medium">{sampleMacroIntelligence.marketAccessibility.score}</span></p>
              <p className="text-white/80 text-sm">Ease of Entry: <span className="font-medium">{sampleMacroIntelligence.marketAccessibility.easeOfEntry}</span></p>
              <p className="text-white/80 text-sm">Operational Complexity: <span className="font-medium">{sampleMacroIntelligence.marketAccessibility.operationalComplexity}</span></p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <Zap className="h-5 w-5 text-red-300" />
                <span>Infrastructure Readiness Gauge</span>
              </h3>
              <p className="text-white/80 text-sm">Gauge: <span className="font-medium">{sampleMacroIntelligence.infrastructureReadiness.gauge}</span></p>
              <p className="text-white/80 text-sm">Digital: <span className="font-medium">{sampleMacroIntelligence.infrastructureReadiness.digital}</span></p>
              <p className="text-white/80 text-sm">Financial: <span className="font-medium">{sampleMacroIntelligence.infrastructureReadiness.financial}</span></p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-indigo-300" />
                <span>Macro Trend Indicators</span>
              </h3>
              <p className="text-white/80 text-sm">Demographic Shifts: <span className="font-medium">{sampleMacroIntelligence.macroTrendIndicators.demographicShifts}</span></p>
              <p className="text-white/80 text-sm">Technological Adoption: <span className="font-medium">{sampleMacroIntelligence.macroTrendIndicators.technologicalAdoption}</span></p>
              <p className="text-white/80 text-sm">Social Changes: <span className="font-medium">{sampleMacroIntelligence.macroTrendIndicators.socialChanges}</span></p>
            </div>
          </div>
        </div>

        {/* Micro Intelligence */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Micro Intelligence</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Market Fundamentals */}
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-300" />
                <span>Market Fundamentals</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-1">Market Size Visualization</h4>
                  <p className="text-white/80 text-sm">Fintech: TAM {sampleMicroIntelligence.marketFundamentals.marketSize.fintech.tam}, SAM {sampleMicroIntelligence.marketFundamentals.marketSize.fintech.sam}, SOM {sampleMicroIntelligence.marketFundamentals.marketSize.fintech.som} ({sampleMicroIntelligence.marketFundamentals.marketSize.fintech.growth})</p>
                  <p className="text-white/80 text-sm">Healthtech: TAM {sampleMicroIntelligence.marketFundamentals.marketSize.healthtech.tam}, SAM {sampleMicroIntelligence.marketFundamentals.marketSize.healthtech.sam}, SOM {sampleMicroIntelligence.marketFundamentals.marketSize.healthtech.som} ({sampleMicroIntelligence.marketFundamentals.marketSize.healthtech.growth})</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Market Behavior Analysis</h4>
                  <p className="text-white/80 text-sm">Fintech: {sampleMicroIntelligence.marketFundamentals.marketBehavior.fintech}</p>
                  <p className="text-white/80 text-sm">E-commerce: {sampleMicroIntelligence.marketFundamentals.marketBehavior.ecommerce}</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Competitive Intensity Heatmap</h4>
                  <p className="text-white/80 text-sm">Fintech: {sampleMicroIntelligence.marketFundamentals.competitiveIntensity.fintech}</p>
                  <p className="text-white/80 text-sm">E-commerce: {sampleMicroIntelligence.marketFundamentals.competitiveIntensity.ecommerce}</p>
                </div>
              </div>
            </div>

            {/* Growth & Forecast */}
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <LineChart className="h-5 w-5 text-green-300" />
                <span>Growth & Forecast</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-1">Growth Trend Chart</h4>
                  <div className="flex items-end h-24 border-b border-l border-white/20 pb-1 pl-1">
                    {sampleMicroIntelligence.growthForecast.growthTrend.map((data: any, index: number) => (
                      <div key={index} className="flex-1 bg-purple-500 mx-0.5" style={{ height: `${data.value / 2.5}px` }}></div>
                    ))}
                  </div>
                  <div className="flex justify-between text-white/70 text-xs mt-1">
                    {sampleMicroIntelligence.growthForecast.growthTrend.map((data: any, index: number) => (
                      <span key={index}>{data.year}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Market Lifecycle Position</h4>
                  <p className="text-white/80 text-sm">Fintech: <span className="font-medium">{sampleMicroIntelligence.growthForecast.marketLifecycle.fintech}</span></p>
                  <p className="text-white/80 text-sm">Healthtech: <span className="font-medium">{sampleMicroIntelligence.growthForecast.marketLifecycle.healthtech}</span></p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Forecast Confidence Ribbon</h4>
                  <p className="text-white/80 text-sm">Confidence: <span className="font-medium">{sampleMicroIntelligence.growthForecast.forecastConfidence}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Intelligence */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Strategic Intelligence</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-300" />
                <span>Opportunity Matrix</span>
              </h3>
              <ul className="text-white/80 text-sm list-disc pl-5 space-y-1">
                {sampleMicroIntelligence.strategicIntelligence.opportunityMatrix.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-300" />
                <span>Challenge Assessment Grid</span>
              </h3>
              <ul className="text-white/80 text-sm list-disc pl-5 space-y-1">
                {sampleMicroIntelligence.strategicIntelligence.challengeAssessment.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-4 col-span-full">
              <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <Target className="h-5 w-5 text-purple-300" />
                <span>Market Timing Indicator</span>
              </h3>
              <p className="text-white/80 text-sm">{sampleMicroIntelligence.strategicIntelligence.marketTiming}</p>
            </div>
          </div>
        </div>

        {/* AI Market Summary */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
            <Brain className="h-6 w-6 text-blue-300" />
            <span>AI Market Summary</span>
          </h2>
          <p className="text-white/80 leading-relaxed mb-4">{sampleAIMarketSummary.executiveOverview}</p>
          <ul className="text-white/80 list-disc pl-5 space-y-2 mb-4">
            {sampleAIMarketSummary.keyInsights.map((insight: string, index: number) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>Sentiment: <span className="font-semibold text-green-400">{sampleAIMarketSummary.marketSentiment}</span> (<span className="font-semibold">{sampleAIMarketSummary.confidenceScore}</span> confidence)</span>
            <span>Data Freshness: {formatTimeAgo(sampleAIMarketSummary.dataFreshness)}</span>
            <button className="text-purple-300 hover:text-purple-200 transition-colors">
              Expand for details
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Market Alerts */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-red-300" />
              <span>Market Alerts</span>
            </h2>
            <div className="space-y-4">
              {sampleMarketAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border ${
                  alert.type === 'critical' ? 'bg-red-500/20 border-red-500/30' :
                  alert.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500/30' :
                  'bg-blue-500/20 border-blue-500/30'
                }`}>
                  <h3 className="text-white font-semibold mb-1">{alert.title}</h3>
                  <p className="text-white/80 text-sm mb-2">{alert.description}</p>
                  <span className="text-white/60 text-xs">{formatTimeAgo(alert.date)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Market News & Updates */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
              <Newspaper className="h-6 w-6 text-green-300" />
              <span>Market News & Updates</span>
            </h2>
            <div className="space-y-4">
              {sampleMarketNews.map((news) => (
                <a href={news.url} target="_blank" rel="noopener noreferrer" key={news.id} className="block p-4 rounded-lg border border-white/20 hover:bg-white/5 transition-colors">
                  <h3 className="text-white font-semibold mb-1">{news.title}</h3>
                  <p className="text-white/80 text-sm mb-2">{news.description}</p>
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>{news.source}</span>
                    <span>{formatTimeAgo(news.date)}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketIntelligenceDashboard;