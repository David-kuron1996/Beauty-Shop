import React, { useState } from 'react';
import { 
  Plus, Edit, Trash2, Shield, Users, Settings, 
  Check, X, Crown, UserCheck, Lock 
} from 'lucide-react';

const Roles = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  // Mock roles data
  const roles = [
    {
      id: 2,
      name: 'Admin',
      description: 'Administrative access to most features',
      userCount: 2,
      permissions: ['products', 'orders', 'users', 'analytics', 'reports'],
      color: 'purple',
      isSystem: true
    },
    {
      id: 5,
      name: 'Customer',
      description: 'Standard customer account',
      userCount: 847,
      permissions: ['profile', 'orders'],
      color: 'gray',
      isSystem: true
    }
  ];

  const allPermissions = [
    { id: 'products', name: 'Product Management', description: 'Create, edit, and delete products' },
    { id: 'orders', name: 'Order Management', description: 'View and manage customer orders' },
    { id: 'users', name: 'User Management', description: 'Manage user accounts and roles' },
    { id: 'customers', name: 'Customer Service', description: 'Handle customer inquiries and support' },
    { id: 'analytics', name: 'Analytics Access', description: 'View business analytics and insights' },
    { id: 'reports', name: 'Reports Generation', description: 'Generate and export reports' },
    { id: 'settings', name: 'System Settings', description: 'Configure system settings' },
    { id: 'profile', name: 'Profile Management', description: 'Manage own profile and preferences' }
  ];

  const getRoleColor = (color) => {
    const colors = {
      red: 'bg-red-100 text-red-800 border-red-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      gray: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[color] || colors.gray;
  };

  const getRoleIcon = (roleName) => {
    if (roleName.includes('Super Admin')) return Crown;
    if (roleName.includes('Admin')) return Shield;
    if (roleName.includes('Manager')) return UserCheck;
    return Users;
  };

  const handleDeleteRole = (roleId) => {
    console.log('Deleting role:', roleId);
    // Handle role deletion
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setShowCreateModal(true);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif text-gray-900">Role Management</h1>
          <p className="text-gray-500 mt-1">Manage user roles and permissions</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus size={18} />
          Create Role
        </button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => {
          const IconComponent = getRoleIcon(role.name);
          return (
            <div key={role.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
              
              {/* Role Header */}
              <div className={`p-6 border-b border-gray-100 ${role.isSystem ? 'bg-gradient-to-r from-gray-50 to-gray-100' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getRoleColor(role.color)}`}>
                    <IconComponent size={24} />
                  </div>
                  {!role.isSystem && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditRole(role)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteRole(role.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-serif text-lg text-gray-900 mb-1">{role.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{role.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users size={14} />
                      <span>{role.userCount} users</span>
                    </div>
                    {role.isSystem && (
                      <div className="flex items-center gap-1 text-blue-600">
                        <Lock size={14} />
                        <span>System</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div className="p-6">
                <h4 className="font-medium text-gray-900 mb-3">Permissions</h4>
                
                {role.permissions.includes('all') ? (
                  <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                    <Check size={16} />
                    <span>All Permissions</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {allPermissions.slice(0, 4).map((permission) => (
                      <div key={permission.id} className="flex items-center gap-2 text-sm">
                        {role.permissions.includes(permission.id) ? (
                          <Check size={14} className="text-green-600" />
                        ) : (
                          <X size={14} className="text-gray-300" />
                        )}
                        <span className={role.permissions.includes(permission.id) ? 'text-gray-900' : 'text-gray-400'}>
                          {permission.name}
                        </span>
                      </div>
                    ))}
                    
                    {role.permissions.length > 4 && (
                      <p className="text-xs text-gray-500 mt-2">
                        +{role.permissions.length - 4} more permissions
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Permissions Reference */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-serif text-gray-900 mb-6">Available Permissions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allPermissions.map((permission) => (
            <div key={permission.id} className="flex items-start gap-3 p-4 border border-gray-100 rounded-xl">
              <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mt-0.5">
                <Settings size={16} className="text-pink-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{permission.name}</h4>
                <p className="text-sm text-gray-500">{permission.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create/Edit Role Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-serif text-gray-900">
                {editingRole ? 'Edit Role' : 'Create New Role'}
              </h3>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Role Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
                  <input
                    type="text"
                    placeholder="Enter role name"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="purple">Purple</option>
                    <option value="red">Red</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Describe this role's purpose"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              {/* Permissions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Permissions</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {allPermissions.map((permission) => (
                    <label key={permission.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" className="mt-1" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{permission.name}</p>
                        <p className="text-xs text-gray-500">{permission.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingRole(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors">
                {editingRole ? 'Update Role' : 'Create Role'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;