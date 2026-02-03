import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Package, User, MapPin, CreditCard, Calendar, FileText, Truck } from 'lucide-react';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock order data - in real app, fetch by ID
  const order = {
    id: id || 'ORD-001',
    customer: { 
      name: 'Sarah Johnson', 
      email: 'sarah@example.com',
      phone: '+254 712 345 678'
    },
    date: '2024-01-20',
    total: 16120.00,
    status: 'Processing',
    items: [
      { name: 'Radiance Vitamin C Serum', quantity: 1, price: 6240.00, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400' },
      { name: 'Hydra-Boost Moisturizer', quantity: 1, price: 7280.00, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400' },
      { name: 'Velvet Matte Lipstick', quantity: 1, price: 2600.00, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=400' }
    ],
    paymentMethod: 'M-Pesa',
    shippingAddress: '123 Beauty Lane, Nairobi, Kenya',
    orderNotes: 'Please handle with care. Fragile items.',
    timeline: [
      { status: 'Order Placed', date: '2024-01-20 10:30 AM', completed: true },
      { status: 'Payment Confirmed', date: '2024-01-20 10:35 AM', completed: true },
      { status: 'Processing', date: '2024-01-20 11:00 AM', completed: true },
      { status: 'Shipped', date: 'Pending', completed: false },
      { status: 'Delivered', date: 'Pending', completed: false }
    ]
  };

  const updateOrderStatus = (newStatus) => {
    console.log(`Updating order ${order.id} to ${newStatus}`);
  };

  const generateInvoice = () => {
    console.log(`Generating invoice for order ${order.id}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/orders')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Orders
        </button>
      </div>
      
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Order Details</h1>
        <p className="text-gray-500">Order #{order.id}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Order Info */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Items */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-serif text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">Kshs. {item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-100 mt-6 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">Kshs. {order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-serif text-gray-900 mb-4">Order Timeline</h2>
            <div className="space-y-4">
              {order.timeline.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {step.completed ? '✓' : index + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.status}
                    </p>
                    <p className="text-sm text-gray-500">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Order Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-medium text-gray-900 mb-4">Order Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Current Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-medium text-gray-900 mb-4">Customer Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User size={16} className="text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{order.customer.name}</p>
                  <p className="text-sm text-gray-500">{order.customer.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-gray-400" />
                <p className="text-sm text-gray-600">{order.shippingAddress}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <CreditCard size={16} className="text-gray-400" />
                <p className="text-sm text-gray-600">{order.paymentMethod}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-gray-400" />
                <p className="text-sm text-gray-600">{order.date}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-medium text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <button
                onClick={generateInvoice}
                className="w-full flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FileText size={16} />
                Generate Invoice
              </button>
              
              <button 
                onClick={() => window.open('https://track.example.com', '_blank')}
                className="w-full flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Truck size={16} />
                Track Shipment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;