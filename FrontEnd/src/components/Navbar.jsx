import React from 'react';
import { Search, ShoppingBag, User, Heart, Menu } from 'lucide-react'; // Ensure you have lucide-react or similar icons

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-2xl font-serif font-bold text-gray-900 tracking-wide">
          Bloom Beauty
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600 uppercase tracking-wider">
          <a href="/" className="hover:text-pink-600 transition-colors">Home</a>
          <a href="/skincare" className="hover:text-pink-600 transition-colors">Skincare</a>
          <a href="/haircare" className="hover:text-pink-600 transition-colors">Haircare</a>
          <a href="/makeup" className="hover:text-pink-600 transition-colors">Makeup</a>
          <a href="/shop" className="hover:text-pink-600 transition-colors">Shop All</a>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6 text-gray-600">
          <div className="hidden md:flex bg-gray-100 rounded-full px-4 py-2 items-center space-x-2">
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="bg-transparent border-none outline-none text-xs w-24 lg:w-32 placeholder-gray-500"
            />
          </div>
          <button className="hover:text-pink-600 transition"><User size={20} /></button>
          <button className="hover:text-pink-600 transition"><Heart size={20} /></button>
          <button className="hover:text-pink-600 transition relative">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
          </button>
          <button className="md:hidden hover:text-pink-600"><Menu size={24} /></button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;