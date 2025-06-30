import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Bookmark, 
  Home,
  MessageSquare,
  Search,
  Bell,
  MessageCircle,
  ChevronDown,
  User,
  Settings,
  Building2,
  PieChart,
  Briefcase,
  Eye,
  Menu,
  X,
  Lock,
  Brain,
  Network
} from 'lucide-react';

interface GlobalNavigationProps {
  activeMainTab: string;
  setActiveMainTab: (
    tab:
      | 'dashboard'
      | 'social-experience'
      | 'network'
      | 'messaging'
      | 'equity-trading'
      | 'expert-marketplace'
      | 'intelligence'
      | 'my-ventures'
      | 'profile'
  ) => void;
  setInitialTradingTab?: (tab: string | null) => void;
}

function GlobalNavigation({ activeMainTab, setActiveMainTab, setInitialTradingTab }: GlobalNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleMyInvestmentsClick = () => {
    if (setInitialTradingTab) {
      setInitialTradingTab('portfolio-summary');
      setActiveMainTab('equity-trading');
      setIsProfileDropdownOpen(false);
    }
  };

  const handleMyVenturesClick = () => {
    setActiveMainTab('my-ventures');
    setIsProfileDropdownOpen(false);
  };

  const handleMyServicesClick = () => {
    setActiveMainTab('my-services');
    setIsProfileDropdownOpen(false);
  };

  // Navigate to profile page
  const handleProfileClick = () => {
    setActiveMainTab('profile');
    setIsProfileDropdownOpen(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-b border-white/20 z-50">
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
              onClick={() => setActiveMainTab('intelligence')}
              className={`text-white/80 hover:text-white transition-colors px-3 py-2 rounded-lg ${
                activeMainTab === 'intelligence' ? 'bg-white/10 text-white' : ''
              }`}
            >
              Intelligence
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
                <Users className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-2 w-2"></span>
              </button>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                My Network
              </div>
            </div>

            {/* Notifications */}
            <div className="group relative">
              <button
                onClick={toggleNotifications}
                className="relative text-white/80 hover:text-white transition-colors p-2"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </button>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Notifications
              </div>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <div className="px-4 py-2 text-white/80 hover:bg-white/10 transition-colors">
                      <p className="text-sm">New connection request from <span className="text-purple-300">Ahmed Ali</span></p>
                      <p className="text-xs text-white/50">2 mins ago</p>
                    </div>
                    <div className="px-4 py-2 text-white/80 hover:bg-white/10 transition-colors">
                      <p className="text-sm">Deal <span className="text-purple-300">PayMENA Series A</span> closes in 7 days</p>
                      <p className="text-xs text-white/50">1 hr ago</p>
                    </div>
                    <div className="px-4 py-2 text-white/80 hover:bg-white/10 transition-colors">
                      <p className="text-sm">You have 3 unread messages</p>
                      <p className="text-xs text-white/50">Yesterday</p>
                    </div>
                  </div>
                </div>
              )}
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
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
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
                <div className="absolute right-0 mt-2 w-56 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-lg shadow-lg">
                  <div className="py-2">
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors w-full text-left"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View/Edit Profile</span>
                    </button>
                    <button 
                      onClick={handleMyVenturesClick}
                      className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors w-full text-left"
                    >
                      <Building2 className="h-4 w-4" />
                      <span>My Ventures</span>
                    </button>
                    <button 
                      onClick={handleMyInvestmentsClick}
                      className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors w-full text-left"
                    >
                      <PieChart className="h-4 w-4" />
                      <span>My Investments</span>
                    </button>
                    <button 
                      onClick={handleMyServicesClick}
                      className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors w-full text-left"
                    >
                      <Briefcase className="h-4 w-4" />
                      <span>My Services</span>
                    </button>
                    <div className="border-t border-white/20 my-2"></div>
                    <a href="#" className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors">
                      <Settings className="h-4 w-4" />
                      <span>Account Settings</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors">
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
          <div className="md:hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-t border-white/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="flex items-center space-x-2 px-3 py-2 text-white/80">
                <Search className="h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search VW"
                  className="bg-transparent border-none outline-none text-white placeholder-white/60 flex-1"
                />
              </div>
              <button 
                onClick={() => setActiveMainTab('equity-trading')}
                className="block w-full text-left px-3 py-2 text-white/80 hover:text-white"
              >
                Equity Trading
              </button>
              <button 
                onClick={() => setActiveMainTab('social-experience')}
                className="block w-full text-left px-3 py-2 text-white/80 hover:text-white"
              >
                Social Network
              </button>
              <button 
                onClick={() => setActiveMainTab('expert-marketplace')}
                className="block w-full text-left px-3 py-2 text-white/80 hover:text-white"
              >
                Expert Marketplace
              </button>
              <button 
                onClick={() => setActiveMainTab('intelligence')}
                className="block w-full text-left px-3 py-2 text-white/80 hover:text-white"
              >
                Intelligence
              </button>
              <button 
                onClick={() => setActiveMainTab('my-ventures')}
                className="block w-full text-left px-3 py-2 text-white/80 hover:text-white"
              >
                My Ventures
              </button>
              <button 
                onClick={() => setActiveMainTab('my-services')}
                className="block w-full text-left px-3 py-2 text-white/80 hover:text-white"
              >
                My Services
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default GlobalNavigation;