import type { ReactNode } from 'react'
import { navigateTo, useHashRoute } from './hooks/useHashRoute'

// ── Icon primitives ──────────────────────────────────────────────────────────

function Icon({ paths, size = 20 }: { paths: string[]; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  )
}

function HelpQuestionIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

// ── Nav item types ───────────────────────────────────────────────────────────

interface SubNavItemDef {
  label: string
  hash: string
}

interface NavItemDef {
  icon: ReactNode
  label: string
  hash?: string
  hasArrow?: boolean
  subItems?: SubNavItemDef[]
}

// ── Nav definitions (pixel-accurate to reference screenshot) ──────────────────

const MAIN_NAV: NavItemDef[] = [
  {
    icon: (
      <Icon
        paths={[
          'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
          'M9 22V12h6v10',
        ]}
      />
    ),
    label: 'Workspace',
    hash: '#/admin/workspace',
  },
  {
    icon: (
      <Icon
        paths={[
          'M18 20V10',
          'M12 20V4',
          'M6 20v-6',
          'M3 20h18',
        ]}
      />
    ),
    label: 'Dashboard',
    hash: '#/admin/dashboard',
  },
  {
    icon: (
      <Icon
        paths={[
          'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z',
          'M3 6h18',
          'M16 10a4 4 0 0 1-8 0',
        ]}
      />
    ),
    label: 'Products',
    hash: '#/admin/products',
    subItems: [
      { label: 'All Products', hash: '#/admin/products' },
      { label: 'Inventory', hash: '#/admin/inventory' },
    ],
  },
  {
    icon: (
      <Icon
        paths={[
          'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z',
        ]}
      />
    ),
    label: 'Orders',
    hash: '#/admin/orders',
  },
  {
    icon: (
      <Icon
        paths={[
          'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
          'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
          'M23 21v-2a4 4 0 0 0-3-3.87',
          'M16 3.13a4 4 0 0 1 0 7.75',
        ]}
      />
    ),
    label: 'Customers',
    hash: '#/admin/customers',
  },
  {
    icon: (
      <Icon
        paths={[
          'M23 6l-9.5 9.5-5-5L1 18',
          'M17 6h6v6',
        ]}
      />
    ),
    label: 'Sales',
    hash: '#/admin/sales',
  },
  {
    icon: (
      <Icon
        paths={[
          'M11 5L6 9H2v6h4l5 4V5z',
          'M19.07 4.93a10 10 0 0 1 0 14.14',
          'M15.54 8.46a5 5 0 0 1 0 7.07',
        ]}
      />
    ),
    label: 'Marketing & Growth',
    hash: '#/admin/marketing',
  },
]

const TEMPLATES_NAV: NavItemDef[] = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" y1="8" x2="20" y2="8" />
        <line x1="4" y1="16" x2="20" y2="16" />
        <circle cx="8" cy="8" r="2" fill="none" />
        <circle cx="16" cy="16" r="2" fill="none" />
      </svg>
    ),
    label: 'Browse Templates',
    hash: '#/admin/templates/browse',
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        <polygon
          points="12 7 12.8 8.7 14.7 8.9 13.3 10.2 13.7 12.1 12 11.1 10.3 12.1 10.7 10.2 9.3 8.9 11.2 8.7 12 7"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    ),
    label: 'My Templates',
    hash: '#/admin/templates/my',
  },
]

const SETTINGS_NAV: NavItemDef[] = [
  {
    icon: (
      <Icon
        paths={[
          'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
          'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
        ]}
      />
    ),
    label: 'Settings',
    hash: '#/admin/settings',
  },
]

// ── Sidebar component ────────────────────────────────────────────────────────

export function AdminSidebar() {
  const hash = useHashRoute()

  function isItemActive(item: NavItemDef): boolean {
    if (!item.hash) return false
    // Default to Products active when on products root or empty hash or inventory
    if (item.hash === '#/admin/products') {
      return (
        hash === '' ||
        hash.startsWith('#/admin/products') ||
        hash.startsWith('#/admin/inventory')
      )
    }
    return hash === item.hash || hash.startsWith(item.hash)
  }

  function NavRow({ item }: { item: NavItemDef }) {
    const active = isItemActive(item)

    return (
      <div className="adm-nav-item-wrap">
        <button
          type="button"
          className={`adm-nav-item${active ? ' adm-nav-item--active' : ''}`}
          onClick={() => {
            if (item.hash) navigateTo(item.hash)
          }}
        >
          <span className="adm-nav-item__icon">{item.icon}</span>
          <span className="adm-nav-item__label">{item.label}</span>
          {item.subItems && (
            <span
              className="adm-nav-item__arrow"
              style={{
                transform: active ? 'rotate(90deg)' : 'none',
                transition: 'transform 150ms',
                display: 'inline-block',
              }}
            >
              ›
            </span>
          )}
        </button>

        {item.subItems && active && (
          <div className="adm-nav-subitems">
            {item.subItems.map((sub) => {
              const isSubActive =
                sub.hash === '#/admin/inventory'
                  ? hash.startsWith('#/admin/inventory')
                  : hash === '' ||
                    (hash.startsWith('#/admin/products') &&
                      !hash.startsWith('#/admin/inventory'))

              return (
                <button
                  key={sub.label}
                  type="button"
                  className={`adm-nav-subitem${isSubActive ? ' adm-nav-subitem--active' : ''}`}
                  onClick={() => navigateTo(sub.hash)}
                >
                  <span className="adm-nav-subitem__dot" />
                  <span className="adm-nav-subitem__label">{sub.label}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  function SectionGroup({
    label,
    items,
  }: {
    label: string
    items: NavItemDef[]
  }) {
    return (
      <div className="adm-nav-group">
        <p className="adm-nav-group__label">{label}</p>
        <div className="adm-nav-group__items">
          {items.map((item) => (
            <NavRow key={item.label} item={item} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <nav className="adm-sidebar" aria-label="Admin navigation">
      <SectionGroup label="MAIN MENU" items={MAIN_NAV} />

      <hr className="adm-sidebar-divider" />

      <SectionGroup label="TEMPLATES" items={TEMPLATES_NAV} />

      <hr className="adm-sidebar-divider" />

      <SectionGroup label="SETTINGS" items={SETTINGS_NAV} />

      {/* Need Help card (direct below divider matching screenshot) */}
      <div className="adm-sidebar__help-card" style={{ marginTop: 'auto', marginBottom: '8px' }}>
        <div className="adm-sidebar__help-header">
          <span className="adm-sidebar__help-icon">
            <HelpQuestionIcon size={18} />
          </span>
          <span className="adm-sidebar__help-title">Need Help?</span>
        </div>
        <p className="adm-sidebar__help-text">
          Our support team to here
          <br />
          to help you with anything.
        </p>
        <button type="button" className="adm-sidebar__help-btn">
          Contact Support
        </button>
      </div>
    </nav>
  )
}

