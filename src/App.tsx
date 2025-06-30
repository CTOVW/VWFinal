import React, { useState, useRef, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Brain, 
  Shield, 
  Zap, 
  Globe, 
  ArrowRight,
  CheckCircle,
  MessageCircle,
  BarChart3,
  Target,
  Lightbulb,
  Network
} from 'lucide-react';
import Dashboard from './Dashboard';
import OnboardingFlow from './OnboardingFlow';
import AICompanion from './components/AICompanion';
import SocialNetworkPage from './social/SocialNetworkPage';
import NetworkPage from './network/NetworkPage';
import MessagingPage from './messaging/MessagingPage';
import TradingPage from './trading/TradingPage';
import ExpertsMarketplacePage from './marketplace/ExpertsMarketplacePage';
import IntelligencePage from './intelligence/IntelligencePage';
import MyVenturesPage from './ventures/MyVenturesPage';
import MyServicesPage from './my-services/MyServicesPage';
import GlobalNavigation from './components/GlobalNavigation';

interface Message {
  type: 'user' | 'ai';
  message: string;
  timestamp: Date;
}

interface ProfileData {
  // Personal Info
  fullName: string;
  email: string;
  phone: string;
  linkedinProfile: string;
  country: string;
  language: string;
  // Professional Background
  currentOccupation: string;
  yearsExperience: string;
  entrepreneurialExperience: string;
  industryExpertise: string;
  marketExpertise: string;
  keySkills: string;
  // Business Information
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'founder' | 'investor' | 'expert' | null>(null);
  const [activeMainTab, setActiveMainTab] = useState<'dashboard' | 'social-experience' | 'network' | 'messaging' | 'equity-trading' | 'expert-marketplace' | 'intelligence' | 'my-ventures' | 'my-services'>('equity-trading');
  
  // Use a ref to track the initial trading tab
  const initialTradingTabRef = useRef<string | null>(null);
  
  // Profile Data State (centralized)
  const [profileData, setProfileData] = useState<ProfileData>({
    // Personal Info
    fullName: '',
    email: '',
    phone: '',
    linkedinProfile: '',
    country: '',
    language: '',
    // Professional Background
    currentOccupation: '',
    yearsExperience: '',
    entrepreneurialExperience: '',
    industryExpertise: '',
    marketExpertise: '',
    keySkills: '',
    // Business Information
    company: '',
    companyLinkedin: '',
    companyType: '',
    industryFocus: '',
    origin: '',
    companySize: '',
    portfolioSize: '',
    headquarters: '',
    operatingMarkets: '',
    targetClients: '',
    keyCapabilities: ''
  });

  // Preferences State (centralized)
  const [preferences, setPreferences] = useState<PreferencesData>({
    riskTolerance: '',
    investmentHorizon: '',
    primaryMotivation: '',
    preferredIndustries: [],
    geographicFocus: [],
    collaborationStyle: '',
    decisionMakingStyle: '',
    learningPreference: '',
    communicationStyle: '',
    workingStyle: ''
  });
  
