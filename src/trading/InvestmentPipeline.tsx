import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  ChevronRight,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Calendar
} from 'lucide-react';
import { samplePipelineStages } from '../data/myInvestmentsData';
import PipelineOverview from './PipelineOverview';
import DealDueDiligence from './DealDueDiligence';
import DealTerms from './DealTerms';
import DealClosing from './DealClosing';

interface InvestmentPipelineProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
}

function InvestmentPipeline({
  isAICompanionOpen,
  aiCompanionWidth
}: InvestmentPipelineProps) {
  const [activePipelineTab, setActivePipelineTab] = useState('overview');
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pipelineTabs = [
    { id: 'overview', label: 'Pipeline Overview' },
    { id: 'due-diligence', label: 'Due Diligence' },
    { id: 'deal-terms', label: 'Deal Terms' },
    { id: 'closing', label: 'Deal Closing' }
  ];

  // Find the selected deal across all pipeline stages
  const selectedDeal = selectedDealId 
    ? samplePipelineStages.flatMap(stage => stage.deals).find(deal => deal.id === selectedDealId)
    : null;

  const handleDealSelect = (dealId: string) => {
    setSelectedDealId(dealId);
    
    // Determine which tab to activate based on the deal's stage
    const dealStage = samplePipelineStages.find(stage => 
      stage.deals.some(deal => deal.id === dealId)
    )?.id;
    
    if (dealStage === 'screening') {
      setActivePipelineTab('overview');
    } else if (dealStage === 'due-diligence') {
      setActivePipelineTab('due-diligence');
    } else if (dealStage === 'deal-terms') {
      setActivePipelineTab('deal-terms');
    } else if (dealStage === 'closing') {
      setActivePipelineTab('closing');
    }
  };

  const renderPipelineContent = () => {
    switch (activePipelineTab) {
      case 'overview':
        return (
          <PipelineOverview 
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            onDealSelect={handleDealSelect}
            selectedDealId={selectedDealId}
            searchQuery={searchQuery}
            stageFilter={stageFilter}
            industryFilter={industryFilter}
          />
        );
      case 'due-diligence':
        return (
          <DealDueDiligence 
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            selectedDeal={selectedDeal}
            onBack={() => setActivePipelineTab('overview')}
          />
        );
      case 'deal-terms':
        return (
          <DealTerms 
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            selectedDeal={selectedDeal}
            onBack={() => setActivePipelineTab('overview')}
          />
        );
      case 'closing':
        return (
          <DealClosing 
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            selectedDeal={selectedDeal}
            onBack={() => setActivePipelineTab('overview')}
          />
        );
      default:
        return (
          <PipelineOverview 
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            onDealSelect={handleDealSelect}
            selectedDealId={selectedDealId}
            searchQuery={searchQuery}
            stageFilter={stageFilter}
            industryFilter={industryFilter}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Investment Pipeline</h1>
          <p className="text-white/80">Manage your investment process from deal discovery through closing</p>
        </div>

        {/* Pipeline Tabs */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden mb-8">
          <div className="border-b border-white/20">
            <div className="flex">
              {pipelineTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePipelineTab(tab.id)}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activePipelineTab === tab.id
                      ? 'bg-white/10 text-white border-b-2 border-purple-300'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filters - Only show on overview tab */}
          {activePipelineTab === 'overview' && (
            <div className="p-6 border-b border-white/20">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search deals..."
                      className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-white/60" />
                    <select
                      value={stageFilter}
                      onChange={(e) => setStageFilter(e.target.value)}
                      className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="all" className="bg-slate-800">All Stages</option>
                      <option value="screening" className="bg-slate-800">Screening</option>
                      <option value="due-diligence" className="bg-slate-800">Due Diligence</option>
                      <option value="deal-terms" className="bg-slate-800">Deal Terms</option>
                      <option value="closing" className="bg-slate-800">Closing</option>
                    </select>
                  </div>
                  <div>
                    <select
                      value={industryFilter}
                      onChange={(e) => setIndustryFilter(e.target.value)}
                      className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="all" className="bg-slate-800">All Industries</option>
                      <option value="Fintech" className="bg-slate-800">Fintech</option>
                      <option value="Healthtech" className="bg-slate-800">Healthtech</option>
                      <option value="E-commerce" className="bg-slate-800">E-commerce</option>
                      <option value="EdTech" className="bg-slate-800">EdTech</option>
                      <option value="AI/ML" className="bg-slate-800">AI/ML</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pipeline Content */}
        {renderPipelineContent()}
      </div>
    </div>
  );
}

export default InvestmentPipeline;