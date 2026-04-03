import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cartAPI } from '../services/api';
import { toast } from 'react-toastify';
import { Minus, Plus, Trash2, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processingOrder, setProcessingOrder] = useState(false);

  const fetchCart = async () => {
    try {
      const response = await cartAPI.getCart();
      setCart(response.data.cart || response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateCart = async (id, action) => {
    try {
      if (action === 'add') {
        await cartAPI.addToCart(id);
      } else if (action === 'decrement') {
        await cartAPI.decrementFromCart(id);
      } else if (action === 'delete') {
        await cartAPI.deleteFromCart(id);
      }
      fetchCart();
    } catch (error) {
      toast.error("Action failed");
    }
  };

  const handleCheckout = async () => {
    setProcessingOrder(true);
    try {
      await cartAPI.createOrder();
      toast.success("Order Created Successfully! 🎉");
      setCart(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Checkout failed");
    } finally {
      setProcessingOrder(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '6rem' }}>
        <div style={{ width: '50px', height: '50px', border: '4px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const cartItems = cart?.products || [];

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="page-header" style={{ textAlign: 'left', marginBottom: '3rem' }}>
        <h2>Your Shopping Cart</h2>
      </div>

      {!cart || cartItems.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ textAlign: 'center', padding: '6rem 2rem', background: 'var(--surface-light)', borderRadius: '16px', border: '1px solid var(--border-color)' }}
        >
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Your cart is empty</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Looks like you haven't added anything yet.</p>
          <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
        </motion.div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '3rem' }}>
          {/* Cart Items List */}
          <div>
            <AnimatePresence>
              {cartItems.map((item) => {
                if (!item.productId) return null; // Safe guard against deleted products
                return (
                <motion.div 
                  key={item.productId._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-card"
                  style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'center' }}
                >
                  <div style={{ width: '100px', height: '100px', borderRadius: '8px', overflow: 'hidden', background: 'rgba(0,0,0,0.2)' }}>
                     <img 
                      src={item.productId.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.productId.title || item.productId.name || 'Product')}&background=random&size=200`} 
                      alt="Product" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <Link to={`/products/${item.productId._id}`} style={{ textDecoration: 'none' }}>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{item.productId.title || item.productId.name}</h3>
                    </Link>
                    <span style={{ color: 'var(--primary)', fontWeight: 600 }}>${item.productId.price ? item.productId.price.toFixed(2) : '0.00'}</span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '8px' }}>
                    <button onClick={() => handleUpdateCart(item.productId._id, 'decrement')} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><Minus size={16}/></button>
                    <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => handleUpdateCart(item.productId._id, 'add')} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><Plus size={16}/></button>
                  </div>
                  
                  <button onClick={() => handleUpdateCart(item.productId._id, 'delete')} style={{ background: 'transparent', border: 'none', color: 'var(--error)', cursor: 'pointer', padding: '0.5rem' }}>
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              );})}
            </AnimatePresence>
          </div>
          
          {/* Order Summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ height: 'fit-content', position: 'sticky', top: '100px' }}>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              <span>Subtotal</span>
              <span>${cart.totalPrice?.toFixed(2) || '0.00'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '1.25rem', fontWeight: 600 }}>
              <span>Total</span>
              <span style={{ color: 'var(--primary)' }}>${cart.totalPrice?.toFixed(2) || '0.00'}</span>
            </div>
            
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '2rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
              onClick={handleCheckout}
              disabled={processingOrder}
            >
              <CreditCard size={20} /> 
              {processingOrder ? 'Processing...' : 'Checkout Now'}
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Cart;
