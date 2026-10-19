import React from 'react';
import type { RestaurantConfig } from '../../../types/restaurant';

export function Footer({ config }: { config: RestaurantConfig }) {
  return (
    <footer style={{
      backgroundColor: 'var(--rt-secondary)',
      padding: '4rem 2rem 2rem',
      color: 'var(--rt-text)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '3rem',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        paddingBottom: '3rem',
        marginBottom: '2rem'
      }}>
        {/* Brand Column */}
        <div>
          <h3 style={{ fontFamily: 'var(--rt-font-heading)', fontSize: '2rem', margin: '0 0 1rem 0' }}>{config.name}</h3>
          <p style={{ opacity: 0.7, lineHeight: 1.6, marginBottom: '1.5rem' }}>{config.tagline}</p>
          <p style={{ opacity: 0.7 }}>Chef: {config.chef}</p>
        </div>
        
        {/* Hours & Location */}
        <div>
          <h4 style={{ fontFamily: 'var(--rt-font-accent)', fontSize: '1.2rem', margin: '0 0 1.5rem 0', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--rt-primary)' }}>Visit Us</h4>
          <p style={{ opacity: 0.7, marginBottom: '0.5rem' }}>{config.address}</p>
          <p style={{ opacity: 0.7, marginBottom: '1.5rem' }}>{config.hours}</p>
          <a href="#" style={{ color: 'var(--rt-primary)', textDecoration: 'none', borderBottom: '1px solid var(--rt-primary)' }}>Get Directions</a>
        </div>
        
        {/* Quick Links */}
        <div>
          <h4 style={{ fontFamily: 'var(--rt-font-accent)', fontSize: '1.2rem', margin: '0 0 1.5rem 0', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--rt-primary)' }}>Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><a href="#" style={{ color: 'var(--rt-text)', opacity: 0.7, textDecoration: 'none' }}>Menus</a></li>
            <li><a href="#" style={{ color: 'var(--rt-text)', opacity: 0.7, textDecoration: 'none' }}>Reservations</a></li>
            <li><a href="#" style={{ color: 'var(--rt-text)', opacity: 0.7, textDecoration: 'none' }}>Private Events</a></li>
            <li><a href="#" style={{ color: 'var(--rt-text)', opacity: 0.7, textDecoration: 'none' }}>Gift Cards</a></li>
            <li><a href="#" style={{ color: 'var(--rt-text)', opacity: 0.7, textDecoration: 'none' }}>Careers</a></li>
          </ul>
        </div>
      </div>
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        opacity: 0.5,
        fontSize: '0.85rem'
      }}>
        <p>&copy; {new Date().getFullYear()} {config.name}. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" style={{ color: 'var(--rt-text)', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'var(--rt-text)', textDecoration: 'none' }}>Terms of Service</a>
          <a href="#" style={{ color: 'var(--rt-text)', textDecoration: 'none' }}>Accessibility</a>
        </div>
      </div>
    </footer>
  );
}
