import type { TemplateConfig } from '../../types/template'

export const Electronics02: TemplateConfig = {
  id: 'electronics-02',
  name: 'Volt',
  description: 'Premium consumer electronics flagship store. Sleek, modern, and confident.',
  categories: [{ id: 'electronics', name: 'Electronics' }],
  tags: [{ id: 'premium', name: 'Premium' }, { id: 'modern', name: 'Modern' }],
  thumbnailUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800',
  previewImages: [
    'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=1600'
  ],
  isFeatured: true,
  theme: {
    fonts: { heading: 'Space Grotesk, sans-serif', body: 'Inter, sans-serif' },
    colors: { primary: '#111827', background: '#f8fafc', accent: '#0ea5e9' }
  },
  sections: [
    { id: 's1', type: 'promo', props: { text: 'Free express delivery on orders over ₹5,000' } },
    { id: 's2', type: 'navbar', props: { brand: 'VOLT', style: 'utility' } },
    { id: 's3', type: 'full-hero', props: { 
      title: 'Technology, Refined.', 
      subtitle: 'Experience the next generation of premium consumer electronics designed for your everyday life.', 
      image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1600', 
      ctaLabel: 'Shop New Arrivals' 
    } },
    { id: 's4', type: 'category-grid', props: { 
      title: 'Explore Categories', 
      categories: [
        { name: 'Smartphones', image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Laptops', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Audio', image: 'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&q=80&w=600' }, 
        { name: 'Wearables', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600' },
        { name: 'Accessories', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=600' }
      ] 
    } },
    { id: 's5', type: 'catalog', props: {
        products: [
          { id: 'vp1', name: 'Volt X', description: 'Flagship Smartphone', price: 999, imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=600' },
          { id: 'vp2', name: 'VoltBook Pro', description: '14" Ultrabook', price: 1499, imageUrl: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=600' },
          { id: 'vp3', name: 'Volt Buds', description: 'True Wireless Noise Cancelling', price: 199, imageUrl: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=600' },
          { id: 'vp4', name: 'Volt Watch', description: 'Advanced Health Tracking', price: 349, imageUrl: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=600' }
        ]
    }},
    { id: 's6', type: 'product-spotlight', props: { 
      image: 'https://images.unsplash.com/photo-1533228100845-08145b01de14?auto=format&fit=crop&q=80&w=800', 
      name: 'Volt X Pro', 
      category: 'Flagship', 
      description: 'Capture every detail with the new 200MP camera system. Powered by the fastest chip ever in a smartphone, delivering unprecedented performance and battery life.', 
      price: 1199, 
      features: ['200MP Quad Camera', 'All-Day Battery', 'Dynamic 120Hz Display'], 
      badge: 'New Arrival',
      imageRight: false
    } },
    { id: 's7', type: 'bento-grid', props: { 
      title: 'The Volt Ecosystem',
      items: [
        { title: 'Seamless Integration', description: 'Your devices, perfectly synced.', size: 'large', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800' },
        { title: 'Volt X', description: 'The hub of your life.', size: 'small', image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&q=80&w=400' },
        { title: 'Volt Buds', description: 'Immersive sound.', size: 'small', image: 'https://images.unsplash.com/photo-1572569438068-409b60e40854?auto=format&fit=crop&q=80&w=400' },
        { title: 'Volt Watch', description: 'Always connected.', size: 'small', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=400' }
      ]
    } },
    { id: 's8', type: 'catalog', props: {
        products: [
          { id: 'va1', name: 'Volt Studio Over-Ear', description: 'High-Fidelity Audio', price: 349, imageUrl: 'https://images.unsplash.com/photo-1599669500515-9b40924d5189?auto=format&fit=crop&q=80&w=600' },
          { id: 'va2', name: 'Volt Soundbar', description: 'Cinematic Sound', price: 499, imageUrl: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=600' },
          { id: 'va3', name: 'Volt Portable Mini', description: 'Waterproof Bluetooth Speaker', price: 129, imageUrl: 'https://images.unsplash.com/photo-1589256469067-ea9912224858?auto=format&fit=crop&q=80&w=600' },
          { id: 'va4', name: 'Volt Buds Pro', description: 'Adaptive Noise Control', price: 249, imageUrl: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=600' }
        ]
    }},
    { id: 's9', type: 'editorial-grid', props: { 
      title: 'Smart Devices', 
      images: [
        'https://images.unsplash.com/photo-1584006682522-dc17d6c0d06e?auto=format&fit=crop&q=80&w=600', 
        'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=600'
      ] 
    } },
    { id: 's10', type: 'feature-comparison', props: { 
      title: 'Compare Flagships', 
      products: [
        { name: 'Volt X', price: 999 }, 
        { name: 'Volt X Pro', price: 1199, isHighlighted: true }
      ], 
      rows: [
        { label: 'Display', values: ['6.1" OLED', '6.7" OLED 120Hz'] }, 
        { label: 'Camera', values: ['Dual 50MP', 'Quad 200MP'] },
        { label: 'Battery', values: ['Up to 20 hrs', 'Up to 28 hrs'] },
        { label: 'Storage', values: ['128GB / 256GB', '256GB / 512GB / 1TB'] }
      ] 
    } },
    { id: 's11', type: 'split-hero', props: { 
      title: 'Designed for the way you live.', 
      subtitle: 'Every Volt product is crafted with precision, blending premium materials with cutting-edge engineering to enhance your daily routines without getting in the way.', 
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800', 
      ctaLabel: 'Read Our Story' 
    } },
    { id: 's12', type: 'catalog', props: {
        products: [
          { id: 'vacc1', name: 'Volt Fast Charger 65W', description: 'Dual USB-C', price: 49, imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=600' },
          { id: 'vacc2', name: 'Volt Magnetic Power Bank', description: '10,000mAh', price: 79, imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600' },
          { id: 'vacc3', name: 'Volt Leather Case', description: 'Premium Protection', price: 59, imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=600' },
          { id: 'vacc4', name: 'Volt Pro Hub', description: '7-in-1 Connectivity', price: 89, imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600' }
        ]
    }},
    { id: 's13', type: 'testimonials', props: { 
      title: 'Customer Reviews', 
      testimonials: [
        { quote: 'The Volt X Pro is simply the best device I have ever owned. The camera is phenomenal.', author: 'Alex M.' },
        { quote: 'Volt Buds provide incredible noise cancellation in a beautifully compact design.', author: 'Sarah T.' }
      ] 
    } },
    { id: 's14', type: 'newsletter', props: {} },
    { id: 's15', type: 'footer', props: {} }
  ],
  navigation: [
    { label: 'Smartphones', href: '#smartphones' },
    { label: 'Laptops', href: '#laptops' },
    { label: 'Audio', href: '#audio' },
    { label: 'Accessories', href: '#accessories' },
  ],
  features: [
    { id: 'compare', label: 'Compare Models' },
    { id: 'support', label: 'Support' },
    { id: 'cart', label: 'Cart' },
  ]
}
