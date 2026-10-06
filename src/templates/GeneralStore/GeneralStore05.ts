import type { TemplateConfig } from '../../types/template'

export const GeneralStore05: TemplateConfig = {
  id: 'bazaar',
  name: 'Bazaar',
  description: 'A modern digital bazaar where every visit reveals something worth bringing home. Vibrant, discovery-driven, and thoughtfully curated.',
  categories: [{ id: 'general', name: 'General Store' }],
  tags: [{ id: 'vibrant', name: 'Vibrant' }, { id: 'discovery', name: 'Discovery' }, { id: 'colorful', name: 'Colorful' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=1600'
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
      image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=1600',
      ctaLabel: 'Start Exploring',
      imageRight: true
    } },
    { id: 's4', type: 'bento-grid', props: {
      title: 'The Market Aisles',
      items: [
        { title: 'For the Home', description: 'Brighten your space.', size: 'large', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800' },
        { title: 'Desk & Study', description: 'Work beautifully.', size: 'small', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400' },
        { title: 'Self Care', description: 'Treat yourself.', size: 'small', image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&q=80&w=400' },
        { title: 'On the Go', description: 'Travel essentials.', size: 'small', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=400' }
      ]
    }},
    { id: 's5', type: 'catalog', props: {
      title: 'Fresh Arrivals',
      subtitle: 'Just landed in the bazaar.',
      products: [
        { id: 'bz1', name: 'Terracotta Planter', description: 'Home', price: 34, imageUrl: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz2', name: 'Colorblock Notebook', description: 'Workspace', price: 18, imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz3', name: 'Artisan Glass Tumbler', description: 'Kitchen', price: 22, badge: 'New', imageUrl: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz4', name: 'Woven Cotton Throw', description: 'Textiles', price: 55, imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's6', type: 'product-spotlight', props: {
      image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=800',
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
        { id: 'bz5', name: 'Speckled Ceramic Mug', description: 'Kitchen', price: 24, imageUrl: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz6', name: 'Brass Desk Tray', description: 'Workspace', price: 38, imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz7', name: 'Scented Soy Candle', description: 'Home Fragrance', price: 28, imageUrl: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz8', name: 'Leather Passport Holder', description: 'Travel', price: 42, imageUrl: 'https://images.unsplash.com/photo-1604514628550-37477afdf4e3?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's9', type: 'shop-the-look', props: {
      title: 'Desk Refresh',
      subtitle: 'Everything you need for a more inspiring workspace.',
      image: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&q=80&w=1600',
      hotspots: [
        { x: 30, y: 50, product: { name: 'Dot Grid Notebook', price: 18 } },
        { x: 55, y: 40, product: { name: 'Brass Pen Set', price: 35 } },
        { x: 70, y: 70, product: { name: 'Leather Desk Mat', price: 65 } }
      ]
    }},
    { id: 's10', type: 'editorial-grid', props: {
      title: 'Vibrant Living',
      images: [
        'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800'
      ]
    }},
    { id: 's11', type: 'catalog', props: {
      title: 'Under $50',
      subtitle: 'Great design doesn\'t have to break the bank.',
      products: [
        { id: 'bz9', name: 'Bamboo Cutlery Set', description: 'Kitchen', price: 16, imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz10', name: 'Glass Match Cloche', description: 'Home', price: 22, imageUrl: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz11', name: 'Mesh Produce Bags', description: 'Sustainable', price: 14, imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz12', name: 'Travel Pill Organizer', description: 'Accessories', price: 12, imageUrl: 'https://images.unsplash.com/photo-1558401391-7899b4bd5bbf?auto=format&fit=crop&q=80&w=600' }
      ]
    }},
    { id: 's12', type: 'promo', props: {
      text: 'GIFTING MADE EASY. EXPLORE OUR CURATED GIFT BOXES FOR EVERY OCCASION.'
    }},
    { id: 's13', type: 'catalog', props: {
      title: 'Gifts & Sets',
      products: [
        { id: 'bz13', name: 'The Coffee Enthusiast', description: 'Gift Box', price: 85, imageUrl: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz14', name: 'Self-Care Sunday', description: 'Gift Box', price: 65, imageUrl: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz15', name: 'Desk Upgrade', description: 'Gift Box', price: 55, imageUrl: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?auto=format&fit=crop&q=80&w=600' },
        { id: 'bz16', name: 'The Frequent Flyer', description: 'Gift Box', price: 95, imageUrl: 'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?auto=format&fit=crop&q=80&w=600' }
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
      image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=1200'
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
