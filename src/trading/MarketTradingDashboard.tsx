import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  BarChart3, 
  Target,
  Calendar,
  Filter,
  Brain,
  ExternalLink,
  PieChart,
  LineChart
} from 'lucide-react';
import GlobalNavigation from '../components/GlobalNavigation';
import {
  sampleInvestmentStats,
  sampleMarketStats,
  sampleTradesPerMarket,
  sampleTradesPerIndustry,
  sampleTradingGrowth,
  sampleRecentUpdates,
  sampleRecentTrades
} from '../data/tradingData';

interface MarketTradingDashboardProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: any;
  activeMainTab: string;
  setActiveMainTab: (tab: 'dashboard' | 'social-experience' | 'network' | 'messaging' | 'equity-trading' | 'expert-marketplace' | 'intelligence') => void;
  activeTradingTab: string;
  setActiveTradingTab: (tab: string) => void;
}

function MarketTradingDashboard({
  isAICompanionOpen,
  aiCompanionWidth,
  toggleAICompanion,
  selectedRole,
  profileData,
  activeMainTab,
  setActiveMainTab,
  activeTradingTab,
  setActiveTradingTab
}: MarketTradingDashboardProps) {
  const [durationFilter, setDurationFilter] = useState('monthly');
  const [marketFilter, setMarketFilter] = useState('all-deals');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const durationOptions = [
    { id: 'daily', label: 'Daily insights' },
    { id: 'weekly', label: 'Weekly insights' },
    { id: 'monthly', label: 'Monthly insights' },
    { id: 'quarterly', label: 'Quarterly insights' }
  ];

  const filterOptions = [
    { id: 'all-deals', label: 'All deals' },
    { id: 'industry', label: 'Industry focus' },
    { id: 'geo', label: 'Geo focus' },
    { id: 'primary-secondary', label: 'Primary/Secondary market' }
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${(amount / 1000).toFixed(0)}K`;
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      DollarSign,
      TrendingUp,
      BarChart3,
      Target
    };
    return icons[iconName] || DollarSign;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Trading Dashboard</h1>
          <p className="text-white/80">Real-time market activity and trading performance analytics</p>
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-white/60" />
              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {durationOptions.map((option) => (
                  <option key={option.id} value={option.id} className="bg-slate-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-white/60" />
              <select
                value={marketFilter}
                onChange={(e) => setMarketFilter(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {filterOptions.map((option) => (
                  <option key={option.id} value={option.id} className="bg-slate-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* General Market Trading Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sampleMarketStats.map((stat, index) => {
                const IconComponent = getIconComponent(stat.icon);
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                    <div className={`bg-${stat.color}-500/20 p-3 rounded-lg w-fit mb-4`}>
                      <IconComponent className={`h-6 w-6 text-${stat.color}-300`} />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Trades per Market */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                  <PieChart className="h-5 w-5 text-green-300" />
                  <span>Trades per Market (Geo)</span>
                </h3>
                <div className="space-y-3">
                  {sampleTradesPerMarket.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full bg-${['blue', 'purple', 'green', 'yellow', 'red'][index]}-400`}></div>
                        <span className="text-white/80">{item.label}</span>
                      </div>
                      <span className="text-white/60 text-sm">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trades per Industry */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-purple-300" />
                  <span>Trades per Industry</span>
                </h3>
                <div className="space-y-3">
                  {sampleTradesPerIndustry.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full bg-${['purple', 'blue', 'green', 'yellow', 'red'][index]}-400`}></div>
                        <span className="text-white/80">{item.label}</span>
                      </div>
                      <span className="text-white/60 text-sm">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trading Growth Chart */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <LineChart className="h-5 w-5 text-blue-300" />
                <span>Trading Growth</span>
              </h3>
              <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                {sampleTradingGrowth.map((data, index) => (
                  <div key={index} className="text-center">
                    <div 
                      className="bg-gradient-to-t from-purple-500 to-blue-500 rounded-t"
                      style={{ height: `${(data.volume / 520) * 100}px` }}
                    ></div>
                    <div className="text-white/70 text-xs mt-2">{data.period}</div>
                    <div className="text-white/60 text-xs">{formatCurrency(data.volume * 1000)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Trades */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Recent Trades</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left text-white/80 font-medium py-3">Trade Date/Time</th>
                      <th className="text-left text-white/80 font-medium py-3">Trade Type</th>
                      <th className="text-left text-white/80 font-medium py-3">Venture Name</th>
                      <th className="text-left text-white/80 font-medium py-3">Investor (Buyer)</th>
                      <th className="text-left text-white/80 font-medium py-3">Investor (Seller)</th>
                      <th className="text-left text-white/80 font-medium py-3">Trade Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleRecentTrades.map((trade) => (
                      <tr key={trade.id} className="border-b border-white/10">
                        <td className="py-3 text-white/70 text-sm">
                          {trade.tradeDateTime.toLocaleDateString()} {trade.tradeDateTime.toLocaleTimeString()}
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            trade.tradeType === 'Primary' 
                              ? 'bg-green-500/20 text-green-300' 
                              : 'bg-blue-500/20 text-blue-300'
                          }`}>
                            {trade.tradeType}
                          </span>
                        </td>
                        <td className="py-3 text-white font-medium">{trade.ventureName}</td>
                        <td className="py-3 text-white/70">{trade.investorBuyerName}</td>
                        <td className="py-3 text-white/70">{trade.investorSellerName || '-'}</td>
                        <td className="py-3 text-white font-semibold">{formatCurrency(trade.tradeValue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Investment Profile Stats */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Investment Profile</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{sampleInvestmentStats.dealsCount}</div>
                  <div className="text-white/70 text-sm"># of deals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{formatCurrency(sampleInvestmentStats.totalDealVolume)}</div>
                  <div className="text-white/70 text-sm">Total deal volume</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{sampleInvestmentStats.activeDealsInPipeline}</div>
                  <div className="text-white/70 text-sm"># active deals in pipeline</div>
                </div>
                <button 
                  onClick={() => setActiveTradingTab('portfolio-summary')}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                >
                  Go to your investment dashboard
                </button>
              </div>
            </div>

            {/* Recent Updates */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Recent Updates</h3>
              <div className="space-y-4">
                {sampleRecentUpdates.map((update) => (
                  <div key={update.id} className="border-b border-white/10 pb-4 last:border-b-0">
                    <h4 className="text-white font-medium text-sm mb-2 leading-tight">{update.title}</h4>
                    <p className="text-white/70 text-xs mb-2 line-clamp-2">{update.intro}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-xs">{formatTimeAgo(update.date)}</span>
                      <button className="text-purple-300 hover:text-purple-200 transition-colors">
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketTradingDashboard;