// ── Icons ────────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

function HelpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function LogoMark() {
  return (
    <img
      src="/favicon.png"
      alt="Willovate One"
      className="adm-header__logo-mark"
      style={{ width: '26px', height: '26px', objectFit: 'contain' }}
    />
  )
}

// ── Component ────────────────────────────────────────────────────────────────

export function AdminHeader() {
  return (
    <header className="adm-header">
      {/* Logo — occupies same width as sidebar */}
      <div className="adm-header__logo">
        <LogoMark />
        <span className="adm-header__logo-text">
          Willovate <span className="adm-header__logo-text--accent">One</span>
        </span>
      </div>

      {/* Toolbar */}
      <div className="adm-header__toolbar">
        <button type="button" className="adm-header__icon-btn" aria-label="Toggle sidebar">
          <MenuIcon />
        </button>

        {/* Search */}
        <label className="adm-header__search" htmlFor="adm-global-search">
          <SearchIcon />
          <input
            id="adm-global-search"
            type="search"
            className="adm-header__search-input"
            placeholder="Search anything..."
          />
          <kbd className="adm-header__kbd">⌘K</kbd>
        </label>

        {/* Right-side actions */}
        <div className="adm-header__actions">
          <button type="button" className="adm-header__icon-btn" aria-label="Help">
            <HelpIcon />
          </button>

          <button type="button" className="adm-header__icon-btn adm-header__notif-btn" aria-label="Notifications">
            <BellIcon />
            <span className="adm-header__badge" aria-label="3 notifications">3</span>
          </button>

          <button type="button" className="adm-header__user-btn">
            <div className="adm-header__avatar">AJ</div>
            <div className="adm-header__user-info">
              <span className="adm-header__user-name">Aditi Jain</span>
              <span className="adm-header__user-role">Owner</span>
            </div>
            <ChevronDownIcon />
          </button>
        </div>
      </div>
    </header>
  )
}