import { useState, useMemo } from 'react'
import { Search, Users, Mail, Phone, Award, Download, Plus, X } from 'lucide-react'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  ordersCount: number
  totalSpent: number
  tier: 'VIP' | 'Regular' | 'New'
  lastOrderDate: string
}

const SAMPLE_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Marcus Vance',
    email: 'm.vance@example.com',
    phone: '+1 (555) 234-8901',
    ordersCount: 14,
    totalSpent: 980.50,
    tier: 'VIP',
    lastOrderDate: 'Today'
  },
  {
    id: 'cust-2',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    phone: '+1 (555) 489-1123',
    ordersCount: 8,
    totalSpent: 420.00,
    tier: 'Regular',
    lastOrderDate: 'Yesterday'
  },
  {
    id: 'cust-3',
    name: 'David K. Chen',
    email: 'david.chen@example.com',
    phone: '+1 (555) 912-3344',
    ordersCount: 22,
    totalSpent: 1640.00,
    tier: 'VIP',
    lastOrderDate: '3 days ago'
  },
  {
    id: 'cust-4',
    name: 'Sophia Lorenzen',
    email: 'sophia.l@example.com',
    phone: '+1 (555) 671-8899',
    ordersCount: 5,
    totalSpent: 310.25,
    tier: 'Regular',
    lastOrderDate: '1 week ago'
  },
  {
    id: 'cust-5',
    name: 'Amara Patel',
    email: 'amara.patel@example.com',
    phone: '+1 (555) 834-0012',
    ordersCount: 1,
    totalSpent: 48.00,
    tier: 'New',
    lastOrderDate: '2 weeks ago'
  }
]

export default function CustomersModule() {
  const [customers, setCustomers] = useState<Customer[]>(SAMPLE_CUSTOMERS)
  const [search, setSearch] = useState('')
  const [tierFilter, setTierFilter] = useState<'All' | 'VIP' | 'Regular' | 'New'>('All')

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
      const matchesTier = tierFilter === 'All' || c.tier === tierFilter
      return matchesSearch && matchesTier
    })
  }, [customers, search, tierFilter])

  const stats = useMemo(() => {
    const total = customers.length
    const vipCount = customers.filter(c => c.tier === 'VIP').length
    const totalSpendAll = customers.reduce((acc, c) => acc + c.totalSpent, 0)
    const avgLifetimeValue = totalSpendAll / (total || 1)
    return { total, vipCount, avgLifetimeValue }
  }, [customers])

  const handleExport = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' +
      ['Name,Email,Phone,Orders,Total Spent,Tier,Last Order',
        ...customers.map(c => `"${c.name}","${c.email}","${c.phone}",${c.ordersCount},${c.totalSpent},"${c.tier}","${c.lastOrderDate}"`)
      ].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'willovate_customers.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: '#1e1b4b' }}>Customer CRM &amp; Directory</h1>
          <p style={{ color: '#64748b', margin: 0, fontSize: '0.875rem' }}>View client lifetime value, loyalty tiers, order history, and contact details.</p>
        </div>
        <button
          onClick={handleExport}
          style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '0.55rem 1rem', borderRadius: '8px', fontWeight: 600, color: '#334155', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}
        >
          <Download size={15} /> Export CSV
        </button>
      </div>

      {/* KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>TOTAL CLIENTS</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e1b4b', marginTop: '0.25rem' }}>{stats.total}</div>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>+12% new this month</span>
        </div>
        <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>VIP PATRONS</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#7c3aed', marginTop: '0.25rem' }}>{stats.vipCount}</div>
          <span style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: 600 }}>High lifetime value</span>
        </div>
        <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>AVG LIFETIME VALUE</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#4F46E5', marginTop: '0.25rem' }}>${stats.avgLifetimeValue.toFixed(2)}</div>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>Top quartile performance</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{ background: '#fff', borderRadius: '12px', padding: '1rem', border: '1px solid #e2e8f0', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['All', 'VIP', 'Regular', 'New'] as const).map(tier => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: tierFilter === tier ? '1px solid #4F46E5' : '1px solid transparent',
                background: tierFilter === tier ? '#EEF2FF' : '#f8fafc',
                color: tierFilter === tier ? '#4F46E5' : '#64748b',
                cursor: 'pointer'
              }}
            >
              {tier}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '0.45rem 0.75rem 0.45rem 2rem', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.85rem 1rem' }}>Client Name</th>
              <th style={{ padding: '0.85rem 1rem' }}>Contact Info</th>
              <th style={{ padding: '0.85rem 1rem' }}>Tier</th>
              <th style={{ padding: '0.85rem 1rem' }}>Orders Count</th>
              <th style={{ padding: '0.85rem 1rem' }}>Total Spent</th>
              <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <div style={{ fontWeight: 700, color: '#1e1b4b' }}>{c.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>ID: {c.id}</div>
                </td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <div style={{ color: '#334155' }}>{c.email}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{c.phone}</div>
                </td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    background: c.tier === 'VIP' ? '#f5f3ff' : c.tier === 'Regular' ? '#eff6ff' : '#ecfdf5',
                    color: c.tier === 'VIP' ? '#7c3aed' : c.tier === 'Regular' ? '#2563eb' : '#059669'
                  }}>
                    {c.tier}
                  </span>
                </td>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{c.ordersCount} orders</td>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#1e1b4b' }}>${c.totalSpent.toFixed(2)}</td>
                <td style={{ padding: '0.85rem 1rem', textAlign: 'right', color: '#64748b' }}>{c.lastOrderDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
