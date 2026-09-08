import { WillovateLogo } from './WillovateLogo'
import { ProgressSteps, type OnboardingStep } from './ProgressSteps'

interface AuthBrandPanelProps {
  currentStep?: OnboardingStep
  stepProgress?: number
}

function StoreIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 5.5h11l-1 8.5h-9l-1-8.5z" />
      <path d="M5.5 5.5v-2a2.5 2.5 0 015 0v2" />
    </svg>
  )
}

function ServicesIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6.5a2 2 0 100-4 2 2 0 000 4z" />
      <path d="M2.5 13.5v-1a3 3 0 013-3h1" />
      <path d="M10.5 5.5a1.8 1.8 0 100-3.6" />
      <path d="M8.5 13.5v-.8a2.5 2.5 0 012.5-2.5h.5" />
    </svg>
  )
}

function BookingsIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" />
      <path d="M5.5 2v3M10.5 2v3M2.5 6.5h11" />
    </svg>
  )
}

function CoursesIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2.5l6 3.25-6 3.25-6-3.25L8 2.5z" />
      <path d="M3.5 7.5v3.8c0 1.2 2 2.2 4.5 2.2s4.5-1 4.5-2.2v-3.8" />
      <path d="M14 5.75v4" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg className="auth-tool-svg" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="8" cy="8" r="5.5" />
      <path d="M2.5 8h11M8 2.5c1.8 2 2.5 3.8 2.5 5.5s-.7 3.5-2.5 5.5c-1.8-2-2.5-3.8-2.5-5.5s.7-3.5 2.5-5.5z" />
    </svg>
  )
}

function CreditCardIcon() {
  return (
    <svg className="auth-tool-svg" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
      <path d="M2 6.5h12M5 10h2" />
    </svg>
  )
}

function UsersGroupIcon() {
  return (
    <svg className="auth-tool-svg" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <circle cx="5.5" cy="5" r="2" />
      <path d="M2 12v-.8a2.5 2.5 0 012.5-2.5h2A2.5 2.5 0 019 11.2v.8" />
      <circle cx="11" cy="5.5" r="1.5" />
      <path d="M9.5 12v-.5a2 2 0 011.5-2h1a2 2 0 011.5 2v.5" />
    </svg>
  )
}

function MegaphoneIcon() {
  return (
    <svg className="auth-tool-svg" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6.5h2.5l5-3v9l-5-3H3a1 1 0 01-1-1v-1a1 1 0 011-1z" />
      <path d="M5 9.5l1 4" />
      <path d="M12.5 6a3 3 0 010 4" />
    </svg>
  )
}

const ecosystemCards = [
  {
    kind: 'store',
    label: 'Store',
    icon: StoreIcon,
    title: 'Handcrafted\nCeramic Vase',
    detail: '$89.00',
    action: 'Add to cart',
  },
  {
    kind: 'services',
    label: 'Services',
    icon: ServicesIcon,
    title: 'Wellness Coaching',
    detail: '60 min\n$120',
    action: 'Book now',
  },
  {
    kind: 'bookings',
    label: 'Bookings',
    icon: BookingsIcon,
    title: 'Upcoming booking',
    detail: 'Yoga Class\nSat, May 24 · 9:00 AM',
    action: 'Confirmed',
  },
  {
    kind: 'courses',
    label: 'Courses',
    icon: CoursesIcon,
    title: 'Mindful Living\nMasterclass',
    detail: '78% complete',
    action: 'Continue',
  },
] as const

function EcosystemCard({
  card,
}: {
  card: (typeof ecosystemCards)[number]
}) {
  const Icon = card.icon
  return (
    <article className={`auth-ecosystem-card auth-ecosystem-card-${card.kind}`}>
      <div className="auth-ecosystem-tab">
        <span className="auth-ecosystem-icon" aria-hidden="true">
          <Icon />
        </span>
        {card.label}
      </div>
      <div className="auth-ecosystem-content">
        <div>
          <h2>{card.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
          <p>{card.detail.split('\n').map((line) => <span key={line}>{line}</span>)}</p>
        </div>
        <span className="auth-ecosystem-thumbnail" aria-hidden="true" />
      </div>
      <div className="auth-ecosystem-footer">
        <span className="auth-ecosystem-detail" aria-hidden="true" />
        <span>{card.action}</span>
      </div>
    </article>
  )
}

export function AuthBrandPanel({ currentStep = 1, stepProgress }: AuthBrandPanelProps = {}) {
  return (
    <aside className="auth-brand-panel">
      <div className="auth-brand-panel-copy">
        <p className="auth-panel-badge">✦ Your business starts here</p>
        <h1>
          One account.
          <span>Every way to grow.</span>
        </h1>
      </div>

      <div className="auth-network" aria-hidden="true">
        <div className="auth-orbit auth-orbit-one" />
        <div className="auth-orbit auth-orbit-two" />
        <div className="auth-orbit auth-orbit-three" />
        {ecosystemCards.map((card) => <EcosystemCard card={card} key={card.kind} />)}
        <div className="auth-network-core">
          <WillovateLogo className="auth-network-logo" />
        </div>
      </div>

      <div className="auth-tools" aria-hidden="true">
        <span className="auth-tool-item"><GlobeIcon /> Website</span>
        <span className="auth-tool-dot" aria-hidden="true">·</span>
        <span className="auth-tool-item"><CreditCardIcon /> Payments</span>
        <span className="auth-tool-dot" aria-hidden="true">·</span>
        <span className="auth-tool-item"><UsersGroupIcon /> Customers</span>
        <span className="auth-tool-dot" aria-hidden="true">·</span>
        <span className="auth-tool-item"><MegaphoneIcon /> Marketing</span>
      </div>

      <ProgressSteps currentStep={currentStep} stepProgress={stepProgress} />
    </aside>
  )
}
