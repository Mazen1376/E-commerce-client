import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured'); // featured, price-low, price-high, name
  
  // Mobile focus state for search
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getProducts();
        const allProducts = response.data.products || response.data;
        setProducts(allProducts);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Derive categories dynamically
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['All', ...cats].filter(Boolean);
  }, [products]);

  // Compute final filtered & sorted products
  const processedProducts = useMemo(() => {
    let filtered = products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === 'All' ? true : p.category === selectedCategory;
      return matchSearch && matchCat;
    });

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // 'featured' essentially keeps the fetched order (or could be custom logic)
        break;
    }
    
    return filtered;
  }, [products, searchQuery, selectedCategory, sortBy]);

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
      
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '6rem' }}>
          <div style={{ width: '50px', height: '50px', border: '4px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : (
        <>
          {/* Advanced Controls Section */}
          <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Top row: Search & Sort */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
              
              {/* Search Bar */}
              <div style={{ flex: '1 1 300px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1.2rem', color: isSearchFocused ? 'var(--primary)' : 'var(--text-secondary)', transition: 'color 0.3s ease' }}>
                  <Search size={20} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search by product name..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  style={{ 
                    width: '100%', padding: '1rem 1rem 1rem 3.5rem', borderRadius: '50px', 
                    fontSize: '1rem', background: 'rgba(0,0,0,0.05)', border: `1px solid ${isSearchFocused ? 'var(--primary)' : 'transparent'}`,
                    outline: 'none', color: 'var(--text-primary)', transition: 'border-color 0.3s ease, background 0.3s ease'
                  }}
                />
              </div>

              {/* Sort Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <SlidersHorizontal size={18} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Sort by:</span>
                 </div>
                 <div style={{ position: 'relative' }}>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      style={{
                        appearance: 'none', padding: '0.8rem 2.5rem 0.8rem 1.2rem', borderRadius: '50px',
                        background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-primary)',
                        fontSize: '0.95rem', cursor: 'pointer', outline: 'none'
                      }}
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name">Alphabetical (A-Z)</option>
                    </select>
                    <ChevronDown size={16} color="var(--text-secondary)" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                 </div>
              </div>
            </div>

            {/* Bottom row: Categories */}
            {categories.length > 1 && (
              <div style={{ display: 'flex', gap: '0.8rem', overflowX: 'auto', paddingBottom: '0.5rem', WebkitOverflowScrolling: 'touch' }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                       padding: '0.6rem 1.5rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 500,
                       border: '1px solid', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.3s ease',
                       background: selectedCategory === cat ? 'var(--primary)' : 'transparent',
                       color: selectedCategory === cat ? 'var(--bg-color)' : 'var(--text-primary)',
                       borderColor: selectedCategory === cat ? 'var(--primary)' : 'var(--border-color)'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem' }}>
            <AnimatePresence mode="popLayout">
              {processedProducts.length > 0 ? (
                processedProducts.map((product, idx) => (
                  <motion.div 
                    layout
                    key={product._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                    style={{ height: '100%' }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '6rem 2rem', background: 'var(--surface-light)', borderRadius: '24px', border: '1px dashed var(--border-color)' }}
                >
                  <Search size={48} color="var(--border-color)" style={{ marginBottom: '1.5rem' }} />
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>No Matches Found</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 2rem auto' }}>
                    We couldn't find any products matching your current filters. Try adjusting your search query or selecting a different category.
                  </p>
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} 
                    className="btn btn-outline"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Shop;
