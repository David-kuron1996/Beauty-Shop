import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ArrowLeft, User, Mail, Phone, MapPin, Save, Shield, 
  Key, Smartphone, Clock, Globe, Bell, Activity, 
  AlertTriangle, Settings, Eye, EyeOff, CheckCircle, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../auth/authSlice';
import Notification from '../../components/Notification';

const AdminProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ isVisible: false, message: '', type: 'info' });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [theme, setTheme] = useState('light');
  const [defaultPage, setDefaultPage] = useState('dashboard');
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    role: user?.role || 'admin',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'profile', name: 'Basic Info', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'permissions', name: 'Permissions', icon: Key },
    { id: 'preferences', name: 'Preferences', icon: Settings },
    { id: 'activity', name: 'Activity', icon: Activity }
  ];

  const permissions = [
    { name: 'Manage Users', granted: true },
    { name: 'Delete Content', granted: user?.role === 'admin' },
    { name: 'Access Analytics', granted: true },
    { name: 'Manage Products', granted: true },
    { name: 'System Settings', granted: user?.role === 'admin' }
  ];

  const recentActivity = [
    { action: 'Updated product pricing', time: '2 hours ago', type: 'edit' },
    { action: 'Deleted user account', time: '1 day ago', type: 'delete' },
    { action: 'Generated sales report', time: '2 days ago', type: 'report' },
    { action: 'Modified user permissions', time: '3 days ago', type: 'security' },
    { action: 'Logged in from new device', time: '1 week ago', type: 'login' }
  ];

  const activeSessions = [
    { device: 'Chrome on Windows', location: 'Nairobi, Kenya', lastActive: 'Active now', current: true },
    { device: 'Safari on iPhone', location: 'Mombasa, Kenya', lastActive: '2 hours ago', current: false }
  ];

  const showNotification = (message, type = 'info') => {
    setNotification({ isVisible: true, message, type });
  };

  const hideNotification = () => {
    setNotification({ ...notification, isVisible: false });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const updatedUser = { ...user, ...formData };
      dispatch(loginSuccess(updatedUser));
      setIsLoading(false);
      setIsEditing(false);
      showNotification('Profile updated successfully!', 'success');
    }, 1000);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      role: user?.role || 'admin',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <Notification 
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
      
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
      </div>
      
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Admin Profile</h1>
        <p className="text-gray-500">Manage your account information and settings</p>
      </div>

      <div className="max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                <User size={24} className="text-pink-600" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-sm text-gray-500 capitalize">{user?.role?.replace('_', ' ')}</p>
                <p className="text-xs text-gray-400">Last login: 2 hours ago from Nairobi, Kenya</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-pink-500 text-pink-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            
            {/* Basic Info Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save size={16} />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                        <User size={16} className="text-gray-400" />
                        <span className="text-gray-900">{user?.firstName}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                        <User size={16} className="text-gray-400" />
                        <span className="text-gray-900">{user?.lastName}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                      <Mail size={16} className="text-gray-400" />
                      <span className="text-gray-900">{user?.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                      <Phone size={16} className="text-gray-400" />
                      <span className="text-gray-900">{user?.phone || 'Not provided'}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Key size={20} className="text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Change Password</p>
                        <p className="text-sm text-gray-500">Update your account password</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Change
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Smartphone size={20} className="text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        twoFactorEnabled 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {twoFactorEnabled ? 'Enabled' : 'Enable'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Bell size={20} className="text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Security Alerts</p>
                        <p className="text-sm text-gray-500">Email notifications for suspicious activity</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSecurityAlerts(!securityAlerts)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        securityAlerts 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {securityAlerts ? 'On' : 'Off'}
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Active Sessions</h4>
                  <div className="space-y-3">
                    {activeSessions.map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{session.device}</p>
                          <p className="text-sm text-gray-500">{session.location} • {session.lastActive}</p>
                        </div>
                        {session.current ? (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Current</span>
                        ) : (
                          <button className="text-sm text-red-600 hover:text-red-700">Revoke</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Permissions Tab */}
            {activeTab === 'permissions' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Role & Permissions</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                    {user?.role?.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {permissions.map((permission, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <span className="text-gray-900">{permission.name}</span>
                      {permission.granted ? (
                        <CheckCircle size={20} className="text-green-600" />
                      ) : (
                        <X size={20} className="text-red-600" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={20} className="text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800">Permission Changes</p>
                      <p className="text-sm text-yellow-700">Only Super Admins can modify user permissions. Contact your system administrator for changes.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">System Preferences</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dashboard Theme</label>
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Landing Page</label>
                    <select
                      value={defaultPage}
                      onChange={(e) => setDefaultPage(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="dashboard">Dashboard</option>
                      <option value="analytics">Analytics</option>
                      <option value="products">Products</option>
                      <option value="orders">Orders</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language & Timezone</label>
                    <div className="grid grid-cols-2 gap-4">
                      <select className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                        <option>English</option>
                        <option>Swahili</option>
                      </select>
                      <select className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                        <option>Africa/Nairobi</option>
                        <option>UTC</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'edit' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'delete' ? 'bg-red-100 text-red-600' :
                        activity.type === 'report' ? 'bg-green-100 text-green-600' :
                        activity.type === 'security' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        <Activity size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={20} className="text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800">Danger Zone</p>
                      <p className="text-sm text-red-700 mb-3">These actions cannot be undone.</p>
                      <div className="space-y-2">
                        <button className="block w-full text-left px-3 py-2 text-red-700 border border-red-300 rounded-lg hover:bg-red-100 transition-colors">
                          Request Role Downgrade
                        </button>
                        <button className="block w-full text-left px-3 py-2 text-red-700 border border-red-300 rounded-lg hover:bg-red-100 transition-colors">
                          Deactivate Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;