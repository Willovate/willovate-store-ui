import type { TemplateConfig } from '../../types/template'

export const GeneralStore08: TemplateConfig = {
  id: 'dailyco',
  name: 'DailyCo',
  description: 'A modern general store organized around your everyday rhythm. Bright, practical, and slightly playful.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'everyday', name: 'Everyday' }, { id: 'rhythm', name: 'Rhythm' }, { id: 'modern', name: 'Modern' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: '"Space Grotesk", sans-serif', body: '"Karla", sans-serif' },
    colors: { primary: '#172554', background: '#fafaf7', accent: '#a3e635' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Free delivery on all orders over ₹999. Easy 30-day returns.' } },
    { id: 's2', type: 'navbar', props: { brand: 'DAILYCO', style: 'center' } },
    { id: 's3', type: 'split-hero', props: {
      title: 'Everything for the way your day moves.',
      subtitle: 'Useful things for busy mornings, focused afternoons, slow evenings, and everything between.',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'Shop Daily Essentials',
      imageRight: false
    } },
    { id: 's4', type: 'bento-grid', props: {
      title: 'Your Daily Rhythm',
      items: [
        { title: 'Morning', description: 'Start right.', span: 1 },
        { title: 'Work', description: 'Focus in.', span: 1 },
        { title: 'Move', description: 'Out the door.', span: 1 },
        { title: 'Home', description: 'Settle down.', span: 1 }
      ]
    } },
    { id: 's5', type: 'catalog', props: {
      title: 'Morning Edit',
      subtitle: 'Everything you need to start the day.',
      products: [
        { id: 'dc1', name: 'Daily Mug', description: 'Drinkware', price: 18, imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600' },
        { id: 'dc2', name: 'Morning Carry Bottle', description: 'Hydration', price: 32, imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600' },
        { id: 'dc3', name: 'Fold Breakfast Container', description: 'Kitchen', price: 24, imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600' },
        { id: 'dc4', name: 'Daily Notebook', description: 'Stationery', price: 16, imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'bento-grid', props: {
      title: 'The Daily Five',
      items: [
        { title: 'Arc Desk Lamp', description: 'Focus anywhere.', size: 'large', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800' },
        { title: 'Everyday Tote', description: 'Carry it all.', size: 'small', image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=400' },
        { title: 'Grid Desk Tray', description: 'Stay organized.', size: 'small', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=400' },
        { title: 'Go Bottle', description: 'Stay hydrated.', size: 'small', image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=400' },
        { title: 'Soft Journal', description: 'Capture thoughts.', size: 'small', image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=400' }
      ]
    }},
    { id: 's7', type: 'catalog', props: {
      title: 'Work Mode',
      subtitle: 'Tools for a focused afternoon.',
      products: [
        { id: 'dc6', name: 'Cable Wrap Set', description: 'Organization', price: 12, imageUrl: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80&w=600' },
        { id: 'dc7', name: 'Utility Organizer', description: 'Desk', price: 28, imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=600' },
        { id: 'dc8', name: 'Pocket Speaker', description: 'Audio', price: 45, imageUrl: 'https://images.unsplash.com/photo-1512753360435-329c4535a9a7?auto=format&fit=crop&q=80&w=600' },
        { id: 'dc22', name: 'Desk Clock', description: 'Workspace', price: 42, imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's8', type: 'catalog', props: {
      title: 'Move / Out the Door',
      subtitle: 'For the commute and beyond.',
      products: [
        { id: 'dc9', name: 'Transit Pouch', description: 'Travel', price: 34, imageUrl: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=600' },
        { id: 'dc10', name: 'Compact Umbrella', description: 'Accessories', price: 26, imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600' },
        { id: 'dc11', name: 'Travel Cardholder', description: 'Everyday Carry', price: 42, imageUrl: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=600' },
        { id: 'dc12', name: 'Reusable Tote Bag', description: 'Accessories', price: 15, imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's9', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800',
      name: 'The Commuter Backpack',
      category: 'Move',
      description: 'Built for the daily transit. Water-resistant exterior, dedicated tech sleeve, and comfort straps for all-day carry.',
      price: 85,
      features: ['15" Laptop Sleeve', 'Water-resistant', 'Quick-access pockets'],
      badge: 'Bestseller',
      imageRight: true
    }},
    { id: 's10', type: 'catalog', props: {
      title: 'Home Reset',
      subtitle: 'Clear space, clear mind.',
      products: [
        { id: 'dc13', name: 'Stack Storage Box', description: 'Organization', price: 38, imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=600' },
        { id: 'dc14', name: 'Counter Tray', description: 'Kitchen', price: 24, imageUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=600' },
        { id: 'dc15', name: 'Everyday Bowl', description: 'Dining', price: 18, imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=600' },
        { id: 'dc16', name: 'Bamboo Organizer', description: 'Storage', price: 32, imageUrl: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's11', type: 'catalog', props: {
      title: 'Build Your Routine',
      subtitle: 'Bundles designed for your rhythm.',
      products: [
        { id: 'dc17', name: 'The Morning Kit', description: 'Mug, Journal, Pen', price: 45, badge: 'Save 15%', imageUrl: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=600' },
        { id: 'dc18', name: 'The Desk Kit', description: 'Tray, Lamp, Notebook', price: 110, badge: 'Save 20%', imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600' },
        { id: 'dc19', name: 'The Weekend Kit', description: 'Tote, Bottle, Pouch', price: 85, badge: 'Save 15%', imageUrl: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's12', type: 'catalog', props: {
      title: 'New In',
      products: [
        { id: 'dc20', name: 'Nightstand Tray', description: 'Home', price: 28, badge: 'New', imageUrl: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=600' },
        { id: 'dc21', name: 'Steel Cutlery Set', description: 'Kitchen', price: 35, badge: 'New', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=600' },
        { id: 'dc23', name: 'Travel Pill Organizer', description: 'Accessories', price: 14, badge: 'New', imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's13', type: 'catalog', props: {
      title: 'Wind Down',
      subtitle: 'Settle in for the evening.',
      products: [
        { id: 'dc24', name: 'Reading Light', description: 'Lighting', price: 34, imageUrl: 'https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&q=80&w=600' },
        { id: 'dc25', name: 'Aromatherapy Candle', description: 'Home Fragrance', price: 26, imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=600' },
        { id: 'dc26', name: 'Fleece Throw', description: 'Lifestyle', price: 55, imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600' },
        { id: 'dc27', name: 'Glass Carafe', description: 'Kitchen', price: 32, imageUrl: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's14', type: 'story', props: {
      title: 'Small things. Better days.',
      subtitle: 'The DailyCo Philosophy',
      content: 'We believe the objects in your life should support your natural rhythm, not interrupt it. DailyCo curates the essentials that make mornings smoother, work days more focused, and evenings more restful.',
      image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=1200'
    }},
    { id: 's15', type: 'testimonials', props: {
      title: 'Customer Notes',
      testimonials: [
        { quote: 'The Daily Mug is exactly the right size, and the Arc Desk Lamp changed my whole afternoon workflow.', author: 'Sophie K.' },
        { quote: 'I love how curated this store is. It takes the guesswork out of finding reliable everyday items.', author: 'Marcus T.' },
        { quote: 'My Morning Kit bundle is the best thing I bought this year. Such a simple but effective upgrade.', author: 'Elena J.' }
      ]
    }},
    { id: 's16', type: 'bento-grid', props: {
      title: 'Why DailyCo',
      items: [
        { title: 'Useful by design', description: 'Function first, always.', span: 1 },
        { title: 'Easy to shop', description: 'Curated for your routine.', span: 1 },
        { title: 'Clear pricing', description: 'Honest everyday value.', span: 1 },
        { title: 'Fast delivery', description: 'Quick shipping on all items.', span: 1 }
      ]
    }},
    { id: 's17', type: 'newsletter', props: {
      title: 'Make room for better everyday.',
      subtitle: 'Join the DailyCo newsletter for routine inspiration, new drops, and early access to bundles.',
      buttonText: 'Subscribe'
    }},
    { id: 's18', type: 'footer', props: {
      brand: 'DAILYCO',
      text: 'Everything for the way your day moves.',
      social: [
        { label: 'Instagram', href: '#' },
        { label: 'TikTok', href: '#' },
        { label: 'Twitter', href: '#' }
      ]
    }}
  ]
}
