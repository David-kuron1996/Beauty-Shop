import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { products } from '../../services/fakeData'; // Import your mock data
import { addItemToCart } from '../cart/cartSlice';
import { Star, Truck, ShieldCheck, Minus, Plus, ShoppingBag } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  // Find product by ID
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <div className="p-20 text-center text-red-500">Product not found</div>;

  const handleAddToCart = () => {
    // Dispatch action multiple times based on qty, or update slice to accept qty
    // For simplicity with current slice, we loop (or you can update slice logic)
    for(let i=0; i<qty; i++) {
        dispatch(addItemToCart(product));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-gray-900 mb-8">
        &larr; Back to Shop
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-square">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div className="space-y-8">
          <div>
            <span className="text-pink-600 font-bold uppercase tracking-widest text-xs">{product.category}</span>
            <h1 className="text-4xl font-serif text-gray-900 mt-2 mb-4">{product.name}</h1>
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400"><Star size={16} fill="currentColor" /></div>
              <span className="text-sm text-gray-500">{product.rating} / 5.0 ({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</div>

          <p className="text-gray-600 leading-relaxed">
            Experience the ultimate in luxury with our {product.name}. Formulated with premium ingredients to revitalize and protect, ensuring you look your best every single day.
          </p>

          <div className="flex items-center space-x-6">
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 space-x-4">
              <button onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16}/></button>
              <span className="font-bold w-4 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)}><Plus size={16}/></button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} /> Add to Cart
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-2"><Truck size={16} /> Free Delivery</div>
            <div className="flex items-center gap-2"><ShieldCheck size={16} /> Secure Transaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;