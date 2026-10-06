import type { TemplateConfig } from '../../types/template'

export const GeneralStore07: TemplateConfig = {
  id: 'common',
  name: 'Common',
  description: 'A modern neighborhood marketplace built around products people actually use, keep around, recommend, and return to.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'community', name: 'Community' }, { id: 'everyday', name: 'Everyday' }, { id: 'practical', name: 'Practical' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=1600'
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
      image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'Shop the collection',
      imageRight: false
    } },
    { id: 's4', type: 'bento-grid', props: {
      title: 'Shop what you need',
      items: [
        { title: 'Home', description: 'Everyday living.', size: 'large', image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=800' },
        { title: 'Travel', description: 'On the move.', size: 'small', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=400' },
        { title: 'Tech', description: 'Workspace essentials.', size: 'small', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400' },
        { title: 'Gifts', description: 'For them.', size: 'small', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400' }
      ]
    }},
    { id: 's5', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&q=80&w=800',
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
        { id: 'cm1', name: 'Field Tote', description: 'Everyday Carry', price: 45, imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm2', name: 'Daily Carry Bottle', description: 'Hydration', price: 28, imageUrl: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm3', name: 'Arc Desk Tray', description: 'Workspace', price: 32, imageUrl: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm4', name: 'Pocket Speaker', description: 'Audio', price: 65, imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's7', type: 'promo', props: {
      text: '12,000+ EVERYDAY FAVORITES SHIPPED. CHOSEN BY PEOPLE WHO LIKE USEFUL THINGS.'
    }},
    { id: 's8', type: 'bento-grid', props: {
      title: 'Under one roof',
      items: [
        { title: 'Home', description: 'The foundation.', span: 2, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800' },
        { title: 'Work', description: 'Focus better.', span: 1 },
        { title: 'Travel', description: 'Pack lighter.', span: 1 }
      ]
    }},
    { id: 's9', type: 'catalog', props: {
      title: 'New In',
      products: [
        { id: 'cm5', name: 'Softline Mug', description: 'Kitchen', price: 24, badge: 'New', imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm6', name: 'Everyday Notebook', description: 'Stationery', price: 18, badge: 'New', imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm7', name: 'Common Charge Hub', description: 'Tech', price: 48, badge: 'New', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm8', name: 'Weekender Organizer', description: 'Travel', price: 55, badge: 'New', imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's10', type: 'catalog', props: {
      title: 'People Also Picked',
      subtitle: 'Cross-category discovery',
      products: [
        { id: 'cm9', name: 'Desk Lamp', description: 'Lighting', price: 85, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm10', name: 'Phone Stand', description: 'Accessories', price: 22, imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm11', name: 'Storage Basket', description: 'Organization', price: 38, imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm12', name: 'Ceramic Pour Over', description: 'Kitchen', price: 42, imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's11', type: 'story', props: {
      title: 'Made for the way people actually live.',
      subtitle: 'Editorial Feature',
      content: 'We believe the objects you use every day should work perfectly and look great. No fuss, no excessive features. Just honest, well-made products that fit seamlessly into your routine.',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1200'
    }},
    { id: 's12', type: 'catalog', props: {
      title: 'Build your everyday kit',
      subtitle: 'Curated bundles to save you time.',
      products: [
        { id: 'cm13', name: 'The Desk Kit', description: 'Tray, Notebook, Stand', price: 68, badge: 'Bundle', imageUrl: 'https://images.unsplash.com/photo-1502899576159-f224dc2349fa?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm14', name: 'The Travel Kit', description: 'Pouch, Bottle, Organizer', price: 95, badge: 'Bundle', imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm15', name: 'The Home Reset', description: 'Storage, Lamp, Blanket', price: 145, badge: 'Bundle', imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's13', type: 'catalog', props: {
      title: 'Back in rotation',
      products: [
        { id: 'cm16', name: 'Stack Storage Set', description: 'Organization', price: 54, imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm17', name: 'Linen Throw', description: 'Home', price: 85, imageUrl: 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm18', name: 'Bamboo Cutlery', description: 'Kitchen', price: 24, imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=600' },
        { id: 'cm19', name: 'Glass Match Cloche', description: 'Accessories', price: 28, imageUrl: 'https://images.unsplash.com/photo-1558227691-41ea78d1f631?auto=format&fit=crop&q=80&w=600' }
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
      image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=1200'
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
