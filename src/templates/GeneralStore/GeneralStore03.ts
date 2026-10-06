import type { TemplateConfig } from '../../types/template'

export const GeneralStore03: TemplateConfig = {
  id: 'urbancart',
  name: 'UrbanCart',
  description: 'A curated city marketplace for modern everyday life. Discover interesting products designed for motion, utility, and contemporary living.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'urban', name: 'Urban' }, { id: 'lifestyle', name: 'Lifestyle' }, { id: 'curated', name: 'Curated' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: '"Space Grotesk", sans-serif', body: '"Manrope", sans-serif' },
    colors: { primary: '#0f172a', background: '#f8fafc', accent: '#ff4500' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'SAME-DAY DELIVERY IN SELECT METRO AREAS. FREE SHIPPING OVER $75.' } },
    { id: 's2', type: 'navbar', props: { brand: 'URBANCART', style: 'utility' } },
    { id: 's3', type: 'split-hero', props: {
      title: 'The City Edit.',
      subtitle: 'Curated essentials for the modern metropolitan lifestyle. Discover objects designed for motion, utility, and contemporary living.',
      image: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'Shop The Edit',
      imageRight: true
    } },
    { id: 's4', type: 'category-grid', props: {
      title: 'Explore Categories',
      categories: [
        { name: 'Commute', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=600' },
        { name: 'Workspace', image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=600' },
        { name: 'Travel', image: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?auto=format&fit=crop&q=80&w=600' },
        { name: 'Home', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's5', type: 'catalog', props: {
      title: 'Trending in the City',
      products: [
        { id: 'uc1', name: 'Commuter Flask', description: 'Drinkware', price: 35, badge: 'Hot', imageUrl: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=600' },
        { id: 'uc2', name: 'Tech Pouch Pro', description: 'Organization', price: 45, imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=600' },
        { id: 'uc3', name: 'Heavyweight Canvas Tote', description: 'Carry', price: 55, imageUrl: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=600' },
        { id: 'uc4', name: 'Matte Desk Tray', description: 'Workspace', price: 28, imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's6', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&q=80&w=800',
      name: 'The Transit Backpack',
      category: 'Everyday Carry',
      description: 'Engineered for the daily commute. Weather-resistant materials, dedicated tech storage, and a sleek profile that navigates crowded trains with ease.',
      price: 125,
      features: ['Water-Resistant Shell', '15" Laptop Sleeve', 'Hidden Security Pocket'],
      badge: 'Editor\'s Pick',
      imageRight: false
    } },
    { id: 's7', type: 'editorial-grid', props: {
      title: 'Life in Motion',
      images: [
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800'
      ]
    } },
    { id: 's8', type: 'promo', props: {
      text: 'THE WEEKEND EDIT: 15% OFF SELECT TRAVEL ACCESSORIES WITH CODE GETAWAY'
    } },
    { id: 's9', type: 'catalog', props: {
      title: 'City Essentials',
      subtitle: 'Highly functional basics for smaller spaces and busier days.',
      products: [
        { id: 'uc5', name: 'Portable Espresso Maker', description: 'Coffee', price: 65, imageUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=600' },
        { id: 'uc6', name: 'Compact Umbrella', description: 'Weather', price: 32, imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600' },
        { id: 'uc7', name: 'Aluminum Cardholder', description: 'Wallet', price: 24, imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600' },
        { id: 'uc8', name: 'Reusable Bento Box', description: 'Lunch', price: 40, imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's10', type: 'bento-grid', props: {
      title: 'Urban Curations',
      items: [
        { title: 'The Minimalist Desk', description: 'Declutter your thoughts.', size: 'large', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800' },
        { title: 'Gym to Office', description: 'Seamless transitions.', size: 'small', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=400' },
        { title: 'Coffee Ritual', description: 'Start right.', size: 'small', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=400' },
        { title: 'Rain Ready', description: 'Stay dry.', size: 'small', image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's11', type: 'shop-the-look', props: {
      title: 'Staff Picks: Sarah\'s Commute',
      subtitle: 'What our art director carries every day.',
      image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 50, y: 35, product: { name: 'Oversized Trench', price: 185 } },
        { x: 30, y: 70, product: { name: 'Leather Tote', price: 145 } },
        { x: 60, y: 60, product: { name: 'Ceramic Keep Cup', price: 28 } }
      ]
    } },
    { id: 's12', type: 'catalog', props: {
      title: 'Limited Time Deals',
      products: [
        { id: 'uc9', name: 'Pocket Notebook Set', description: 'Stationery', price: 15, originalPrice: 22, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=600' },
        { id: 'uc10', name: 'Aromatherapy Roll-On', description: 'Self-Care', price: 18, originalPrice: 26, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=600' },
        { id: 'uc11', name: 'Stainless Steel Carabiner', description: 'Hardware', price: 12, originalPrice: 18, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1520699697851-3dc68aa3a474?auto=format&fit=crop&q=80&w=600' },
        { id: 'uc12', name: 'Cable Organizer Roll', description: 'Tech Accessories', price: 20, originalPrice: 30, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's13', type: 'story', props: {
      title: 'Made for the City.',
      subtitle: 'The UrbanCart Philosophy',
      content: 'We source products that solve problems. Whether it\'s a bag that survives the subway rush, a mug that doesn\'t leak in your tote, or a desk organizer that makes a small apartment feel like a corner office. Good design should make city living easier.',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1200'
    } },
    { id: 's14', type: 'testimonials', props: {
      title: 'Word on the Street',
      testimonials: [
        { quote: 'Everything I buy here actually gets used every single day. The curation is spot on for someone living in a 500sqft apartment.', author: 'David L.', role: 'Brooklyn, NY' },
        { quote: 'Fast delivery, amazing aesthetic, and products that just make sense. It\'s my go-to for gifts and self-upgrades.', author: 'Mia C.', role: 'Chicago, IL' },
        { quote: 'The tech pouches and organizers completely changed how I pack my bag for the office.', author: 'James W.', role: 'Seattle, WA' }
      ]
    } },
    { id: 's15', type: 'bento-grid', props: {
      title: 'The Urban Advantage',
      items: [
        { title: 'Courier Delivery', description: 'Same-day in select metro areas.', span: 1 },
        { title: 'Easy Returns', description: 'Drop off at any local partner location.', span: 1 },
        { title: 'Curated Quality', description: 'Tested in real city conditions.', span: 1 },
        { title: 'Member Perks', description: 'Early access to limited drops.', span: 1 }
      ]
    } },
    { id: 's16', type: 'newsletter', props: {
      title: 'Join the Loop',
      subtitle: 'Subscribe for new curations, city guides, and exclusive access.',
      buttonText: 'Sign Up'
    } },
    { id: 's17', type: 'footer', props: {
      brand: 'URBANCART',
      text: 'Curated essentials for the modern metropolitan lifestyle.',
      social: [
        { label: 'Instagram', href: '#' },
        { label: 'TikTok', href: '#' },
        { label: 'Twitter', href: '#' }
      ]
    } }
  ]
}
