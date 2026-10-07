import React, { useState } from 'react';
import type { MenuItem } from '../../../types/restaurant';
import { useRestaurant } from '../../../store/RestaurantContext';
import { X, Minus, Plus } from 'lucide-react';

export function DishModal({ dish, onClose }: { dish: MenuItem, onClose: () => void }) {
  const { dispatch } = useRestaurant();
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Default selections
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const calculateTotal = () => {
    let total = dish.price;
    // Add option overrides
    dish.options?.forEach(opt => {
      const selectedLabel = selectedOptions[opt.name] || opt.choices[0].label;
      const choice = opt.choices.find(c => c.label === selectedLabel);
      if (choice?.priceOverride) total = choice.priceOverride;
    });
    return total * quantity;
  };

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: `${dish.id}-${Date.now()}`,
        menuItemId: dish.id,
        name: dish.name,
        price: calculateTotal() / quantity, // Base price with options
        quantity,
        options: selectedOptions,
        addons: [],
        specialInstructions,
        image: dish.image
      }
    });
    dispatch({ type: 'TOGGLE_CART', payload: true });
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={onClose}>
      <div style={{ background: 'var(--rt-bg)', width: '100%', maxWidth: '900px', borderRadius: 'var(--rt-radius)', overflow: 'hidden', display: 'flex', flexDirection: 'row', maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
        
        <div style={{ flex: 1, display: 'none', '@media (min-width: 768px)': { display: 'block' } } as any}>
          <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        
        <div style={{ flex: 1, padding: '2.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <h2 style={{ fontFamily: 'var(--rt-font-heading)', fontSize: '2rem', margin: 0, color: 'var(--rt-text)' }}>{dish.name}</h2>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--rt-text)', cursor: 'pointer' }}><X size={24} /></button>
          </div>
          
          <p style={{ opacity: 0.8, lineHeight: 1.6, marginBottom: '2rem' }}>{dish.description}</p>
          
          {dish.options && dish.options.map(opt => (
            <div key={opt.name} style={{ marginBottom: '2rem' }}>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{opt.name}</h4>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {opt.choices.map(choice => {
                  const isSelected = (selectedOptions[opt.name] || opt.choices[0].label) === choice.label;
                  return (
                    <button
                      key={choice.label}
                      onClick={() => setSelectedOptions(prev => ({ ...prev, [opt.name]: choice.label }))}
                      style={{
                        padding: '0.75rem 1.5rem',
                        background: isSelected ? 'var(--rt-text)' : 'transparent',
                        color: isSelected ? 'var(--rt-bg)' : 'var(--rt-text)',
                        border: '1px solid var(--rt-text)',
                        borderRadius: 'var(--rt-radius)',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      {choice.label} {choice.priceOverride ? `(₹${choice.priceOverride})` : ''}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Special Instructions</h4>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any allergies or dietary requirements?"
              style={{ width: '100%', padding: '1rem', background: 'var(--rt-secondary)', border: 'none', color: 'var(--rt-text)', borderRadius: 'var(--rt-radius)', minHeight: '100px', resize: 'vertical' }}
            />
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--rt-secondary)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--rt-secondary)', padding: '0.5rem', borderRadius: 'var(--rt-radius)' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ background: 'none', border: 'none', color: 'var(--rt-text)', cursor: 'pointer', padding: '0.5rem' }}><Minus size={16} /></button>
              <span style={{ width: '30px', textAlign: 'center', fontWeight: 600 }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ background: 'none', border: 'none', color: 'var(--rt-text)', cursor: 'pointer', padding: '0.5rem' }}><Plus size={16} /></button>
            </div>
            
            <button onClick={handleAddToCart} className="rt-btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem' }}>
              <span>Add to Order</span>
              <span>₹{calculateTotal()}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
