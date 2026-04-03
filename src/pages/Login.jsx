import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      if (response.data.message === 'success' || response.data.token) {
        login(response.data.token, response.data.user || { email });
        toast.success("Welcome!");
        navigate('/');
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card" 
        style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}
      >
        <div className="page-header">
          <h2>Welcome Back</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Sign in to continue to Shopify</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label text-left">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email"
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label text-left">Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password"
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary-hover)', fontWeight: 500 }}>Create one</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
