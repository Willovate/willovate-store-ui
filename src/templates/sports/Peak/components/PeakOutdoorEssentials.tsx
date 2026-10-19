import React from 'react'

interface PeakOutdoorEssentialsProps {
  onSelectCategory: (category: string) => void
}

const ESSENTIAL_CATEGORIES = [
  {
    id: 'outdoor-clothing',
    name: 'Outdoor Clothing',
    count: '64 Items',
    image: 'https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'footwear',
    name: 'Footwear & Boots',
    count: '38 Items',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'backpacks',
    name: 'Technical Packs',
    count: '29 Items',
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'equipment',
    name: 'Shelter & Sleeping',
    count: '42 Items',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'accessories',
    name: 'Poles & Navigation',
    count: '55 Items',
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=500&auto=format&fit=crop&q=80',
  },
]

export const PeakOutdoorEssentials: React.FC<PeakOutdoorEssentialsProps> = ({ onSelectCategory }) => {
  return (
    <section className="pk-essentials-section" aria-label="Outdoor Gear Essentials">
      <div className="pk-container">
        <div className="pk-section-head">
          <div>
            <span className="pk-eyebrow">Gear Categories</span>
            <h2 className="pk-section-heading">OUTDOOR ESSENTIALS</h2>
          </div>
          <p style={{ color: 'var(--pk-stone-muted)', fontSize: '0.85rem' }}>
            Built modularly to layer and pack seamlessly into your expedition.
          </p>
        </div>

        <div className="pk-essentials-strip">
          {ESSENTIAL_CATEGORIES.map((item) => (
            <div
              key={item.id}
              className="pk-essential-card"
              onClick={() => onSelectCategory(item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectCategory(item.id)
                }
              }}
            >
              <img src={item.image} alt={item.name} className="pk-essential-img" />
              <h3 className="pk-essential-name">{item.name}</h3>
              <p className="pk-essential-count">{item.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
