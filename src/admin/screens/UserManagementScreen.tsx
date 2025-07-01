import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Database,
  Eye,
  CheckCircle,
  X
} from 'lucide-react';

// Sample user data
const sampleUsers = [
  {
    id: 'user1',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@example.com',
    role: 'founder',
    status: 'active',
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    tokenConsumption: 45000,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
  },
  {
    id: 'user2',
    name: 'Sarah Al-Rashid',
    email: 'sarah.alrashid@example.com',
    role: 'investor',
    status: 'active',
    lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    tokenConsumption: 32000,
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000) // 45 days ago
  },
  {
    id: 'user3',
    name: 'Dr. Fatima Al-Zahra',
    email: 'fatima.alzahra@example.com',
    role: 'expert',
    status: 'active',
    lastLogin: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    tokenConsumption: 28000,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) // 60 days ago
  },
  {
    id: 'user4',
    name: 'Omar Al-Mansouri',
    email: 'omar.almansouri@example.com',
    role: 'founder',
    status: 'inactive',
    lastLogin: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    tokenConsumption: 12000,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) // 90 days ago
  },
  {
    id: 'user5',
    name: 'Layla Kassem',
    email: 'layla.kassem@example.com',
    role: 'investor',
    status: 'active',
    lastLogin: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    tokenConsumption: 38000,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) // 15 days ago
  }
];

function UserManagementScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showTokenDetails, setShowTokenDetails] = useState<string | null>(null);

  // Filter and sort users
  const filteredUsers = sampleUsers
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'email':
          comparison = a.email.localeCompare(b.email);
          break;
        case 'role':
          comparison = a.role.localeCompare(b.role);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'lastLogin':
          comparison = a.lastLogin.getTime() - b.lastLogin.getTime();
          break;
        case 'tokenConsumption':
          comparison = a.tokenConsumption - b.tokenConsumption;
          break;
        case 'createdAt':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays}d ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;
    return `${Math.floor(diffInDays / 30)}mo ago`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleEditUser = (userId: string) => {
    setSelectedUser(userId);
    // In a real app, you would open an edit modal or navigate to an edit page
    console.log(`Edit user with ID: ${userId}`);
  };

  const handleDeleteUser = (userId: string) => {
    setSelectedUser(userId);
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = () => {
    // In a real app, you would delete the user from the database
    console.log(`Delete user with ID: ${selectedUser}`);
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const toggleTokenDetails = (userId: string) => {
    if (showTokenDetails === userId) {
      setShowTokenDetails(null);
    } else {
      setShowTokenDetails(userId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">User Management</h1>
        <button 
          onClick={handleAddUser}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2 w-full md:w-auto justify-center"
        >
          <Plus className="h-5 w-5" />
          <span>Add New User</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all" className="bg-slate-800">All Roles</option>
              <option value="founder" className="bg-slate-800">Founder</option>
              <option value="investor" className="bg-slate-800">Investor</option>
              <option value="expert" className="bg-slate-800">Expert</option>
              <option value="admin" className="bg-slate-800">Admin</option>
            </select>
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all" className="bg-slate-800">All Statuses</option>
              <option value="active" className="bg-slate-800">Active</option>
              <option value="inactive" className="bg-slate-800">Inactive</option>
              <option value="suspended" className="bg-slate-800">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5">
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Name</span>
                    {sortBy === 'name' && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Email</span>
                    {sortBy === 'email' && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('role')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Role</span>
                    {sortBy === 'role' && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    {sortBy === 'status' && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('lastLogin')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Last Login</span>
                    {sortBy === 'lastLogin' && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('tokenConsumption')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Token Usage</span>
                    {sortBy === 'tokenConsumption' && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-white/80 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredUsers.map((user) => (
                <React.Fragment key={user.id}>
                  <tr className="hover:bg-white/5">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">{user.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{user.name}</div>
                          <div className="text-sm text-white/60">Created {formatDate(user.createdAt)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'founder' ? 'bg-purple-500/20 text-purple-300' :
                        user.role === 'investor' ? 'bg-blue-500/20 text-blue-300' :
                        user.role === 'expert' ? 'bg-green-500/20 text-green-300' :
                        'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'active' ? 'bg-green-500/20 text-green-300' :
                        user.status === 'inactive' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                      {formatTimeAgo(user.lastLogin)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => toggleTokenDetails(user.id)}
                        className="flex items-center space-x-1 text-white/70 hover:text-white"
                      >
                        <Database className="h-4 w-4 text-yellow-300" />
                        <span>{formatNumber(user.tokenConsumption)}</span>
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => handleEditUser(user.id)}
                          className="text-white/70 hover:text-white p-1 rounded hover:bg-white/10"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-white/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="text-white/70 hover:text-white p-1 rounded hover:bg-white/10">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {showTokenDetails === user.id && (
                    <tr className="bg-white/5">
                      <td colSpan={7} className="px-6 py-4">
                        <div className="space-y-4">
                          <h4 className="text-white font-medium">Token Consumption Details</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white/10 rounded-lg p-3">
                              <h5 className="text-white/70 text-sm mb-1">By Model</h5>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-white/80 text-xs">GPT-4o</span>
                                  <span className="text-white/80 text-xs">25K tokens</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-white/80 text-xs">Claude 3 Opus</span>
                                  <span className="text-white/80 text-xs">15K tokens</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-white/80 text-xs">Claude 3 Sonnet</span>
                                  <span className="text-white/80 text-xs">5K tokens</span>
                                </div>
                              </div>
                            </div>
                            <div className="bg-white/10 rounded-lg p-3">
                              <h5 className="text-white/70 text-sm mb-1">By AI Agent</h5>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-white/80 text-xs">Deal Discovery</span>
                                  <span className="text-white/80 text-xs">18K tokens</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-white/80 text-xs">Thesis Development</span>
                                  <span className="text-white/80 text-xs">12K tokens</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-white/80 text-xs">Profile Builder</span>
                                  <span className="text-white/80 text-xs">15K tokens</span>
                                </div>
                              </div>
                            </div>
                            <div className="bg-white/10 rounded-lg p-3">
                              <h5 className="text-white/70 text-sm mb-1">By Time Period</h5>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-white/80 text-xs">Today</span>
                                  <span className="text-white/80 text-xs">5K tokens</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-white/80 text-xs">This Week</span>
                                  <span className="text-white/80 text-xs">15K tokens</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-white/80 text-xs">This Month</span>
                                  <span className="text-white/80 text-xs">45K tokens</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <button 
                              onClick={() => setShowTokenDetails(null)}
                              className="text-white/70 hover:text-white text-sm"
                            >
                              Close Details
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-4">Add New User</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Role</label>
                <select
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="" className="bg-slate-800">Select role</option>
                  <option value="founder" className="bg-slate-800">Founder</option>
                  <option value="investor" className="bg-slate-800">Investor</option>
                  <option value="expert" className="bg-slate-800">Expert</option>
                  <option value="admin" className="bg-slate-800">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Status</label>
                <select
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="active" className="bg-slate-800">Active</option>
                  <option value="inactive" className="bg-slate-800">Inactive</option>
                  <option value="suspended" className="bg-slate-800">Suspended</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 text-white/70 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-4">Confirm Deletion</h2>
            <p className="text-white/80 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-white/70 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteUser}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagementScreen;