import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package, Users, ShoppingCart, DollarSign, TrendingUp, 
  Eye, Plus, FileText, AlertCircle, ArrowLeft 
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  // Mock data for dashboard
  const stats = [
    { name: 'Total Products', value: '156', change: '+12%', icon: Package, color: 'bg-blue-500' },
    { name: 'Total Orders', value: '1,234', change: '+23%', icon: ShoppingCart, color: 'bg-green-500' },
    { name: 'Total Users', value: '892', change: '+8%', icon: Users, color: 'bg-purple-500' },
    { name: 'Revenue', value: 'Kshs. 5,938,140', change: '+15%', icon: DollarSign, color: 'bg-pink-500' },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'Sarah Johnson', amount: 'Kshs. 16,120', status: 'Processing', date: '2024-01-20' },
    { id: 'ORD-002', customer: 'Mike Chen', amount: 'Kshs. 11,635', status: 'Shipped', date: '2024-01-20' },
    { id: 'ORD-003', customer: 'Emma Davis', amount: 'Kshs. 20,378', status: 'Delivered', date: '2024-01-19' },
    { id: 'ORD-004', customer: 'John Smith', amount: 'Kshs. 8,743', status: 'Processing', date: '2024-01-19' },
  ];

  const topProducts = [
    { name: 'Radiance Vitamin C Serum', sales: 145, revenue: 'Kshs. 904,800', views: 2340 },
    { name: 'Hydra-Boost Moisturizer', sales: 132, revenue: 'Kshs. 960,960', views: 1890 },
    { name: 'Velvet Matte Lipstick', sales: 98, revenue: 'Kshs. 407,680', views: 1560 },
    { name: 'Argan Repair Hair Oil', sales: 87, revenue: 'Kshs. 407,160', views: 1234 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            <Plus size={18} />
            Add Product
          </Link>
          <Link
            to="/admin/reports"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            <FileText size={18} />
            Generate Report
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 font-medium">{stat.change} from last month</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-serif text-gray-900">Recent Orders</h2>
              <Link to="/admin/orders" className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                View All
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{order.amount}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-serif text-gray-900">Top Products</h2>
              <Link to="/admin/analytics" className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                View Analytics
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-sm mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{product.sales} sales</span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} />
                          {product.views}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-serif text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/products/new"
            className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Package size={24} className="text-gray-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Product</span>
          </Link>
          <Link
            to="/admin/orders"
            className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ShoppingCart size={24} className="text-gray-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">View Orders</span>
          </Link>
          <Link
            to="/admin/users"
            className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Users size={24} className="text-gray-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Manage Users</span>
          </Link>
          <Link
            to="/admin/analytics"
            className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <TrendingUp size={24} className="text-gray-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">View Analytics</span>
          </Link>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <div className="flex items-start">
          <AlertCircle size={20} className="text-yellow-600 mt-0.5 mr-3" />
          <div>
            <h3 className="font-medium text-yellow-800">System Alerts</h3>
            <p className="text-sm text-yellow-700 mt-1">
              3 products are running low on stock. 2 orders require attention.
            </p>
            <div className="mt-3 flex gap-3">
              <Link to="/admin/products" className="text-sm font-medium text-yellow-800 hover:text-yellow-900">
                Check Inventory →
              </Link>
              <Link to="/admin/orders" className="text-sm font-medium text-yellow-800 hover:text-yellow-900">
                Review Orders →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;