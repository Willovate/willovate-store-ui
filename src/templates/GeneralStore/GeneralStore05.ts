import type { TemplateConfig } from '../../types/template'

export const GeneralStore05: TemplateConfig = {
  id: 'bazaar',
  name: 'Bazaar',
  description: 'A modern digital bazaar where every visit reveals something worth bringing home. Vibrant, discovery-driven, and thoughtfully curated.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'vibrant', name: 'Vibrant' }, { id: 'discovery', name: 'Discovery' }, { id: 'colorful', name: 'Colorful' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: false,
  theme: {
    fonts: { heading: '"Syne", sans-serif', body: '"Inter", sans-serif' },
    colors: { primary: '#1f2937', background: '#fffaf3', accent: '#e85d04' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'DISCOVER SOMETHING NEW EVERY DAY. FREE SHIPPING ON CURATED BUNDLES.' } },
    { id: 's2', type: 'navbar', props: { brand: 'BAZAAR', style: 'utility' } },
    { id: 's3', type: 'split-hero', props: {
      title: 'Find Your Next Favorite Thing.',
      subtitle: 'A vibrant marketplace of everyday goods, unusual finds, and design-led essentials for a more colorful life.',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'Start Exploring',
      imageRight: true
    } },
    { id: 's4', type: 'bento-grid', props: {
      title: 'The Market Aisles',
      items: [
        { title: 'For the Home', description: 'Brighten your space.', size: 'large', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800' },
        { title: 'Desk & Study', description: 'Work beautifully.', size: 'small', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=400' },
        { title: 'Self Care', description: 'Treat yourself.', size: 'small', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=400' },
        { title: 'On the Go', description: 'Travel essentials.', size: 'small', image: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&q=80&w=400' }
      ]
    }},
    { id: 's5', type: 'catalog', props: {
      title: 'Fresh Arrivals',
      subtitle: 'Just landed in the bazaar.',
      products: [
        { id: 'bz1', name: 'Terracotta Planter', description: 'Home', price: 34, imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz2', name: 'Colorblock Notebook', description: 'Workspace', price: 18, imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz3', name: 'Artisan Glass Tumbler', description: 'Kitchen', price: 22, badge: 'New', imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz4', name: 'Woven Cotton Throw', description: 'Textiles', price: 55, imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
      name: 'The Market Tote',
      category: 'Carry',
      description: 'The ultimate everyday carry. Made from heavy-duty organic canvas with reinforced handles and interior pockets for all your daily finds.',
      price: 45,
      features: ['Heavyweight Canvas', 'Interior Zip Pocket', 'Holds up to 30lbs'],
      badge: 'Bazaar Exclusive',
      imageRight: false
    }},
    { id: 's7', type: 'promo', props: {
      text: 'THE WEEKEND HOST: CURATED FINDS FOR YOUR NEXT GATHERING. SHOP THE EDIT.'
    }},
    { id: 's8', type: 'catalog', props: {
      title: 'Top Rated Finds',
      products: [
        { id: 'bz5', name: 'Speckled Ceramic Mug', description: 'Kitchen', price: 24, imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz6', name: 'Brass Desk Tray', description: 'Workspace', price: 38, imageUrl: 'https://images.unsplash.com/photo-1611077544719-741ce2b9894e?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz7', name: 'Scented Soy Candle', description: 'Home Fragrance', price: 28, imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz8', name: 'Leather Passport Holder', description: 'Travel', price: 42, imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's9', type: 'shop-the-look', props: {
      title: 'Desk Refresh',
      subtitle: 'Everything you need for a more inspiring workspace.',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 30, y: 50, product: { name: 'Dot Grid Notebook', price: 18 } },
        { x: 55, y: 40, product: { name: 'Brass Pen Set', price: 35 } },
        { x: 70, y: 70, product: { name: 'Leather Desk Mat', price: 65 } }
      ]
    }},
    { id: 's10', type: 'editorial-grid', props: {
      title: 'Vibrant Living',
      images: [
        'https://images.unsplash.com/photo-1528317424683-11bb58763dc0?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1595123049187-573e3a4e9b92?auto=format&fit=crop&q=80&w=800'
      ]
    }},
    { id: 's11', type: 'catalog', props: {
      title: 'Under $50',
      subtitle: 'Great design doesn\'t have to break the bank.',
      products: [
        { id: 'bz9', name: 'Bamboo Cutlery Set', description: 'Kitchen', price: 16, imageUrl: 'https://images.unsplash.com/photo-1584820927498-cafe6c1c1f9b?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz10', name: 'Glass Match Cloche', description: 'Home', price: 22, imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz11', name: 'Mesh Produce Bags', description: 'Sustainable', price: 14, imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz12', name: 'Travel Pill Organizer', description: 'Accessories', price: 12, imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's12', type: 'promo', props: {
      text: 'GIFTING MADE EASY. EXPLORE OUR CURATED GIFT BOXES FOR EVERY OCCASION.'
    }},
    { id: 's13', type: 'catalog', props: {
      title: 'Gifts & Sets',
      products: [
        { id: 'bz13', name: 'The Coffee Enthusiast', description: 'Gift Box', price: 85, imageUrl: 'https://images.unsplash.com/photo-1517006886278-f71f6d0f01ba?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz14', name: 'Self-Care Sunday', description: 'Gift Box', price: 65, imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz15', name: 'Desk Upgrade', description: 'Gift Box', price: 55, imageUrl: 'https://images.unsplash.com/photo-1596526131083-e8c638c478d5?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz16', name: 'The Frequent Flyer', description: 'Gift Box', price: 95, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's14', type: 'testimonials', props: {
      title: 'What the Crowd is Saying',
      testimonials: [
        { quote: 'I always find exactly what I didn\'t know I needed. The curation is incredibly fun and diverse.', author: 'Jamie K.' },
        { quote: 'A brilliant mix of practical items and beautiful gifts. It feels like browsing a global market.', author: 'Marcus T.' },
        { quote: 'The aesthetic is so vibrant, and the products actually live up to the hype. My go-to for home updates.', author: 'Sophie L.' }
      ]
    }},
    { id: 's15', type: 'story', props: {
      title: 'A World of Design.',
      subtitle: 'The Bazaar Ethos',
      content: 'We scour the globe for products that spark joy, offer brilliant utility, or just look fantastic on your shelf. Bazaar is about celebrating diversity in design—bringing together an eclectic mix of objects that make daily life a little more vibrant.',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1200'
    }},
    { id: 's16', type: 'bento-grid', props: {
      title: 'Why Shop Bazaar',
      items: [
        { title: 'Curated Chaos', description: 'Only the best, from everywhere.', span: 1 },
        { title: 'Global Inspiration', description: 'Design ideas from around the world.', span: 1 },
        { title: 'Happy Returns', description: 'Not your vibe? Send it back easily.', span: 1 },
        { title: 'Secure Checkout', description: 'Shop with total peace of mind.', span: 1 }
      ]
    }},
    { id: 's17', type: 'newsletter', props: {
      title: 'Join the Market',
      subtitle: 'Get first dibs on new arrivals, exclusive discounts, and weekly curation drops.',
      buttonText: 'Sign Me Up'
    }},
    { id: 's18', type: 'footer', props: {
      brand: 'BAZAAR',
      text: 'A modern digital bazaar for everyday discovery.',
      social: [
        { label: 'Instagram', href: '#' },
        { label: 'TikTok', href: '#' },
        { label: 'Twitter', href: '#' }
      ]
    }}
  ]
}
