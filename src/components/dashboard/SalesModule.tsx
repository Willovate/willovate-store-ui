import { useState } from 'react'
import { TrendingUp, DollarSign, Calendar, ArrowUpRight, BarChart3 } from 'lucide-react'

export default function SalesModule() {
  const [period, setPeriod] = useState<'7d' | '30d' | 'ytd'>('7d')

  const weeklyData = [
    { day: 'Mon', revenue: 1420, orders: 18 },
    { day: 'Tue', revenue: 1680, orders: 22 },
    { day: 'Wed', revenue: 1950, orders: 25 },
    { day: 'Thu', revenue: 2340, orders: 30 },
    { day: 'Fri', revenue: 3820, orders: 48 },
    { day: 'Sat', revenue: 4290, orders: 54 },
    { day: 'Sun', revenue: 3240, orders: 41 },
  ]

  const maxRev = Math.max(...weeklyData.map(d => d.revenue))

  const categories = [
    { name: 'Main Courses & Steaks', percent: 46, revenue: '$8,460.00', color: '#4F46E5' },
    { name: 'Artisan Pizzas & Bakery', percent: 24, revenue: '$4,410.00', color: '#06B6D4' },
    { name: 'Appetizers & Starters', percent: 16, revenue: '$2,940.00', color: '#10B981' },
    { name: 'Desserts & Sweets', percent: 10, revenue: '$1,840.00', color: '#F59E0B' },
    { name: 'Beverages & Coffee', percent: 4, revenue: '$770.00', color: '#EC4899' },
  ]

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: '#1e1b4b' }}>Sales &amp; Financial Analytics</h1>
          <p style={{ color: '#64748b', margin: 0, fontSize: '0.875rem' }}>Analyze revenue streams, average order values, and sales trajectory.</p>
        </div>

        {/* Period Selector */}
        <div style={{ display: 'flex', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '3px' }}>
          <button
            onClick={() => setPeriod('7d')}
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', fontWeight: 600, border: 'none', borderRadius: '6px', cursor: 'pointer', background: period === '7d' ? '#EEF2FF' : 'transparent', color: period === '7d' ? '#4F46E5' : '#64748b' }}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setPeriod('30d')}
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', fontWeight: 600, border: 'none', borderRadius: '6px', cursor: 'pointer', background: period === '30d' ? '#EEF2FF' : 'transparent', color: period === '30d' ? '#4F46E5' : '#64748b' }}
          >
            Last 30 Days
          </button>
          <button
            onClick={() => setPeriod('ytd')}
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', fontWeight: 600, border: 'none', borderRadius: '6px', cursor: 'pointer', background: period === 'ytd' ? '#EEF2FF' : 'transparent', color: period === 'ytd' ? '#4F46E5' : '#64748b' }}
          >
            Year to Date
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>GROSS REVENUE</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e1b4b', marginTop: '0.25rem' }}>$18,740.00</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669', fontSize: '0.75rem', fontWeight: 600, marginTop: '4px' }}>
            <ArrowUpRight size={14} /> +14.8% vs previous week
          </div>
        </div>
        <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>AVG ORDER VALUE (AOV)</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e1b4b', marginTop: '0.25rem' }}>$78.74</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669', fontSize: '0.75rem', fontWeight: 600, marginTop: '4px' }}>
            <ArrowUpRight size={14} /> +4.2% higher basket size
          </div>
        </div>
        <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>TRANSACTION COUNT</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e1b4b', marginTop: '0.25rem' }}>238 Orders</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669', fontSize: '0.75rem', fontWeight: 600, marginTop: '4px' }}>
            <ArrowUpRight size={14} /> +8.1% volume
          </div>
        </div>
        <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>NET MARGIN</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669', marginTop: '0.25rem' }}>68.4%</div>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Food &amp; beverage benchmark</span>
        </div>
      </div>

      {/* Main Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Weekly Revenue Bar Chart */}
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 1.25rem', color: '#1e1b4b' }}>Revenue Trajectory (Weekly)</h3>
          
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flex: 1, minHeight: '220px', padding: '1rem 0', gap: '1rem' }}>
            {weeklyData.map((d, i) => {
              const heightPercent = Math.round((d.revenue / maxRev) * 100)
              return (
                <div key={d.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '0.5rem' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>${(d.revenue / 1000).toFixed(1)}k</span>
                  <div style={{ width: '100%', maxWidth: '38px', height: `${heightPercent * 1.8}px`, background: i === 5 ? 'linear-gradient(180deg, #6366F1 0%, #4F46E5 100%)' : '#EEF2FF', borderRadius: '6px', transition: 'height 0.3s ease' }} />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: i === 5 ? '#4F46E5' : '#475569' }}>{d.day}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Sales by Category */}
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 1.25rem', color: '#1e1b4b' }}>Revenue by Category</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {categories.map(c => (
              <div key={c.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>
                  <span style={{ color: '#334155' }}>{c.name}</span>
                  <span style={{ color: '#1e1b4b', fontWeight: 700 }}>{c.revenue} ({c.percent}%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${c.percent}%`, height: '100%', background: c.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
