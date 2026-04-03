import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productAPI, cartAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productAPI.getProduct(id);
        const data = response.data.product || response.data;
        setProduct(data);
      } catch (error) {
        toast.error("Failed to load product details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to your cart");
      navigate('/login');
      return;
    }
    
    setAddingToCart(true);
    try {
      await cartAPI.addToCart(id);
      toast.success("Item added to cart!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ width: '60px', height: '60px', border: '4px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!product) {
    return <div style={{ textAlign: 'center', marginTop: '4rem' }}><h2>Product not found.</h2></div>;
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '2rem', padding: '0.5rem 0', transition: 'var(--transition)' }}
        onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'}
        onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card" 
          style={{ padding: 0, overflow: 'hidden', height: '500px' }}
        >
          <img 
            src={product.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(product.title || product.name || 'P')}&background=random&size=800`} 
            alt={product.title || product.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{product.title || product.name}</h1>
          <span style={{ fontSize: '2.5rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '2rem' }}>
            ${product.price ? product.price.toFixed(2) : '0.00'}
          </span>
          
          <div style={{ background: 'var(--surface-light)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '3rem' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Product Details</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {product.description || 'No detailed description provided for this product.'}
            </p>
          </div>
          
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', fontSize: '1.2rem', display: 'flex', gap: '0.5rem', marginTop: 'auto' }}
            onClick={handleAddToCart}
            disabled={addingToCart}
          >
            <ShoppingCart size={24} />
            {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
