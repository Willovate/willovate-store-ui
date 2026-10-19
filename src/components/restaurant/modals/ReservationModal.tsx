import React, { useState } from 'react';
import { useRestaurant } from '../../../store/RestaurantContext';
import { X, Calendar, Clock, Users } from 'lucide-react';

export function ReservationModal({ onClose }: { onClose: () => void }) {
  const { state, dispatch } = useRestaurant();
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState('2');
  const [details, setDetails] = useState({ name: '', email: '', phone: '', requests: '' });

  if (!state.isReservationModalOpen) return null;

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'SET_RESERVATION',
      payload: {
        date, time, partySize: parseInt(partySize, 10),
        seatingPreference: 'Any', occasion: 'None', specialRequests: details.requests,
        customerDetails: { name: details.name, email: details.email, phone: details.phone }
      }
    });
    setStep(3); // Success screen
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 3000, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => dispatch({ type: 'TOGGLE_RESERVATION_MODAL', payload: false })}>
      <div style={{ background: 'var(--rt-bg)', width: '100%', maxWidth: '500px', borderRadius: 'var(--rt-radius)', overflow: 'hidden', color: 'var(--rt-text)' }} onClick={e => e.stopPropagation()}>
        
        <header style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--rt-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--rt-font-heading)', fontSize: '1.5rem' }}>Reserve a Table</h2>
          <button onClick={() => dispatch({ type: 'TOGGLE_RESERVATION_MODAL', payload: false })} style={{ background: 'none', border: 'none', color: 'var(--rt-text)', cursor: 'pointer' }}><X size={24} /></button>
        </header>

        <div style={{ padding: '2rem' }}>
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}><Calendar size={18} /> Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'var(--rt-secondary)', border: 'none', color: 'var(--rt-text)', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}><Clock size={18} /> Time</label>
                <select value={time} onChange={e => setTime(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'var(--rt-secondary)', border: 'none', color: 'var(--rt-text)', borderRadius: '4px' }}>
                  <option value="">Select a time</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="18:30">6:30 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="19:30">7:30 PM</option>
                  <option value="20:00">8:00 PM</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}><Users size={18} /> Party Size</label>
                <select value={partySize} onChange={e => setPartySize(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'var(--rt-secondary)', border: 'none', color: 'var(--rt-text)', borderRadius: '4px' }}>
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                </select>
              </div>
              <button disabled={!date || !time} onClick={() => setStep(2)} className="rt-btn-primary" style={{ marginTop: '1rem', padding: '1rem', opacity: (!date || !time) ? 0.5 : 1 }}>Next Step</button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleComplete} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '1rem', background: 'var(--rt-secondary)', padding: '1rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                <div><strong>Date:</strong> {date}</div>
                <div><strong>Time:</strong> {time}</div>
                <div><strong>Guests:</strong> {partySize}</div>
              </div>
              <input required placeholder="Full Name" value={details.name} onChange={e => setDetails({...details, name: e.target.value})} style={{ width: '100%', padding: '0.75rem', background: 'var(--rt-secondary)', border: 'none', color: 'var(--rt-text)', borderRadius: '4px' }} />
              <input required type="email" placeholder="Email Address" value={details.email} onChange={e => setDetails({...details, email: e.target.value})} style={{ width: '100%', padding: '0.75rem', background: 'var(--rt-secondary)', border: 'none', color: 'var(--rt-text)', borderRadius: '4px' }} />
              <input required type="tel" placeholder="Phone Number" value={details.phone} onChange={e => setDetails({...details, phone: e.target.value})} style={{ width: '100%', padding: '0.75rem', background: 'var(--rt-secondary)', border: 'none', color: 'var(--rt-text)', borderRadius: '4px' }} />
              <textarea placeholder="Special Requests (Optional)" value={details.requests} onChange={e => setDetails({...details, requests: e.target.value})} style={{ width: '100%', padding: '0.75rem', background: 'var(--rt-secondary)', border: 'none', color: 'var(--rt-text)', borderRadius: '4px', minHeight: '80px', resize: 'vertical' }} />
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setStep(1)} className="rt-btn-outline" style={{ flex: 1 }}>Back</button>
                <button type="submit" className="rt-btn-primary" style={{ flex: 2 }}>Confirm Booking</button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ width: '64px', height: '64px', background: '#10b981', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Calendar size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--rt-font-heading)', fontSize: '2rem', margin: '0 0 1rem 0' }}>Confirmed</h3>
              <p style={{ opacity: 0.8, marginBottom: '2rem' }}>Your reservation for {partySize} guests on {date} at {time} has been confirmed. We've sent details to {details.email}.</p>
              <button onClick={() => dispatch({ type: 'TOGGLE_RESERVATION_MODAL', payload: false })} className="rt-btn-primary" style={{ width: '100%' }}>Done</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
