import React, { useState } from 'react';
import type { RestaurantConfig, MenuItem } from '../../../types/restaurant';
import { useRestaurant } from '../../../store/RestaurantContext';
import { Heart, Plus } from 'lucide-react';

export function MenuSection({ config, onDishClick }: { config: RestaurantConfig, onDishClick: (dish: MenuItem) => void }) {
  const [activeCategory, setActiveCategory] = useState(config.menu[0]?.id);
  const { state, dispatch } = useRestaurant();

  const handleFavorite = (e: React.MouseEvent, dishId: string) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_FAVORITE', payload: dishId });
  };

  return (
    <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--rt-font-heading)', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>Explore the Menu</h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {config.menu.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '0.5rem 1.5rem',
                background: activeCategory === cat.id ? 'var(--rt-text)' : 'transparent',
                color: activeCategory === cat.id ? 'var(--rt-bg)' : 'var(--rt-text)',
                border: '1px solid var(--rt-text)',
                borderRadius: '99px',
                cursor: 'pointer',
                fontFamily: 'var(--rt-font-body)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontSize: '0.85rem'
              }}
            >
              {cat.name} ({cat.items.length})
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {config.menu.find(c => c.id === activeCategory)?.items.map(dish => (
          <div
            key={dish.id}
            onClick={() => onDishClick(dish)}
            style={{
              background: 'var(--rt-secondary)',
              borderRadius: 'var(--rt-radius)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--rt-shadow)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 2, display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={(e) => handleFavorite(e, dish.id)}
                style={{ background: 'var(--rt-bg)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: 0.9 }}
              >
                <Heart size={18} fill={state.favorites.includes(dish.id) ? 'var(--rt-primary)' : 'none'} color={state.favorites.includes(dish.id) ? 'var(--rt-primary)' : 'var(--rt-text)'} />
              </button>
            </div>
            
            <div style={{ height: '220px', overflow: 'hidden' }}>
              <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h3 style={{ fontFamily: 'var(--rt-font-heading)', fontSize: '1.25rem', margin: 0 }}>{dish.name}</h3>
                <span style={{ fontFamily: 'var(--rt-font-accent)', fontSize: '1.1rem', color: 'var(--rt-primary)' }}>₹{dish.price}</span>
              </div>
              <p style={{ opacity: 0.7, fontSize: '0.9rem', margin: '0 0 1rem 0', lineHeight: 1.5 }}>{dish.description}</p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                {dish.tags.map(tag => (
                  <span key={tag} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'var(--rt-bg)', border: '1px solid var(--rt-primary)', color: 'var(--rt-primary)', borderRadius: '4px', textTransform: 'uppercase' }}>
                    {tag}
                  </span>
                ))}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>{dish.dietary.join(', ')}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); onDishClick(dish); }}
                  style={{ background: 'transparent', border: 'none', color: 'var(--rt-text)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                >
                  <Plus size={16} /> Quick Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
