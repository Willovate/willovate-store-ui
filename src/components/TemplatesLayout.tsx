import type { ReactNode } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Home, ShoppingBag, Folder, Users, TrendingUp, Megaphone,
  SlidersHorizontal, Bookmark, Settings, HelpCircle, ChevronDown, Store
} from 'lucide-react';
import '../styles/workspace.css';
import { useState } from 'react';
import ContactSupportModal from './ContactSupportModal';
import WillovateLogo from './WillovateLogo';

export default function TemplatesLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const storedWebsiteId = typeof window !== 'undefined' ? localStorage.getItem('last_used_website_id') : null;
  const workspacePath = storedWebsiteId ? `/workspace/${storedWebsiteId}` : '/workspace';
  const [showSupportModal, setShowSupportModal] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', background: '#f8fafc' }}>
      {/* ── GLOBAL DASHBOARD HEADER ── */}
      <header className="ws-topbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '0 1.25rem', height: '60px', background: '#fff', borderBottom: '1px solid #eef0f5', flexShrink: 0, zIndex: 90 }}>
        <div className="ws-topbar-left" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/" title="Return to Willovate One Main Store" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
            <WillovateLogo height={34} style={{ cursor: 'pointer' }} />
          </Link>
          <Link
            to="/"
            title="Return to Willovate One Main Store"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              color: '#475569',
              padding: '0.4rem 0.85rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '13px',
              textDecoration: 'none',
              transition: 'all 0.15s ease',
            }}
            onMouseOver={e => {
              e.currentTarget.style.backgroundColor = '#eef2ff';
              e.currentTarget.style.color = '#4338ca';
              e.currentTarget.style.borderColor = '#c7d2fe';
            }}
            onMouseOut={e => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
              e.currentTarget.style.color = '#475569';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            <Store size={15} />
            <span>Main Store</span>
          </Link>
        </div>
        <div className="ws-topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <div className="ws-user-avatar" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ede9fe', color: '#5c3ce6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>A</div>
            <ChevronDown size={16} color="#64748b" />
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* ── DASHBOARD SIDEBAR ── */}
        <aside className="ws-sidebar ws-dashboard-sidebar" style={{ width: '260px', borderRight: '1px solid #eef0f5', background: '#fff', display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden' }}>
          <nav className="ws-sidebar-nav" style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

            <p className="ws-sidebar-section-label" style={{ color: '#1e1b4b', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '1px', marginBottom: '0.4rem', padding: '0 0.5rem' }}>MAIN MENU</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', padding: 0, margin: 0, listStyle: 'none' }}>
              <li>
                <Link
                  to={workspacePath}
                  className="ws-nav-item"
                  style={{ color: '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textDecoration: 'none' }}
                  tabIndex={0}
                >
                  <Home size={18} /> Workspace
                </Link>
              </li>
              <li className="ws-nav-item ws-nav-disabled" style={{ color: '#334155', fontWeight: 500, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }} aria-disabled="true" tabIndex={-1}><ShoppingBag size={18} /> Products</li>
              <li className="ws-nav-item ws-nav-disabled" style={{ color: '#334155', fontWeight: 500, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }} aria-disabled="true" tabIndex={-1}><Folder size={18} /> Orders</li>
              <li className="ws-nav-item ws-nav-disabled" style={{ color: '#334155', fontWeight: 500, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }} aria-disabled="true" tabIndex={-1}><Users size={18} /> Customers</li>
              <li className="ws-nav-item ws-nav-disabled" style={{ color: '#334155', fontWeight: 500, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }} aria-disabled="true" tabIndex={-1}><TrendingUp size={18} /> Sales</li>
              <li className="ws-nav-item ws-nav-disabled" style={{ color: '#334155', fontWeight: 500, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }} aria-disabled="true" tabIndex={-1}><Megaphone size={18} /> Marketing &amp; Growth</li>
            </ul>

            <div style={{ height: '1px', background: '#f1f5f9', margin: '0.5rem' }}></div>

            <p className="ws-sidebar-section-label" style={{ color: '#1e1b4b', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '1px', marginBottom: '0.4rem', padding: '0 0.5rem' }}>TEMPLATES</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', padding: 0, margin: 0, listStyle: 'none' }}>
              <li
                className={`ws-nav-item ${location.pathname.startsWith('/browse-templates') ? 'ws-nav-active' : ''}`}
                style={{ background: location.pathname.startsWith('/browse-templates') ? '#f5f3ff' : 'transparent', color: location.pathname.startsWith('/browse-templates') ? '#5c3ce6' : '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                onClick={() => navigate('/browse-templates')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate('/browse-templates');
                  }
                }}
              >
                <SlidersHorizontal size={18} /> Browse Templates
                <div style={{ width: '56px', background: '#FF4500', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '2px 0', textAlign: 'center', borderRadius: '12px', marginLeft: 'auto' }}>NEW</div>
              </li>
              <li className="ws-nav-item ws-nav-disabled" style={{ color: '#334155', fontWeight: 500, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }} aria-disabled="true" tabIndex={-1}><Bookmark size={18} /> My Templates</li>
            </ul>

            <div style={{ height: '1px', background: '#f1f5f9', margin: '0.5rem' }}></div>

            <p className="ws-sidebar-section-label" style={{ color: '#1e1b4b', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '1px', marginBottom: '0.4rem', padding: '0 0.5rem' }}>SETTINGS</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', padding: 0, margin: 0, listStyle: 'none' }}>
              <li className="ws-nav-item ws-nav-disabled" style={{ color: '#334155', fontWeight: 500, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }} aria-disabled="true" tabIndex={-1}><Settings size={18} /> Settings</li>
            </ul>
          </nav>
          
          <div className="ws-support-card" style={{ marginTop: 'auto', margin: '0 1rem 1rem 1rem', background: '#faf5ff', borderRadius: '12px', padding: '1rem', border: 'none', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#5c3ce6' }}>
              <HelpCircle size={20} />
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>Need Help?</h4>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#1e1b4b', margin: '0 0 0.75rem 0', lineHeight: 1.4, fontWeight: 500 }}>Our support team is here to help you with anything.</p>
            <button 
              onClick={() => setShowSupportModal(true)}
              style={{ width: '100%', padding: '0.5rem', background: 'transparent', color: '#5c3ce6', border: '1px solid #ddd6fe', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Contact Support
            </button>
          </div>
        </aside>

        {/* ── MAIN COLUMN ── */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {children}
        </main>
      </div>

      {showSupportModal && (
        <ContactSupportModal onClose={() => setShowSupportModal(false)} />
      )}
    </div>
  );
}