  // AI Companion State
  const [isAICompanionOpen, setIsAICompanionOpen] = useState(false);
  const [aiCompanionWidth, setAiCompanionWidth] = useState(400);
  const [selectedAICompanion, setSelectedAICompanion] = useState('platform-guide');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      type: 'ai',
      message: 'Hello! I\'m your AI companion. I\'m here to help you navigate the platform and provide insights based on your current context.',
      timestamp: new Date()
    }
  ]);

  const handleLogin = () => {
    setIsOnboarding(true);
    // Removed: setIsAICompanionOpen(true); - AI companion will not open by default
  };

  const handleOnboardingComplete = () => {
    setIsOnboarding(false);
    setIsLoggedIn(true);
    setActiveMainTab('social-experience'); // Direct user to social network section
  };

  const toggleAICompanion = () => {
    setIsAICompanionOpen(!isAICompanionOpen);
  };

  // Enhanced AI autofill logic
  const generateAIAutofill = (userMessage: string, role: string) => {
    const message = userMessage.toLowerCase();
    const autofillData: Partial<ProfileData> = {};

    // Role-based autofill suggestions
    if (role === 'founder') {
      if (message.includes('fintech') || message.includes('financial')) {
        autofillData.industryExpertise = 'Fintech, Digital Payments, Financial Services';
        autofillData.marketExpertise = 'MENA, GCC Markets';
        autofillData.keySkills = 'Product Development, Team Leadership, Fundraising, Strategic Planning';
        autofillData.companyType = 'startup';
        autofillData.industryFocus = 'Financial Technology';
      } else if (message.includes('healthtech') || message.includes('health')) {
        autofillData.industryExpertise = 'Healthcare Technology, Digital Health, Medical Devices';
        autofillData.marketExpertise = 'MENA Healthcare Markets';
        autofillData.keySkills = 'Healthcare Innovation, Regulatory Compliance, Product Development';
        autofillData.companyType = 'startup';
        autofillData.industryFocus = 'Healthcare Technology';
      } else if (message.includes('ecommerce') || message.includes('e-commerce')) {
        autofillData.industryExpertise = 'E-commerce, Digital Marketing, Retail Technology';
        autofillData.marketExpertise = 'MENA E-commerce Markets';
        autofillData.keySkills = 'Digital Marketing, Supply Chain, Customer Acquisition';
        autofillData.companyType = 'startup';
        autofillData.industryFocus = 'E-commerce & Retail';
      }
    } else if (role === 'investor') {
      if (message.includes('vc') || message.includes('venture capital')) {
        autofillData.currentOccupation = 'Venture Capital Investor';
        autofillData.companyType = 'vc';
        autofillData.keyCapabilities = 'Deal Sourcing, Due Diligence, Portfolio Management, Strategic Advisory';
        autofillData.industryFocus = 'Technology, Healthcare, Fintech';
        autofillData.marketExpertise = 'MENA Venture Capital Markets';
      } else if (message.includes('angel') || message.includes('angel investor')) {
        autofillData.currentOccupation = 'Angel Investor';
        autofillData.companyType = 'other';
        autofillData.keyCapabilities = 'Early-stage Investment, Mentoring, Network Access';
        autofillData.industryFocus = 'Early-stage Technology Companies';
      }
    } else if (role === 'expert') {
      if (message.includes('consultant') || message.includes('consulting')) {
        autofillData.currentOccupation = 'Management Consultant';
        autofillData.companyType = 'consulting';
        autofillData.keyCapabilities = 'Strategic Consulting, Business Development, Market Analysis';
      } else if (message.includes('mentor') || message.includes('advisor')) {
        autofillData.currentOccupation = 'Business Advisor';
        autofillData.keyCapabilities = 'Strategic Advisory, Mentoring, Industry Expertise';
      }
    }

    // Geographic autofill
    if (message.includes('uae') || message.includes('dubai') || message.includes('abu dhabi')) {
      autofillData.country = 'UAE';
      autofillData.origin = 'United Arab Emirates';
      autofillData.operatingMarkets = 'GCC, MENA';
    } else if (message.includes('saudi') || message.includes('riyadh')) {
      autofillData.country = 'SA';
      autofillData.origin = 'Saudi Arabia';
      autofillData.operatingMarkets = 'GCC, MENA';
    } else if (message.includes('egypt') || message.includes('cairo')) {
      autofillData.country = 'EG';
      autofillData.origin = 'Egypt';
      autofillData.operatingMarkets = 'MENA, North Africa';
    }

    // Experience level autofill
    if (message.includes('senior') || message.includes('experienced')) {
      autofillData.yearsExperience = '11-15';
    } else if (message.includes('junior') || message.includes('entry')) {
      autofillData.yearsExperience = '0-2';
    } else if (message.includes('mid-level')) {
      autofillData.yearsExperience = '6-10';
    }

    return autofillData;
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: Message = {
        type: 'user',
        message: chatMessage,
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, newMessage]);
      const currentMessage = chatMessage;
      setChatMessage('');
      
      // Simulate AI response with autofill logic
      setTimeout(() => {
        let aiResponse = '';
        let shouldAutofill = false;
        let autofillData: Partial<ProfileData> = {};
        
        if (isOnboarding && selectedRole) {
          // Check if user is asking for autofill or providing information
          if (currentMessage.toLowerCase().includes('autofill') || 
              currentMessage.toLowerCase().includes('pre-fill') ||
              currentMessage.toLowerCase().includes('help me fill') ||
              currentMessage.toLowerCase().includes('suggest')) {
            
            shouldAutofill = true;
            autofillData = generateAIAutofill(currentMessage, selectedRole);
            
            if (Object.keys(autofillData).length > 0) {
              aiResponse = `Great! Based on your input, I've pre-filled some relevant fields for you. I've suggested:

${Object.entries(autofillData).map(([key, value]) => {
  const fieldName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  return `• ${fieldName}: ${value}`;
}).join('\n')}

You can review and modify these suggestions as needed. Would you like me to help with any other fields?`;
            } else {
              aiResponse = 'I can help you fill out your profile! Could you tell me more about your background, industry focus, or location? For example, mention if you work in fintech, healthtech, or e-commerce, and your geographic focus.';
            }
          } else {
            // Try to extract information from user message for autofill
            autofillData = generateAIAutofill(currentMessage, selectedRole);
            
            if (Object.keys(autofillData).length > 0) {
              shouldAutofill = true;
              aiResponse = `I noticed you mentioned some details that I can use to help fill your profile. I've suggested some relevant information based on what you shared. Would you like me to pre-fill these fields for you?`;
            } else {
              aiResponse = 'I understand. If you need help filling out any specific fields, just let me know! I can provide suggestions based on your industry, role, or location.';
            }
          }
        } else {
          aiResponse = 'I understand your query. Let me analyze the current context and provide you with relevant insights.';
        }
        
        // Apply autofill if suggested
        if (shouldAutofill && Object.keys(autofillData).length > 0) {
          setProfileData(prev => ({
            ...prev,
            ...autofillData
          }));
        }
        
        const aiMessage: Message = {
          type: 'ai',
          message: aiResponse,
          timestamp: new Date()
        };
        setChatHistory(prev => [...prev, aiMessage]);
      }, 1000);
    }
  };

  const handleAgentChange = (agent: string) => {
    setSelectedAICompanion(agent);
    
    // Add context-aware message when agent changes
    const agentMessages = {
      'platform-guide': 'Hi! I\'m your Platform Guide. I can explain features and help you understand how Venture Weavers works.',
      'profile-builder': 'Hello! I\'m your Profile Builder. I can help pre-fill information and optimize your profile completion. Just tell me about your background, industry, or ask me to autofill specific sections!',
      'personalization': 'Hi there! I\'m your Personalization Agent. I can help set up your preferences and explain how they impact your experience.',
      'assessment-guide': 'Welcome! I\'m your Assessment Guide. I can explain market intelligence and help you understand the data.',
      'thesis-development': 'Hello! I\'m your Thesis Development Agent. I can help you articulate your strategy and investment approach.',
      'learning-assistant': 'Hi! I\'m your Learning Assistant. I can provide tutorials and help you navigate the platform effectively.',
      'feed-intelligence': 'Hi! I\'m your Feed Intelligence Agent. I can help curate content, explain feed algorithms, and suggest engagement strategies.',
      'community-navigator': 'Hello! I\'m your Community Navigator. I can recommend relevant communities and help you find the right groups to join.',
      'event-discovery': 'Hi! I\'m your Event Discovery Agent. I can help you find relevant events and networking opportunities.',
      'event-intelligence': 'Hello! I\'m your Event Intelligence Agent. I can analyze event value and provide networking insights.',
      'event-creator': 'Hi! I\'m your Event Creator Agent. I can help you create and optimize events for maximum engagement.',
      'content-organizer': 'Hello! I\'m your Content Organizer Agent. I can help categorize and organize your saved content.',
      'connection-intelligence': 'Hi! I\'m your Connection Intelligence Agent. I can help you find relevant connections and optimize your networking strategy.',
      'relationship-manager': 'Hello! I\'m your Relationship Manager Agent. I can help you manage your connections and suggest engagement actions.',
      'connection-evaluator': 'Hi! I\'m your Connection Evaluator Agent. I can help you evaluate connection requests and suggest response strategies.',
      'communication-assistant': 'Hello! I\'m your Communication Assistant Agent. I can help you craft messages and optimize your communication.',
      'trading-analytics': 'Hi! I\'m your Trading Analytics Agent. I can explain market metrics, analyze trading performance, and provide market insights.',
      'deal-discovery': 'Hello! I\'m your Deal Discovery Agent. I can pre-filter opportunities by investment thesis, explain deal metrics, and optimize search criteria.',
      'due-diligence': 'Hi! I\'m your Due Diligence Agent. I can pre-fill screening criteria, analyze deal quality, and explain risk factors.',
      'expert-matching': 'Hi! I\'m your Expert Matching Agent. I can pre-filter experts by needs, explain expertise relevance, and optimize matching criteria.',
      'service-matcher': 'Hello! I\'m your Service Matcher Agent. I can pre-filter services by needs, explain service benefits, and optimize search criteria.',
      'workshop-selector': 'Hi! I\'m your Workshop Selector Agent. I can pre-filter workshops by learning goals, explain workshop value, and suggest optimal timing.',
      'expert-evaluator': 'Hello! I\'m your Expert Evaluator Agent. I can analyze expert credentials, explain expertise relevance, and provide selection guidance.',
      'booking-optimization': 'Hi! I\'m your Booking Optimization Agent. I can suggest optimal session timing, pre-fill booking details, and explain service value.',
      'session-intelligence': 'Hello! I\'m your Session Intelligence Agent. I can pre-schedules optimal sessions, analyze session effectiveness, and explains improvement areas.',
      'client-relationship': 'Hi! I\'m your Client Relationship Agent. I can pre-fills client data, optimizes relationship tracking, and analyzes client satisfaction.',
      'service-portfolio-agent': 'Hello! I\'m your Service Portfolio Agent. I can analyze service performance, explain revenue trends, and provide optimization insights.',
      'service-designer-agent': 'Hi! I\'m your Service Designer Agent. I can pre-fill service templates, optimize pricing/structure, and explain market positioning.',
      'workshop-designer-agent': 'Hello! I\'m your Workshop Designer Agent. I can pre-fill workshop templates, optimize curriculum design, and explain engagement strategies.',
      'intelligence-analytics': 'Hi! I\'m your Intelligence Analytics Agent. I can explain market trends, analyze data significance, and provide contextual insights.',
      'research-generator': 'Hello! I\'m your Research Generator Agent. I can pre-fill research parameters, generate custom reports, and explain findings.',
      'portfolio-analytics': 'Hi! I\'m your Portfolio Analytics Agent. I can analyze your investment performance, explain metrics, and provide optimization insights.',
      'pipeline-analytics': 'Hi! I\'m your Pipeline Analytics Agent. I can analyze your deal flow, identify bottlenecks, and suggest process improvements.',
      'venture-tracker': 'Hi! I\'m your Venture Tracker Agent. I can monitor portfolio company performance, analyze KPIs, and alert you to important changes.',
      'knowledge-navigator': 'Hello! I\'m your Knowledge Navigator Agent. I can help you organize your venture knowledge base, suggest relevant documents, and extract insights from your data.'
    };

    if (agentMessages[agent as keyof typeof agentMessages]) {
      const agentMessage: Message = {
        type: 'ai',
        message: agentMessages[agent as keyof typeof agentMessages],
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, agentMessage]);
    }
  };

  // Get dynamic agent options based on current context
  const getAgentOptions = () => {
    switch (activeMainTab) {
      case 'dashboard':
        return [
          { value: 'platform-guide', label: 'Platform Guide Agent' },
          { value: 'learning-assistant', label: 'Learning Assistant Agent' }
        ];
      case 'social-experience':
        return [
          { value: 'feed-intelligence', label: 'Feed Intelligence Agent' },
          { value: 'community-navigator', label: 'Community Navigator Agent' },
          { value: 'event-discovery', label: 'Event Discovery Agent' },
          { value: 'content-organizer', label: 'Content Organizer Agent' }
        ];
      case 'network':
        return [
          { value: 'connection-intelligence', label: 'Connection Intelligence Agent' },
          { value: 'relationship-manager', label: 'Relationship Manager Agent' },
          { value: 'connection-evaluator', label: 'Connection Evaluator Agent' }
        ];
      case 'messaging':
        return [
          { value: 'communication-assistant', label: 'Communication Assistant Agent' }
        ];
      case 'equity-trading':
        return [
          { value: 'trading-analytics', label: 'Trading Analytics Agent' },
          { value: 'deal-discovery', label: 'Deal Discovery Agent' },
          { value: 'due-diligence', label: 'Due Diligence Agent' },
          { value: 'portfolio-analytics', label: 'Portfolio Analytics Agent' },
          { value: 'pipeline-analytics', label: 'Pipeline Analytics Agent' },
          { value: 'venture-tracker', label: 'Venture Tracker Agent' }
        ];
      case 'expert-marketplace':
        return [
          { value: 'expert-matching', label: 'Expert Matching Agent' },
          { value: 'service-matcher', label: 'Service Matcher Agent' },
          { value: 'workshop-selector', label: 'Workshop Selector Agent' },
          { value: 'expert-evaluator', label: 'Expert Evaluator Agent' },
          { value: 'booking-optimization', label: 'Booking Optimization Agent' },
          { value: 'session-intelligence', label: 'Session Intelligence Agent' },
          { value: 'learning-organizer', label: 'Learning Organizer Agent' }
        ];
      case 'intelligence':
        // This needs to be handled by IntelligencePage itself to determine sub-agent
        return [
          { value: 'intelligence-analytics', label: 'Intelligence Analytics Agent' },
          { value: 'research-generator', label: 'Research Generator Agent' }
        ];
      case 'my-ventures':
        return [
          { value: 'venture-tracker', label: 'Venture Tracker Agent' },
          { value: 'knowledge-navigator', label: 'Knowledge Navigator Agent' }
        ];
      case 'my-services':
        return [
          { value: 'service-portfolio-agent', label: 'Service Portfolio Agent' },
          { value: 'service-designer-agent', label: 'Service Designer Agent' },
          { value: 'workshop-designer-agent', label: 'Workshop Designer Agent' },
          { value: 'session-intelligence', label: 'Session Intelligence Agent' },
          { value: 'client-relationship', label: 'Client Relationship Agent' }
        ];
      default:
        return [
          { value: 'platform-guide', label: 'Platform Guide Agent' }
        ];
    }
  };

  // Render onboarding flow
  if (isOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <OnboardingFlow
          isAICompanionOpen={isAICompanionOpen}
          aiCompanionWidth={aiCompanionWidth}
          selectedAICompanion={selectedAICompanion}
          chatMessage={chatMessage}
          chatHistory={chatHistory}
          profileData={profileData}
          selectedRole={selectedRole}
          toggleAICompanion={toggleAICompanion}
          onWidthChange={setAiCompanionWidth}
          onMessageChange={setChatMessage}
          onSendMessage={handleSendMessage}
          onAgentChange={handleAgentChange}
          onComplete={handleOnboardingComplete}
          onRoleSelect={setSelectedRole}
          onProfileDataChange={setProfileData}
          preferences={preferences} // Pass preferences to OnboardingFlow
          onPreferencesChange={setPreferences} // Pass setter for preferences
        />
      </div>
    );
  }

  // Render main application
  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Render different main content based on activeMainTab */}
        {activeMainTab === 'dashboard' && (
          <Dashboard 
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            activeMainTab={activeMainTab}
            setActiveMainTab={setActiveMainTab}
          />
        )}
        
        {activeMainTab === 'equity-trading' && (
          <TradingPage
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole!}
            profileData={profileData}
            activeMainTab={activeMainTab}
            setActiveMainTab={setActiveMainTab}
            selectedAICompanion={selectedAICompanion}
            onAgentChange={handleAgentChange}
            initialTradingTab={initialTradingTabRef.current}
            setInitialTradingTab={(tab) => { initialTradingTabRef.current = tab; }}
          />
        )}
        
        {activeMainTab === 'social-experience' && (
          <SocialNetworkPage
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole!}
            profileData={profileData}
            activeMainTab={activeMainTab}
            setActiveMainTab={setActiveMainTab}
            selectedAICompanion={selectedAICompanion}
            onAgentChange={handleAgentChange}
          />
        )}
        
        {activeMainTab === 'network' && (
          <NetworkPage
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole!}
            profileData={profileData}
            activeMainTab={activeMainTab}
            setActiveMainTab={setActiveMainTab}
            selectedAICompanion={selectedAICompanion}
            onAgentChange={handleAgentChange}
          />
        )}
        
        {activeMainTab === 'messaging' && (
          <MessagingPage
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole!}
            profileData={profileData}
            activeMainTab={activeMainTab}
            setActiveMainTab={setActiveMainTab}
            selectedAICompanion={selectedAICompanion}
            onAgentChange={handleAgentChange}
          />
        )}
        
        {activeMainTab === 'expert-marketplace' && (
          <ExpertsMarketplacePage
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole!}
            profileData={profileData}
            activeMainTab={activeMainTab}
            setActiveMainTab={setActiveMainTab}
            selectedAICompanion={selectedAICompanion}
            onAgentChange={handleAgentChange}
          />
        )}

        {activeMainTab === 'intelligence' && (
          <IntelligencePage
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole!}
            profileData={profileData}
            preferences={preferences} // Pass preferences to IntelligencePage
            activeMainTab={activeMainTab}
            setActiveMainTab={setActiveMainTab}
            selectedAICompanion={selectedAICompanion}
            onAgentChange={handleAgentChange}
          />
        )}

        {activeMainTab === 'my-ventures' && (
          <MyVenturesPage
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole!}
            profileData={profileData}
            activeMainTab={activeMainTab}
            setActiveMainTab={setActiveMainTab}
            selectedAICompanion={selectedAICompanion}
            onAgentChange={handleAgentChange}
          />
        )}

        {activeMainTab === 'my-services' && (
          <MyServicesPage
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole!}
            profileData={profileData}
            activeMainTab={activeMainTab}
            setActiveMainTab={setActiveMainTab}
            selectedAICompanion={selectedAICompanion}
            onAgentChange={handleAgentChange}
          />
        )}
        
        <AICompanion
          isOpen={isAICompanionOpen}
          width={aiCompanionWidth}
          selectedAgent={selectedAICompanion}
          chatMessage={chatMessage}
          chatHistory={chatHistory}
          onToggle={toggleAICompanion}
          onWidthChange={setAiCompanionWidth}
          onMessageChange={setChatMessage}
          onSendMessage={handleSendMessage}
          onAgentChange={handleAgentChange}
          agentOptions={getAgentOptions()}
        />
      </div>
    );
  }

  // Render landing page
  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col transition-all duration-300"
      style={{ 
        marginRight: isAICompanionOpen ? `${aiCompanionWidth}px` : '0px' 
      }}
    >
      {/* Simple Landing Page Header */}
      <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-md border-b border-white/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
                <Network className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Venture Weavers</span>
            </div>

            {/* Login Button */}
            <button 
              onClick={handleLogin}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              The Future of
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Venture Trading</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
              AI-powered social trading platform connecting founders, investors, and mentors in the early-stage private capital market. 
              Where venture equity becomes truly liquid and accessible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={handleLogin}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-purple-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-purple-300" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Social Trading</h3>
                  <p className="text-white/70 text-sm">Connect with founders, investors, and mentors</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Brain className="h-8 w-8 text-blue-300" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">AI-Powered</h3>
                  <p className="text-white/70 text-sm">Intelligent market insights and recommendations</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-green-300" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Liquid Markets</h3>
                  <p className="text-white/70 text-sm">Primary investments and secondary trading</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Succeed</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and intelligence needed for successful venture trading
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="bg-blue-500/20 p-3 rounded-lg w-fit mb-4">
                <MessageCircle className="h-6 w-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Social Experience</h3>
              <p className="text-white/70">Engage with communities, share insights, and build your reputation in the venture ecosystem.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="bg-purple-500/20 p-3 rounded-lg w-fit mb-4">
                <BarChart3 className="h-6 w-6 text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Equity Trading</h3>
              <p className="text-white/70">Access liquid markets for venture equity with advanced trading tools and real-time analytics.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="bg-green-500/20 p-3 rounded-lg w-fit mb-4">
                <Target className="h-6 w-6 text-green-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Expert Marketplace</h3>
              <p className="text-white/70">Connect with industry experts, book services, and attend workshops to accelerate your growth.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="bg-yellow-500/20 p-3 rounded-lg w-fit mb-4">
                <Brain className="h-6 w-6 text-yellow-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Market Intelligence</h3>
              <p className="text-white/70">AI-powered insights and reports to make informed investment decisions.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="bg-red-500/20 p-3 rounded-lg w-fit mb-4">
                <Shield className="h-6 w-6 text-red-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Portfolio Management</h3>
              <p className="text-white/70">Comprehensive tools to track, analyze, and optimize your investment portfolio.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="bg-indigo-500/20 p-3 rounded-lg w-fit mb-4">
                <Lightbulb className="h-6 w-6 text-indigo-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Venture Building</h3>
              <p className="text-white/70">End-to-end support for founders to build, validate, and scale their ventures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section id="platform" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Built for the
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Modern Investor</span>
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Our platform combines cutting-edge AI technology with deep market expertise to create the ultimate venture trading experience.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">Real-time Market Data</h4>
                    <p className="text-white/70">Access live market intelligence and trading opportunities</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">AI-Powered Insights</h4>
                    <p className="text-white/70">Get personalized recommendations based on your investment thesis</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">Secure & Compliant</h4>
                    <p className="text-white/70">Bank-grade security with full regulatory compliance</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-white font-semibold">12</div>
                    <div className="text-white/70 text-xs">Total Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-semibold">89%</div>
                    <div className="text-white/70 text-xs">Data Freshness</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-semibold">5</div>
                    <div className="text-white/70 text-xs">Active Alerts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-12 backdrop-blur-sm border border-white/20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Investment Journey?</span>
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of founders, investors, and mentors who are already building the future of venture capital.
            </p>
            <button 
              onClick={handleLogin}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-12 py-4 rounded-lg text-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
                  <Network className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Venture Weavers</span>
              </div>
              <p className="text-white/70 mb-4 max-w-md">
                Empowering the future of venture capital through AI-powered social trading and comprehensive market intelligence.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm">
              © 2025 Venture Weavers. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Companion for Landing Page */}
      <AICompanion
        isOpen={isAICompanionOpen}
        width={aiCompanionWidth}
        selectedAgent={selectedAICompanion}
        chatMessage={chatMessage}
        chatHistory={chatHistory}
        onToggle={toggleAICompanion}
        onWidthChange={setAiCompanionWidth}
        onMessageChange={setChatMessage}
        onSendMessage={handleSendMessage}
        onAgentChange={handleAgentChange}
        agentOptions={getAgentOptions()}
      />
    </div>
  );
}

export default App;