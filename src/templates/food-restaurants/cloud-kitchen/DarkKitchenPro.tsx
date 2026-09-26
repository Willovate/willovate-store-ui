import { useState } from 'react';

export default function DarkKitchenPro() {
  const [activeBrand, setActiveBrand] = useState('BurgerBlitz');

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#e5e5e5', fontFamily: '"Inter", sans-serif', minHeight: '100vh' }}>
      
      <header style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '2px' }}>DARK KITCHEN PRO</div>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem' }}>
          <span style={{ color: '#aaa' }}>Delivering to: <strong style={{ color: '#fff' }}>Metropolis Center</strong></span>
          <button style={{ backgroundColor: '#fff', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold' }}>Cart (0)</button>
        </div>
      </header>

      <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 900, margin: '0 0 1rem 0' }}>One Kitchen. Five Brands.</h1>
        <p style={{ fontSize: '1.2rem', color: '#888', marginBottom: '4rem' }}>Mix and match from any of our virtual restaurants into a single delivery.</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
          {['BurgerBlitz', 'TacoNinja', 'SaladWorks', 'PizzaGhost', 'WokStar'].map(brand => (
            <button 
              key={brand}
              onClick={() => setActiveBrand(brand)}
              style={{
                backgroundColor: activeBrand === brand ? '#fff' : '#1a1a1a',
                color: activeBrand === brand ? '#000' : '#888',
                border: '1px solid #333',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                borderRadius: '8px'
              }}
            >
              {brand}
            </button>
          ))}
        </div>

        <div style={{ backgroundColor: '#1a1a1a', padding: '4rem', borderRadius: '16px', maxWidth: '1000px', margin: '0 auto', textAlign: 'left', border: '1px solid #333' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{activeBrand} Menu</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ backgroundColor: '#0a0a0a', padding: '2rem', borderRadius: '8px', border: '1px solid #222' }}>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{activeBrand} Signature {i}</h3>
                <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Prepared fresh in our state-of-the-art facility.</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>$12.99</span>
                  <button style={{ backgroundColor: '#333', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>+ Add</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
