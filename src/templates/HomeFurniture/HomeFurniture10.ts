import type { TemplateConfig } from '../../types/template'

export const Terra: TemplateConfig = {
  id: 'terra',
  name: 'Terra',
  description: 'Earthy warmth, raw timber, handwoven textiles, and wabi-sabi living.',
  categories: [{ id: 'home', name: 'Home & Furniture' }],
  tags: [{ id: 'earthy', name: 'Earthy' }, { id: 'wabi-sabi', name: 'Wabi-Sabi' }, { id: 'natural', name: 'Natural' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
    colors: { primary: '#231f1d', background: '#f7f4ee', accent: '#a36a4f' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Crafted with sustainably reclaimed timber and certified organic plant dyes.' } },
    { id: 's2', type: 'navbar', props: { brand: 'TERRA', style: 'minimal' } },
    { id: 's3', type: 'full-hero', props: {
      title: 'Born from the Earth',
      subtitle: 'Raw textures, wabi-sabi imperfection, and honest materials that connect the indoors to the soil.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'Explore the Earth'
    } },
    { id: 's4', type: 'category-grid', props: {
      title: 'Elemental Categories',
      categories: [
        { name: 'Furniture', image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
        { name: 'Lighting', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { name: 'Objects', image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600' },
        { name: 'Textiles', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's5', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=800',
      name: 'Field Oak Dining Table',
      category: 'Furniture',
      description: 'Solid weathered oak dining table showcasing natural knots, live fissures, and hand-rubbed beeswax finish.',
      price: 1950,
      features: ['Reclaimed Weathered Oak', 'Hand-Rubbed Beeswax', 'Visible Butterfly Mortises'],
      imageRight: false,
      badge: 'Naturalist'
    } },
    { id: 's6', type: 'catalog', props: {
      products: [
        { id: 'tra1', name: 'Field Oak Dining Table', description: 'Live Edge Weathered Solid Oak', price: 1950, category: 'Furniture', imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600' },
        { id: 'tra2', name: 'Woven Reed Chair', description: 'Hand-Twined Natural Rush Seat', price: 480, category: 'Furniture', imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600' },
        { id: 'tra3', name: 'Linen Lounge Cover', description: 'Heavyweight Flax Loose Cushion Slip', price: 240, category: 'Textiles', imageUrl: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=600' },
        { id: 'tra4', name: 'Jute Meadow Rug', description: 'Hand-Braided Unbleached Jute Weave', price: 620, category: 'Textiles', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600' },
        { id: 'tra5', name: 'Raw Edge Slab Coffee Table', description: 'Solid Teak Burl Organic Form', price: 1150, category: 'Furniture', imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600' },
        { id: 'tra6', name: 'Terracotta Table Lamp', description: 'Raw Red Clay Base with Canvas Shade', price: 280, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'tra7', name: 'Hand-Thrown Urn', description: 'Mineral Fired Decorative Vessel', price: 190, category: 'Objects', imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600' },
        { id: 'tra8', name: 'Belgian Flax Linen Bedding', description: 'Stonewashed Clay Colored Duvet', price: 310, category: 'Textiles', imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600' },
        { id: 'tra9', name: 'Carved Teak Accent Stool', description: 'Solid Wood Monolithic Pedestal', price: 360, category: 'Furniture', imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600' },
        { id: 'tra10', name: 'Clay Dome Pendant Lamp', description: 'Earthenware Hanging Fixture', price: 340, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=600' },
        { id: 'tra11', name: 'Organic Wool Throw', description: 'Undyed Sheep Wool Fringe Blanket', price: 160, category: 'Textiles', imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=600' },
        { id: 'tra12', name: 'Weathered Oak Sideboard', description: 'Reclaimed Timber 4-Door Credenza', price: 1850, category: 'Furniture', imageUrl: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=600' },
        { id: 'tra13', name: 'Stoneware Wall Sconce', description: 'Half-Moon Clay Atmospheric Light', price: 220, category: 'Lighting', imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600' },
        { id: 'tra14', name: 'Hand-Knotted Jute Runner', description: 'Braided Long Hallway Natural Rug', price: 280, category: 'Textiles', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600' },
        { id: 'tra15', name: 'Low Organic Linen Sofa', description: 'Deep Floor Lounge in Oatmeal Flax', price: 2400, category: 'Furniture', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600' },
        { id: 'tra16', name: 'Sculptural Ceramic Vessel', description: 'Hand-Coiled Terracotta Centerpiece', price: 145, category: 'Objects', imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's7', type: 'shop-the-look', props: {
      title: 'Earthen Living Space',
      subtitle: 'Surfaces shaped by wind, water, and human hands.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 30, y: 70, product: { name: 'Field Oak Dining Table', price: 1950 } },
        { x: 70, y: 60, product: { name: 'Woven Reed Chair', price: 480 } }
      ]
    } },
    { id: 's8', type: 'testimonials', props: {
      title: 'Voices of Terra',
      testimonials: [
        { quote: 'Terra feels honest and grounded. The dining table has become the soul of our home.', author: 'Mira & Silas' },
        { quote: 'The raw clay lamps cast the most peaceful, warm glow every dusk.', author: 'Hannah L.' }
      ]
    } },
    { id: 's9', type: 'newsletter', props: {
      title: 'Terra Journal',
      description: 'Stories of natural dyes, regenerative timber, and honest craft.',
      buttonText: 'Subscribe'
    } },
    { id: 's10', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Furniture', href: '#furniture' },
    { label: 'Lighting', href: '#lighting' },
    { label: 'Objects', href: '#objects' },
    { label: 'Textiles', href: '#textiles' }
  ],
  features: [
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' }
  ]
}

export const HomeFurniture10 = Terra
