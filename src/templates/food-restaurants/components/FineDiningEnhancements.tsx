import React, { useState } from 'react';
import {
  Award, Wine, Users, Calendar, Clock, Sparkles, CheckCircle, X,
  ChevronRight, ArrowRight, Gift, Compass, ShieldCheck, Copy, Check,
  Search, Heart, Info, Phone, MapPin, Star, Utensils
} from 'lucide-react';
import {
  useRestaurantStore,
  type MenuItem,
  type RestaurantThemeConfig,
  useReveal
} from './RestaurantCore';

// ─── LUXURY FINE DINING TYPES ────────────────────────────────────────────────

export interface AccoladeItem {
  year: string;
  title: string;
  organization: string;
  badge?: string;
  description?: string;
}

export interface PrivateDiningRoom {
  id: string;
  name: string;
  capacity: string;
  description: string;
  image?: string;
  features: string[];
  minimumSpend?: string;
  dimensions?: string;
}

export interface PrivateDiningConfig {
  headline: string;
  subheadline: string;
  rooms: PrivateDiningRoom[];
}

export interface HospitalityPolicy {
  title: string;
  icon?: string;
  description: string;
}

export interface GiftExperience {
  id: string;
  title: string;
  price: string;
  description: string;
  includes: string[];
  popular?: boolean;
}

export interface SommelierBottle {
  vintage: string;
  name: string;
  region: string;
  tastingNote: string;
  price: string;
  pairingDish?: string;
}

export interface SommelierReserveConfig {
  intro: string;
  sommelierName: string;
  sommelierTitle: string;
  sommelierImage?: string;
  sommelierQuote?: string;
  cellarStats?: {
    referenceLabels: string;
    vintageRange: string;
    grandCruCount: string;
  };
  featuredBottles: SommelierBottle[];
}

export interface ServiceStatusConfig {
  statusText: string;
  doorsTime: string;
  dressCodeSummary: string;
  liveAvailability?: string;
}

// ─── ACCOLADES RIBBON ────────────────────────────────────────────────────────

