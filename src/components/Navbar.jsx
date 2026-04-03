import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ShoppingCart, LogOut, Moon, Sun, Package, User, Menu, X } from 'lucide-react';
import { cartAPI } from '../services/api';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      cartAPI.getCart().then(res => {
        const cartData = res.data.cart || res.data;
        if (cartData && cartData.products) {
          const totalItems = cartData.products.reduce((acc, item) => acc + item.quantity, 0);
          setCartCount(totalItems);
        } else {
          setCartCount(0);
        }
      }).catch(() => setCartCount(0));
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About Us', path: '/about' }
  ];

  return (
    <nav className="navbar glass">
      <div className="navbar-content">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className="logo-text">Shopify</h1>
        </Link>
        
        {/* PERFECTLY CENTERED LINKS - Hidden on mobile screens */}
        <div className="mobile-hidden" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '2.5rem', whiteSpace: 'nowrap' }}>
          {navLinks.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.path} 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
        
        {/* RIGHT CONTROL TRAY */}
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
            <button 
              onClick={toggleTheme} 
              className="nav-icon-btn"
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {isAuthenticated ? (
              <>
                <NavLink to="/orders" className="nav-icon-btn" title="Your Orders">
                  <Package size={20} />
                </NavLink>

                <NavLink to="/cart" className="nav-icon-btn" style={{ position: 'relative' }} title="Cart">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span style={{ 
                      position: 'absolute', top: '-5px', right: '-5px', background: 'var(--primary-hover)', 
                      color: 'var(--bg-color)', fontSize: '0.7rem', fontWeight: 700, width: '18px', height: '18px', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%'
                    }}>
                      {cartCount}
                    </span>
                  )}
                </NavLink>

                <div 
                  onClick={handleLogout} 
                  className="mobile-hidden"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', transition: 'var(--transition)' }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--error)'; e.currentTarget.style.color = 'var(--error)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                  title="Logout"
                >
                  <LogOut size={16} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Logout</span>
                </div>
              </>
            ) : (
              <div className="mobile-hidden" style={{ display: 'flex', gap: '1rem', marginLeft: '0.5rem' }}>
                <Link to="/login" className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>Sign In</Link>
                <Link to="/register" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>Get Started</Link>
              </div>
            )}

            {/* Hamburger Button purely for Mobile devices */}
            <button 
              className="nav-icon-btn mobile-only" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ display: 'none', marginLeft: '0.5rem' }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
        </div>
      </div>

      {/* Slide Down Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-only" style={{ 
            display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1.5rem', 
            position: 'absolute', top: '100%', left: '0', width: '100%', 
            background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)', zIndex: 99
          }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.path} 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                style={{ fontSize: '1.2rem' }}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div style={{ width: '100%', height: '1px', background: 'var(--border-color)' }}></div>

          {!isAuthenticated ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <Link to="/login" className="btn btn-outline" style={{ width: '100%', padding: '0.8rem' }}>Sign In</Link>
               <Link to="/register" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem' }}>Get Started</Link>
            </div>
          ) : (
            <div 
              onClick={handleLogout} 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--error)', color: 'var(--error)' }}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
