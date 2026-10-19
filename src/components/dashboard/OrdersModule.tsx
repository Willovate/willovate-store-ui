import { useState, useEffect, useMemo } from 'react'
import { Search, Folder, Clock, CheckCircle2, Truck, Eye, X, Filter } from 'lucide-react'
import { fetchOrders, type OrderRecord } from '../../lib/workspace-api'

const SAMPLE_ORDERS: OrderRecord[] = [
  {
    id: 'ord-8910',
    websiteId: 'demo',
    customerName: 'Marcus Vance',
    customerEmail: 'm.vance@example.com',
    customerPhone: '+1 (555) 234-8901',
    deliveryAddress: '742 Evergreen Terrace, Sector 4',
    orderMode: 'delivery',
    totalAmount: 96.00,
    status: 'Delivered',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    items: [
      { id: 'item-1', menuItemId: 'm1', name: 'Truffle Ribeye Steak', price: 48.00, quantity: 2 }
    ]
  },
  {
    id: 'ord-8911',
    websiteId: 'demo',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@example.com',
    customerPhone: '+1 (555) 489-1123',
    deliveryAddress: 'Table 14 (Dining Room)',
    orderMode: 'dine-in',
    totalAmount: 64.50,
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    items: [
      { id: 'item-2', menuItemId: 'm2', name: 'Wood-Fired Margherita Pizza', price: 22.00, quantity: 2 },
      { id: 'item-3', menuItemId: 'm3', name: 'Smoked Burrata Salad', price: 18.00, quantity: 1 },
      { id: 'item-4', menuItemId: 'm4', name: 'Single-Origin Pour Over', price: 6.50, quantity: 1 }
    ]
  },
  {
    id: 'ord-8912',
    websiteId: 'demo',
    customerName: 'David K. Chen',
    customerEmail: 'david.chen@example.com',
    customerPhone: '+1 (555) 912-3344',
    deliveryAddress: 'Storefront Pickup Counter',
    orderMode: 'takeaway',
    totalAmount: 34.00,
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    items: [
      { id: 'item-5', menuItemId: 'm5', name: 'Artisanal Sourdough Loaf', price: 9.50, quantity: 2 },
      { id: 'item-6', menuItemId: 'm6', name: 'Valrhona Dark Chocolate Soufflé', price: 15.00, quantity: 1 }
    ]
  },
  {
    id: 'ord-8913',
    websiteId: 'demo',
    customerName: 'Sophia Lorenzen',
    customerEmail: 'sophia.l@example.com',
    customerPhone: '+1 (555) 671-8899',
    deliveryAddress: '120 Ocean View Blvd, Apt 4B',
    orderMode: 'delivery',
    totalAmount: 112.50,
    status: 'Delivered',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    items: [
      { id: 'item-7', menuItemId: 'm7', name: 'Chef Signature Tasting Set', price: 85.00, quantity: 1 },
      { id: 'item-8', menuItemId: 'm8', name: 'Smoked Burrata Salad', price: 18.00, quantity: 1 },
      { id: 'item-9', menuItemId: 'm9', name: 'Artisanal Sourdough Loaf', price: 9.50, quantity: 1 }
    ]
  }
]

