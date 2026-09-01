import { WillovateLogo } from './WillovateLogo'

const steps = [
  ['01 / 03', 'Create account'],
  ['02 / 03', 'Tell us your idea'],
  ['03 / 03', 'Review your starting point'],
]

const ecosystemCards = [
  {
    kind: 'store',
    label: 'Store',
    title: 'Handcrafted\nCeramic Vase',
    detail: '$89.00',
    action: 'Add to cart',
  },
  {
    kind: 'services',
    label: 'Services',
    title: 'Wellness Coaching',
    detail: '60 min\n$120',
    action: 'Book now',
  },
  {
    kind: 'bookings',
    label: 'Bookings',
    title: 'Upcoming booking',
    detail: 'Yoga Class\nSat, May 24 · 9:00 AM',
    action: 'Confirmed',
  },
  {
    kind: 'courses',
    label: 'Courses',
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
  return (
    <article className={`auth-ecosystem-card auth-ecosystem-card-${card.kind}`}>
      <div className="auth-ecosystem-tab">
        <span className="auth-ecosystem-icon" aria-hidden="true" />
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

export function AuthBrandPanel() {
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
        <span><i className="auth-tool-icon auth-tool-icon-website" />Website</span>
        <span><i className="auth-tool-icon auth-tool-icon-payments" />Payments</span>
        <span><i className="auth-tool-icon auth-tool-icon-customers" />Customers</span>
        <span><i className="auth-tool-icon auth-tool-icon-marketing" />Marketing</span>
      </div>

      <ol className="auth-steps" aria-label="Account setup progress">
        {steps.map(([number, label], index) => (
          <li className={index === 0 ? 'is-current' : ''} key={number}>
            <span className="auth-step-dot" aria-hidden="true" />
            <strong>{number}</strong>
            <span>{label}</span>
          </li>
        ))}
      </ol>
    </aside>
  )
}