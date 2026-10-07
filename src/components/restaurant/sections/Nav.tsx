import React, { useState, useEffect } from 'react';
import type { RestaurantConfig } from '../../../types/restaurant';
import { useRestaurant } from '../../../store/RestaurantContext';
import { Search, Heart, ShoppingBag, Menu } from 'lucide-react';

export function Nav({ config }: { config: RestaurantConfig }) {
  const [scrolled, setScrolled] = useState(false);
  const { state } = useRestaurant();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`rt-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="rt-nav-container">
        <a href="#" className="rt-nav-logo">{config.name}</a>
        
        <div className="rt-nav-links">
          <a href="#" className="rt-nav-link">Menu</a>
          <a href="#" className="rt-nav-link">Reservations</a>
          <a href="#" className="rt-nav-link">Private Dining</a>
          <a href="#" className="rt-nav-link">Our Story</a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button style={{ background: 'none', border: 'none', color: 'var(--rt-text)', cursor: 'pointer' }}>
            <Search size={20} />
          </button>
          
          <button style={{ background: 'none', border: 'none', color: 'var(--rt-text)', cursor: 'pointer', position: 'relative' }}>
            <Heart size={20} />
            {state.favorites.length > 0 && (
              <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--rt-primary)', color: 'var(--rt-bg)', fontSize: '0.7rem', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {state.favorites.length}
              </span>
            )}
          </button>

          <button style={{ background: 'none', border: 'none', color: 'var(--rt-text)', cursor: 'pointer', position: 'relative' }}>
            <ShoppingBag size={20} />
            {state.cart.length > 0 && (
              <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--rt-primary)', color: 'var(--rt-bg)', fontSize: '0.7rem', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {state.cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>
          
          <button className="rt-btn-primary" style={{ display: 'none' /* Will show on desktop via CSS */ }}>Reserve</button>
          
          <button style={{ background: 'none', border: 'none', color: 'var(--rt-text)', cursor: 'pointer' }} className="mobile-only">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
