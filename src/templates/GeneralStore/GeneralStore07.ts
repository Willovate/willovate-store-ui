import type { TemplateConfig } from '../../types/template'

export const GeneralStore07: TemplateConfig = {
  id: 'common',
  name: 'Common',
  description: 'A modern neighborhood marketplace built around products people actually use, keep around, recommend, and return to.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'community', name: 'Community' }, { id: 'everyday', name: 'Everyday' }, { id: 'practical', name: 'Practical' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: '"Sora", sans-serif', body: '"Nunito Sans", sans-serif' },
    colors: { primary: '#171717', background: '#f7f5ef', accent: '#5b5ce2' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Free shipping over $50 · Easy 30-day returns' } },
    { id: 's2', type: 'navbar', props: { brand: 'COMMON', style: 'minimal' } },
    { id: 's3', type: 'split-hero', props: {
      title: 'Good things for everyday life.',
      subtitle: 'A considered mix of useful, enjoyable, and easy-to-love products — chosen with real people in mind.',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'Shop the collection',
      imageRight: false
    } },
    { id: 's4', type: 'bento-grid', props: {
      title: 'Shop what you need',
      items: [
        { title: 'Home', description: 'Everyday living.', size: 'large', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800' },
        { title: 'Travel', description: 'On the move.', size: 'small', image: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&q=80&w=400' },
        { title: 'Tech', description: 'Workspace essentials.', size: 'small', image: 'https://images.unsplash.com/photo-1528301721190-186c3bd85418?auto=format&fit=crop&q=80&w=400' },
        { title: 'Gifts', description: 'For them.', size: 'small', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400' }
      ]
    }},
    { id: 's5', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800',
      name: 'Fold Travel Pouch',
      category: 'Community Pick',
      description: 'Our most recommended travel companion. Holds cables, toiletries, and essentials perfectly. "I bought three just in case they stop making them" - Mark T.',
      price: 35,
      features: ['Water-resistant', 'Multiple compartments', 'Compact fold'],
      badge: 'Community Favorite',
      imageRight: true
    }},
    { id: 's6', type: 'catalog', props: {
      title: 'Most Loved',
      products: [
        { id: 'cm1', name: 'Field Tote', description: 'Everyday Carry', price: 45, imageUrl: 'https://images.unsplash.com/photo-1597816041042-45e3ed609f98?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm2', name: 'Daily Carry Bottle', description: 'Hydration', price: 28, imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm3', name: 'Arc Desk Tray', description: 'Workspace', price: 32, imageUrl: 'https://images.unsplash.com/photo-1611077544719-741ce2b9894e?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm4', name: 'Pocket Speaker', description: 'Audio', price: 65, imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's7', type: 'promo', props: {
      text: '12,000+ EVERYDAY FAVORITES SHIPPED. CHOSEN BY PEOPLE WHO LIKE USEFUL THINGS.'
    }},
    { id: 's8', type: 'bento-grid', props: {
      title: 'Under one roof',
      items: [
        { title: 'Home', description: 'The foundation.', span: 2, image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800' },
        { title: 'Work', description: 'Focus better.', span: 1 },
        { title: 'Travel', description: 'Pack lighter.', span: 1 }
      ]
    }},
    { id: 's9', type: 'catalog', props: {
      title: 'New In',
      products: [
        { id: 'cm5', name: 'Softline Mug', description: 'Kitchen', price: 24, badge: 'New', imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm6', name: 'Everyday Notebook', description: 'Stationery', price: 18, badge: 'New', imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm7', name: 'Common Charge Hub', description: 'Tech', price: 48, badge: 'New', imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm8', name: 'Weekender Organizer', description: 'Travel', price: 55, badge: 'New', imageUrl: 'https://images.unsplash.com/photo-1559404289-4b68ff05f57a?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's10', type: 'catalog', props: {
      title: 'People Also Picked',
      subtitle: 'Cross-category discovery',
      products: [
        { id: 'cm9', name: 'Desk Lamp', description: 'Lighting', price: 85, imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm10', name: 'Phone Stand', description: 'Accessories', price: 22, imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm11', name: 'Storage Basket', description: 'Organization', price: 38, imageUrl: 'https://images.unsplash.com/photo-1528301721190-186c3bd85418?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm12', name: 'Ceramic Pour Over', description: 'Kitchen', price: 42, imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's11', type: 'story', props: {
      title: 'Made for the way people actually live.',
      subtitle: 'Editorial Feature',
      content: 'We believe the objects you use every day should work perfectly and look great. No fuss, no excessive features. Just honest, well-made products that fit seamlessly into your routine.',
      image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1200'
    }},
    { id: 's12', type: 'catalog', props: {
      title: 'Build your everyday kit',
      subtitle: 'Curated bundles to save you time.',
      products: [
        { id: 'cm13', name: 'The Desk Kit', description: 'Tray, Notebook, Stand', price: 68, badge: 'Bundle', imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm14', name: 'The Travel Kit', description: 'Pouch, Bottle, Organizer', price: 95, badge: 'Bundle', imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm15', name: 'The Home Reset', description: 'Storage, Lamp, Blanket', price: 145, badge: 'Bundle', imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's13', type: 'catalog', props: {
      title: 'Back in rotation',
      products: [
        { id: 'cm16', name: 'Stack Storage Set', description: 'Organization', price: 54, imageUrl: 'https://images.unsplash.com/photo-1595514535316-24eb22442ad4?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm17', name: 'Linen Throw', description: 'Home', price: 85, imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm18', name: 'Bamboo Cutlery', description: 'Kitchen', price: 24, imageUrl: 'https://images.unsplash.com/photo-1584820927498-cafe6c1c1f9b?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm19', name: 'Glass Match Cloche', description: 'Accessories', price: 28, imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's14', type: 'testimonials', props: {
      title: 'Community Voices',
      testimonials: [
        { quote: 'I came for one thing and somehow found five things I use every week.', author: 'Alex H.' },
        { quote: 'Everything I have bought here feels incredibly thoughtful. The travel pouch is a masterpiece.', author: 'Sarah J.' },
        { quote: 'Finally a store that understands practical design doesn\'t have to be boring.', author: 'Michael R.' }
      ]
    }},
    { id: 's15', type: 'bento-grid', props: {
      title: 'Why Common',
      items: [
        { title: 'Thoughtful selection', description: 'We only stock what we love.', span: 1 },
        { title: 'Easy returns', description: 'No-hassle 30 day policy.', span: 1 },
        { title: 'Clear pricing', description: 'Honest value, always.', span: 1 },
        { title: 'Human support', description: 'Real people ready to help.', span: 1 }
      ]
    }},
    { id: 's16', type: 'story', props: {
      title: 'A collection of things worth making room for.',
      subtitle: 'The Common Identity',
      content: 'We created Common to bring together products that balance beauty and utility. Our community helps us shape the collection, recommending items that have stood the test of time.',
      image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1200'
    }},
    { id: 's17', type: 'newsletter', props: {
      title: 'Get the good stuff first.',
      subtitle: 'New finds, useful ideas, and community favorites — occasionally, not constantly.',
      buttonText: 'Join the list'
    }},
    { id: 's18', type: 'footer', props: {
      brand: 'COMMON',
      text: 'Good products. Shared taste. Everyday life.',
      social: [
        { label: 'Instagram', href: '#' },
        { label: 'Twitter', href: '#' },
        { label: 'Journal', href: '#' }
      ]
    }}
  ]
}
