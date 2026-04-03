import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, RefreshCw, CreditCard } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Truck size={40} strokeWidth={1.5} />,
      title: "Fast Global Shipping",
      desc: "Receive your items swiftly with our premium expedited delivery partners worldwide."
    },
    {
      icon: <ShieldCheck size={40} strokeWidth={1.5} />,
      title: "Secure Packaging",
      desc: "Every product is meticulously inspected and packaged to ensure pristine condition upon arrival."
    },
    {
      icon: <RefreshCw size={40} strokeWidth={1.5} />,
      title: "Hassle-Free Returns",
      desc: "Not quite right? We offer a complimentary 30-day return window on all standard orders."
    },
    {
      icon: <CreditCard size={40} strokeWidth={1.5} />,
      title: "Secure Payments",
      desc: "Your transactions are shielded with enterprise-grade encryption for total peace of mind."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 2 }}
        >
          <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', fontWeight: 700 }}>
            Discover Premium <br/> 
            <span style={{ color: 'var(--primary-hover)' }}>E-Commerce Experience</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            Shopify your lifestyle with our curated collection of high-end products. Experience seamless shopping like never before.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/shop" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Shop Now
            </Link>
            <Link to="/register" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Join Membership
            </Link>
          </div>
        </motion.div>
        
        {/* Background decorative elements */}
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: '300px', height: '300px', background: 'var(--primary)', filter: 'blur(150px)', opacity: 0.2, borderRadius: '50%', zIndex: 1 }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '300px', height: '300px', background: '#2b6c68', filter: 'blur(150px)', opacity: 0.2, borderRadius: '50%', zIndex: 1 }} />
      </section>

      {/* E-Commerce Features Grid */}
      <section style={{ padding: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>The Shopify Standard</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>We ensure a flawless experience from checkout to unboxing.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass-card"
              style={{ textAlign: 'center', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
