import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Brain, 
  Shield, 
  Zap, 
  Globe, 
  Menu, 
  X, 
  ArrowRight,
  CheckCircle,
  MessageCircle,
  BarChart3,
  Target,
  Lightbulb,
  Network,
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  Building2,
  PieChart,
  Briefcase,
  Eye,
  Edit,
  Lock
} from 'lucide-react';

interface DashboardProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  activeMainTab: string;
  setActiveMainTab: (tab: 'dashboard' | 'social-experience' | 'network' | 'messaging' | 'equity-trading' | 'expert-marketplace') => void;
}

function Dashboard({ isAICompanionOpen, aiCompanionWidth, toggleAICompanion, activeMainTab, setActiveMainTab }: DashboardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-md border-b border-white/20 z-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4" style={{ width: '120px' }}>
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
                  <Network className="h-6 w-6 text-white" />
                </div>
                <span className="text-lg font-bold text-white hidden lg:block">VW</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center" style={{ width: '300px' }}>
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                <input
                  type="text"
                  placeholder="Search VW"
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Main Navigation Tabs */}
            <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
              <button 
                onClick={() => setActiveMainTab('equity-trading')}
                className={`text-white/80 hover:text-white transition-colors px-3 py-2 rounded-lg ${
                  activeMainTab === 'equity-trading' ? 'bg-white/10 text-white' : ''
                }`}
              >
                Equity Trading
              </button>
              
              <button 
                onClick={() => setActiveMainTab('social-experience')}
                className={`text-white/80 hover:text-white transition-colors px-3 py-2 rounded-lg ${
                  activeMainTab === 'social-experience' ? 'bg-white/10 text-white' : ''
                }`}
              >
                Social Network
              </button>
              
              <button 
                onClick={() => setActiveMainTab('expert-marketplace')}
                className={`text-white/80 hover:text-white transition-colors px-3 py-2 rounded-lg ${
                  activeMainTab === 'expert-marketplace' ? 'bg-white/10 text-white' : ''
                }`}
              >
                Expert Marketplace
              </button>
              
              <button 
                onClick={() => setActiveMainTab('dashboard')}
                className={`text-white/80 hover:text-white transition-colors px-3 py-2 rounded-lg ${
                  activeMainTab === 'market-intelligence' ? 'bg-white/10 text-white' : ''
                }`}
              >
                Market Intelligence
              </button>
            </div>

            {/* Right Side Icons & Profile */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Network */}
              <div className="group relative">
                <button 
                  onClick={() => setActiveMainTab('network')}
                  className={`relative text-white/80 hover:text-white transition-colors p-2 ${
                    activeMainTab === 'network' ? 'text-white' : ''
                  }`}
                >
                  <Network className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-2 w-2"></span>
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  My Network
                </div>
              </div>

              {/* Notifications */}
              <div className="group relative">
                <button className="relative text-white/80 hover:text-white transition-colors p-2">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Notifications
                </div>
              </div>

              {/* Messaging */}
              <div className="group relative">
                <button 
                  onClick={() => setActiveMainTab('messaging')}
                  className={`relative text-white/80 hover:text-white transition-colors p-2 ${
                    activeMainTab === 'messaging' ? 'text-white' : ''
                  }`}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Messaging
                </div>
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button 
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="hidden lg:block">John Doe</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-800 rounded-lg shadow-lg">
                    <div className="py-2">
                      <a href="#" className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-slate-700 transition-colors">
                        <Eye className="h-4 w-4" />
                        <span>View/Edit Profile</span>
                      </a>
                      <a href="#" className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-slate-700 transition-colors">
                        <Building2 className="h-4 w-4" />
                        <span>My Ventures</span>
                      </a>
                      <a href="#" className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-slate-700 transition-colors">
                        <PieChart className="h-4 w-4" />
                        <span>My Investments</span>
                      </a>
                      <a href="#" className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-slate-700 transition-colors">
                        <Briefcase className="h-4 w-4" />
                        <span>My Services</span>
                      </a>
                      <div className="border-t border-white/20 my-2"></div>
                      <a href="#" className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-slate-700 transition-colors">
                        <Settings className="h-4 w-4" />
                        <span>Account Settings</span>
                      </a>
                      <a href="#" className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-slate-700 transition-colors">
                        <Lock className="h-4 w-4" />
                        <span>Privacy Controls</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-white">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-slate-900/90 backdrop-blur-md border-t border-white/20">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <div className="flex items-center space-x-2 px-3 py-2 text-white/80">
                  <Search className="h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search VW"
                    className="bg-transparent border-none outline-none text-white placeholder-white/60 flex-1"
                  />
                </div>
                <a href="#" className="block px-3 py-2 text-white/80 hover:text-white">
                  Equity Trading
                </a>
                <a href="#" className="block px-3 py-2 text-white/80 hover:text-white">
                  Social Network
                </a>
                <a href="#" className="block px-3 py-2 text-white/80 hover:text-white">
                  Expert Marketplace
                </a>
                <a href="#" className="block px-3 py-2 text-white/80 hover:text-white">
                  Market Intelligence
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16">
        {/* Main Content */}
        <div 
          className="flex-1 transition-all duration-300"
          style={{ 
            marginRight: isAICompanionOpen ? `${aiCompanionWidth}px` : '0px' 
          }}
        >
          {/* Dashboard Content */}
          <section className="pt-8 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  Welcome to
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Venture Weavers</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
                  Your AI-powered venture trading platform is ready. Navigate through equity trading, social networks, market intelligence, and expert marketplace.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div 
                  onClick={() => setActiveMainTab('equity-trading')}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                >
                  <div className="bg-purple-500/20 p-3 rounded-lg w-fit mb-4">
                    <BarChart3 className="h-6 w-6 text-purple-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Equity Trading</h3>
                  <p className="text-white/70">Access liquid markets for venture equity with advanced trading tools.</p>
                </div>

                <div 
                  onClick={() => setActiveMainTab('social-experience')}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                >
                  <div className="bg-blue-500/20 p-3 rounded-lg w-fit mb-4">
                    <Users className="h-6 w-6 text-blue-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Social Network</h3>
                  <p className="text-white/70">Connect with founders, investors, and mentors in your ecosystem.</p>
                </div>

                <div 
                  onClick={() => setActiveMainTab('expert-marketplace')}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                >
                  <div className="bg-green-500/20 p-3 rounded-lg w-fit mb-4">
                    <Briefcase className="h-6 w-6 text-green-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Expert Marketplace</h3>
                  <p className="text-white/70">Connect with industry experts and book professional services.</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer">
                  <div className="bg-yellow-500/20 p-3 rounded-lg w-fit mb-4">
                    <Brain className="h-6 w-6 text-yellow-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Market Intelligence</h3>
                  <p className="text-white/70">AI-powered insights and reports for informed decisions.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* AI Companion Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleAICompanion}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110"
        >
          <Brain className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default Dashboard;