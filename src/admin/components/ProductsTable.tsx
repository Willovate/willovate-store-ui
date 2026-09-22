import { useEffect, useRef, useState } from 'react'
import { formatCurrency } from '../../lib/currency'
import type { Product } from '../../types'
import { StatusBadge } from './StatusBadge'
import { StockBadge } from './StockBadge'

const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:5191').replace(/\/$/, '')

interface ProductsTableProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

// ── Date formatting ──────────────────────────────────────────────────────────

function formatUpdatedAt(iso?: string): { date: string; time: string } | null {
  if (!iso) return null
  try {
    const d = new Date(iso)
    if (isNaN(d.getTime())) return null
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const day = d.getDate()
    const month = MONTHS[d.getMonth()]
    const year = d.getFullYear()
    const h = d.getHours()
    const m = d.getMinutes().toString().padStart(2, '0')
    const ampm = h >= 12 ? 'PM' : 'AM'
    const h12 = h % 12 || 12
    return { date: `${day} ${month}, ${year}`, time: `${h12}:${m} ${ampm}` }
  } catch {
    return null
  }
}

function thumbSrc(p: Product): string | null {
  const url = p.imageUrls?.[0]
  if (!url) return null
  return url.startsWith('http') ? url : `${API_URL}${url}`
}

function formatCategory(cat?: string): string {
  if (!cat) return '—'
  if (cat.includes('>')) {
    const parts = cat.split('>').map((s) => s.trim()).filter(Boolean)
    return parts[parts.length - 1] || cat
  }
  return cat
}

// ── Inline SVG icons ─────────────────────────────────────────────────────────

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  )
}

function MoreIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="5" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="19" r="1.8" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

// ── Row actions menu ──────────────────────────────────────────────────────────

interface RowMenuProps {
  product: Product
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  onDelete: (product: Product) => void
}

function RowMenu({ product, isOpen, onToggle, onClose, onDelete }: RowMenuProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [openUpward, setOpenUpward] = useState(false)

  // Close on click outside this specific menu
  useEffect(() => {
    if (!isOpen) return
    function handleClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen, onClose])

  // Decide whether dropdown should open upward (not enough space below)
  useEffect(() => {
    if (!isOpen || !wrapRef.current) return
    const rect = wrapRef.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    setOpenUpward(spaceBelow < 120)
  }, [isOpen])

  return (
    <div ref={wrapRef} className="adm-row-menu">
      <button
        type="button"
        className={`adm-tbl-icon-btn${isOpen ? ' adm-tbl-icon-btn--active' : ''}`}
        onClick={onToggle}
        aria-label={`More options for ${product.name}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        title="More options"
      >
        <MoreIcon />
      </button>

      {isOpen && (
        <div
          className={`adm-row-menu__dropdown${openUpward ? ' adm-row-menu__dropdown--up' : ''}`}
          role="menu"
        >
          <button
            type="button"
            className="adm-row-menu__item adm-row-menu__item--danger"
            role="menuitem"
            onClick={() => {
              onClose()
              onDelete(product)
            }}
          >
            <TrashIcon />
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

// ── Component ────────────────────────────────────────────────────────────────

export function ProductsTable({ products, onEdit, onDelete }: ProductsTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  function toggleMenu(id: string) {
    setOpenMenuId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="adm-table-wrap">
      <table className="adm-table">
        <thead>
          <tr>
            <th className="adm-table__product-col">Product</th>
            <th className="adm-table__category-col">Category</th>
            <th className="adm-table__price-col">Price</th>
            <th className="adm-table__stock-col">Stock</th>
            <th className="adm-table__status-col">Status</th>
            <th className="adm-table__updated-col">Updated On</th>
            <th className="adm-table__actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const src = thumbSrc(p)
            const updated = formatUpdatedAt(p.updatedAt)

            return (
              <tr key={p.id}>
                {/* Product */}
                <td className="adm-table__product-col">
                  <div className="adm-tbl-product">
                    <div className="adm-tbl-thumb">
                      {src ? (
                        <img src={src} alt={p.name} />
                      ) : (
                        <span className={`adm-tbl-thumb__letter theme-${p.visualTheme}`}>
                          {p.name[0]}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="adm-tbl-product__name">{p.name}</p>
                      {p.sku && (
                        <p className="adm-tbl-product__sku">SKU: {p.sku}</p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="adm-table__category-col adm-tbl-category" title={p.category}>
                  {formatCategory(p.category)}
                </td>

                {/* Price */}
                <td className="adm-table__price-col">
                  <span className="adm-tbl-price">{formatCurrency(p.price)}</span>
                  {p.compareAtPrice != null && (
                    <del className="adm-tbl-compare">{formatCurrency(p.compareAtPrice)}</del>
                  )}
                </td>

                {/* Stock */}
                <td className="adm-table__stock-col">
                  <p className="adm-tbl-stock-qty">{p.stockQuantity}</p>
                  <StockBadge quantity={p.stockQuantity} lowAlert={p.lowStockAlert ?? 5} />
                </td>

                {/* Status */}
                <td className="adm-table__status-col">
                  <StatusBadge status={p.isActive !== false ? 'active' : 'inactive'} />
                </td>

                {/* Updated On */}
                <td className="adm-table__updated-col">
                  {updated ? (
                    <>
                      <p className="adm-tbl-date">{updated.date}</p>
                      <p className="adm-tbl-time">{updated.time}</p>
                    </>
                  ) : (
                    <span className="adm-tbl-muted">—</span>
                  )}
                </td>

                {/* Actions */}
                <td className="adm-table__actions-col">
                  <div className="adm-tbl-actions">
                    <button
                      type="button"
                      className="adm-tbl-icon-btn"
                      onClick={() => onEdit(p)}
                      aria-label={`Edit ${p.name}`}
                      title="Edit"
                    >
                      <EditIcon />
                    </button>

                    <RowMenu
                      product={p}
                      isOpen={openMenuId === p.id}
                      onToggle={() => toggleMenu(p.id)}
                      onClose={() => setOpenMenuId(null)}
                      onDelete={onDelete}
                    />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}