import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart,
  Calendar,
  ArrowUp,
  ArrowDown,
  Activity,
  Briefcase,
  Clock,
  AlertTriangle,
  Newspaper
} from 'lucide-react';
import { 
  samplePortfolioSummary, 
  samplePerformanceSummary 
} from '../data/myInvestmentsData';

interface PortfolioSummaryDashboardProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
}

function PortfolioSummaryDashboard({
  isAICompanionOpen,
  aiCompanionWidth
}: PortfolioSummaryDashboardProps) {
  const [durationFilter, setDurationFilter] = useState('1y');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Portfolio Summary Dashboard</h1>
          <p className="text-white/80">Comprehensive overview of your investment portfolio performance</p>
        </div>

        {/* Deals/Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="bg-blue-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <DollarSign className="h-6 w-6 text-blue-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{formatCurrency(samplePortfolioSummary.totalPortfolioValue)}</div>
            <div className="text-white/70 text-sm">Total Portfolio Value</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="bg-purple-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <Briefcase className="h-6 w-6 text-purple-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{samplePortfolioSummary.numberOfInvestments}</div>
            <div className="text-white/70 text-sm">Number of Investments</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="bg-green-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <DollarSign className="h-6 w-6 text-green-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{formatCurrency(samplePortfolioSummary.totalInvested)}</div>
            <div className="text-white/70 text-sm">Total Invested</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="bg-yellow-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-yellow-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{samplePortfolioSummary.numberOfExits}</div>
            <div className="text-white/70 text-sm">Number of Exits</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="bg-red-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <DollarSign className="h-6 w-6 text-red-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{formatCurrency(samplePortfolioSummary.totalGain)}</div>
            <div className="text-white/70 text-sm">Total Gain (Exit Value)</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Asset Allocation */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Asset Allocation</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-3 text-center">By Stage</h3>
                  <div className="space-y-2">
                    {Object.entries(samplePortfolioSummary.assetAllocation.byStage).map(([stage, percentage]) => (
                      <div key={stage} className="flex items-center justify-between">
                        <span className="text-white/80 text-sm">{stage}</span>
                        <span className="text-white/80 text-sm">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 h-4 bg-white/10 rounded-full overflow-hidden">
                    <div className="flex h-full">
                      {Object.entries(samplePortfolioSummary.assetAllocation.byStage).map(([stage, percentage], index) => {
                        const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];
                        return (
                          <div 
                            key={stage} 
                            className={`${colors[index % colors.length]}`} 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold mb-3 text-center">By Sector</h3>
                  <div className="space-y-2">
                    {Object.entries(samplePortfolioSummary.assetAllocation.bySector).map(([sector, percentage]) => (
                      <div key={sector} className="flex items-center justify-between">
                        <span className="text-white/80 text-sm">{sector}</span>
                        <span className="text-white/80 text-sm">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 h-4 bg-white/10 rounded-full overflow-hidden">
                    <div className="flex h-full">
                      {Object.entries(samplePortfolioSummary.assetAllocation.bySector).map(([sector, percentage], index) => {
                        const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500'];
                        return (
                          <div 
                            key={sector} 
                            className={`${colors[index % colors.length]}`} 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold mb-3 text-center">By Geography</h3>
                  <div className="space-y-2">
                    {Object.entries(samplePortfolioSummary.assetAllocation.byGeography).map(([geography, percentage]) => (
                      <div key={geography} className="flex items-center justify-between">
                        <span className="text-white/80 text-sm">{geography}</span>
                        <span className="text-white/80 text-sm">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 h-4 bg-white/10 rounded-full overflow-hidden">
                    <div className="flex h-full">
                      {Object.entries(samplePortfolioSummary.assetAllocation.byGeography).map(([geography, percentage], index) => {
                        const colors = ['bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'];
                        return (
                          <div 
                            key={geography} 
                            className={`${colors[index % colors.length]}`} 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cash vs Invested Capital */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Cash vs Invested Capital</h2>
              <div className="flex items-center space-x-8">
                <div className="flex-1">
                  <div className="h-8 bg-white/10 rounded-full overflow-hidden">
                    <div className="flex h-full">
                      <div 
                        className="bg-blue-500" 
                        style={{ width: `${(samplePortfolioSummary.cashVsInvested.cash / (samplePortfolioSummary.cashVsInvested.cash + samplePortfolioSummary.cashVsInvested.invested)) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-purple-500" 
                        style={{ width: `${(samplePortfolioSummary.cashVsInvested.invested / (samplePortfolioSummary.cashVsInvested.cash + samplePortfolioSummary.cashVsInvested.invested)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-white/80 text-sm">Cash: {formatCurrency(samplePortfolioSummary.cashVsInvested.cash)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-white/80 text-sm">Invested: {formatCurrency(samplePortfolioSummary.cashVsInvested.invested)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity/Transactions */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {samplePortfolioSummary.recentActivity.map((activity) => (
                  <div key={activity.id} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          activity.type === 'investment' ? 'bg-green-500/20' :
                          activity.type === 'exit' ? 'bg-blue-500/20' :
                          activity.type === 'follow-on' ? 'bg-purple-500/20' :
                          'bg-yellow-500/20'
                        }`}>
                          <DollarSign className={`h-5 w-5 ${
                            activity.type === 'investment' ? 'text-green-300' :
                            activity.type === 'exit' ? 'text-blue-300' :
                            activity.type === 'follow-on' ? 'text-purple-300' :
                            'text-yellow-300'
                          }`} />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">
                            {activity.type === 'investment' ? 'New Investment' :
                             activity.type === 'exit' ? 'Exit' :
                             activity.type === 'follow-on' ? 'Follow-on Investment' :
                             'Dividend Payment'}
                          </h3>
                          <p className="text-white/70 text-sm">{activity.venture}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{formatCurrency(activity.amount)}</p>
                        <p className="text-white/60 text-xs">{formatTimeAgo(activity.date)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Performance Summary */}
          <div className="space-y-6">
            {/* Overall Portfolio Return */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Performance Summary</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <h3 className="text-white/70 text-sm mb-1">IRR</h3>
                    <p className="text-2xl font-bold text-white">{formatPercentage(samplePerformanceSummary.overallReturn.irr)}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <h3 className="text-white/70 text-sm mb-1">Multiple</h3>
                    <p className="text-2xl font-bold text-white">{samplePerformanceSummary.overallReturn.multiple.toFixed(1)}x</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <h3 className="text-white/70 text-sm mb-1">Unrealized Gains</h3>
                    <p className="text-xl font-bold text-white">{formatCurrency(samplePerformanceSummary.gains.unrealized)}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <h3 className="text-white/70 text-sm mb-1">Realized Gains</h3>
                    <p className="text-xl font-bold text-white">{formatCurrency(samplePerformanceSummary.gains.realized)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance vs Benchmarks */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-white font-semibold mb-4">Performance vs Benchmarks</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">Your Portfolio</span>
                  <span className="text-white font-semibold">{formatPercentage(samplePerformanceSummary.performanceVsBenchmarks.portfolio)}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="bg-purple-500 h-full" 
                    style={{ width: `${(samplePerformanceSummary.performanceVsBenchmarks.portfolio / 30) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">Venture Benchmark</span>
                  <span className="text-white/80 text-sm">{formatPercentage(samplePerformanceSummary.performanceVsBenchmarks.ventureBenchmark)}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full" 
                    style={{ width: `${(samplePerformanceSummary.performanceVsBenchmarks.ventureBenchmark / 30) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">Public Markets</span>
                  <span className="text-white/80 text-sm">{formatPercentage(samplePerformanceSummary.performanceVsBenchmarks.publicMarkets)}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="bg-green-500 h-full" 
                    style={{ width: `${(samplePerformanceSummary.performanceVsBenchmarks.publicMarkets / 30) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-white font-semibold mb-4">Top Performers</h2>
              <div className="space-y-3">
                {samplePerformanceSummary.topPerformers.map((performer) => (
                  <div key={performer.id} className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={performer.logo} 
                        alt={performer.name} 
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-medium text-sm">{performer.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-400 text-xs">{performer.returnMultiple.toFixed(1)}x</span>
                          <ArrowUp className="h-3 w-3 text-green-400" />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-sm font-medium">{formatCurrency(performer.currentValue)}</p>
                        <p className="text-white/60 text-xs">from {formatCurrency(performer.invested)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Performers */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-white font-semibold mb-4">Bottom Performers</h2>
              <div className="space-y-3">
                {samplePerformanceSummary.bottomPerformers.map((performer) => (
                  <div key={performer.id} className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={performer.logo} 
                        alt={performer.name} 
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-medium text-sm">{performer.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-red-400 text-xs">{performer.returnMultiple.toFixed(1)}x</span>
                          <ArrowDown className="h-3 w-3 text-red-400" />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-sm font-medium">{formatCurrency(performer.currentValue)}</p>
                        <p className="text-white/60 text-xs">from {formatCurrency(performer.invested)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time-weighted Performance Trends */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold">Performance Trends</h2>
                <div className="flex space-x-2">
                  {['3m', '6m', '1y', 'all'].map((duration) => (
                    <button
                      key={duration}
                      onClick={() => setDurationFilter(duration)}
                      className={`px-2 py-1 rounded text-xs ${
                        durationFilter === duration
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {duration}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-40 relative">
                <div className="absolute inset-0 flex items-end">
                  {samplePerformanceSummary.performanceTrends.map((point, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-purple-500 to-blue-500 rounded-t"
                        style={{ height: `${(point.value / 150) * 100}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-2 text-white/60 text-xs">
                {samplePerformanceSummary.performanceTrends.map((point, index) => (
                  <div key={index}>
                    {index % 2 === 0 ? point.month : ''}
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

export default PortfolioSummaryDashboard;