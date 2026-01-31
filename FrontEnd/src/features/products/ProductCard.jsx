import React from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../cart/cartSlice';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent clicking the card when clicking the button
    dispatch(addItemToCart(product));
  };

  return (
    <div onClick={handleCardClick} className="group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-50 cursor-pointer">
      {/* ... Keep your existing Image logic ... */}
      <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* ... badges ... */}
      </div>

      <div className="p-5 text-center">
        {/* ... rating ... */}
        <h3 className="font-serif text-lg text-gray-900 mb-1">{product.name}</h3>
        {/* ... */}
        
        <div className="flex items-center justify-between mt-4 px-4">
          <span className="font-bold text-lg text-gray-900">${product.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            Add <ShoppingCart size={12}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;