export function AccoladesStrip({ theme }: { theme: RestaurantThemeConfig }) {
  const accolades = theme.accolades;
  if (!accolades || accolades.length === 0) return null;

  return (
    <section
      aria-label="Awards and Recognition"
      style={{
        backgroundColor: theme.palette.surface,
        borderTop: `1px solid ${theme.palette.border || `${theme.palette.text}18`}`,
        borderBottom: `1px solid ${theme.palette.border || `${theme.palette.text}18`}`,
        padding: '1.75rem 5%',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 'clamp(1.5rem, 3.5vw, 4rem)',
      }}>
        {accolades.map((acc, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.9rem',
              transition: 'transform 0.25s ease',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: `${theme.palette.primary}18`,
                color: theme.palette.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1.5px solid ${theme.palette.primary}55`,
                boxShadow: `0 0 16px ${theme.palette.primary}22`,
                flexShrink: 0,
              }}
            >
              <Award size={20} />
            </div>
            <div>
              <div style={{
                fontFamily: theme.typography.heading,
                fontSize: '1rem',
                fontWeight: 800,
                color: theme.palette.text,
                lineHeight: 1.2,
                letterSpacing: '0.02em',
              }}>
                {acc.title}
              </div>
              <div style={{
                fontFamily: theme.typography.body,
                fontSize: '0.78rem',
                color: theme.palette.textLight,
                marginTop: '0.2rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}>
                {acc.organization} · {acc.year}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── HOSPITALITY & ETIQUETTE GUIDE ──────────────────────────────────────────

export function HospitalityGuideSection({ theme }: { theme: RestaurantThemeConfig }) {
  const policies = theme.hospitalityGuide || [
    { title: 'Dress Code', description: 'Smart Elegant · Tailored jackets requested for gentlemen. Athletic wear, graphic tees, and flip-flops strictly prohibited.' },
    { title: 'Valet & Arrival', description: 'Complimentary white-glove valet parking is provided at our private porte-cochère starting 30 minutes prior to service.' },
    { title: 'Corkage Policy', description: 'Up to two 750ml bottles per party of rare wines not represented on our cellar list; ₹2,500 corkage fee per bottle.' },
    { title: 'Cancellation Policy', description: 'Notice required 48 hours prior to reservation. Late cancellations incur deposit forfeiture.' },
    { title: 'Children & Pacing', description: 'Multi-course tasting menus require 2.5 to 3 hours. We welcome young guests aged 10 and above.' },
  ];
  const [activeTab, setActiveTab] = useState(0);
  const ref = useReveal();

  return (
    <section
      id="hospitality"
      style={{
        backgroundColor: theme.palette.background,
        padding: '6rem 5%',
        borderTop: `1px solid ${theme.palette.border || `${theme.palette.text}12`}`,
      }}
    >
      <div ref={ref as any} style={{ maxWidth: '1040px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
          <div style={{
            fontFamily: theme.typography.body,
            fontSize: '0.82rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: theme.palette.primary,
            marginBottom: '0.6rem',
          }}>
            Hospitality Traditions
          </div>
          <h2 style={{
            fontFamily: theme.typography.heading,
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 900,
            color: theme.palette.text,
            margin: '0 0 0.8rem 0',
          }}>
            The Dining Etiquette & Guest Code
          </h2>
          <p style={{
            fontFamily: theme.typography.body,
            color: theme.palette.textLight,
            fontSize: '1rem',
            maxWidth: '620px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            To preserve the sanctuary, serenity, and orchestral pacing of every table’s dining experience, we observe the following traditions.
          </p>
        </div>

        {/* Tab Selector */}
        <div style={{
          display: 'flex',
          gap: '0.6rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '2.2rem',
        }}>
          {policies.map((p, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{
                padding: '0.75rem 1.6rem',
                borderRadius: '99px',
                border: activeTab === i
                  ? `1.5px solid ${theme.palette.primary}`
                  : `1px solid ${theme.palette.border || `${theme.palette.text}20`}`,
                backgroundColor: activeTab === i ? `${theme.palette.primary}22` : 'transparent',
                color: activeTab === i ? theme.palette.primary : theme.palette.textLight,
                fontFamily: theme.typography.body,
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.25s',
              }}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Details Card */}
        <div style={{
          backgroundColor: theme.palette.surface,
          borderRadius: '20px',
          padding: 'clamp(2rem, 4vw, 3.2rem)',
          border: `1.5px solid ${theme.palette.border || `${theme.palette.text}16`}`,
          textAlign: 'center',
          boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: `${theme.palette.primary}20`,
            color: theme.palette.primary,
            marginBottom: '1.2rem',
          }}>
            <ShieldCheck size={24} />
          </div>
          <h3 style={{
            fontFamily: theme.typography.heading,
            fontSize: '1.5rem',
            fontWeight: 800,
            color: theme.palette.primary,
            marginBottom: '1rem',
          }}>
            {policies[activeTab]?.title}
          </h3>
          <p style={{
            fontFamily: theme.typography.body,
            color: theme.palette.text,
            fontSize: '1.08rem',
            lineHeight: 1.75,
            maxWidth: '740px',
            margin: '0 auto',
          }}>
            {policies[activeTab]?.description}
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── PRIVATE DINING SECTION ─────────────────────────────────────────────────

export function PrivateDiningSection({
  theme,
  onOpenInquiry,
}: {
  theme: RestaurantThemeConfig;
  onOpenInquiry: (roomName?: string) => void;
}) {
  const ref = useReveal();
  const privateConfig = theme.privateDining;
  if (!privateConfig || privateConfig.rooms.length === 0) return null;

  return (
    <section
      id="private-dining"
      style={{
        backgroundColor: theme.palette.secondary,
        color: '#ffffff',
        padding: '7rem 5%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div ref={ref as any} style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            fontFamily: theme.typography.body,
            fontSize: '0.82rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: theme.palette.primary,
            marginBottom: '0.8rem',
          }}>
            Bespoke Banquets & Buyouts
          </div>
          <h2 style={{
            fontFamily: theme.typography.heading,
            fontSize: 'clamp(2.4rem, 4.8vw, 3.8rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            margin: '0 0 1rem 0',
          }}>
            {privateConfig.headline}
          </h2>
          <p style={{
            fontFamily: theme.typography.body,
            color: '#cbd5e1',
            fontSize: '1.05rem',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            {privateConfig.subheadline}
          </p>
        </div>

        {/* Room Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
          gap: '2.5rem',
        }}>
          {privateConfig.rooms.map((room, i) => (
            <div
              key={room.id || i}
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                borderRadius: '20px',
                border: `1.5px solid ${theme.palette.border || 'rgba(255,255,255,0.12)'}`,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = theme.palette.primary;
                e.currentTarget.style.boxShadow = `0 20px 45px ${theme.palette.primary}22`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = theme.palette.border || 'rgba(255,255,255,0.12)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {room.image && (
                <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={room.image}
                    alt={room.name}
                    loading="lazy"
                    onError={e => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80';
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    backgroundColor: 'rgba(0,0,0,0.72)',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '99px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}>
                    <Users size={14} color={theme.palette.primary} />
                    {room.capacity}
                  </div>
                </div>
              )}

              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.8rem' }}>
                  <h3 style={{
                    fontFamily: theme.typography.heading,
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    margin: 0,
                  }}>
                    {room.name}
                  </h3>
                  {room.minimumSpend && (
                    <span style={{
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: theme.palette.primary,
                      letterSpacing: '0.04em',
                    }}>
                      From {room.minimumSpend}
                    </span>
                  )}
                </div>

                <p style={{
                  fontFamily: theme.typography.body,
                  color: '#94a3b8',
                  fontSize: '0.94rem',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                  flex: 1,
                }}>
                  {room.description}
                </p>

                {room.features && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1.8rem',
                  }}>
                    {room.features.map((feat, fi) => (
                      <span
                        key={fi}
                        style={{
                          backgroundColor: `${theme.palette.primary}18`,
                          border: `1px solid ${theme.palette.primary}44`,
                          color: '#f8fafc',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.76rem',
                          fontWeight: 600,
                        }}
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => onOpenInquiry(room.name)}
                  style={{
                    width: '100%',
                    backgroundColor: theme.palette.primary,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.85rem 1.4rem',
                    fontFamily: theme.typography.body,
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                >
                  Inquire {room.name} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRIVATE DINING INQUIRY MODAL ───────────────────────────────────────────

export function PrivateDiningModal({
  theme,
  isOpen,
  onClose,
  preselectedRoom = '',
}: {
  theme: RestaurantThemeConfig;
  isOpen: boolean;
  onClose: () => void;
  preselectedRoom?: string;
}) {
  const tomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  };

  const [salon, setSalon] = useState(preselectedRoom || theme.privateDining?.rooms[0]?.name || 'Private Salon');
  const [date, setDate] = useState(tomorrowStr());
  const [guests, setGuests] = useState(14);
  const [occasion, setOccasion] = useState('Executive Board Dinner');
  const [sommelierPairing, setSommelierPairing] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmedCode, setConfirmedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `PDR-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedCode(code);
  };

  const handleResetAndClose = () => {
    setConfirmedCode(null);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        backgroundColor: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={handleResetAndClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: theme.palette.surface,
          color: theme.palette.text,
          borderRadius: '24px',
          width: '100%',
          maxWidth: '640px',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '2.5rem',
          boxShadow: '0 25px 80px rgba(0,0,0,0.7)',
          border: `1.5px solid ${theme.palette.border || `${theme.palette.text}20`}`,
          position: 'relative',
        }}
      >
        <button
          onClick={handleResetAndClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            backgroundColor: 'transparent',
            border: 'none',
            color: theme.palette.textLight,
            cursor: 'pointer',
            padding: '0.4rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={22} />
        </button>

        {confirmedCode ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: `${theme.palette.primary}25`,
              color: theme.palette.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
            }}>
              <CheckCircle size={36} />
            </div>
            <h3 style={{
              fontFamily: theme.typography.heading,
              fontSize: '1.8rem',
              fontWeight: 800,
              color: theme.palette.text,
              marginBottom: '0.6rem',
            }}>
              Private Salon Inquiry Received
            </h3>
            <p style={{
              color: theme.palette.textLight,
              fontSize: '1rem',
              lineHeight: 1.6,
              maxWidth: '480px',
              margin: '0 auto 1.8rem auto',
            }}>
              Thank you, {name || 'Valued Host'}. Our Private Dining Concierge will review your request for <strong>{salon}</strong> on <strong>{date}</strong> and contact you within 4 hours.
            </p>

            <div style={{
              backgroundColor: `${theme.palette.primary}12`,
              border: `1px dashed ${theme.palette.primary}`,
              borderRadius: '12px',
              padding: '1.2rem',
              marginBottom: '2rem',
              display: 'inline-block',
            }}>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: theme.palette.textLight }}>
                Private Dining Reference Code
              </div>
              <div style={{
                fontFamily: theme.typography.heading,
                fontSize: '1.6rem',
                fontWeight: 900,
                color: theme.palette.primary,
                letterSpacing: '0.08em',
                marginTop: '0.3rem',
              }}>
                {confirmedCode}
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              style={{
                width: '100%',
                backgroundColor: theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Return to Storefront
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.8rem' }}>
              <div style={{
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontWeight: 700,
                color: theme.palette.primary,
                marginBottom: '0.4rem',
              }}>
                Private Salons & Buyouts
              </div>
              <h3 style={{
                fontFamily: theme.typography.heading,
                fontSize: '1.8rem',
                fontWeight: 900,
                margin: 0,
              }}>
                Inquire Private Dining
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Preferred Salon / Space
                </label>
                <select
                  value={salon}
                  onChange={e => setSalon(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: `1px solid ${theme.palette.border || `${theme.palette.text}25`}`,
                    backgroundColor: theme.palette.background,
                    color: theme.palette.text,
                    fontFamily: theme.typography.body,
                  }}
                >
                  {theme.privateDining?.rooms.map(r => (
                    <option key={r.id || r.name} value={r.name}>
                      {r.name} ({r.capacity})
                    </option>
                  )) || <option value="Private Dining Room">Private Dining Room</option>}
                  <option value="Full Restaurant Buyout">Full Restaurant Buyout</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Estimated Guests
                </label>
                <input
                  type="number"
                  min={4}
                  max={120}
                  value={guests}
                  onChange={e => setGuests(parseInt(e.target.value) || 10)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: `1px solid ${theme.palette.border || `${theme.palette.text}25`}`,
                    backgroundColor: theme.palette.background,
                    color: theme.palette.text,
                  }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: `1px solid ${theme.palette.border || `${theme.palette.text}25`}`,
                    backgroundColor: theme.palette.background,
                    color: theme.palette.text,
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Event Occasion
                </label>
                <select
                  value={occasion}
                  onChange={e => setOccasion(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: `1px solid ${theme.palette.border || `${theme.palette.text}25`}`,
                    backgroundColor: theme.palette.background,
                    color: theme.palette.text,
                  }}
                >
                  <option value="Executive Board Dinner">Executive Board Dinner</option>
                  <option value="Milestone Birthday / Celebration">Milestone Birthday / Celebration</option>
                  <option value="Anniversary Banquet">Anniversary Banquet</option>
                  <option value="Wedding Rehearsal Dinner">Wedding Rehearsal Dinner</option>
                  <option value="Luxury Brand Reception">Luxury Brand Reception</option>
                  <option value="Private Degustation Tasting">Private Degustation Tasting</option>
                </select>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              marginBottom: '1.2rem',
              backgroundColor: `${theme.palette.primary}12`,
              padding: '0.8rem 1rem',
              borderRadius: '8px',
            }}>
              <input
                type="checkbox"
                id="somm"
                checked={sommelierPairing}
                onChange={e => setSommelierPairing(e.target.checked)}
                style={{ cursor: 'pointer', width: '18px', height: '18px' }}
              />
              <label htmlFor="somm" style={{ fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>
                Include Dedicated Sommelier & Prestige Wine Pairings
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Host Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Victoria Sterling"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: `1px solid ${theme.palette.border || `${theme.palette.text}25`}`,
                    backgroundColor: theme.palette.background,
                    color: theme.palette.text,
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  placeholder="(555) 012-3456"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: `1px solid ${theme.palette.border || `${theme.palette.text}25`}`,
                    backgroundColor: theme.palette.background,
                    color: theme.palette.text,
                  }}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Corporate / Contact Email *
              </label>
              <input
                type="email"
                placeholder="host@luxuryholdings.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: `1px solid ${theme.palette.border || `${theme.palette.text}25`}`,
                  backgroundColor: theme.palette.background,
                  color: theme.palette.text,
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '1.8rem' }}>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Special Dietary or Event Requirements
              </label>
              <textarea
                rows={3}
                placeholder="Mention guest dietary needs, AV presentation requirements, or acoustic music preferences..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: `1px solid ${theme.palette.border || `${theme.palette.text}25`}`,
                  backgroundColor: theme.palette.background,
                  color: theme.palette.text,
                  fontFamily: theme.typography.body,
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: theme.palette.primary,
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '0.95rem',
                fontFamily: theme.typography.body,
                fontWeight: 800,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: `0 4px 18px ${theme.palette.primary}44`,
              }}
            >
              Submit Private Dining Inquiry →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── SOMMELIER RESERVE & CELLAR SECTION ─────────────────────────────────────

