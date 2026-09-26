import type { ReactNode } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Home, ShoppingBag, Folder, Users, BarChart3, TrendingUp, Megaphone,
  SlidersHorizontal, Bookmark, Settings, HelpCircle, ChevronDown
} from 'lucide-react';
import '../styles/workspace.css';

export default function TemplatesLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const workspacePath = '/workspace/a1b2c3d4-0000-0000-0000-000000000001';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', background: '#f8fafc' }}>
      {/* ── GLOBAL DASHBOARD HEADER ── */}
      <header className="ws-topbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '0 1.25rem', height: '60px', background: '#fff', borderBottom: '1px solid #eef0f5', flexShrink: 0, zIndex: 90 }}>
        <div className="ws-topbar-left" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <Link to="/" className="ws-sidebar-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0, textDecoration: 'none' }}>
            <svg width="24" height="18" viewBox="0 0 32 24" fill="none">
              <path d="M4 4L10 20L16 8L22 20L28 4" stroke="url(#logo-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="40%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
            </svg>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e1b4b', letterSpacing: '-0.5px' }}>
              Willovate <span style={{ color: '#5c3ce6' }}>One</span>
            </span>
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
                  style={{ color: '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                >
                  <Home size={18} /> Workspace
                </Link>
              </li>
              <li className="ws-nav-item" style={{ color: '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}><BarChart3 size={18} /> Dashboard</li>
              <li className="ws-nav-item" style={{ color: '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}><ShoppingBag size={18} /> Products</li>
              <li className="ws-nav-item" style={{ color: '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}><Folder size={18} /> Orders</li>
              <li className="ws-nav-item" style={{ color: '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}><Users size={18} /> Customers</li>
              <li className="ws-nav-item" style={{ color: '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}><TrendingUp size={18} /> Sales</li>
              <li className="ws-nav-item" style={{ color: '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}><Megaphone size={18} /> Marketing &amp; Growth</li>
            </ul>

            <div style={{ height: '1px', background: '#f1f5f9', margin: '0.5rem' }}></div>

            <p className="ws-sidebar-section-label" style={{ color: '#1e1b4b', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '1px', marginBottom: '0.4rem', padding: '0 0.5rem' }}>TEMPLATES</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', padding: 0, margin: 0, listStyle: 'none' }}>
              <li className={`ws-nav-item ${location.pathname.startsWith('/browse-templates') ? 'ws-nav-active' : ''}`} style={{ background: location.pathname.startsWith('/browse-templates') ? '#f5f3ff' : 'transparent', color: location.pathname.startsWith('/browse-templates') ? '#5c3ce6' : '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => navigate('/browse-templates')}><SlidersHorizontal size={18} /> Browse Templates</li>
              <li className="ws-nav-item" style={{ color: '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}><Bookmark size={18} /> My Templates</li>
            </ul>

            <div style={{ height: '1px', background: '#f1f5f9', margin: '0.5rem' }}></div>

            <p className="ws-sidebar-section-label" style={{ color: '#1e1b4b', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '1px', marginBottom: '0.4rem', padding: '0 0.5rem' }}>SETTINGS</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', padding: 0, margin: 0, listStyle: 'none' }}>
              <li className="ws-nav-item" style={{ color: '#1e1b4b', fontWeight: 600, padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}><Settings size={18} /> Settings</li>
            </ul>
          </nav>
          
          <div className="ws-support-card" style={{ marginTop: 'auto', margin: '0 1rem 1rem 1rem', background: '#faf5ff', borderRadius: '12px', padding: '1rem', border: 'none', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#5c3ce6' }}>
              <HelpCircle size={20} />
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>Need Help?</h4>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#1e1b4b', margin: '0 0 0.75rem 0', lineHeight: 1.4, fontWeight: 500 }}>Our support team is here to help you with anything.</p>
            <button style={{ width: '100%', padding: '0.5rem', background: 'transparent', color: '#5c3ce6', border: '1px solid #ddd6fe', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
              Contact Support
            </button>
          </div>
        </aside>

        {/* ── MAIN COLUMN ── */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
