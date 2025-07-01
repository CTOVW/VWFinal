import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Brain, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Menu, 
  X,
  Network,
  BarChart3,
  Zap,
  Database
} from 'lucide-react';
import AICompanion from '../components/AICompanion';
import AdminDashboard from './screens/AdminDashboard';
import UserManagementScreen from './screens/UserManagementScreen';
import PackageManagementScreen from './screens/PackageManagementScreen';
import AICompanionManagementScreen from './screens/AICompanionManagementScreen';
import TokenConsumptionAnalyticsScreen from './screens/TokenConsumptionAnalyticsScreen';
import SettingsScreen from './screens/SettingsScreen';

interface AdminPanelPageProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  selectedAICompanion: string;
  onAgentChange: (agent: string) => void;
  chatMessage: string;
  chatHistory: Array<{ type: 'user' | 'ai'; message: string; timestamp: Date }>;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onWidthChange: (width: number) => void;
}

function AdminPanelPage({
  isAICompanionOpen,
  aiCompanionWidth,
  toggleAICompanion,
  selectedAICompanion,
  onAgentChange,
  chatMessage,
  chatHistory,
  onMessageChange,
  onSendMessage,
  onWidthChange
}: AdminPanelPageProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to top when component mounts or tab changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    // Implement logout functionality
    window.location.reload();
  };

  const getAgentOptions = () => {
    return [
      { value: 'admin-guide', label: 'Admin Guide Agent' },
      { value: 'analytics-assistant', label: 'Analytics Assistant' },
      { value: 'user-management-assistant', label: 'User Management Assistant' },
      { value: 'package-management-assistant', label: 'Package Management Assistant' },
      { value: 'ai-management-assistant', label: 'AI Management Assistant' }
    ];
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <UserManagementScreen />;
      case 'packages':
        return <PackageManagementScreen />;
      case 'ai-companions':
        return <AICompanionManagementScreen />;
      case 'token-consumption':
        return <TokenConsumptionAnalyticsScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-screen bg-white/10 backdrop-blur-md border-r border-white/20 transition-all duration-300 z-40 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-2 rounded-lg">
              <Network className="h-6 w-6 text-white" />
            </div>
            {isSidebarOpen && <span className="text-lg font-bold text-white">Admin Panel</span>}
          </div>
          <button 
            onClick={toggleSidebar}
            className="text-white/70 hover:text-white md:block hidden"
          >
            {isSidebarOpen ? <ChevronDown className="h-5 w-5 rotate-90" /> : <ChevronDown className="h-5 w-5 -rotate-90" />}
          </button>
        </div>

        {/* Navigation */}
        <div className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
                {isSidebarOpen && <span>Dashboard</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  activeTab === 'users'
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Users className="h-5 w-5 flex-shrink-0" />
                {isSidebarOpen && <span>User Management</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('packages')}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  activeTab === 'packages'
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Package className="h-5 w-5 flex-shrink-0" />
                {isSidebarOpen && <span>Package & Pricing</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('ai-companions')}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  activeTab === 'ai-companions'
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Brain className="h-5 w-5 flex-shrink-0" />
                {isSidebarOpen && <span>AI Companions</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('token-consumption')}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  activeTab === 'token-consumption'
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Database className="h-5 w-5 flex-shrink-0" />
                {isSidebarOpen && <span>Token Consumption</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Settings className="h-5 w-5 flex-shrink-0" />
                {isSidebarOpen && <span>Settings</span>}
              </button>
            </li>
          </ul>
        </div>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div 
        className="flex-1 transition-all duration-300"
        style={{ 
          marginLeft: isMobileMenuOpen ? '0' : (isSidebarOpen ? '16rem' : '5rem'),
          marginRight: isAICompanionOpen ? `${aiCompanionWidth}px` : '0px' 
        }}
      >
        {/* Top Navigation */}
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="text-white/70 hover:text-white md:hidden"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <h1 className="text-xl font-bold text-white ml-4">
              {activeTab === 'dashboard' && 'Admin Dashboard'}
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'packages' && 'Package & Pricing Management'}
              {activeTab === 'ai-companions' && 'AI Companion Management'}
              {activeTab === 'token-consumption' && 'Token Consumption Analytics'}
              {activeTab === 'settings' && 'Settings'}
            </h1>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={toggleProfileDropdown}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">A</span>
              </div>
              <span className="hidden md:block">Admin User</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-lg shadow-lg z-50">
                <div className="py-2">
                  <a href="#" className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors">
                    <Settings className="h-4 w-4" />
                    <span>Account Settings</span>
                  </a>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors w-full text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6">
          {renderScreen()}
        </div>
      </div>

      {/* AI Companion */}
      <AICompanion
        isOpen={isAICompanionOpen}
        width={aiCompanionWidth}
        selectedAgent={selectedAICompanion}
        chatMessage={chatMessage}
        chatHistory={chatHistory}
        onToggle={toggleAICompanion}
        onWidthChange={onWidthChange}
        onMessageChange={onMessageChange}
        onSendMessage={onSendMessage}
        onAgentChange={onAgentChange}
        agentOptions={getAgentOptions()}
      />

      {/* AI Companion Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleAICompanion}
          className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-full shadow-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-110"
        >
          <Brain className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default AdminPanelPage;