export function SommelierReserveSection({ theme }: { theme: RestaurantThemeConfig }) {
  const store = useRestaurantStore();
  const ref = useReveal();
  const sommelier = theme.sommelierReserve;
  if (!sommelier || sommelier.featuredBottles.length === 0) return null;

  const handleAddBottleToTasting = (bottle: SommelierBottle) => {
    store.addToCart({
      name: `${bottle.vintage} ${bottle.name}`,
      price: bottle.price,
      desc: `${bottle.region} · ${bottle.tastingNote}`,
      winePairing: bottle.region,
      tags: ['Cellar Reserve'],
    });
    store.openCart();
  };

  return (
    <section
      id="cellar"
      style={{
        backgroundColor: theme.palette.background,
        padding: '7rem 5%',
        borderTop: `1px solid ${theme.palette.border || `${theme.palette.text}12`}`,
      }}
    >
      <div ref={ref as any} style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Intro Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))',
          gap: '3.5rem',
          alignItems: 'center',
          marginBottom: '4.5rem',
        }}>
          <div>
            <div style={{
              fontFamily: theme.typography.body,
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: theme.palette.primary,
              marginBottom: '0.8rem',
            }}>
              Subterranean Reserve
            </div>
            <h2 style={{
              fontFamily: theme.typography.heading,
              fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
              fontWeight: 900,
              color: theme.palette.text,
              lineHeight: 1.1,
              margin: '0 0 1.2rem 0',
            }}>
              The Sommelier’s Cellar Vault
            </h2>
            <p style={{
              fontFamily: theme.typography.body,
              color: theme.palette.textLight,
              fontSize: '1.05rem',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
            }}>
              {sommelier.intro}
            </p>

            <div style={{
              backgroundColor: theme.palette.surface,
              borderRadius: '16px',
              padding: '1.5rem',
              border: `1px solid ${theme.palette.border || `${theme.palette.text}15`}`,
              display: 'flex',
              alignItems: 'center',
              gap: '1.2rem',
            }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                backgroundColor: `${theme.palette.primary}20`,
                color: theme.palette.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Wine size={26} />
              </div>
              <div>
                <div style={{
                  fontFamily: theme.typography.heading,
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: theme.palette.text,
                }}>
                  {sommelier.sommelierName}
                </div>
                <div style={{
                  fontFamily: theme.typography.body,
                  fontSize: '0.82rem',
                  color: theme.palette.primary,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}>
                  {sommelier.sommelierTitle}
                </div>
              </div>
            </div>
          </div>

          {/* Cellar Stats Counter */}
          <div style={{
            backgroundColor: theme.palette.surface,
            borderRadius: '24px',
            padding: '2.5rem',
            border: `1.5px solid ${theme.palette.border || `${theme.palette.text}16`}`,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
          }}>
            <div>
              <div style={{
                fontFamily: theme.typography.heading,
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                fontWeight: 900,
                color: theme.palette.primary,
              }}>
                {sommelier.cellarStats?.referenceLabels || '1,400+'}
              </div>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: theme.palette.textLight, marginTop: '0.3rem' }}>
                Curated Labels
              </div>
            </div>

            <div>
              <div style={{
                fontFamily: theme.typography.heading,
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                fontWeight: 900,
                color: theme.palette.primary,
              }}>
                {sommelier.cellarStats?.vintageRange || '1945-2022'}
              </div>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: theme.palette.textLight, marginTop: '0.3rem' }}>
                Vintage Depth
              </div>
            </div>

            <div>
              <div style={{
                fontFamily: theme.typography.heading,
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                fontWeight: 900,
                color: theme.palette.primary,
              }}>
                {sommelier.cellarStats?.grandCruCount || '120+'}
              </div>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: theme.palette.textLight, marginTop: '0.3rem' }}>
                Grand Cru Verticals
              </div>
            </div>
          </div>
        </div>

        {/* Featured Bottle Showcase Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(270px, 100%), 1fr))',
          gap: '1.8rem',
        }}>
          {sommelier.featuredBottles.map((bottle, i) => (
            <div
              key={i}
              style={{
                backgroundColor: theme.palette.surface,
                borderRadius: '16px',
                padding: '1.8rem',
                border: `1px solid ${theme.palette.border || `${theme.palette.text}14`}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '0.5rem',
                }}>
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: theme.palette.primary,
                    letterSpacing: '0.08em',
                  }}>
                    {bottle.vintage}
                  </span>
                  <span style={{
                    fontFamily: theme.typography.heading,
                    fontSize: '1.15rem',
                    fontWeight: 900,
                    color: theme.palette.primary,
                  }}>
                    {bottle.price}
                  </span>
                </div>

                <h4 style={{
                  fontFamily: theme.typography.heading,
                  fontSize: '1.18rem',
                  fontWeight: 800,
                  color: theme.palette.text,
                  margin: '0 0 0.4rem 0',
                  lineHeight: 1.3,
                }}>
                  {bottle.name}
                </h4>

                <div style={{
                  fontSize: '0.8rem',
                  color: theme.palette.textLight,
                  fontWeight: 600,
                  marginBottom: '0.8rem',
                }}>
                  {bottle.region}
                </div>

                <p style={{
                  fontSize: '0.88rem',
                  color: theme.palette.textLight,
                  lineHeight: 1.6,
                  margin: '0 0 1.2rem 0',
                }}>
                  "{bottle.tastingNote}"
                </p>
              </div>

              <button
                onClick={() => handleAddBottleToTasting(bottle)}
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  border: `1.5px solid ${theme.palette.primary}`,
                  color: theme.palette.primary,
                  borderRadius: '8px',
                  padding: '0.65rem 1rem',
                  fontFamily: theme.typography.body,
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = theme.palette.primary;
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = theme.palette.primary;
                }}
              >
                <Wine size={14} /> Add Bottle to Dinner Selection
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GIFT CARD & EXPERIENCE VOUCHERS SECTION ────────────────────────────────

export function GiftExperienceSection({
  theme,
  onOpenGiftModal,
}: {
  theme: RestaurantThemeConfig;
  onOpenGiftModal: (exp?: GiftExperience) => void;
}) {
  const ref = useReveal();
  const experiences = theme.giftExperiences;
  if (!experiences || experiences.length === 0) return null;

  return (
    <section
      id="gift-cards"
      style={{
        backgroundColor: theme.palette.surface,
        padding: '7rem 5%',
        borderTop: `1px solid ${theme.palette.border || `${theme.palette.text}12`}`,
      }}
    >
      <div ref={ref as any} style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.8rem' }}>
          <div style={{
            fontFamily: theme.typography.body,
            fontSize: '0.82rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: theme.palette.primary,
            marginBottom: '0.8rem',
          }}>
            Hospitality Vouchers
          </div>
          <h2 style={{
            fontFamily: theme.typography.heading,
            fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
            fontWeight: 900,
            color: theme.palette.text,
            lineHeight: 1.1,
            margin: '0 0 1rem 0',
          }}>
            Gift the Sensory Journey
          </h2>
          <p style={{
            fontFamily: theme.typography.body,
            color: theme.palette.textLight,
            fontSize: '1.05rem',
            maxWidth: '620px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Present beloved companions with an unforgettable evening of high gastronomy, vintage pairings, and gracious hospitality.
          </p>
        </div>

        {/* Voucher Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(270px, 100%), 1fr))',
          gap: '2rem',
        }}>
          {experiences.map(exp => (
            <div
              key={exp.id}
              style={{
                backgroundColor: theme.palette.background,
                borderRadius: '20px',
                padding: '2.2rem',
                border: exp.popular
                  ? `2px solid ${theme.palette.primary}`
                  : `1px solid ${theme.palette.border || `${theme.palette.text}16`}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: exp.popular ? `0 15px 40px ${theme.palette.primary}22` : 'none',
              }}
            >
              {exp.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '24px',
                  backgroundColor: theme.palette.primary,
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '0.3rem 0.8rem',
                  borderRadius: '99px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>
                  Most Cherished
                </div>
              )}

              <div>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: `${theme.palette.primary}18`,
                  color: theme.palette.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.2rem',
                }}>
                  <Gift size={22} />
                </div>

                <div style={{
                  fontFamily: theme.typography.heading,
                  fontSize: '1.6rem',
                  fontWeight: 900,
                  color: theme.palette.primary,
                  marginBottom: '0.4rem',
                }}>
                  {exp.price}
                </div>

                <h3 style={{
                  fontFamily: theme.typography.heading,
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: theme.palette.text,
                  margin: '0 0 0.8rem 0',
                }}>
                  {exp.title}
                </h3>

                <p style={{
                  fontSize: '0.9rem',
                  color: theme.palette.textLight,
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                }}>
                  {exp.description}
                </p>

                {exp.includes && (
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 1.8rem 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}>
                    {exp.includes.map((inc, ii) => (
                      <li key={ii} style={{
                        fontSize: '0.84rem',
                        color: theme.palette.text,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}>
                        <Check size={14} color={theme.palette.primary} />
                        {inc}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                onClick={() => onOpenGiftModal(exp)}
                style={{
                  width: '100%',
                  backgroundColor: exp.popular ? theme.palette.primary : 'transparent',
                  color: exp.popular ? '#ffffff' : theme.palette.primary,
                  border: `1.5px solid ${theme.palette.primary}`,
                  borderRadius: '10px',
                  padding: '0.8rem 1.2rem',
                  fontFamily: theme.typography.body,
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Personalize & Gift →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GIFT CARD PERSONALIZATION MODAL ────────────────────────────────────────

export function GiftCardModal({
  theme,
  isOpen,
  onClose,
  initialExp,
}: {
  theme: RestaurantThemeConfig;
  isOpen: boolean;
  onClose: () => void;
  initialExp?: GiftExperience | null;
}) {
  const store = useRestaurantStore();
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('With warmest regards and wishing you an enchanting evening.');
  const [amount, setAmount] = useState(initialExp?.price || '₹10,000');
  const [sentToast, setSentToast] = useState(false);

  if (!isOpen) return null;

  const handleGiftToBag = (e: React.FormEvent) => {
    e.preventDefault();
    store.addToCart({
      name: `Gift Voucher: ${initialExp?.title || 'Bespoke Experience'}`,
      price: amount,
      desc: `To: ${recipient || 'Honoured Guest'} · From: ${sender || 'Generous Host'} — "${message}"`,
      tags: ['Gift Certificate'],
    });
    setSentToast(true);
    setTimeout(() => {
      setSentToast(false);
      onClose();
      store.openCart();
    }, 1200);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        backgroundColor: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: theme.palette.surface,
          color: theme.palette.text,
          borderRadius: '24px',
          width: '100%',
          maxWidth: '600px',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '2.5rem',
          boxShadow: '0 25px 80px rgba(0,0,0,0.7)',
          border: `1.5px solid ${theme.palette.border || `${theme.palette.text}20`}`,
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            backgroundColor: 'transparent',
            border: 'none',
            color: theme.palette.textLight,
            cursor: 'pointer',
          }}
        >
          <X size={22} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
          <div style={{
            fontSize: '0.78rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontWeight: 700,
            color: theme.palette.primary,
            marginBottom: '0.4rem',
          }}>
            Voucher Certificate
          </div>
          <h3 style={{
            fontFamily: theme.typography.heading,
            fontSize: '1.8rem',
            fontWeight: 900,
            margin: 0,
          }}>
            Personalize Experience Voucher
          </h3>
        </div>

        {/* Live Voucher Preview Card */}
        <div style={{
          background: `linear-gradient(135deg, ${theme.palette.secondary} 0%, #000000 100%)`,
          borderRadius: '16px',
          padding: '2rem',
          color: '#ffffff',
          border: `1.5px solid ${theme.palette.primary}`,
          boxShadow: `0 12px 30px ${theme.palette.primary}22`,
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '1.5rem',
          }}>
            <span style={{
              fontFamily: theme.typography.heading,
              fontSize: '1.3rem',
              fontWeight: 900,
              letterSpacing: '0.05em',
            }}>
              {theme.name}
            </span>
            <span style={{
              fontFamily: theme.typography.heading,
              fontSize: '1.5rem',
              fontWeight: 900,
              color: theme.palette.primary,
            }}>
              {amount}
            </span>
          </div>

          <div style={{ fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
            To: <strong style={{ color: '#ffffff' }}>{recipient || 'Honoured Guest'}</strong>
          </div>
          <div style={{ fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '1.2rem' }}>
            From: <strong style={{ color: '#ffffff' }}>{sender || 'Gracious Host'}</strong>
          </div>

          <p style={{
            fontSize: '0.84rem',
            fontStyle: 'italic',
            color: '#94a3b8',
            lineHeight: 1.5,
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: '0.8rem',
            margin: 0,
          }}>
            "{message}"
          </p>
        </div>

        <form onSubmit={handleGiftToBag}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Recipient Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Alistair & Clara"
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: `1px solid ${theme.palette.border || `${theme.palette.text}25`}`,
                  backgroundColor: theme.palette.background,
                  color: theme.palette.text,
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Your Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Evelyn Thorne"
                value={sender}
                onChange={e => setSender(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: `1px solid ${theme.palette.border || `${theme.palette.text}25`}`,
                  backgroundColor: theme.palette.background,
                  color: theme.palette.text,
                }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Select Voucher Tier
            </label>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {['₹5,000', '₹10,000', '₹18,500', '₹25,000', '₹35,000'].map(val => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setAmount(val)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: amount === val ? `1.5px solid ${theme.palette.primary}` : `1px solid ${theme.palette.border || `${theme.palette.text}20`}`,
                    backgroundColor: amount === val ? `${theme.palette.primary}22` : 'transparent',
                    color: amount === val ? theme.palette.primary : theme.palette.text,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.8rem' }}>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Personal Greeting Message
            </label>
            <textarea
              rows={2}
              value={message}
              onChange={e => setMessage(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: `1px solid ${theme.palette.border || `${theme.palette.text}25`}`,
                backgroundColor: theme.palette.background,
                color: theme.palette.text,
                fontFamily: theme.typography.body,
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: theme.palette.primary,
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '0.95rem',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            {sentToast ? <><CheckCircle size={18} /> Added to Gift Bag!</> : <>Add Voucher to Tasting Bag ({amount}) →</>}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── FLOATING LIVE STATUS & QUICK ACTION BAR ────────────────────────────────

export function LiveFloatingBar({
  theme,
  onOpenReservation,
  onOpenPrivateDining,
}: {
  theme: RestaurantThemeConfig;
  onOpenReservation: () => void;
  onOpenPrivateDining: () => void;
}) {
  const store = useRestaurantStore();
  const totalCartCount = store.cart.reduce((sum, item) => sum + item.quantity, 0);
  const status = theme.serviceStatus || {
    statusText: 'Open Tonight · Evening Bookings',
    doorsTime: theme.content.hours,
    dressCodeSummary: 'Smart Elegant',
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 900,
        backgroundColor: 'rgba(15,18,22,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1.5px solid ${theme.palette.primary}66`,
        borderRadius: '99px',
        padding: '0.5rem 0.6rem 0.5rem 1.4rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1.2rem',
        boxShadow: `0 12px 40px rgba(0,0,0,0.6), 0 0 25px ${theme.palette.primary}20`,
        maxWidth: 'calc(100vw - 32px)',
      }}
    >
      {/* Live status badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        whiteSpace: 'nowrap',
      }}>
        <span style={{
          width: '9px',
          height: '9px',
          borderRadius: '50%',
          backgroundColor: '#22c55e',
          boxShadow: '0 0 10px #22c55e',
          display: 'inline-block',
          animation: 'pulse 2s infinite',
        }} />
        <span style={{
          color: '#ffffff',
          fontFamily: theme.typography.body,
          fontSize: '0.82rem',
          fontWeight: 700,
          letterSpacing: '0.02em',
        }}>
          {status.statusText}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          onClick={onOpenReservation}
          style={{
            backgroundColor: theme.palette.primary,
            color: '#ffffff',
            border: 'none',
            borderRadius: '99px',
            padding: '0.6rem 1.35rem',
            fontFamily: theme.typography.body,
            fontWeight: 800,
            fontSize: '0.84rem',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
        >
          Book Table
        </button>

        <button
          onClick={onOpenPrivateDining}
          style={{
            backgroundColor: 'transparent',
            border: `1px solid ${theme.palette.primary}66`,
            color: theme.palette.primary,
            borderRadius: '99px',
            padding: '0.6rem 1.1rem',
            fontFamily: theme.typography.body,
            fontWeight: 700,
            fontSize: '0.82rem',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = `${theme.palette.primary}22`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          Private Salons
        </button>

        {totalCartCount > 0 && (
          <button
            onClick={store.openCart}
            aria-label="View tasting selection"
            style={{
              backgroundColor: '#ffffff',
              color: '#0f172a',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <Utensils size={16} />
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              backgroundColor: theme.palette.primary,
              color: '#ffffff',
              fontSize: '0.68rem',
              fontWeight: 800,
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {totalCartCount}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
