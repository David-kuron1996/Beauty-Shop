import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, Package, Users, 
  ShoppingCart, Eye, Calendar, BarChart3, PieChart 
} from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');

  // Mock analytics data that changes based on timeRange
  const getAnalyticsData = (timeRange) => {
    const baseData = {
      '7d': {
        revenue: 'Kshs. 1,618,500',
        orders: '324',
        views: '12,340',
        conversion: '2.8%',
        topProducts: [
          { name: 'Radiance Vitamin C Serum', sales: 45, revenue: 280800, views: 890, conversionRate: 5.1 },
          { name: 'Hydra-Boost Moisturizer', sales: 38, revenue: 276640, views: 654, conversionRate: 5.8 },
        ]
      },
      '30d': {
        revenue: 'Kshs. 5,938,140',
        orders: '1,234',
        views: '45,892',
        conversion: '3.2%',
        topProducts: [
          { name: 'Radiance Vitamin C Serum', sales: 145, revenue: 904800, views: 2340, conversionRate: 6.2 },
          { name: 'Hydra-Boost Moisturizer', sales: 132, revenue: 960960, views: 1890, conversionRate: 7.0 },
        ]
      },
      '90d': {
        revenue: 'Kshs. 16,698,500',
        orders: '3,567',
        views: '125,340',
        conversion: '3.5%',
        topProducts: [
          { name: 'Radiance Vitamin C Serum', sales: 425, revenue: 2652000, views: 6780, conversionRate: 6.3 },
          { name: 'Hydra-Boost Moisturizer', sales: 398, revenue: 2897440, views: 5670, conversionRate: 7.0 },
        ]
      },
      '1y': {
        revenue: 'Kshs. 73,825,700',
        orders: '15,234',
        views: '567,890',
        conversion: '3.8%',
        topProducts: [
          { name: 'Radiance Vitamin C Serum', sales: 1845, revenue: 11512800, views: 28900, conversionRate: 6.4 },
          { name: 'Hydra-Boost Moisturizer', sales: 1732, revenue: 12608960, views: 24560, conversionRate: 7.1 },
        ]
      }
    };
    return baseData[timeRange] || baseData['30d'];
  };

  const currentData = getAnalyticsData(timeRange);
  const overviewStats = [
    { 
      name: 'Total Revenue', 
      value: currentData.revenue, 
      change: '+15.3%', 
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    { 
      name: 'Total Orders', 
      value: currentData.orders, 
      change: '+23.1%', 
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    { 
      name: 'Product Views', 
      value: currentData.views, 
      change: '+8.7%', 
      trend: 'up',
      icon: Eye,
      color: 'bg-purple-500'
    },
    { 
      name: 'Conversion Rate', 
      value: currentData.conversion, 
      change: '-2.1%', 
      trend: 'down',
      icon: TrendingUp,
      color: 'bg-pink-500'
    }
  ];

  const topProducts = currentData.topProducts;

  const categoryPerformance = [
    { category: 'Skincare', sales: 456, revenue: 22080, percentage: 48.3 },
    { category: 'Makeup', sales: 234, revenue: 11232, percentage: 24.6 },
    { category: 'Haircare', sales: 198, revenue: 8712, percentage: 19.1 },
    { category: 'Other', sales: 89, revenue: 3654, percentage: 8.0 }
  ];

  const customerBehavior = [
    { metric: 'Avg. Session Duration', value: '4m 32s', change: '+12%' },
    { metric: 'Pages per Session', value: '5.7', change: '+8%' },
    { metric: 'Bounce Rate', value: '32.1%', change: '-5%' },
    { metric: 'Return Customers', value: '28.4%', change: '+15%' }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-500">Track your store's performance and customer insights</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-serif text-gray-900">Top Performing Products</h2>
              <BarChart3 size={20} className="text-gray-400" />
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
                        <span>{product.views} views</span>
                        <span>{product.conversionRate}% conversion</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">Kshs. {product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-serif text-gray-900">Category Performance</h2>
              <PieChart size={20} className="text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {categoryPerformance.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{category.category}</span>
                    <span className="text-sm text-gray-500">{category.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{category.sales} orders</span>
                    <span>Kshs. {category.revenue.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Behavior */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-serif text-gray-900">Customer Behavior</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customerBehavior.map((metric) => (
              <div key={metric.metric} className="text-center">
                <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-sm text-gray-500 mb-2">{metric.metric}</p>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  metric.change.startsWith('+') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {metric.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sales Trend Chart Placeholder */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-serif text-gray-900">Sales Trend</h2>
        </div>
        <div className="p-6">
          <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <BarChart3 size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Sales trend chart would be displayed here</p>
              <p className="text-sm text-gray-400">Integration with charting library needed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;