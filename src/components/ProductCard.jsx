import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { cartAPI } from '../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuth();
  
  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to add to cart");
      return;
    }
    
    try {
      await cartAPI.addToCart(product._id);
      toast.success("Added to cart!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <motion.div 
      className="glass-card"
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}
    >
      <Link to={`/products/${product._id}`} style={{ flex: 1, textDecoration: 'none' }}>
        <div style={{ width: '100%', height: '200px', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem', background: 'rgba(0,0,0,0.2)' }}>
           {/* Fallback image if product.image doesn't exist */}
          <img 
            src={product.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(product.title || product.name)}&background=random&size=400`} 
            alt={product.title || product.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
        
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.title || product.name || 'Unnamed Product'}
        </h3>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.description || 'No description available'}
        </p>
      </Link>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--primary-hover)' }}>
          ${product.price ? product.price.toFixed(2) : '0.00'}
        </span>
        <button 
          onClick={handleAddToCart}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(69, 162, 158, 0.1)', transition: 'var(--transition)' }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary)'; e.currentTarget.style.color = '#000'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(69, 162, 158, 0.1)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
        >
          <ShoppingCart size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
