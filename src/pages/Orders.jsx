import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { orderAPI } from '../services/api';
import { Package, Calendar, MapPin } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderAPI.getUserOrder();
        // Assuming response structure contains array of orders
        const orderData = response.data.orders || response.data;
        if (Array.isArray(orderData)) {
          // Sort by newest first
          setOrders(orderData.reverse());
        } else {
          setOrders([orderData]); // single order fallback
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '6rem' }}>
        <div style={{ width: '50px', height: '50px', border: '4px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0', maxWidth: '800px', margin: '0 auto' }}>
      <div className="page-header" style={{ textAlign: 'left', marginBottom: '3rem' }}>
        <h2>Order History</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Track your recent purchases and their status.</p>
      </div>

      {!orders || orders.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--surface-light)', borderRadius: '16px', border: '1px solid var(--border-color)' }}
        >
          <Package size={48} style={{ color: 'var(--border-color)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No orders found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>You haven't placed any orders yet.</p>
        </motion.div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <AnimatePresence>
            {orders.map((order) => (
              <motion.div 
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
                style={{ padding: '2rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>ORDER ID</span>
                    <strong style={{ letterSpacing: '1px', fontFamily: 'monospace' }}>#{order._id.slice(-8).toUpperCase()}</strong>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 500 }}>
                      <Calendar size={16} /> 
                      {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Items</h4>
                  {order.products && order.products.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                         <span style={{ background: 'var(--border-color)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' }}>{item.quantity}x</span>
                         Product ID: {item.productId?.title || item.productId?.name || item.productId || 'Unknown Item'}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>SHIPPING ADDRESS</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={16} color="var(--primary)" /> 
                      {order.address || 'Address on file'}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>TOTAL</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-hover)' }}>
                      ${order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Orders;
