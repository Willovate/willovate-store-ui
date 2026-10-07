import React from 'react';
import type { RestaurantConfig } from '../../../types/restaurant';
import { useRestaurant } from '../../../store/RestaurantContext';

export function Hero({ config }: { config: RestaurantConfig }) {
  const { dispatch } = useRestaurant();
  // Use the first item's image from the 'mains' or first category as a hero image fallback if not specified
  const heroImage = config.menu[1]?.items[0]?.image || config.menu[0]?.items[0]?.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&q=80';

  return (
    <section className="rt-hero" style={{
      position: 'relative',
      height: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      overflow: 'hidden'
    }}>
      <div className="rt-hero-bg" style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // Parallax effect
        filter: 'brightness(0.35)'
      }} />
      <div className="rt-hero-content" style={{
        position: 'relative',
        zIndex: 1,
        padding: '2rem',
        maxWidth: '800px'
      }}>
        <div style={{
          display: 'inline-block',
          padding: '0.25rem 1rem',
          border: '1px solid var(--rt-primary)',
          color: 'var(--rt-primary)',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          fontSize: '0.75rem',
          marginBottom: '2rem'
        }}>
          Est. 2026
        </div>
        <h1 style={{
          fontFamily: 'var(--rt-font-heading)',
          fontSize: 'clamp(3.5rem, 10vw, 7rem)',
          margin: '0 0 1.5rem 0',
          lineHeight: 1,
          color: '#ffffff'
        }}>{config.name}</h1>
        <p style={{
          fontFamily: 'var(--rt-font-accent)',
          fontSize: '1.25rem',
          letterSpacing: '0.1em',
          color: '#cccccc',
          maxWidth: '600px',
          margin: '0 auto'
        }}>{config.tagline}</p>
        
        <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => dispatch({ type: 'TOGGLE_RESERVATION_MODAL', payload: true })} className="rt-btn-primary">Reserve a Table</button>
          <button onClick={() => {
            window.scrollBy({ top: 800, behavior: 'smooth' });
          }} className="rt-btn-outline" style={{ color: '#ffffff', borderColor: '#ffffff' }}>View Menu</button>
        </div>
        
        <div style={{
          marginTop: '4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          color: '#ffffff',
          fontSize: '0.85rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
          Open now / Closes at 11:30 PM
        </div>
      </div>
    </section>
  );
}
