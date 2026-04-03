import React from 'react';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, RefreshCw, CreditCard } from 'lucide-react';

const About = () => {
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
    <div style={{ padding: '2rem 0' }}>
      {/* Hero */}
      <section style={{ textAlign: 'center', marginBottom: '6rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Our Story</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            Shopify was founded on a simple principle: to bring unparalleled quality and design to the modern consumer. We don't just sell products; we curate a lifestyle.
          </p>
        </motion.div>
      </section>

      {/* Grid Image Section */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
        <motion.div 
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="glass-card" style={{ padding: 0, overflow: 'hidden', height: '400px' }}
        >
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" alt="Office space" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem' }}
        >
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Designing the future of e-commerce.</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
            From our headquarters, our team of designers and curators scour the globe to identify trends before they emerge. Every item in our catalogue has been rigorously tested and reviewed to ensure it meets our exacting standards.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            Whether you are looking for timeless classics or cutting-edge innovations, our collection is designed to inspire and delight.
          </p>
        </motion.div>
      </section>

      {/* Features */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem' }}>Why Choose Us</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              className="glass-card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}
            >
              <div style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
