import React from 'react';
import { 
  Users, 
  Package, 
  Brain, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  Database,
  Zap
} from 'lucide-react';

function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-300" />
            </div>
            <span className="text-white/60 text-sm">Total Users</span>
          </div>
          <div className="text-3xl font-bold text-white">2,547</div>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-green-400 text-sm">+12%</span>
            <span className="text-white/60 text-sm">from last month</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <Package className="h-6 w-6 text-purple-300" />
            </div>
            <span className="text-white/60 text-sm">Active Packages</span>
          </div>
          <div className="text-3xl font-bold text-white">5</div>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-green-400 text-sm">+1</span>
            <span className="text-white/60 text-sm">new package added</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-500/20 p-3 rounded-lg">
              <Brain className="h-6 w-6 text-green-300" />
            </div>
            <span className="text-white/60 text-sm">AI Companions</span>
          </div>
          <div className="text-3xl font-bold text-white">32</div>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-green-400 text-sm">+3</span>
            <span className="text-white/60 text-sm">from last month</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <Database className="h-6 w-6 text-yellow-300" />
            </div>
            <span className="text-white/60 text-sm">Token Consumption</span>
          </div>
          <div className="text-3xl font-bold text-white">1.2M</div>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-yellow-400 text-sm">+18%</span>
            <span className="text-white/60 text-sm">from last month</span>
          </div>
        </div>
      </div>

      {/* Token Consumption Overview */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
          <Database className="h-5 w-5 text-yellow-300" />
          <span>Token Consumption Overview</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">By Model</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white/80">GPT-4o</span>
                <span className="text-white/80">650K tokens</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Claude 3 Opus</span>
                <span className="text-white/80">350K tokens</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Claude 3 Sonnet</span>
                <span className="text-white/80">200K tokens</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">By AI Agent</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Deal Discovery</span>
                <span className="text-white/80">320K tokens</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '32%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Thesis Development</span>
                <span className="text-white/80">280K tokens</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Profile Builder</span>
                <span className="text-white/80">250K tokens</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">By Time Period</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Today</span>
                <span className="text-white/80">120K tokens</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '12%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">This Week</span>
                <span className="text-white/80">450K tokens</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">This Month</span>
                <span className="text-white/80">1.2M tokens</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-300" />
            <span>Recent Activity</span>
          </h2>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-white font-medium">New User Registration</h3>
                  <p className="text-white/70 text-sm">5 new users registered in the last 24 hours</p>
                  <p className="text-white/50 text-xs mt-1">2 hours ago</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <Package className="h-5 w-5 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Package Updated</h3>
                  <p className="text-white/70 text-sm">Enterprise package pricing updated</p>
                  <p className="text-white/50 text-xs mt-1">5 hours ago</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Brain className="h-5 w-5 text-green-300" />
                </div>
                <div>
                  <h3 className="text-white font-medium">AI Companion Updated</h3>
                  <p className="text-white/70 text-sm">Deal Discovery Agent prompt optimized</p>
                  <p className="text-white/50 text-xs mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-300" />
            <span>System Alerts</span>
          </h2>
          <div className="space-y-4">
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-300 mt-0.5" />
                <div>
                  <h3 className="text-white font-medium">High Token Consumption</h3>
                  <p className="text-white/70 text-sm">Token consumption for Deal Discovery Agent is 30% above threshold</p>
                  <p className="text-white/50 text-xs mt-1">1 hour ago</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-300 mt-0.5" />
                <div>
                  <h3 className="text-white font-medium">User Feedback Alert</h3>
                  <p className="text-white/70 text-sm">Multiple users reporting issues with Profile Builder Agent</p>
                  <p className="text-white/50 text-xs mt-1">3 hours ago</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Zap className="h-5 w-5 text-blue-300 mt-0.5" />
                <div>
                  <h3 className="text-white font-medium">System Update Required</h3>
                  <p className="text-white/70 text-sm">New AI model version available for integration</p>
                  <p className="text-white/50 text-xs mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Trends */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-green-300" />
          <span>Usage Trends</span>
        </h2>
        <div className="h-80 bg-white/5 rounded-lg p-4 flex items-center justify-center">
          <p className="text-white/70">Usage trends chart would be displayed here</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;