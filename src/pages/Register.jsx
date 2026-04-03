import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authAPI.register(formData);
      if (response.data.message === 'success' || response.status === 201) {
        toast.success("Registration successful! Please login.");
        navigate('/login');
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="glass-card" 
        style={{ width: '100%', maxWidth: '450px', padding: '2.5rem' }}
      >
        <div className="page-header">
          <h2>Join Shopify</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Create your account for a premium experience</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              name="name"
              className="form-input" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="John Doe"
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              name="email"
              className="form-input" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="john@example.com"
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input 
              type="tel" 
              name="phone"
              className="form-input" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="+1 234 567 8900"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              name="password"
              className="form-input" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="Create a strong password"
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary-hover)', fontWeight: 500 }}>Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