export default function OrdersModule({ websiteId }: { websiteId?: string }) {
  const [orders, setOrders] = useState<OrderRecord[]>(SAMPLE_ORDERS)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Confirmed' | 'Delivered'>('All')
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null)

  useEffect(() => {
    let isMounted = true
    fetchOrders(websiteId)
      .then(res => {
        if (!isMounted) return
        if (res && res.length > 0) {
          setOrders(res)
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    return () => { isMounted = false }
  }, [websiteId])

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesSearch = o.customerName.toLowerCase().includes(search.toLowerCase()) ||
        o.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
        o.id.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'All' || o.status.toLowerCase() === statusFilter.toLowerCase()
      return matchesSearch && matchesStatus
    })
  }, [orders, search, statusFilter])

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((acc, o) => acc + (Number(o.totalAmount) || 0), 0)
    const pendingCount = orders.filter(o => o.status.toLowerCase() === 'pending').length
    const deliveredCount = orders.filter(o => o.status.toLowerCase() === 'delivered').length
    return { totalRevenue, pendingCount, deliveredCount, count: orders.length }
  }, [orders])

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase()
    if (s === 'delivered' || s === 'completed') {
      return <span style={{ background: '#ecfdf5', color: '#059669', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={12} /> Delivered</span>
    }
    if (s === 'confirmed' || s === 'preparing') {
      return <span style={{ background: '#eff6ff', color: '#2563eb', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> Confirmed</span>
    }
    return <span style={{ background: '#fffbeb', color: '#d97706', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> Pending</span>
  }

  return (
    <div style={{ padding: '2rem 2.5rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: '#1e1b4b' }}>Orders Management</h1>
        <p style={{ color: '#64748b', margin: 0, fontSize: '0.875rem' }}>Track incoming customer orders, delivery fulfillment, and revenue.</p>
      </div>

      {/* KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>TOTAL ORDERS</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e1b4b', marginTop: '0.25rem' }}>{stats.count}</div>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>100% recorded</span>
        </div>
        <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>PENDING FULFILLMENT</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#d97706', marginTop: '0.25rem' }}>{stats.pendingCount}</div>
          <span style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 600 }}>Needs preparation</span>
        </div>
        <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>TOTAL REVENUE</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#4F46E5', marginTop: '0.25rem' }}>${stats.totalRevenue.toFixed(2)}</div>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>Avg ${(stats.totalRevenue / (stats.count || 1)).toFixed(2)} / order</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ background: '#fff', borderRadius: '12px', padding: '1rem', border: '1px solid #e2e8f0', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['All', 'Pending', 'Confirmed', 'Delivered'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: statusFilter === tab ? '1px solid #4F46E5' : '1px solid transparent',
                background: statusFilter === tab ? '#EEF2FF' : '#f8fafc',
                color: statusFilter === tab ? '#4F46E5' : '#64748b',
                cursor: 'pointer'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by customer or order #..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '0.45rem 0.75rem 0.45rem 2rem', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      {/* Orders Table */}
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.85rem 1rem' }}>Order ID</th>
              <th style={{ padding: '0.85rem 1rem' }}>Customer</th>
              <th style={{ padding: '0.85rem 1rem' }}>Type</th>
              <th style={{ padding: '0.85rem 1rem' }}>Items Summary</th>
              <th style={{ padding: '0.85rem 1rem' }}>Total</th>
              <th style={{ padding: '0.85rem 1rem' }}>Status</th>
              <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                  No orders matched the current filter.
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#4F46E5' }}>
                    #{order.id.slice(-6).toUpperCase()}
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ fontWeight: 600, color: '#1e1b4b' }}>{order.customerName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{order.customerEmail}</div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ textTransform: 'capitalize', background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {order.orderMode || 'Delivery'}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#334155' }}>
                    {order.items && order.items.length > 0 ? (
                      order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')
                    ) : (
                      'Assorted items'
                    )}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#1e1b4b' }}>
                    ${Number(order.totalAmount).toFixed(2)}
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    {getStatusBadge(order.status)}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', color: '#4F46E5', fontWeight: 600, fontSize: '0.75rem' }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: '14px', width: '100%', maxWidth: '520px', padding: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: '#1e1b4b' }}>
                  Order #{selectedOrder.id.slice(-6).toUpperCase()}
                </h2>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
                </span>
              </div>
              <button onClick={() => setSelectedOrder(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
              <div style={{ background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '8px' }}>
                <div style={{ fontWeight: 600, color: '#1e1b4b' }}>{selectedOrder.customerName}</div>
                <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{selectedOrder.customerEmail} · {selectedOrder.customerPhone}</div>
                <div style={{ color: '#475569', fontSize: '0.8rem', marginTop: '4px' }}>Address: {selectedOrder.deliveryAddress}</div>
              </div>

              <div>
                <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Items Ordered</h4>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 1rem', borderBottom: idx < selectedOrder.items.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                      <span>{item.quantity}x {item.name}</span>
                      <span style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '1rem', fontWeight: 700 }}>Total Amount:</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4F46E5' }}>${Number(selectedOrder.totalAmount).toFixed(2)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  onClick={() => setSelectedOrder(null)}
                  style={{ padding: '0.55rem 1.25rem', background: '#4F46E5', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
