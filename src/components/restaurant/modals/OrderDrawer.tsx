import React from 'react';
import { useRestaurant } from '../../../store/RestaurantContext';
import { X, Trash2 } from 'lucide-react';

export function OrderDrawer() {
  const { state, dispatch } = useRestaurant();
  
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxes = subtotal * 0.05; // 5% tax
  const total = subtotal + taxes;

  if (!state.isCartOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => dispatch({ type: 'TOGGLE_CART', payload: false })} />
      
      <div style={{ position: 'relative', width: '100%', maxWidth: '450px', background: 'var(--rt-bg)', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 30px rgba(0,0,0,0.2)' }}>
        
        <header style={{ padding: '2rem', borderBottom: '1px solid var(--rt-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--rt-font-heading)', fontSize: '1.5rem' }}>Your Order</h2>
          <button onClick={() => dispatch({ type: 'TOGGLE_CART', payload: false })} style={{ background: 'none', border: 'none', color: 'var(--rt-text)', cursor: 'pointer' }}><X size={24} /></button>
        </header>

        <div style={{ display: 'flex', padding: '1rem 2rem', background: 'var(--rt-secondary)', gap: '1rem' }}>
          {['Dine-in', 'Pickup', 'Delivery'].map(mode => (
            <button
              key={mode}
              onClick={() => dispatch({ type: 'SET_ORDER_MODE', payload: mode as any })}
              style={{
                flex: 1, padding: '0.5rem', background: state.orderMode === mode ? 'var(--rt-primary)' : 'transparent',
                color: state.orderMode === mode ? 'var(--rt-bg)' : 'var(--rt-text)',
                border: state.orderMode === mode ? 'none' : '1px solid var(--rt-text)',
                borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600
              }}
            >
              {mode}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
          {state.cart.length === 0 ? (
            <div style={{ textAlign: 'center', opacity: 0.5, marginTop: '4rem' }}>
              <p>Your order is empty.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {state.cart.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '1rem' }}>
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 600, fontFamily: 'var(--rt-font-heading)' }}>{item.name}</span>
                      <span style={{ color: 'var(--rt-primary)' }}>₹{item.price * item.quantity}</span>
                    </div>
                    {Object.entries(item.options).map(([k, v]) => (
                      <div key={k} style={{ fontSize: '0.8rem', opacity: 0.7 }}>{k}: {v as string}</div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                      <span style={{ fontSize: '0.9rem' }}>Qty: {item.quantity}</span>
                      <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {state.cart.length > 0 && (
          <footer style={{ padding: '2rem', borderTop: '1px solid var(--rt-secondary)', background: 'var(--rt-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', opacity: 0.8 }}>
              <span>Subtotal</span><span>₹{subtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', opacity: 0.8 }}>
              <span>Taxes (5%)</span><span>₹{taxes.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontWeight: 600, fontSize: '1.25rem' }}>
              <span>Total</span><span>₹{total.toFixed(2)}</span>
            </div>
            <button className="rt-btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem' }}>
              Proceed to Checkout
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
