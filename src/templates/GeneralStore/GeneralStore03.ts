import type { TemplateConfig } from '../../types/template'

export const GeneralStore03: TemplateConfig = {
  id: 'urbancart',
  name: 'UrbanCart',
  description: 'A curated city marketplace for modern everyday life. Discover interesting products designed for motion, utility, and contemporary living.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'urban', name: 'Urban' }, { id: 'lifestyle', name: 'Lifestyle' }, { id: 'curated', name: 'Curated' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1600'
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
        { name: 'Workspace', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=600' },
        { name: 'Travel', image: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&q=80&w=600' },
        { name: 'Home', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's5', type: 'catalog', props: {
      title: 'Trending in the City',
      products: [
        { id: 'uc1', name: 'Commuter Flask', description: 'Drinkware', price: 35, badge: 'Hot', imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600' },
        { id: 'uc2', name: 'Tech Pouch Pro', description: 'Organization', price: 45, imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=600' },
        { id: 'uc3', name: 'Heavyweight Canvas Tote', description: 'Carry', price: 55, imageUrl: 'https://images.unsplash.com/photo-1597816041042-45e3ed609f98?auto=format&fit=crop&q=80&w=600' },
        { id: 'uc4', name: 'Matte Desk Tray', description: 'Workspace', price: 28, imageUrl: 'https://images.unsplash.com/photo-1611077544719-741ce2b9894e?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's6', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
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
        'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800',
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
        { id: 'uc5', name: 'Portable Espresso Maker', description: 'Coffee', price: 65, imageUrl: 'https://images.unsplash.com/photo-1580828369019-222049d5b035?auto=format&fit=crop&q=80&w=600' },
        { id: 'uc6', name: 'Compact Umbrella', description: 'Weather', price: 32, imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=600' },
        { id: 'uc7', name: 'Aluminum Cardholder', description: 'Wallet', price: 24, imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600' },
        { id: 'uc8', name: 'Reusable Bento Box', description: 'Lunch', price: 40, imageUrl: 'https://images.unsplash.com/photo-1585238341267-16fc2d50b40e?auto=format&fit=crop&q=80&w=600' }
      ]
    } },
    { id: 's10', type: 'bento-grid', props: {
      title: 'Urban Curations',
      items: [
        { title: 'The Minimalist Desk', description: 'Declutter your thoughts.', size: 'large', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800' },
        { title: 'Gym to Office', description: 'Seamless transitions.', size: 'small', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=400' },
        { title: 'Coffee Ritual', description: 'Start right.', size: 'small', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=400' },
        { title: 'Rain Ready', description: 'Stay dry.', size: 'small', image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's11', type: 'shop-the-look', props: {
      title: 'Staff Picks: Sarah\'s Commute',
      subtitle: 'What our art director carries every day.',
      image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 50, y: 35, product: { name: 'Oversized Trench', price: 185 } },
        { x: 30, y: 70, product: { name: 'Leather Tote', price: 145 } },
        { x: 60, y: 60, product: { name: 'Ceramic Keep Cup', price: 28 } }
      ]
    } },
    { id: 's12', type: 'catalog', props: {
      title: 'Limited Time Deals',
      products: [
        { id: 'uc9', name: 'Pocket Notebook Set', description: 'Stationery', price: 15, originalPrice: 22, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=600' },
        { id: 'uc10', name: 'Aromatherapy Roll-On', description: 'Self-Care', price: 18, originalPrice: 26, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600' },
        { id: 'uc11', name: 'Stainless Steel Carabiner', description: 'Hardware', price: 12, originalPrice: 18, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1520699697851-3dc68aa3a474?auto=format&fit=crop&q=80&w=600' },
        { id: 'uc12', name: 'Cable Organizer Roll', description: 'Tech Accessories', price: 20, originalPrice: 30, badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600' }
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
