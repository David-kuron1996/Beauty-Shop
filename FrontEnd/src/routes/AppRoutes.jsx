import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import ProductDetails from '../features/products/ProductDetails';
import Cart from '../features/cart/Cart';
import Checkout from '../features/orders/Checkout';
import Invoice from '../features/orders/Invoice';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      
      {/* Product Details - Dynamic ID */}
      <Route path="/product/:id" element={<MainLayout><ProductDetails /></MainLayout>} />
      
      {/* Shopping Cart */}
      <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
      
      {/* Checkout & Invoice */}
      <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />
      <Route path="/invoice" element={<MainLayout><Invoice /></MainLayout>} />
      
      <Route path="*" element={<MainLayout><div className="p-20 text-center">404 Not Found</div></MainLayout>} />
    </Routes>
  );
};

export default AppRoutes;