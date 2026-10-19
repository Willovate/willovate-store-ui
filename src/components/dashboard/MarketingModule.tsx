import { useState } from 'react'
import { Megaphone, Tag, Plus, Check, Copy, Share2, Globe, Sparkles } from 'lucide-react'

interface Coupon {
  id: string
  code: string
  discount: string
  type: 'percentage' | 'fixed'
  status: 'Active' | 'Scheduled' | 'Expired'
  uses: number
  expires: string
}

const INITIAL_COUPONS: Coupon[] = [
  { id: 'cp-1', code: 'WELCOME15', discount: '15% OFF', type: 'percentage', status: 'Active', uses: 84, expires: 'Dec 31, 2026' },
  { id: 'cp-2', code: 'FREESHIP', discount: 'Free Delivery', type: 'fixed', status: 'Active', uses: 142, expires: 'Ongoing' },
  { id: 'cp-3', code: 'TASTE25', discount: '$25.00 OFF', type: 'fixed', status: 'Scheduled', uses: 0, expires: 'Nov 30, 2026' },
]

export default function MarketingModule({ websiteName = 'Willovate Store' }: { websiteName?: string }) {
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [newCode, setNewCode] = useState('')
  const [newDiscount, setNewDiscount] = useState('20% OFF')
  const [isAddingCoupon, setIsAddingCoupon] = useState(false)

  // SEO fields
  const [metaTitle, setMetaTitle] = useState(`${websiteName} — Artisanal Culinary Experience & Dining`)
  const [metaDescription, setMetaDescription] = useState('Experience exceptional dining, wood-fired artisan pizza, prime steaks, and hand-crafted cocktails. Book a table or order online.')

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCode.trim()) return

    const c: Coupon = {
      id: `cp-${Date.now()}`,
      code: newCode.trim().toUpperCase(),
      discount: newDiscount,
      type: newDiscount.includes('%') ? 'percentage' : 'fixed',
      status: 'Active',
      uses: 0,
      expires: 'Dec 31, 2026'
    }

    setCoupons([c, ...coupons])
    setIsAddingCoupon(false)
    setNewCode('')
  }

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: '#1e1b4b' }}>Marketing &amp; Growth Hub</h1>
        <p style={{ color: '#64748b', margin: 0, fontSize: '0.875rem' }}>Drive store traffic, generate discount codes, and optimize search engine visibility.</p>
      </div>

      {/* Campaigns Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)', color: '#fff', borderRadius: '14px', padding: '1.5rem', boxShadow: '0 8px 24px rgba(79, 70, 229, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '12px' }}>PROMO CAMPAIGN</span>
            <Megaphone size={16} />
          </div>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem', fontWeight: 700 }}>Weekend Flash Special</h3>
          <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', opacity: 0.9 }}>15% off all tasting menus and wood-fired selections across the store.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <span>Conversion: <strong>+18.4%</strong></span>
            <span style={{ background: '#fff', color: '#4F46E5', padding: '3px 8px', borderRadius: '6px', fontWeight: 700 }}>ACTIVE</span>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: '14px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', background: '#ecfdf5', padding: '2px 8px', borderRadius: '12px' }}>RETENTION</span>
            <Share2 size={16} color="#64748b" />
          </div>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem', fontWeight: 700, color: '#1e1b4b' }}>Free Delivery First Order</h3>
          <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: '#64748b' }}>Automated banner trigger for new visitors applying promo code HELLO.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
            <span style={{ color: '#64748b' }}>Redemptions: <strong>142 clients</strong></span>
            <span style={{ color: '#059669', fontWeight: 700 }}>AUTOMATED</span>
          </div>
        </div>
      </div>

      {/* Coupons Section */}
      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.25rem', color: '#1e1b4b' }}>Promotional Discount Codes</h2>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>Share coupon codes with your social audience, VIP diners, or email subscribers.</p>
          </div>
          <button
            onClick={() => setIsAddingCoupon(true)}
            style={{ padding: '0.5rem 1rem', background: '#4F46E5', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
          >
            <Plus size={15} /> Create Coupon
          </button>
        </div>

        {isAddingCoupon && (
          <form onSubmit={handleCreateCoupon} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: 1, minWidth: '160px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Coupon Code</label>
              <input
                required
                type="text"
                placeholder="e.g. SUMMER20"
                value={newCode}
                onChange={e => setNewCode(e.target.value)}
                style={{ width: '100%', padding: '0.45rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ width: '140px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>Discount</label>
              <select
                value={newDiscount}
                onChange={e => setNewDiscount(e.target.value)}
                style={{ width: '100%', padding: '0.45rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', background: '#fff', boxSizing: 'border-box' }}
              >
                <option value="10% OFF">10% OFF</option>
                <option value="15% OFF">15% OFF</option>
                <option value="20% OFF">20% OFF</option>
                <option value="$10 OFF">$10.00 OFF</option>
                <option value="Free Delivery">Free Delivery</option>
              </select>
            </div>
            <button type="submit" style={{ padding: '0.45rem 1rem', background: '#4F46E5', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
              Save Code
            </button>
            <button type="button" onClick={() => setIsAddingCoupon(false)} style={{ padding: '0.45rem 0.75rem', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer' }}>
              Cancel
            </button>
          </form>
        )}

        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Code</th>
                <th style={{ padding: '0.75rem 1rem' }}>Discount</th>
                <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem' }}>Redemptions</th>
                <th style={{ padding: '0.75rem 1rem' }}>Expiration</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Copy</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map(cp => (
                <tr key={cp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#4F46E5' }}>{cp.code}</td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{cp.discount}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', background: cp.status === 'Active' ? '#ecfdf5' : '#f1f5f9', color: cp.status === 'Active' ? '#059669' : '#64748b' }}>
                      {cp.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: '#64748b' }}>{cp.uses} uses</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#64748b' }}>{cp.expires}</td>
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                    <button
                      onClick={() => handleCopy(cp.code)}
                      style={{ padding: '4px 8px', background: copiedCode === cp.code ? '#ecfdf5' : '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', color: copiedCode === cp.code ? '#059669' : '#334155' }}
                    >
                      {copiedCode === cp.code ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO & Search Engine Preview */}
      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.25rem', color: '#1e1b4b' }}>SEO &amp; Google Search Listing Preview</h2>
        <p style={{ margin: '0 0 1.25rem', fontSize: '0.8rem', color: '#64748b' }}>Optimize how your storefront appears in Google search results and social shares.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={e => setMetaTitle(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>Meta Description</label>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={e => setMetaDescription(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', boxSizing: 'border-box', resize: 'none' }}
              />
            </div>
          </div>

          {/* Google Preview Snippet Card */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>LIVE SEARCH SNIPPET</span>
            <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div style={{ fontSize: '0.75rem', color: '#202124' }}>https://willovate.store › menu › reservation</div>
              <div style={{ fontSize: '1.1rem', color: '#1a0dab', fontWeight: 500, lineHeight: 1.3, cursor: 'pointer' }}>
                {metaTitle || 'Willovate Store'}
              </div>
              <div style={{ fontSize: '0.825rem', color: '#4d5156', lineHeight: 1.4, marginTop: '2px' }}>
                {metaDescription}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
