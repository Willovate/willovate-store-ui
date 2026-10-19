import { useState } from 'react'
import { Settings, Save, Check, Globe, Shield, Store, Mail, DollarSign } from 'lucide-react'
import type { Website } from '../../types'
import { updateWebsite } from '../../lib/workspace-api'

interface SettingsModuleProps {
  website: Website
  onUpdateWebsite: () => void
}

export default function SettingsModule({ website, onUpdateWebsite }: SettingsModuleProps) {
  const [name, setName] = useState(website.name || 'Artisan Dining')
  const [description, setDescription] = useState(website.description || 'Artisanal kitchen & dining room.')
  const [email, setEmail] = useState('contact@willovate.store')
  const [currency, setCurrency] = useState('USD')
  const [isPublished, setIsPublished] = useState(Boolean(website.isPublished))
  const [themeColor, setThemeColor] = useState(website.themeColor || '#4F46E5')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaveStatus('saving')
    try {
      await updateWebsite(website.id, {
        name: name.trim(),
        description: description.trim(),
        themeColor: themeColor || undefined,
        isPublished: isPublished
      })
      setSaveStatus('saved')
      onUpdateWebsite()
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch (err) {
      console.error('Failed to update website settings:', err)
      setSaveStatus('error')
    }
  }

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: '#1e1b4b' }}>Store Configuration &amp; Settings</h1>
        <p style={{ color: '#64748b', margin: 0, fontSize: '0.875rem' }}>Manage your storefront metadata, brand identity, publishing status, and currency.</p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Brand & Identity Card */}
        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1rem', color: '#1e1b4b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Store size={18} color="#4F46E5" /> Storefront Identity
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                Store / Restaurant Name *
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ width: '100%', padding: '0.55rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                Contact / Notification Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.55rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
              Tagline &amp; Concept Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              style={{ width: '100%', padding: '0.55rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box', resize: 'none' }}
            />
          </div>
        </div>

        {/* Regional & Publishing */}
        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1rem', color: '#1e1b4b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={18} color="#4F46E5" /> Publishing &amp; Localization
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                Primary Currency
              </label>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                style={{ width: '100%', padding: '0.55rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.875rem', background: '#fff', boxSizing: 'border-box' }}
              >
                <option value="USD">USD ($) — United States Dollar</option>
                <option value="EUR">EUR (€) — Euro</option>
                <option value="GBP">GBP (£) — British Pound</option>
                <option value="AUD">AUD ($) — Australian Dollar</option>
                <option value="CAD">CAD ($) — Canadian Dollar</option>
                <option value="INR">INR (₹) — Indian Rupee</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                Primary Brand Color Accent
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="color"
                  value={themeColor}
                  onChange={e => setThemeColor(e.target.value)}
                  style={{ width: '40px', height: '40px', padding: '2px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  value={themeColor}
                  onChange={e => setThemeColor(e.target.value)}
                  style={{ flex: 1, padding: '0.55rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.875rem' }}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e1b4b' }}>Public Storefront Status</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>When enabled, customers can view and place orders on your live storefront URL.</div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={e => setIsPublished(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#4F46E5', cursor: 'pointer' }}
              />
              <span style={{ color: isPublished ? '#059669' : '#64748b' }}>
                {isPublished ? 'Store is Live' : 'Draft / Offline'}
              </span>
            </label>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', alignItems: 'center' }}>
          {saveStatus === 'saved' && (
            <span style={{ color: '#059669', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Check size={16} /> Settings saved successfully!
            </span>
          )}
          {saveStatus === 'error' && (
            <span style={{ color: '#ef4444', fontSize: '0.875rem', fontWeight: 600 }}>
              Failed to save settings. Please try again.
            </span>
          )}
          <button
            type="submit"
            disabled={saveStatus === 'saving'}
            style={{ padding: '0.65rem 1.5rem', background: '#4F46E5', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25)' }}
          >
            <Save size={16} /> {saveStatus === 'saving' ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  )
}
