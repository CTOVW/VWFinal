import React from 'react';
import {
  ChevronRight,
  Clock,
  Users,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { samplePipelineStages } from '../data/myInvestmentsData';

interface PipelineOverviewProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  onDealSelect: (dealId: string) => void;
  selectedDealId: string | null;
  searchQuery: string;
  stageFilter: string;
  industryFilter: string;
}

function PipelineOverview({
  isAICompanionOpen,
  aiCompanionWidth,
  onDealSelect,
  selectedDealId,
  searchQuery,
  stageFilter,
  industryFilter
}: PipelineOverviewProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Filter pipeline stages based on search query and filters
  const filteredStages = samplePipelineStages
    .filter(stage => stageFilter === 'all' || stage.id === stageFilter)
    .map(stage => ({
      ...stage,
      deals: stage.deals.filter(deal => {
        const matchesSearch = deal.ventureName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             deal.industry.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesIndustry = industryFilter === 'all' || deal.industry === industryFilter;
        return matchesSearch && matchesIndustry;
      })
    }));

  return (
    <div className="space-y-8">
      {filteredStages.map((stage) => (
        <div key={stage.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">{stage.name} ({stage.deals.length})</h2>
            <div className="text-white/60 text-sm">
              {stage.deals.length} {stage.deals.length === 1 ? 'deal' : 'deals'}
            </div>
          </div>
          
          {stage.deals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/70">No deals in this stage match your filters</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stage.deals.map((deal) => (
                <div 
                  key={deal.id} 
                  className={`bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer ${
                    selectedDealId === deal.id ? 'border border-purple-300' : ''
                  }`}
                  onClick={() => onDealSelect(deal.id)}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={deal.logo}
                      alt={deal.ventureName}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-white font-semibold">{deal.ventureName}</h3>
                          <div className="flex items-center space-x-4 text-sm text-white/70 mt-1">
                            <span>{deal.industry}</span>
                            <span>{deal.stage}</span>
                            <span>{formatCurrency(deal.amount)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            deal.status === 'New' ? 'bg-green-500/20 text-green-300' :
                            deal.status === 'In Review' ? 'bg-blue-500/20 text-blue-300' :
                            deal.status === 'Active' ? 'bg-purple-500/20 text-purple-300' :
                            deal.status === 'Negotiating' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-red-500/20 text-red-300'
                          }`}>
                            {deal.status}
                          </span>
                          <ChevronRight className="h-4 w-4 text-white/60" />
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <div className="text-white/60">Progress</div>
                          <div className="text-white/80">{deal.progress}%</div>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" 
                            style={{ width: `${deal.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3 text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1 text-white/60">
                            <Clock className="h-4 w-4" />
                            <span>Last activity: {formatTimeAgo(deal.lastActivity)}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-white/60">
                            <Users className="h-4 w-4" />
                            <span>{deal.assignedTo.join(', ')}</span>
                          </div>
                        </div>
                        {deal.dueDate && (
                          <div className="flex items-center space-x-1 text-white/60">
                            <Calendar className="h-4 w-4" />
                            <span>Due: {formatDate(deal.dueDate)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PipelineOverview;