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
    <svg
      width="24"
      height="22"
      viewBox="0 0 36 32"
      fill="none"
      className="adm-header__logo-mark"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="willovate-w-grad" x1="0" y1="0" x2="36" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5743F6" />
          <stop offset="100%" stopColor="#7462F8" />
        </linearGradient>
      </defs>
      <path
        d="M3.5 6.5L10.2 25.2C10.6 26.3 12.1 26.4 12.7 25.4L18 16L23.3 25.4C23.9 26.4 25.4 26.3 25.8 25.2L32.5 6.5"
        stroke="url(#willovate-w-grad)"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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