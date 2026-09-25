import React from 'react'

export const PeakBuiltForElements: React.FC = () => {
  const elements = [
    {
      icon: '🌧️',
      name: 'WATERPROOF',
      stat: '28,000mm',
      desc: 'Hydrostatic head rating ensures relentless protection in cloudburst rain and wet alpine blizzards.',
    },
    {
      icon: '💨',
      name: 'WIND PROTECTION',
      stat: '0.0 CFM',
      desc: '100% windproof shell membranes deflect penetrating gale winds without convective warmth loss.',
    },
    {
      icon: '🛡️',
      name: 'DURABILITY',
      stat: '500D Cordura',
      desc: 'Reinforced high-abrasion zones resist granite rock friction, crampon strikes, and dense underbrush.',
    },
    {
      icon: '🌬️',
      name: 'BREATHABILITY',
      stat: '28 RET',
      desc: 'Micro-porous vapour channels release core sweat and condensation during high-output vertical ascents.',
    },
  ]

  return (
    <section className="pk-elements-section" aria-label="Built For The Elements Storytelling">
      <div className="pk-elements-bg">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=80"
          alt="Craggy alpine peaks in misty weather"
        />
      </div>

      <div className="pk-container">
        <div className="pk-elements-inner">
          <div className="pk-elements-text">
            <span className="pk-eyebrow light">Field-Engineered Architecture</span>
            <h2 className="pk-section-heading light" style={{ marginBottom: '20px' }}>
              BUILT FOR THE <em>ELEMENTS</em>
            </h2>
            <p style={{ color: 'var(--pk-text-light-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '28px' }}>
              Nature doesn't compromise, and neither do we. Every garment, pack, and shelter in the Peak catalog undergoes laboratory stress trials and hundreds of hours of Himalayan route testing before reaching your expedition kit.
            </p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--pk-accent-sage)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                <span>✓</span> Zero PFC Membranes
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--pk-accent-sage)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                <span>✓</span> Recycled Yarns
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--pk-accent-sage)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                <span>✓</span> Lifetime Repair Guarantee
              </div>
            </div>
          </div>

          <div className="pk-elements-grid">
            {elements.map((el) => (
              <div key={el.name} className="pk-element-card">
                <div className="pk-element-icon">{el.icon}</div>
                <h3 className="pk-element-name">{el.name}</h3>
                <div className="pk-element-stat">{el.stat}</div>
                <p className="pk-element-desc">{el.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
