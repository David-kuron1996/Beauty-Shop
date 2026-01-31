import React from 'react';
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';
import ProductCard from '../features/products/ProductCard'; // Adjust path based on location
import { products, categories } from '../services/fakeData';

const Home = () => {
  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative bg-[#FFF5F5] min-h-[600px] flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="order-2 md:order-1 space-y-6 z-10">
            <span className="text-pink-600 font-bold uppercase tracking-widest text-sm">New Collection</span>
            <h1 className="text-5xl md:text-7xl font-serif text-gray-900 leading-tight">
              Radiant Skin <br /> Starts Here
            </h1>
            <p className="text-gray-600 text-lg max-w-md">
              Discover our curated selection of premium skincare, luxurious haircare, and elegant makeup designed to bring out your natural glow.
            </p>
            <div className="flex space-x-4 pt-4">
              <button className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">
                Shop Now
              </button>
              <button className="px-8 py-3 bg-white border border-gray-300 text-gray-900 rounded-full font-medium hover:bg-gray-50 transition-all">
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-1 md:order-2 relative">
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-pink-200/50 rounded-full blur-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800" 
              alt="Beauty Products" 
              className="w-full h-auto object-cover rounded-2xl shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* 2. Shop by Category */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-medium text-gray-900 mb-2">Shop by Category</h2>
          <p className="text-gray-500">Explore our curated collections</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div key={cat.id} className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer">
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl font-serif mb-1">{cat.title}</h3>
                <p className="text-gray-200 text-sm mb-4">{cat.subtitle}</p>
                <div className="flex items-center text-sm font-bold uppercase tracking-wide opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Explore Collection <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="max-w-7xl mx-auto px-6 bg-pink-50/50 py-16 rounded-3xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-serif font-medium text-gray-900 mb-2">Featured Products</h2>
            <p className="text-gray-500">Handpicked favorites just for you</p>
          </div>
          <div className="flex space-x-2 mt-6 md:mt-0">
            {['All', 'Bestsellers', 'New Arrivals', 'Sale'].map((tab, idx) => (
              <button 
                key={tab} 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${idx === 0 ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all">
            View All Products
          </button>
        </div>
      </section>

      {/* 4. Features / Benefits */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
            { icon: ShieldCheck, title: "Secure Payment", desc: "100% protected checkout" },
            { icon: RefreshCw, title: "Easy Returns", desc: "30-day return policy" },
            { icon: Headphones, title: "24/7 Support", desc: "Dedicated customer care" }
          ].map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 mb-4">
                <feature.icon size={24} />
              </div>
              <h4 className="font-serif font-bold text-gray-900 mb-1">{feature.title}</h4>
              <p className="text-xs text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;