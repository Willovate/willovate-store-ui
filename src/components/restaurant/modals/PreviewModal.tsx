import React, { useState } from 'react';
import type { RestaurantConfig } from '../../../types/restaurant';
import { RestaurantTemplate } from '../RestaurantTemplate';
import { X, Monitor, Smartphone, Maximize, Check } from 'lucide-react';

interface PreviewModalProps {
  config: RestaurantConfig;
  onClose: () => void;
  onUseTemplate: () => void;
}

export function PreviewModal({ config, onClose, onUseTemplate }: PreviewModalProps) {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile' | 'fullscreen'>('desktop');
  const [activeColor, setActiveColor] = useState(config.design.palette.background);

  // We can simulate recoloring by overriding the config before passing it down
  const previewConfig = {
    ...config,
    design: {
      ...config.design,
      palette: {
        ...config.design.palette,
        background: activeColor
      }
    }
  };

  const getDeviceStyles = () => {
    if (deviceMode === 'fullscreen') return { width: '100%', height: '100%' };
    if (deviceMode === 'mobile') return { width: '375px', height: '812px', borderRadius: '40px', border: '12px solid #1f2937', margin: '2rem auto' };
    return { width: '100%', height: 'calc(100vh - 140px)', borderRadius: '8px', border: '1px solid #e5e7eb', margin: '2rem auto', maxWidth: '1280px' };
  };

  if (deviceMode === 'fullscreen') {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 99999, background: '#fff' }}>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 100000, display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setDeviceMode('desktop')} style={{ padding: '0.5rem 1rem', background: '#000', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Exit Fullscreen</button>
        </div>
        <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
          <RestaurantTemplate config={previewConfig} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#f3f4f6', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ background: '#fff', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>{config.name}</h2>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', padding: '0.1rem 0.5rem', background: '#f3f4f6', borderRadius: '99px', color: '#4b5563' }}>{config.design.theme} theme</span>
            <span style={{ fontSize: '0.75rem', padding: '0.1rem 0.5rem', background: '#f3f4f6', borderRadius: '99px', color: '#4b5563' }}>{config.menu.length} categories</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f3f4f6', padding: '0.25rem', borderRadius: '8px' }}>
          <button onClick={() => setDeviceMode('desktop')} style={{ padding: '0.5rem', background: deviceMode === 'desktop' ? '#fff' : 'transparent', border: 'none', borderRadius: '4px', cursor: 'pointer', boxShadow: deviceMode === 'desktop' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}><Monitor size={20} /></button>
          <button onClick={() => setDeviceMode('mobile')} style={{ padding: '0.5rem', background: deviceMode === 'mobile' ? '#fff' : 'transparent', border: 'none', borderRadius: '4px', cursor: 'pointer', boxShadow: deviceMode === 'mobile' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}><Smartphone size={20} /></button>
          <button onClick={() => setDeviceMode('fullscreen')} style={{ padding: '0.5rem', background: 'transparent', border: 'none', borderRadius: '4px', cursor: 'pointer' }}><Maximize size={20} /></button>
        </div>
        
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={24} /></button>
      </header>

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Preview Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: deviceMode === 'mobile' ? '0' : '0 2rem', display: 'flex', justifyContent: 'center' }}>
          <div style={{ ...getDeviceStyles(), background: '#fff', overflowY: 'auto', overflowX: 'hidden', position: 'relative', transition: 'all 0.3s ease' }}>
            <RestaurantTemplate config={previewConfig} />
          </div>
        </div>

        {/* Right Sidebar: Template Overview */}
        <div style={{ width: '320px', background: '#fff', borderLeft: '1px solid #e5e7eb', padding: '2rem', overflowY: 'auto' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem' }}>Template Overview</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 700 }}>4.9</div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>120 Reviews</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: '#10b981' }}>100%</div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Responsive</div>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Color Schemes</h4>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[config.design.palette.background, '#1a1f2c', '#2c1e16'].map((color) => (
                <button
                  key={color}
                  onClick={() => setActiveColor(color)}
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%', background: color,
                    border: activeColor === color ? '2px solid #3b82f6' : '1px solid #d1d5db',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  {activeColor === color && <Check size={16} color={color === '#fff' ? '#000' : '#fff'} />}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Included Features</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: '#374151', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={16} color="#10b981" /> Custom Reservation Flow</li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={16} color="#10b981" /> Full Menu with Filters</li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={16} color="#10b981" /> Slide-in Order Drawer</li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={16} color="#10b981" /> Dish Quick-View Modal</li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check size={16} color="#10b981" /> Parallax Scrolling Hero</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#fff', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #e5e7eb' }}>
        <button onClick={onClose} style={{ padding: '0.75rem 1.5rem', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '6px', fontWeight: 500, cursor: 'pointer' }}>Back to Marketplace</button>
        <button onClick={onUseTemplate} style={{ padding: '0.75rem 2rem', background: '#000', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 500, cursor: 'pointer' }}>Use This Template</button>
      </footer>
    </div>
  );
}
